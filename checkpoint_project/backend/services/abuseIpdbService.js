const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ABUSEIPDB_API_KEY;

async function fetchAbuseData(ip) {
  try {
    const response = await axios.get(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=${90}`, {
      headers: {
        Key: API_KEY,
        Accept: 'application/json'
      }
    });

    const data = response.data.data;
    return {
      ipAddress: data.ipAddress,
      abuseScore: data.abuseConfidenceScore,
      totalReports: data.totalReports
    };
  } catch (err) {
    if (err.response?.status === 429) {
      err.status = 429;
    }
    throw err;
  }
}

module.exports = fetchAbuseData;
