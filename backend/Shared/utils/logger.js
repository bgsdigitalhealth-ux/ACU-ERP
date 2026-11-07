export const logger = {
  info: (msg, ...args) => console.log(`[INFO ${new Date().toLocaleTimeString()}] ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`[WARN ${new Date().toLocaleTimeString()}] ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[ERROR ${new Date().toLocaleTimeString()}] ${msg}`, ...args),
  debug: (msg, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DEBUG ${new Date().toLocaleTimeString()}] ${msg}`, ...args);
    }
  },
};
export default logger;

