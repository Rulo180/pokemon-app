const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const pkg = require('./package.json');

module.exports = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  };

  nextConfig.publicRuntimeConfig = {
    pkg: {
      version: `${pkg.version}`,
    },
  };

  return nextConfig;
};
