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
    
    // Logga page view
    const pageViewData = {
      timestamp: timestamp,
      ip: ip,
      userAgent: userAgent,
      referer: referer,
      url: req.url,
      method: req.method
    };

    console.log('👁️ PAGE VIEW:', JSON.stringify(pageViewData, null, 2));
    
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

