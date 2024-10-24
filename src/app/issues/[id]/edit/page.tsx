import { getIssue } from '@/repository/issueRepository';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '@/components/forms/IssueFormSkeleton';
const IssueForm = dynamic(() => import('@/components/forms/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

interface IProps {
	params: { id: string };
}

const EditIssuePage = async ({ params }: IProps) => {
	const id = Number(params.id);
	if (isNaN(id)) notFound();

	const issue = await getIssue(id);
	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
