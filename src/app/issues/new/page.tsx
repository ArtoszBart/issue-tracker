import IssueFormSkeleton from '@/components/forms/IssueFormSkeleton';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const IssueForm = dynamic(() => import('@/components/forms/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
	return <IssueForm />;
};

export const metadata: Metadata = {
	title: 'Issue Tracker - New Issue',
	description: 'Add new issue',
};

export default NewIssuePage;
