function validateIP(ip) {
//   const regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(?!$)|$){4}$/;
  const regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/
  return regex.test(ip);
}

module.exports = { validateIP };
