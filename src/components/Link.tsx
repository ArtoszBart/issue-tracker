import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface IProps {
	href: string;
	children: ReactNode;
}

const Link = ({ href, children }: IProps) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink>{children}</RadixLink>
		</NextLink>
	);
};

export default Link;
