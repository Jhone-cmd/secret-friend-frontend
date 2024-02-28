import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useState } from "react"
import { z } from "zod";
import { Button } from "../Button";
import { InputField } from "../InputField";
import * as api from "@/api/admin";
import { escapeCPF } from "@/utils/escapeCPF";

type Props = {
    eventId: number,
    groupId: number,
    refreshAction: () => void
}

export const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {

    const [nameField, setNameField] = useState("");
    const [cpfField, setCpfField] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const personSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome da pessoa"),
        cpfField: z.string().length(11, "CPF Inválido")
    });

    const handleAddButton = async () => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setLoading(true);
        const newPerson = await api.addPerson(
            eventId, groupId, 
            {
                name: nameField,
                cpf: cpfField
            }
        );

        setLoading(false);
        if(newPerson) {
            setNameField("");
            setCpfField("");
            refreshAction()
        } else {
            alert("Erro ao adicionar a pessoa");
        }

    }
    return (
        <div>
            <h4 className="text-xl">Nova Pessoa</h4>
            <InputField 
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome da Pessoa"
                errorMessage={errors.find(item => item.field === "nameField")?.message}
                disabled={loading}
            />

            <InputField 
                value={cpfField}
                onChange={e => setCpfField(escapeCPF(e.target.value))}
                placeholder="Digite o CPF da Pessoa"
                errorMessage={errors.find(item => item.field === "cpfField")?.message}
                disabled={loading}
            />

            <div>
                <Button
                    value={loading ? "Adicinando..." : "Adicionar"}
                    onClick={handleAddButton}
                />
            </div>
        </div>
    );
}