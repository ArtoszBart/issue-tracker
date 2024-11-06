import { CommentWithUser } from '@/models/comment';
import { Box, Heading, Text } from '@radix-ui/themes';
import Comment from './Comment';

interface IProps {
	comments: CommentWithUser[];
}

const IssueComments = ({ comments }: IProps) => {
	return (
		<Box className='space-y-5 flex flex-col'>
			<Heading size='4' as='h2'>
				Comments
			</Heading>
			{comments.length > 1 ? (
				comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))
			) : (
				<Text className='text-center'>
					There are currently no comments. Be the first to share your
					thoughts!
				</Text>
			)}
		</Box>
	);
};

export default IssueComments;
