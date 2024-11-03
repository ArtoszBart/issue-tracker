import { useQuery } from '@tanstack/react-query';
import User from '@/models/user';
import axios from 'axios';

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then((res) => res.data),
		staleTime: 60 * 60 * 1000,
		retry: 2,
	});

export default useUsers;
