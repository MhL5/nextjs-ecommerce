/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gouxaohrjiljlrqmsqke.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
