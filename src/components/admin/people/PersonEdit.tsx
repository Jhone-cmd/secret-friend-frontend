import { PersonComplete } from "@/types/PersonComplete";
import * as api from "@/api/admin";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";
import { InputField } from "../InputField";

type Props = {
    person: PersonComplete,
    refreshAction: () => void
}

export const PersonEdit = ({ person, refreshAction }: Props) => {

    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const personSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome da pessoa"),
        cpfField: z.string().length(11, "CPF Inválido")
    });
    
    useEffect(() =>{
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if(!data.success) return setErrors(getErrorFromZod(data.error));
    }, [nameField, cpfField]);

    const handleSaveButton = async () => {
        if(errors.length > 0) return;
        setLoading(true);
        const updatedPerson = await api.updatePerson(
            person.id_event, person.id_group, person.id,
            {
                name: nameField,
                cpf: cpfField
            }
        );

        setLoading(false);
        if(!updatedPerson) {
            refreshAction()
        } else {
            alert("Erro ao atualizar a informação");
        }
    }

    return (
        <div>
            <h4 className="text-xl">Editar Pessoa</h4>
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

            <div className="flex gap-3">

                <Button
                    value="Cancelar"
                    onClick={refreshAction}
                />
                <Button
                    value={loading ? "Salvando..." : "Salvar"}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}