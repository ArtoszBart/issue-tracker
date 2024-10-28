import { getIssue } from '@/repository/issueRepository';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '@/components/forms/IssueFormSkeleton';
import { cache } from 'react';
const IssueForm = dynamic(() => import('@/components/forms/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

interface IProps {
	params: { id: string };
}

const fetchIssue = cache((issueId: number) => getIssue(issueId));

const EditIssuePage = async ({ params }: IProps) => {
	const id = Number(params.id);
	if (isNaN(id)) notFound();

	const issue = await fetchIssue(id);
	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: IProps) {
	const issue = await fetchIssue(Number(params.id));

	return {
		title: 'Edit Issue: ' + issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
}

export default EditIssuePage;
