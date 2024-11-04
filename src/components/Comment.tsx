import { ICommentUser } from '@/models/comment';
import { getStringDate } from '@/utils/dateTime';
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import ExpandableText from './ExpandableText';
import PlaceholderImage from '@/assets/placeholder.png';

interface IProps {
	comment: ICommentUser;
}

const Comment = ({ comment }: IProps) => {
	return (
		<Box>
			<Text className='text-sm'>
				<Text className='font-semibold'>
					{comment.author.name || 'Unknown user'}
				</Text>{' '}
				commented on {getStringDate(comment.createdAt)}
			</Text>
			<Flex className='w-full gap-4'>
				<Box className='pt-2.5'>
					<Avatar
						src={comment.author.image! || PlaceholderImage.src}
						fallback='?'
						size='2'
						radius='full'
					/>
				</Box>
				<Card className='prose max-w-full'>
					<ExpandableText>{comment.content}</ExpandableText>
				</Card>
			</Flex>
		</Box>
	);
};

export default Comment;
