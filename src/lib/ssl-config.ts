if (typeof process !== 'undefined' && process.env) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export const configureSSL = () => {
  if (import.meta.env.DEV) {
    console.log('SSL verification disabled for development');
  }
};
