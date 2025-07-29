import { THREAT_LEVELS } from "../types/threatLevelsType";

export const validateIP = (ip: string) => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
  return ipv4Regex.test(ip);
};