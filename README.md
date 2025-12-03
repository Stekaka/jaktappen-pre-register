# Jaktappen - Pre-Register Page

Pre-registration page for Jaktappen app.

## Features

- Beautiful responsive design
- Email collection form
- Dark theme with forest green accents
- 3D phone showcase

## Local Development

```bash
# Install dependencies (if any)
npm install

# Start development server
npm start
# or
node server.js
```

Server runs on http://localhost:8000

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### GitHub Pages

For static hosting, you can use GitHub Pages by:
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch and /root folder

## Email Collection

Emails are saved to `data/emails.json` when submitted through the form.

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js server
├── public/            # Static assets
│   └── images/        # App screenshots
└── data/              # Email storage
    └── emails.json    # Collected emails
```

