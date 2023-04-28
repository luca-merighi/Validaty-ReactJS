import React, { useState } from 'react'
import Head from 'next/head'
import Modal from 'react-modal'
import { ProductsProvider } from '@/hooks/products'

import Header from '@/components/Header'
import Main from '@/components/Main'
import ProductModal from '@/components/ProductModal'
import DateProvider from '@/hooks/date'

Modal.setAppElement('#__next')

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openProductModal() {
    setModalIsOpen(true)
  }

  function closeProductModal() {
    setModalIsOpen(false)
  }

  return (
    <ProductsProvider>
      <DateProvider>
        <Head>
          <title>Validaty</title>
        </Head>

        <Header
          onClick={openProductModal} />

        <Main />

        <ProductModal 
          isOpen={modalIsOpen}
          onRequestClose={closeProductModal} />
      </DateProvider>
    </ProductsProvider>
  )
}