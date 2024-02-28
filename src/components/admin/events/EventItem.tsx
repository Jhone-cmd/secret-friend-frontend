"use client"

import { ItemButton } from "@/components/admin/ItemButton"
import { Event } from "@/types/Event";
import { FaLink, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as api from "../../../api/admin";

type Props = {
    item: Event,
    refreshAction: () => void,
    openModal: (event: Event) => void
}

export const EventItem = ({ item, refreshAction, openModal }: Props) => {
    
    const handleEditButton = () => openModal(item)

    const handleDeleteButton = async () => {
        if(confirm(`Tem Certeza Que Deseja Excluir Este Evento - ${item.title}`)) {
            await api.deleteEvent(item.id)
            refreshAction();
        }
    }

    return (
        <div className="border border-gray-700 rounded p-3 mb-3 flex flex-col items-center md:flex-row">
            <div className="flex-1 text-xl md:text-base">{item.title}</div>
            <div className="flex items-center gap-1 md:mt-0">
                {item.status === true &&
                    <div className="border border-dashed border-white rounded">
                        <ItemButton 
                            IconElement={FaLink}
                            label="Link do Evento"
                            href={`/event/${item.id}`}
                            target="_blank" 
                        />
                    </div>
                }
                <ItemButton 
                    IconElement={FaRegEdit}
                    label="Editar"
                    onClick={handleEditButton}
                />              

                <ItemButton 
                    IconElement={FaRegTrashAlt}
                    label="Excluir"
                    onClick={handleDeleteButton}
                />
            </div>
        </div>
    )
}

export const EventItemPlaceHolder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
    )
}

export const EventItemNotFound = () => {
    return (
        <div className="text-center  py-4 text-gray-400">Não Há Eventos Cadastrados</div>
    )    
}   