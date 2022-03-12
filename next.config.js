const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'messwala-test8778.s3.amazonaws.com', 'messwala-test8778.s3.us-east-2.amazonaws.com'],
  },

})
