interface ModalInputProps {
    type: 'text' | 'number'
    placeholder: string,
    value: any,
    changeValue?: (newValue: any) => void 
}

export default function ModalInput(props: ModalInputProps) {
    return (    
        <input 
            type={props.type} 
            placeholder={props.placeholder}
            required
            value={props.value}
            onChange={e => props.changeValue?.(e.target.value)}
            className="
                h-12 px-4 bg-gray-200
                text-xl text-slate-700
                border-2 border-gray-500 rounded-md transition-colors
                focus:outline-none focus:border-emerald-500 focus:bg-gray-200/50" />
    )   
}