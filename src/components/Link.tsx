import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface IProps {
	href: string;
	className?: string;
	children: ReactNode;
}

const Link = ({ href, className, children }: IProps) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink className={className}>{children}</RadixLink>
		</NextLink>
	);
};

export default Link;
