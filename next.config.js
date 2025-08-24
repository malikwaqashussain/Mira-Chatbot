const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: false,
  },
  // 👇 disable font optimization
  optimizeFonts: false,
}

module.exports = nextConfig
