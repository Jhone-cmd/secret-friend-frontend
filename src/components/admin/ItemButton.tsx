import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
    IconElement: IconType,
    onClick?: () => void,
    href?: string,
    label?: string,
    target?: string,
    replace?: boolean    
}

export const ItemButton = ({ IconElement, onClick, href, label, target, replace }: Props) => {
    
    const content = (
        <div className="p-3 flex flex-col justify-center items-center gap-2 md:flex-row">
            <div><IconElement/></div>
            {label && <div>{label}</div>}
        </div>
    )

    return (
        <div className="rounded hover:bg-gray-700">
            {href && !onClick &&
                <Link
                    href={href}
                    target={target}
                    replace={replace}
                    >{content}</Link>
            }
            {!href && onClick && <div onClick={onClick} className="cursor-pointer">{content}</div>}
        </div>
    );
}

