import { useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import *  as api from "../../../api/admin";

type Props = {
    refreshAction: () => void
}

export const EventAdd = ({ refreshAction }: Props) => {

    const [titleField, setTitleField] = useState("");
    const [descriptionField, setDescriptionField] = useState("");
    const [groupedField, setGroupedField] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([])
    const [loading, setLoading] = useState(false)

    const eventSchema = z.object({
        titleField: z.string().min(1, "Preencha o título"),
        descriptionField: z.string().min(1, "Preecha a descrição"),
        groupedField: z.boolean(),
    });

    const handleAddButton = async () => {

        setErrors([])
        const data = eventSchema.safeParse({ titleField, descriptionField, groupedField });
        if(!data.success) return setErrors(getErrorFromZod(data.error))
        
        setLoading(true)
        const newEvent = await api.addEvent({
            title: titleField,
            description: descriptionField,
            grouped: groupedField,
        });
        
        setLoading(false);        
        if(newEvent) {
            refreshAction();
        } else {
            alert("Erro ao Adicionar o Evento");
        }
    }

    return (
        <div>
            <div className="mb-5">
                <label>Título</label>
                <InputField
                    value={titleField}
                    onChange={e => setTitleField(e.target.value)}
                    placeholder="Digite o título do Evento"
                    errorMessage={errors.find(item => item.field === "titleField")?.message}  
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescriptionField(e.target.value)}
                    placeholder="Digite a descrição do Evento"    
                    errorMessage={errors.find(item => item.field === "descriptionField")?.message}  
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Agrupar Sorteio?</label>
                    <input 
                            type="checkbox"
                            checked={groupedField}
                            onChange={e => setGroupedField(!groupedField)}
                            disabled={loading}
                            className="block w5 h-5 mt-3"
                    />
    
                <div>
                    <Button
                        value={loading ? "Adicinando..." : "Adicionar"}
                        onClick={handleAddButton}
                        disabled={loading}
                    />   
                </div>    
            </div>
        </div>
    );
}