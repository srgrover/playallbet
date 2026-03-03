'use client'

import { login } from "@/actions";
import { Button } from "@/components";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";

interface Props {
    provider: string;
    icon: React.ReactNode;
}

export const ButtonProvider = ({ provider, icon }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const tryToLogin = async () => {
        setLoading(true);
        await login(provider)
    }

    return (
        <Button
            color="blue"
            variant="default"
            size="sm"
            onClick={ async() => { await tryToLogin() } }
            type="button">
            { !loading ? icon : <BiLoader size={20} className="animate-spin" /> }
            Continue with { provider.toWellFormed() }
        </Button>
    )
}