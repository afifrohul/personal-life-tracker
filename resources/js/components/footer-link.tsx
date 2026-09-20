import type { ReactNode } from 'react';

interface FooterLinkProps {
    link: string;
    icon: ReactNode;
}

export default function FooterLink({ link, icon }: FooterLinkProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-all duration-150 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
        >
            {icon}
        </a>
    );
}
