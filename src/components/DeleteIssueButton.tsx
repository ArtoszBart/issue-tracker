'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from './Spinner';

interface IProps {
	issueId: number;
}

const DeleteIssueButton = ({ issueId }: IProps) => {
	const router = useRouter();
	const [isError, setIsError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteIssue = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/api/issues/${issueId}`);
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setIsError(true);
			setIsDeleting(false);
			console.error(error);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color='red' disabled={isDeleting}>
						{isDeleting ? <Spinner /> : <TrashIcon />}
						Delete Issue
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content maxWidth='450px'>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description size='2'>
						Are you sure you want to delete this issue and all its
						comments? This action cannot be undone.
					</AlertDialog.Description>

					<Flex gap='3' mt='4' justify='end'>
						<AlertDialog.Cancel>
							<Button variant='soft' color='gray'>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color='red' onClick={deleteIssue}>
								Delete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={isError}>
				<AlertDialog.Content maxWidth='450px'>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description size='2'>
						This issue could not be deleted.
					</AlertDialog.Description>
					<Flex gap='3' mt='4' justify='end'>
						<Button
							variant='soft'
							color='gray'
							onClick={() => setIsError(false)}
						>
							OK
						</Button>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
