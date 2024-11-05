import Issue from '@/models/issue';
import Status from '@/models/status';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const useStatusSelect = (issue: Issue) => {
	const statuses = Object.keys(Status) as Status[];
	const router = useRouter();

	const changeStatus = (status: Status) => {
		axios
			.patch(`/api/issues/${issue.id}`, {
				status: status,
			})
			.then(() => {
				toast.success('Changes are saved.');
				router.refresh();
			})
			.catch(() => {
				toast.error('Changes could not be saved.');
			});
	};

	return { statuses, changeStatus };
};

export default useStatusSelect;
