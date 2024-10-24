import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

interface IProps {
	issueId: number;
}

const EditIssueButton = ({ issueId }: IProps) => {
	return (
		<Button>
			<Pencil1Icon />
			<Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
		</Button>
	);
};

export default EditIssueButton;
