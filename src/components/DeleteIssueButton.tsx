import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

interface IProps {
	issueId: number;
}

const DeleteIssueButton = ({ issueId }: IProps) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color='red'>
					<TrashIcon />
					Delete Issue
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content maxWidth='450px'>
				<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
				<AlertDialog.Description size='2'>
					Are you sure you want to delete this issue? This action
					cannot be undone.
				</AlertDialog.Description>

				<Flex gap='3' mt='4' justify='end'>
					<AlertDialog.Cancel>
						<Button variant='soft' color='gray'>
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button color='red'>Delete Issue</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

export default DeleteIssueButton;
