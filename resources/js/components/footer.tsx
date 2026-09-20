import FooterLink from '@/components/footer-link';
import { Separator } from '@/components/ui/separator';
import { FaEnvelope, FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

export default function Footer() {
    return (
        <footer>
            <Separator />
            <div className="flex flex-col items-center justify-between gap-4 p-4 lg:flex-row">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                    <p className="text-xs italic">
                        Developed by Afif Rohul · &copy;{' '}
                        {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <FooterLink
                            link="https://afifrohul.vercel.app/"
                            icon={<FaGlobe />}
                        />
                        <FooterLink
                            link="https://www.instagram.com/afif.rohul/"
                            icon={<RiInstagramFill />}
                        />
                        <FooterLink
                            link="https://www.linkedin.com/in/afifrohul/"
                            icon={<FaLinkedin />}
                        />
                        <FooterLink
                            link="https://github.com/afifrohul"
                            icon={<FaGithub />}
                        />
                        <FooterLink
                            link="mailto:afifmemyself22@gmail.com"
                            icon={<FaEnvelope />}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
