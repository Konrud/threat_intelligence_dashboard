const express = require('express');
const router = express.Router();
const { validateIP } = require('../utils/validateIP');
const fetchAbuseData = require('../services/abuseIpdbService');
const fetchIPQSData = require('../services/ipQualityScoreService');

router.get('/', async (req, res, next) => {
  const { ip } = req.query;

  if (!validateIP(ip)) {
    return res.status(400).json({ error: 'Invalid IP address format' });
  }

  try {
    const [abuse, quality] = await Promise.all([
      fetchAbuseData(ip),
      fetchIPQSData(ip)
    ]);

    // Compute Risk
    const risk = computeRisk(abuse.abuseConfidenceScore, quality.fraud_score, quality.vpn);

    const response = {
      ipAddress: abuse.ipAddress || ip,
      hostname: quality.host || null,
      isp: quality.isp || 'N/A',
      country: quality.country || 'Unknown',
      abuseScore: abuse.abuseConfidenceScore,
      recentReports: abuse.totalReports,
      vpnDetected: quality.vpn,
      threatScore: quality.fraud_score,
      riskLevel: risk
    };

    res.json(response);
  } catch (error) {
    if (error.status === 429) {
      res.status(429).json({ error: 'Rate limit reached, try again later.' });
    } else {
      next(error);
    }
  }
});

function computeRisk(abuseScore, fraudScore, vpn) {
  let score = 0;
  if (abuseScore >= 80 || fraudScore >= 80) score++;
  if (vpn) score++;

  if (score >= 2) return 'high';
  if (score === 1) return 'medium';
  return 'low';
}

module.exports = router;
