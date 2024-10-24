import IssueFormSkeleton from '@/components/forms/IssueFormSkeleton';
import dynamic from 'next/dynamic';
const IssueForm = dynamic(() => import('@/components/forms/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
	return <IssueForm />;
};

export default NewIssuePage;
