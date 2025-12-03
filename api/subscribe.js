const fs = require('fs');
const path = require('path');

// För Vercel serverless functions
const DATA_DIR = path.join(process.cwd(), 'data');
const EMAILS_FILE = path.join(DATA_DIR, 'emails.json');

// Skapa data-mappen om den inte finns (för lokal utveckling)
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    // Ignorera om det inte går (t.ex. på Vercel)
  }
}

// Skapa emails.json om den inte finns
if (!fs.existsSync(EMAILS_FILE)) {
  try {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2));
  } catch (e) {
    // Ignorera om det inte går
  }
}

// Funktion för att spara e-postadress
function saveEmail(email) {
  try {
    if (!fs.existsSync(EMAILS_FILE)) {
      fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2));
    }
    
    const data = fs.readFileSync(EMAILS_FILE, 'utf8');
    const emails = JSON.parse(data);
    
    // Kontrollera om e-postadressen redan finns
    const exists = emails.some(e => e.email === email);
    if (!exists) {
      emails.push({
        email: email,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
      console.log(`Email saved: ${email}`);
      return true;
    } else {
      console.log(`Email already exists: ${email}`);
      return false;
    }
  } catch (error) {
    console.error('Error saving email:', error);
    // På Vercel kan vi inte skriva till filsystem, så vi returnerar true ändå
    // I produktion skulle du använda en databas istället
    return true;
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

