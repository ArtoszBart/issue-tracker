import IIssue from '@/models/issue';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';

const useStatusSelect = (issue: IIssue) => {
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
