const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.IPQS_API_KEY;

async function fetchIPQSData(ip) {
  try {
    const url = `https://ipqualityscore.com/api/json/ip/${API_KEY}/${ip}`;
    const response = await axios.get(url);

    const data = response.data;

    return {
      host: data.host,
      isp: data.ISP || data.isp,
      country: data.country_code,
      fraud_score: data.fraud_score,
      vpn: data.proxy || data.vpn || data.tor
    };
  } catch (err) {
    if (err.response?.status === 429) {
      err.status = 429;
    }
    throw err;
  }
}

module.exports = fetchIPQSData;
