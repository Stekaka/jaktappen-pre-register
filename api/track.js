// Track page views - loggar till Vercel Function Logs
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const timestamp = new Date().toISOString();
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown';
    const referer = req.headers['referer'] || 'Direct';
    
    // Kolla om det är en dev-session (från query parameter)
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const isDevQuery = urlParams.searchParams.get('dev') === 'true';
    
    // Lista med kända dev IP-adresser
    // Sätt miljövariabeln DEV_IPS i Vercel Dashboard med komma-separerade IPs
    // Exempel: DEV_IPS=94.191.136.214,94.234.70.246
    // OBS: Mobil IP kan ändras om du byter nätverk (WiFi vs mobil data)
    const knownDevIPs = process.env.DEV_IPS 
      ? process.env.DEV_IPS.split(',').map(ip => ip.trim())
      : [];
    
    // Identifiera automatiska bots och Vercel-tjänster som ska filtreras bort
    const isBot = userAgent.toLowerCase().includes('vercel-screenshot') ||
                  userAgent.toLowerCase().includes('bot') ||
                  userAgent.toLowerCase().includes('crawler') ||
                  userAgent.toLowerCase().includes('spider') ||
                  userAgent.toLowerCase().includes('headless') ||
                  userAgent.toLowerCase().includes('monitoring') ||
                  userAgent.toLowerCase().includes('uptime') ||
                  userAgent.toLowerCase().includes('pingdom') ||
                  userAgent.toLowerCase().includes('status') ||
                  userAgent.toLowerCase().includes('health');
    
    // Extrahera första IP från x-forwarded-for (kan vara flera)
    const clientIP = ip.split(',')[0].trim();
    const isKnownDevIP = knownDevIPs.includes(clientIP);
    const isDev = isDevQuery || isKnownDevIP || isBot;
    
    // Bestäm anledning för dev-markering
    let devReason = null;
    if (isBot) {
      devReason = 'bot';
    } else if (isDevQuery) {
      devReason = 'query-param';
    } else if (isKnownDevIP) {
      devReason = 'known-ip';
    }
    
    // Logga page view
    const pageViewData = {
      timestamp: timestamp,
      ip: clientIP,
      userAgent: userAgent,
      referer: referer,
      url: req.url,
      method: req.method,
      isDev: isDev,
      devReason: devReason
    };

    // Tydlig markering för dev-sessions och bots
    if (isDev) {
      const emoji = isBot ? '🤖' : '🔧';
      const label = isBot ? 'BOT (FILTERA BORT)' : 'DEV (FILTERA BORT)';
      console.log(`${emoji} [${label}] [${devReason}]:`, JSON.stringify(pageViewData, null, 2));
    } else {
      console.log('👁️ PAGE VIEW (RIKTIG BESÖKARE):', JSON.stringify(pageViewData, null, 2));
    }
    
    // Returnera success (ingen data behövs)
    res.status(200).json({ 
      success: true,
      message: 'Page view tracked'
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    res.status(200).json({ success: true }); // Returnera success även vid fel så det inte stör användaren
  }
};

