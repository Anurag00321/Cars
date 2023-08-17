/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
       ignoreBuildErrors: true,
    },
  };
  
// module.exports = nextConfig
module.exports = {
    experimental: {
        serverActions: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },    
}
