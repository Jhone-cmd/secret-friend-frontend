type Props = {
    value: string
    onClick: () => void
    disabled?: boolean
}
  
export const Button = ({ value, onClick, disabled }: Props) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full my-3 p-3 rounded text-center bg-gray-700 text-white uppercase font-bold
            hover:bg-gray-600
            border-b-4 border-white/10 ${disabled ? "disabled:bg-gradient-to-r from-gray-600 to-gray-750 animate-pulse": "bg-gray-700" }`}
            disabled={disabled}
        >{value}</button>
    );    
}