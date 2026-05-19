import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['tiptide'],
  turbopack: {},
  webpack(config) {
    config.resolve ||= {};
    config.resolve.alias ||= {};
    config.resolve.alias['tiptide'] = path.resolve(
      __dirname,
      '../../packages/tiptide/src/index.ts'
    );
    config.resolve.alias['tiptide/styles'] = path.resolve(
      __dirname,
      '../../packages/tiptide/src/tiptide.css'
    );
    return config;
  },
};

export default nextConfig;
