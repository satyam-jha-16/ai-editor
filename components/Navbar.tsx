import React from 'react'
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccount from "./UserAccount";
import MaxWidthWrapper from './MaxWidthWrapper';

interface Props {

}

const Navbar: React.FC<Props> = async () => {

    const { getUser } = getKindeServerSession()

    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL;

    return (
        <header className="sticky z-[80] h-14 inset-x-0 top-0 w-full border-none dark:border-b dark:border-border bg-black/50 backdrop-blur-lg dark:bg-black/50 transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center text-lg justify-between border-none dark:border-b dark:border-border ">
                    <Link href="/" className="flex z-40 text-blue-500 font-semibold">
                        AI <span className="text-primary">Editor</span>
                    </Link>

                    <div className="flex items-center space-x-4 h-full">
                        {user ? (
                            <>
                                <Link href="/dashboard" className={buttonVariants({ size: "sm", className: "hidden sm:flex items-center gap-1" })}>
                                    Create Design
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Link>
                                <UserAccount user={user} />
                            </>
                        ) : (
                            <>

                                <Link href="/api/auth/register" className={buttonVariants({ size: "sm", className: "bg-blue-500 hover:bg-blue-600 text-white dark:text-black" })} >
                                    Sign up
                                </Link>

                                <Link href="/api/auth/login" className={buttonVariants({ size: "sm", className: "bg-blue-500 hover:bg-blue-600 text-white dark:text-black" })}>
                                    Login
                                </Link>
                                <div className="h-6 w-px bg-border"></div>
                                <Link href="/dashboard" className={buttonVariants({ size: "sm", className: "hidden sm:flex items-center gap-1" })}>
                                    Create Design
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    )
}

export default Navbar