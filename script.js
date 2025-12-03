// Generate QR Code
function generateQRCode() {
    const qrCodeContainer = document.getElementById('qrCode');
    const url = 'https://jaktappen-pre-register.vercel.app/';
    
    // Använd QR Server API (gratis, ingen registrering)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    
    const img = document.createElement('img');
    img.src = qrCodeUrl;
    img.alt = 'QR Code för sidan';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '12px';
    
    qrCodeContainer.appendChild(img);
}

// Initialize QR Code when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateQRCode();
});

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const successMessage = document.getElementById('successMessage');
    const submitButton = document.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    if (!email) {
        successMessage.textContent = 'Vänligen ange en e-postadress';
        successMessage.style.color = '#ff6b6b';
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
        return;
    }
    
    // Visa laddningsstatus
    submitButton.textContent = 'Skickar...';
    submitButton.disabled = true;
    successMessage.classList.remove('show');
    
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            successMessage.textContent = `Tack! Vi har registrerat ${email}`;
            successMessage.style.color = '#5a9c3a';
            successMessage.classList.add('show');
            
            // Reset form
            document.getElementById('email').value = '';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            successMessage.textContent = data.message || 'Något gick fel';
            successMessage.style.color = '#ff6b6b';
            successMessage.classList.add('show');
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        successMessage.textContent = 'Kunde inte skicka. Försök igen senare.';
        successMessage.style.color = '#ff6b6b';
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

