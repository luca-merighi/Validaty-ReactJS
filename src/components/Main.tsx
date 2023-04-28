import { useProductsTable } from '@/hooks/products'

import ValidityTable from './ValidityTable'

export default function Main() {
    const {productsTable} = useProductsTable()    

    return (
        <main className="
            pt-[10rem] pb-8
            flex items-center justify-center h-full">
            <section className="
                p-4 
                flex flex-col gap-8 
                w-full h-full max-w-screen-xl">
                {productsTable.map(productTable => (
                    <ValidityTable
                        key={productTable.id}
                        id={productTable.id}
                        validityDate={productTable.date} />
                ))}
            </section>
        </main>
    )
}