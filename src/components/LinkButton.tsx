import Link from 'next/link';
import { ReactNode } from 'react';

interface IProps {
	href: string;
	children: ReactNode;
}

const LinkButton = ({ href, children }: IProps) => {
	return (
		<Link
			href={href}
			className='rt-reset rt-BaseButton rt-r-size-2 rt-variant-solid rt-Button'
		>
			{children}
		</Link>
	);
};

export default LinkButton;
