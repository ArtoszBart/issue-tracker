import PlaceholderImage from '@/assets/placeholder.png';
import { getIssues } from '@/repository/issueRepository';
import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusBadge from './IssueStatusBadge';

const LatestIssues = async () => {
	const issues = await getIssues({ take: 5, assignedToUser: true });

	return (
		<Card>
			<Heading size='4' mb='5'>
				Latest Issues
			</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell className='hover:bg-light-hover transition-colors duration-300 p-0'>
								<Link href={`/issues/${issue.id}`}>
									<Flex
										justify='between'
										align='center'
										className='p-3'
									>
										<Flex
											direction='column'
											align='start'
											gap='2'
										>
											<Text>{issue.title}</Text>
											<IssueStatusBadge
												status={issue.status}
											/>
										</Flex>
										{issue.assignedToUserId && (
											<Avatar
												src={
													issue.assignedToUser!
														.image! ||
													PlaceholderImage.src
												}
												fallback='?'
												size='2'
												radius='full'
											/>
										)}
									</Flex>
								</Link>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssues;
