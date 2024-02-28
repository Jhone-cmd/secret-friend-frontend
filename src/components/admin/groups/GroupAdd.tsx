import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useState } from "react"
import { z } from "zod";
import { InputField } from "../InputField";
import { Button } from "../Button";
import * as api from "../../../api/admin";

type Props = {
    eventId: number,
    refreshAction: () => void,
}

export const GroupAdd = ({ eventId, refreshAction }: Props) => {
    
    const [nameField, setNameField] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([])

    const groupSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome")
    })

    const handleAddButton = async () => {
        
        setErrors([]);
        const data = groupSchema.safeParse({ nameField })
        if(!data.success) return setErrors(getErrorFromZod(data.error))

        setLoading(true);
        const newGroup = await api.addGroup(eventId, {
            name: nameField
        });
        console.log(newGroup)
        setLoading(false);
        if(newGroup) {
            setNameField("")
            refreshAction()
        } else {
            alert("Erro ao adicionar grupo");
        }
    }   
    
    return (
        <div>
            <h4 className="text-xl">Novo Grupo</h4>
            <InputField 
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome do Grupo"
                errorMessage={errors.find(item => item.field === "nameField")?.message}
                disabled={loading}
            />

            <div>
                <Button
                    value={loading ? "Adicinando..." : "Adicionar"}
                    onClick={handleAddButton}
                    disabled={loading}
                />
            </div>
        </div>
    )
}