import { Group } from "@/types/Group";
import { useEffect, useState } from "react";
import * as api from "@/api/admin";
import { GroupItemNotFound, GroupItemPlaceHolder } from "../groups/GroupItem";
import { PersonComplete } from "@/types/PersonComplete";
import { PersonItem, PersonItemNotFound, PersonItemPlaceHolder } from "./PersonItem";
import { PersonAdd } from "./PersonAdd";
import { Person } from "@/types/Person";
import { PersonEdit } from "./PersonEdit";

type Props = {
    eventId: number
}

export const EventTabPeople = ({ eventId }: Props) => {

    //* Groups

    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [groupLoading, setGroupLoading] = useState(true);

    const loadGroups = async () => {
        setSelectedGroupId(0);
        setGroupLoading(true);
        const groupList = await api.getGroups(eventId);
        setGroupLoading(false);
        setGroups(groupList);
    }

    useEffect(() => {
        loadGroups();
    }, []);

    //* People

    const [people, setPeople] = useState<PersonComplete[]>([]);
    const [peopleLoading, setPeopleLoading] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<PersonComplete>()
    
    const loadPeople = async () => {
        setSelectedPerson(undefined);
        if (selectedGroupId <= 0) return;
        setPeopleLoading(true);
        const peopleList = await api.getPeople(eventId, selectedGroupId);
        setPeopleLoading(false);
        setPeople(peopleList);
    }

    const handleEditButton = (person: PersonComplete) => {
        setSelectedPerson(person);
    }

    useEffect(() => {
        loadPeople();
    }, [selectedGroupId]);

    return (
        <div>
            <div className="my-3">
                {!groupLoading && groups.length > 0 && 
                    <select
                        onChange={e => setSelectedGroupId(parseInt(e.target.value))}
                        className="w-full bg-transparent text-white text-xl p-3 outline-none"
                    >
                    <option value="0">Selecione um Grupo</option>
                    {groups.map(item => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
                }
                
                {groupLoading && 
                    <>
                        <GroupItemPlaceHolder/>
                        <GroupItemPlaceHolder/>
                        <GroupItemPlaceHolder/>
                    </>
                }
                {!groupLoading && groups.length ===  0 && people.length === 0 && <GroupItemNotFound />}
            </div>

            {selectedGroupId > 0 &&
                <div className="border border-dashed p-3 my-3">
                    {!selectedPerson && 
                        <PersonAdd 
                            eventId={eventId} groupId={selectedGroupId} refreshAction={loadPeople}
                        />
                    }
                    {selectedPerson &&
                        <PersonEdit person={selectedPerson} refreshAction={loadPeople} />
                    }
                </div>                
            }
            {!peopleLoading && people.length > 0 &&
                people.map(item => (
                    <PersonItem
                        key={item.id}
                        item={item}
                        refreshAction={loadPeople}
                        onEdit={handleEditButton}
                    />
                ))
            }
            {peopleLoading &&
                <>
                    <PersonItemPlaceHolder />
                    <PersonItemPlaceHolder/>
                    <PersonItemPlaceHolder />
                </>
            }
            {!peopleLoading && groups.length > 0 && people.length === 0 && <PersonItemNotFound />}
        </div>
    );
}