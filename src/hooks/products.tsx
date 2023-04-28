import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import api from '@/services/api'

interface Products {
    id: number,
    name: string,
    sold: boolean,
    code: string,
    quantity: number,
    date?: string
}

type CreateProduct = Omit<Products, 'id' | 'sold'>

interface ProductsTable {
    id: number,
    date: string,
}

interface ProductsContextData {
    productsTable: ProductsTable[],
    products: Products[],
    deleteProductTable: (id: number, date?: string) => void,
    addProduct: (product: CreateProduct) => void,
    changeProductAvaliability: (product: Products) => void,
    deleteProduct: (id: number) => void
}

interface ProductsProviderProps {
    children: ReactNode
}

const ProductsContext = createContext<ProductsContextData>(
    {} as ProductsContextData
)

export function ProductsProvider(props: ProductsProviderProps) {
    const [productsTable, setProductsTable] = useState<ProductsTable[]>([])
    const [products, setProducts] = useState<Products[]>([])

    async function deleteProductTable(id: number, date?: string) {
        const deleteProductList = await api.get('/products/')
        const newList = deleteProductList.data
        newList.map((product: Products) => {
            if(product.date == date) {
                api.delete('/products/' + product.id)
            }
        })
        await api.delete('/productsTable/' + id)

        const productsTable = await api.get('/productsTable')
        setProductsTable(productsTable.data)

        const products = await api.get('/products')
        setProducts(products.data)
    }

    async function addProduct(product: CreateProduct) {
        const newProduct = {
            id: products[products.length - 1] ? products[products.length - 1].id + 1 : 1,
            sold: false,
            ...product
        }

        const newProductTable = {
            id: productsTable[productsTable.length - 1] ? productsTable[productsTable.length - 1].id + 1 : 1,
            date: product.date
        } 
        
        const productTableList = await api.get('/productsTable/' + '?date=' + newProduct.date)
        const response = productTableList.data
        if(response.length == 1) {
            await api.post('/products/', newProduct)
            setProducts([...products, newProduct])
        } else if(response.length == 0) {
            await api.post('/productsTable/', newProductTable)
            await api.post('/products/', newProduct)

            const products = await api.get('/products')
            setProducts(products.data)

            const productsTable = await api.get('/productsTable')
            setProductsTable(productsTable.data)
        }
    }

    async function changeProductAvaliability(product: Products, date?: string) {
        await api.put('/products/' + product.id, {
            ...product,
            sold: !product.sold
        })
        const products = await api.get('/products')
        setProducts(products.data)
    }

    async function deleteProduct(id: number) {
        await api.delete('/products/' + id)
        const newProductsList = products.filter(product => product.id !== id)
        setProducts(newProductsList)
    }

    useEffect(() => {
        async function loadProductsTable() {
            const productsTable = await api.get('/productsTable')
            setProductsTable(productsTable.data)
        }
        loadProductsTable()
    }, [])

    useEffect(() => {
        async function loadProducts() {
            const products = await api.get('/products')
            setProducts(products.data)
        }
        loadProducts()
    }, [])
    
    return (
        <ProductsContext.Provider value={{
            productsTable,
            products,
            deleteProductTable,
            addProduct,
            changeProductAvaliability,
            deleteProduct
        }}>
            {props.children}
        </ProductsContext.Provider>
    )
}

export function useProductsTable() {
    const context = useContext(ProductsContext)
    return context
}