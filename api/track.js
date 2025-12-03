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
    
    // Lista med kända dev IP-adresser (lägg till dina IPs här)
    // Du kan också sätta miljövariabeln DEV_IPS i Vercel Dashboard
    const knownDevIPs = process.env.DEV_IPS 
      ? process.env.DEV_IPS.split(',').map(ip => ip.trim())
      : [];
    
    // Extrahera första IP från x-forwarded-for (kan vara flera)
    const clientIP = ip.split(',')[0].trim();
    const isKnownDevIP = knownDevIPs.includes(clientIP);
    const isDev = isDevQuery || isKnownDevIP;
    
    // Logga page view
    const pageViewData = {
      timestamp: timestamp,
      ip: clientIP,
      userAgent: userAgent,
      referer: referer,
      url: req.url,
      method: req.method,
      isDev: isDev,
      devReason: isDevQuery ? 'query-param' : (isKnownDevIP ? 'known-ip' : null)
    };

    // Tydlig markering för dev-sessions
    if (isDev) {
      const reason = isDevQuery ? 'query-param' : 'known-ip';
      console.log(`🔧 [DEV] PAGE VIEW (FILTERA BORT) [${reason}]:`, JSON.stringify(pageViewData, null, 2));
    } else {
      console.log('👁️ PAGE VIEW:', JSON.stringify(pageViewData, null, 2));
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

