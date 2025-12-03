// För Vercel: Logga emails till console (syns i Vercel logs)
// För lokal utveckling: Spara till fil
const fs = require('fs');
const path = require('path');

const isVercel = process.env.VERCEL === '1';
const DATA_DIR = path.join(process.cwd(), 'data');
const EMAILS_FILE = path.join(DATA_DIR, 'emails.json');

// Funktion för att spara e-postadress
function saveEmail(email) {
  const emailData = {
    email: email,
    timestamp: new Date().toISOString(),
    source: 'jaktappen-pre-register'
  };

  // På Vercel: Logga till console (syns i Vercel Dashboard → Functions → Logs)
  if (isVercel) {
    console.log('📧 NEW EMAIL SUBSCRIPTION:', JSON.stringify(emailData, null, 2));
    // Du kan se dessa i Vercel Dashboard → Your Project → Functions → subscribe → Logs
    return true;
  }

  // Lokal utveckling: Spara till fil
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    let emails = [];
    if (fs.existsSync(EMAILS_FILE)) {
      const data = fs.readFileSync(EMAILS_FILE, 'utf8');
      emails = JSON.parse(data);
    }
    
    // Kontrollera om e-postadressen redan finns
    const exists = emails.some(e => e.email === email);
    if (!exists) {
      emails.push(emailData);
      fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
      console.log(`✅ Email saved locally: ${email}`);
      return true;
    } else {
      console.log(`⚠️ Email already exists: ${email}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error saving email:', error);
    return true; // Returnera true så användaren får bekräftelse ändå
  }
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const { email } = req.body;
    const emailTrimmed = email?.trim().toLowerCase();
    
    // Validera e-postadress
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      res.status(400).json({ success: false, message: 'Ogiltig e-postadress' });
      return;
    }
    
    const saved = saveEmail(emailTrimmed);
    
    res.status(200).json({ 
      success: true, 
      message: saved ? 'E-postadress sparad!' : 'E-postadress finns redan'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ success: false, message: 'Fel i begäran' });
  }
};

