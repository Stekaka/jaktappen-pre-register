const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 8000;
const DATA_DIR = './data';
const EMAILS_FILE = path.join(DATA_DIR, 'emails.json');

// Skapa data-mappen om den inte finns
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Skapa emails.json om den inte finns
if (!fs.existsSync(EMAILS_FILE)) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2));
}

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

// Funktion för att spara e-postadress
function saveEmail(email) {
  try {
    const data = fs.readFileSync(EMAILS_FILE, 'utf8');
    const emails = JSON.parse(data);
    
    // Kontrollera om e-postadressen redan finns
    if (!emails.includes(email)) {
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
    return false;
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // Hantera POST-requests för e-postadresser
  if (req.method === 'POST' && url.pathname === '/api/subscribe') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const email = data.email?.trim().toLowerCase();
        
        // Validera e-postadress
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Ogiltig e-postadress' }));
          return;
        }
        
        const saved = saveEmail(email);
        
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ 
          success: true, 
          message: saved ? 'E-postadress sparad!' : 'E-postadress finns redan'
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Fel i begäran' }));
      }
    });
    
    return;
  }
  
  // Hantera GET-requests för statiska filer
  console.log(`${req.method} ${req.url}`);
  
  let filePath = '.' + url.pathname;
  if (filePath === './') {
    filePath = './index.html';
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});

