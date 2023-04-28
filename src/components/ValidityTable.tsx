import { useState } from 'react'
import {FiChevronDown, FiChevronUp, FiCheck, FiCheckCircle, FiTrash} from 'react-icons/fi'
import {AiFillWarning} from 'react-icons/ai'
import { useProductsTable } from '@/hooks/products'
import { useDate } from '@/hooks/date'

interface Product {
    id: number,
    name: string,
    sold: boolean,
    code: string,
    quantity: number,
    date?: string
}

interface ValidityTableProps {
    id: number,
    validityDate: string,
}

export default function ValidityTable(props: ValidityTableProps) {
    const [tableOpen, setTableOpen] = useState(false)
    const {deleteProductTable, changeProductAvaliability, deleteProduct, products} = useProductsTable()   
    const {modifiedDate} = useDate()

    function changeTableLayout() {
        tableOpen === false ? setTableOpen(true) : setTableOpen(false)
    }

    async function changeProductWhenSold(product: Product) {
        changeProductAvaliability(product)
    }

    return (
        <div className="flex flex-col gap-6 bg-gray-200">
            <header 
            onClick={changeTableLayout}
            className={`
                ${tableOpen === false ? '' : 'border-b-2 border-gray-400/50'}
                ${modifiedDate == props.validityDate ? 'bg-red-200 hover:bg-red-300' : 'bg-transparent'}
                flex items-center justify-between
                p-4 cursor-pointer group/header transition-all
                hover:bg-gray-300
            `}>
                <h3 className={`
                flex gap-2 items-center
                ${modifiedDate == props.validityDate ? 'text-red-500' : 'text-slate-800'}
                text-3xl font-bold cursor-pointer`}>
                    {tableOpen === false ? (
                        <FiChevronDown />
                    ) : (
                        <FiChevronUp />
                    )}
                    Vencimento: {props.validityDate}
                    {modifiedDate == props.validityDate ? (
                        <AiFillWarning title="Produtos próximos ao vencimento" />
                    ) : false}
                </h3>

                <button 
                    type="button"
                    title="Deletar tabela"
                    onClick={() => deleteProductTable(props.id, props.validityDate)}
                    className="p-1 text-2xl text-red-500 hover:bg-red-100/50 rounded-full opacity-0 group-hover/header:opacity-100 transition-colors">
                    <FiTrash />
                </button>
            </header>

            <table className={`
                ${tableOpen === false ? 'hidden' : 'table'}
                w-full border-spacing-y-0 border-spacing-x-2`}>
                <thead>
                    <tr className="text-slate-700 text-xl">
                        <th className="p-4 text-left pl-4">Nome</th>
                        <th className="p-4 text-center">Data</th>
                        <th className="p-4 text-center">Código</th>
                        <th className="p-4 text-center">Quantidade</th>
                        <th className="p-4 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-slate-700 text-lg">
                    {products.map(product => {
                        if(product.date == props.validityDate) {
                            return (
                                <tr className="odd:bg-gray-300 group/tr" key={product.id}>
                                    <td className="p-2 text-left pl-4 flex gap-4">
                                        <span className={`${product.sold == true ? 'line-through text-slate-700/50' : ''}`}>
                                            {product.name} 
                                        </span>
                                        {product.sold == true ? (
                                            <span className="flex gap-2 items-center no-underline text-emerald-500 font-medium">
                                                <FiCheckCircle /> Produto Vendido! 
                                            </span>
                                        ) : false}
                                    </td>
                                    <td className="p-2 text-center">{product.date}</td>
                                    <td className="p-2 text-center">{product.code}</td>
                                    <td className="p-2 text-center">{product.quantity}</td>
                                    <td className="
                                        opacity-0
                                        p-2 text-2xl text-center 
                                        flex gap-2 items-center justify-center
                                        transition-opacity group-hover/tr:opacity-100">
                                        <button 
                                        type="button"
                                        title="Marcar produto como vendido"
                                        onClick={() => changeProductWhenSold(product)}
                                        className="p-1 text-emerald-500 hover:bg-emerald-100/50 rounded-full transition-colors">
                                            <FiCheck />
                                        </button>
                                        <button 
                                        type="button"
                                        title="Deletar produto"
                                        onClick={() => deleteProduct(product.id)}
                                        className="p-1 text-red-500 hover:bg-red-100/50 rounded-full transition-colors">
                                            <FiTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}