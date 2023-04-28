import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <meta name="author" content="Luca Merighi" />
        <meta name="description" content="Aplicativo para registrar e manter em dia o vencimento de produtos da sua loja." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />

        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <body className="font-ubuntu bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
