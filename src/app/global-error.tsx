'use client';

import ErrorPageComponent from '@/components/ErrorPageComponent';
import { Button } from '@radix-ui/themes';
import * as Sentry from '@sentry/nextjs';
import { Metadata } from 'next';
import { useEffect } from 'react';

interface IProps {
	error: Error;
	reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: IProps) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<ErrorPageComponent
			heading='An unexpected error has occurred.'
			message='Oh no! Bugs made their way here too!'
		>
			<Button onClick={reset}>Retry</Button>
		</ErrorPageComponent>
	);
}

export const metadata: Metadata = {
	title: 'Issue Tracker - Unexpected Error',
	description: 'An unexpected error page',
};
