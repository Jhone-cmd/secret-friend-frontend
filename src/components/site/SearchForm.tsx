"use client"

import { escapeCPF } from "@/utils/escapeCPF"
import { useState } from "react"

type Props = {
    onSearchButton: (cpf: string) => void
}

export const SearchForm = ({ onSearchButton }: Props) => {

    const [cpfInput, setCpfInput] = useState("");

    return (
        <div>
            <p className="mb-3 text-xl">Qual o seu CPF?</p>
            <input 
            type="text"
            inputMode="numeric"
            placeholder="Digite o seu CPF"
            value={cpfInput}
            onChange={e => setCpfInput(escapeCPF(e.target.value))} 
            autoFocus
            className="w-full p-3 text-black bg-white text-center text-4xl outline-none rounded-lg"  
            />

            <button className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0 active:border-t-4"
                onClick={() => onSearchButton(cpfInput)}>
                Entrar
            </button>
        </div>
    );
}