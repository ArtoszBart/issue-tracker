import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }],
			},
		];
	},
};

export default withSentryConfig(nextConfig, {
	org: 'artstack-hz',
	project: 'issue-tracker',
	silent: !process.env.CI,
	widenClientFileUpload: true,
	reactComponentAnnotation: {
		enabled: true,
	},
	tunnelRoute: '/monitoring',
	hideSourceMaps: true,
	disableLogger: true,
	automaticVercelMonitors: true,
});
