"use client"

import { InputField } from "@/components/admin/InputField";
import { useState } from "react";
import { Button } from "../../../components/admin/Button";
import * as api from "../../../api/admin";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Page = () => {

    const router = useRouter();
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');

    const handleLoginButton = async () => {

        if(passwordInput) {
            setWarning('')
            setLoading(true)
            const token = await api.login(passwordInput);
            setLoading(false)

            if(!token) {
                setWarning("Acesso Negado!")
            } else {
                setCookie("token", token)
                router.push("/admin")
            }
        }
    } 

    return (
        <div className="text-center py-4">
            <p className="text-lg">Qual a Senha?</p>
            <div className="mx-auto max-w-lg">
                <InputField 
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="Digite a Senha"
                    disabled={loading}
                />

                <Button
                    value={loading ? "Loading..." : "Entrar"}
                    onClick={handleLoginButton}
                    disabled={loading}
                />

                {warning && <div className="border border-dashed border-red-500 text-red-500 p-3">{warning}</div>}
            </div>
            
            <div className="p-10 flex items-center justify-center">
                    <footer className="mt-5 text-sm">Criado pela B7Web ©</footer>
            </div>

        </div>        
    );
}

export default Page;