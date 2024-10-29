import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [Sentry.replayIntegration()],

	// 100% while in development, 10% in production
	replaysSessionSampleRate: 0.1,

	replaysOnErrorSampleRate: 1.0,

	// Setting this option to true will print useful information to the console while setting up Sentry.
	debug: false,
});
