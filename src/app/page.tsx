import Pagination from '@/components/Pagination';

interface IProps {
	searchParams: { page: string };
}

export default function Home({ searchParams: { page } }: IProps) {
	return (
		<Pagination itemCount={100} pageSize={10} currentPage={Number(page)} />
	);
}
