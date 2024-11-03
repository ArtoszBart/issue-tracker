'use client';

import { Text } from '@radix-ui/themes';
import { useState } from 'react';

interface IProps {
	children: string;
}

const ExpandableText = ({ children }: IProps) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const limit = 300;

	if (!children) return null;

	if (children.length <= limit) return <Text>{children}</Text>;

	const summary = isExpanded
		? children
		: children.substring(0, limit) + '...';

	return (
		<Text>
			{summary}
			<span
				className='ml-1 text-accent cursor-pointer hover:underline'
				onClick={() => setIsExpanded((prev) => !prev)}
			>
				{isExpanded ? 'Show less' : 'Read more'}
			</span>
		</Text>
	);
};

export default ExpandableText;
