import IssueForm from '@/components/forms/IssueForm';
import { getIssue } from '@/repository/issueRepository';
import { notFound } from 'next/navigation';

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
