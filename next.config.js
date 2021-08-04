const path = require('path')

module.exports = {
  reactStrictMode: true,
  async redirects () {
    return [
      { source: '/', destination: '/login', permanent: true }
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    API_URL: 'http://localhost:8000/',
  },
};
