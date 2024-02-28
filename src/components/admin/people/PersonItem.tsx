import { PersonComplete } from "@/types/PersonComplete";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ItemButton } from "../ItemButton";
import * as api from "@/api/admin";

type Props = {
    item: PersonComplete,
    refreshAction: () => void,
    onEdit: (person: PersonComplete) => void
}

export const PersonItem = ({ item, refreshAction, onEdit }: Props) => {

    const handleDeleteButton = async () => {
        if(confirm("Tem Certeza que Deseja excluir este Pessoa?")) {
            await api.deletePerson(item.id_event, item.id_group, item.id);
            refreshAction();
        }
    }

    return (
        <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">

            <div className="flex-1">{item.name} CPF: ({item.cpf})</div>         

            <ItemButton 
                IconElement={FaRegEdit}
                onClick={() => onEdit(item)}
            />

            <ItemButton 
                IconElement={FaRegTrashAlt}
                onClick={handleDeleteButton}
            />
        </div>
    );
}

export const PersonItemPlaceHolder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
    )
}

export const PersonItemNotFound = () => {
    return (
        <div className="text-center  py-4 text-gray-400">Não Há Pessoas Cadastradas Neste Grupo</div>
    )    
}   