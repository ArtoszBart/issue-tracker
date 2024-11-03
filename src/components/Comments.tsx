import IComment from '@/models/comment';
import { Heading, Box } from '@radix-ui/themes';
import Comment from './Comment';

interface IProps {
	comments: IComment[] | undefined;
}

const Comments = ({ comments }: IProps) => {
	return (
		<Box className='space-y-5'>
			<Heading as='h2'>Comments</Heading>
			{comments?.map((comment) => (
				<Comment comment={comment} />
			))}
		</Box>
	);
};

export default Comments;
