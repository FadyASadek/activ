import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.tsx');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      // Local Next.js API routes — do NOT proxy these to the backend
      // /api/bookings, /api/upload, /api/coaches, /api/analyze, /api/activity, /api/paymob
      // are handled by Next.js itself.
      //
      // Only proxy routes that your Express backend (port 5000) handles:
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:5000/api/auth/:path*',
      },
      {
        source: '/api/complaints/:path*',
        destination: 'http://localhost:5000/api/complaints/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
