import { ICommentUser } from '@/models/comment';
import { Heading, Box } from '@radix-ui/themes';
import Comment from './Comment';

interface IProps {
	comments: ICommentUser[] | undefined;
}

const IssueComments = ({ comments }: IProps) => {
	return (
		<Box className='space-y-5'>
			<Heading size='4' as='h2'>
				Comments
			</Heading>
			{comments?.map((comment) => (
				<Comment key={comment.id} comment={comment} />
			))}
		</Box>
	);
};

export default IssueComments;