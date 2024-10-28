import { getIssues } from '@/repository/issueRepository';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import IssueStatusBadge from './IssueStatusBadge';

const LatestIssues = async () => {
	const { issues } = await getIssues({ take: 5, assignedToUser: true });

	return (
		<Card>
			<Heading size='4' mb='5'>
				Latest Issues
			</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex justify='between'>
									<Flex
										direction='column'
										align='start'
										gap='2'
									>
										<Link href={`/issues/${issue.id}`}>
											{issue.title}
										</Link>
										<IssueStatusBadge
											status={issue.status}
										/>
									</Flex>
									{issue.assignedToUserId && (
										<Avatar
											src={issue.assignedToUser?.image!}
											fallback='?'
											size='2'
											radius='full'
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssues;
