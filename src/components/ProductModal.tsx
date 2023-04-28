import { useState } from 'react'
import Modal from 'react-modal'
import {FiX, FiCheck} from 'react-icons/fi'
import ModalInput from './ModalInput'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useProductsTable } from '@/hooks/products'

interface ProductModalProps {
    isOpen: boolean,
    onRequestClose: () => void
}

export default function ProductModal(props: ProductModalProps) {
    const {addProduct} = useProductsTable()
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [date, setDate] = useState('')

    async function handleAddProduct() {
        const product = {
            name,
            code,
            quantity,
            date
        }
        
        if(name === '') {
            toast.error('Por favor adicione um nome')
        } else if(code === '') {
            toast.error('Por favor adicione um código')
        } else if(quantity <= 0) {
            toast.error('Por favor adicione uma quantidade')
        } else if(date === '') {
            toast.error('Por favor adicione uma data')
        } else {
            await addProduct(product)
            closeModal()
        }
    }

    function closeModal() {
        setName('')
        setCode('')
        setQuantity(0)
        setDate('')

        props.onRequestClose()
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={closeModal}
            overlayClassName="
                fixed z-10 top-0 right-0 bottom-0 left-0
                bg-slate-900/25
                flex items-center justify-center"
            className="
                relative w-full max-w-[425px]
                flex flex-col gap-6
                p-12 bg-gray-100 rounded-md
            ">
            <ToastContainer theme="dark" />
            <button 
            type="button"
            onClick={closeModal}
            className="
                absolute top-4 right-4
                flex items-center justify-center
                text-2xl text-slate-800 transition-colors
                hover:text-red-500 focus:text-red-500 focus:outline-none">
                <FiX />
            </button>

            <h2 className="
                text-2xl text-slate-700 font-medium">
                Adicionar Produto
            </h2>

            <ModalInput
                type="text"
                placeholder="Nome do produto"
                value={name}
                changeValue={setName} />

            <ModalInput
                type="number"
                placeholder="Código do produto"
                value={code}
                changeValue={setCode} />

            <ModalInput
                type="number"
                placeholder="Quantidade"
                value={quantity}
                changeValue={setQuantity} />
            
            <ModalInput
                type="text"
                placeholder="Data de validade"
                value={date}
                changeValue={setDate} />

            <button 
            type="button"
            onClick={handleAddProduct}
            className="
                h-16 px-4
                flex gap-2 items-center justify-center
                text-xl text-slate-100 font-medium
                bg-emerald-500
                border-2 border-emerald-500 rounded-full transition-colors
                hover:bg-slate-100 hover:text-emerald-600
                focus:outline-none focus:bg-slate-100 focus:text-emerald-600">
                Salvar
                <FiCheck />
            </button>
        </Modal>
    )
}