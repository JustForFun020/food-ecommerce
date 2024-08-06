/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'antd',
    'rc-util',
    '@babel/runtime',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
  ],
  env: {
    NEXT_STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    NEXT_STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_POWER_BI_REPORT_ID: process.env.POWER_BI_REPORT_ID,
    NEXT_POWER_BI_GROUP_ID: process.env.POWER_BI_GROUP_ID,
    NEXT_POWER_BI_EMBED_CONFIG: process.env.POWER_BI_EMBED_CONFIG,
    NEXT_POWER_BI_ACCESS_TOKEN: process.env.POWER_BI_ACCESS_TOKEN,
    NEXT_POWER_BI_DATASET_ID: process.env.POWER_BI_DATASET_ID,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
