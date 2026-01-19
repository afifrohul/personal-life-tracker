import { login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex lg:max-w-4xl">
                        <div className="flex rounded-lg border bg-white text-[13px] dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="order-2 p-4 lg:order-1 lg:p-12">
                                    <h1 className="mb-1 font-medium">
                                        Let's get started
                                    </h1>
                                    <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                        <span className="font-medium italic">
                                            Personal Life Tracker
                                        </span>{' '}
                                        is an all-in-one self-management application designed to help track mood, habits, finances, journaling, task and reflection in a single unified system. 
                                    </p>
                                    <ul className="mb-4 flex flex-col">
                                        <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                            <span className="relative bg-white py-1 dark:bg-[#161615]">
                                                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                                </span>
                                            </span>
                                            <span>
                                                Read the
                                                <a
                                                    href="https://github.com/afifrohul/personal-life-tracker/blob/main/README.md"
                                                    target="_blank"
                                                    className="ml-1 inline-flex items-center space-x-1 font-medium text-[#f53003] underline underline-offset-4 dark:text-[#FF4433]"
                                                >
                                                    <span>Documentation</span>
                                                    <svg
                                                        width={10}
                                                        height={11}
                                                        viewBox="0 0 10 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-2.5 w-2.5"
                                                    >
                                                        <path
                                                            d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                            stroke="currentColor"
                                                            strokeLinecap="square"
                                                        />
                                                    </svg>
                                                </a>
                                            </span>
                                        </li>
                                        <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                            <span className="relative bg-white py-1 dark:bg-[#161615]">
                                                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                                </span>
                                            </span>
                                            <span>
                                                Log in with the credentials
                                                provided
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="order-1 flex items-center justify-center rounded-t-md bg-[#F5F5F5] p-6 lg:order-2 lg:rounded-t-none lg:rounded-r-md lg:p-12">
                                    <img
                                        src="/life-tracker.png"
                                        alt="life tracker"
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
