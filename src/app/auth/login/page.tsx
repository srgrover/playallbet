'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LoginForm } from "./ui/LoginForm";

export default function Login() {
    const { data: session } = useSession();

    if(session) redirect('/home')
    return (
        <div className="flex min-w-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    )
}