import IIssue from '@/models/issue';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUsers from '@/data/useUsers';

const useAssigneeSelect = (issue: IIssue) => {
	const { data: users, error, isLoading } = useUsers();
	const router = useRouter();

	const assignIssue = (userId: string) => {
		axios
			.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: userId === 'unassigned' ? null : userId,
			})
			.then(() => {
				toast.success('Changes are saved.');
				router.refresh();
			})
			.catch(() => {
				toast.error('Changes could not be saved.');
			});
	};

	return { users, error, isLoading, assignIssue };
};

export default useAssigneeSelect;
