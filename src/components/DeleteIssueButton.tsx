import { Button } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

interface IProps {
	issueId: number;
}

const DeleteIssueButton = ({ issueId }: IProps) => {
	return (
		<Button color='red'>
			<TrashIcon />
			Delete Issue
		</Button>
	);
};

export default DeleteIssueButton;
