import { Separator } from '@/components/ui/separator';
import { FaGlobe } from "react-icons/fa";
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

export default function Footer() {
    return (
        <footer>
            <Separator />
            <div className="flex flex-col items-center justify-between gap-4 p-4 lg:flex-row">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                    <p className="text-xs italic">
                        Built by Afif Rohul · &copy; {new Date().getFullYear()}{' '}
                        All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <a
                            href="https://afifrohul.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 transition-all duration-150 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                            <FaGlobe />
                        </a>
                        <a
                            href="https://www.instagram.com/afif.rohul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 transition-all duration-150 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                            <RiInstagramFill />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/afifrohul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 transition-all duration-150 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/afifrohul"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 transition-all duration-150 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="mailto:afifmemyself22@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 transition-all duration-150 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
