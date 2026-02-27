'use client'

import { login } from "@/actions";
import { BrandButton } from "@/components/ui/brand-button/BrandButton";
import { useState } from "react";

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

    console.log('PROVIDER',provider)

    return (
        <BrandButton
            text={`Continue with ${provider.toWellFormed() }`}
            disabled={ loading }
        />
    )
}