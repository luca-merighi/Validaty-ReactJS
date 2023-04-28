import {FiPlus} from 'react-icons/fi'

interface HeaderProps {
    onClick: () => void
}

export default function Header(props: HeaderProps) {
    return (
        <header className="
            fixed z-10 top-0 left-0 w-full
            flex items-center justify-center
            bg-emerald-500 p-8">
            <div className="
                flex items-center justify-between
                w-full max-w-screen-xl">
                <div className="flex items-center gap-2">
                    <img 
                    src="/calendar.svg" 
                    alt="Calendário"
                    className="w-10" />
                    <h1 className="
                        text-3xl text-slate-100 font-bold">
                        Validaty
                    </h1>
                </div>

                <button
                type="button"
                onClick={props.onClick}
                className="
                    flex gap-2 items-center justify-center
                    bg-emerald-600 h-12 px-4
                    text-lg text-slate-100 font-medium
                    border-2 border-emerald-600 rounded-full transition-colors
                    hover:bg-slate-100 hover:text-emerald-600
                    focus:outline-none focus:border-slate-800 focus:bg-slate-100 focus:text-emerald-600">
                    <FiPlus />
                    Adicionar Produto
                </button>
            </div>
        </header>
    )
}