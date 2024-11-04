import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];
	return (
		<ul className='flex space-x-6'>
			{links.map((link) => (
				<li key={link.href} className='cursor-pointer'>
					<Link
						href={link.href}
						className={classNames({
							'nav-link': true,
							'!text-zinc-900': link.href === currentPath,
						})}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
