import { Group } from "@/types/Group";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import * as api from "@/api/admin";

type Props = {
    group: Group,
    refreshAction: () => void
}

export const GroupEdit = ({ group, refreshAction }: Props) => {

    const [nameField, setNameField] = useState(group.name);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const groupSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome do grupo")
    })

    useEffect(() => {
        setErrors([]);
        const data = groupSchema.safeParse({ nameField });
        if(!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField])

    const handleSaveButton = async () => {
        if(errors.length > 0 ) return;

        setLoading(true)
        const updatedGroup = await api.updateGroup(group.id_event, group.id,
            { name: nameField }
        )

        setLoading(false)
        if(updatedGroup) {
            refreshAction()
        } else {
            alert("Ocorreu algum erro ao Editar este Grupo.")
        }
    }


    return (
        <div>
            <h4 className="text-xl">Editar Grupo</h4>
            <InputField
                type="text"
                value={nameField}
                placeholder="Digite o nome do grupo"
                onChange={e => setNameField(e.target.value)}
                errorMessage={errors.find(item => item.field === 'name')?.message}
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