const request = require('supertest');
const app = require('../app');

jest.mock('../services/abuseIpdbService');
jest.mock('../services/ipQualityScoreService');

const fetchAbuseData = require('../services/abuseIpdbService');
const fetchIPQSData = require('../services/ipQualityScoreService');

describe('GET /api/intel', () => {
  it('returns aggregated IP data', async () => {
    fetchAbuseData.mockResolvedValue({
      abuseConfidenceScore: 85,
      totalReports: 123
    });

    fetchIPQSData.mockResolvedValue({
      host: 'dns.google',
      isp: 'Google LLC',
      country_code: 'US',
      fraud_score: 90,
      vpn: true
    });

    const res = await request(app).get('/api/intel?ip=8.8.8.8');
    expect(res.statusCode).toBe(200);
    expect(res.body.riskLevel).toBe('High');
  });

  it('returns 400 for invalid IP', async () => {
    const res = await request(app).get('/api/intel?ip=invalid');
    expect(res.statusCode).toBe(400);
  });
});
