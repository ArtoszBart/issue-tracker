import IIssue from '@/models/issue';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import User from '@/models/user';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then((res) => res.data),
		staleTime: 60 * 60 * 1000,
		retry: 2,
	});

export default useAssigneeSelect;
