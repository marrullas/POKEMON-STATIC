import { FC } from "react"
import Head from "next/head"
import { Navbar } from "../ui"

interface Props {
    children: JSX.Element,
    title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon application'}</title>
            <meta name="author" content="Mauricio Fernandez" />
            <meta name="description" content={` Información sobre pokemon XXX ${title}`} />
            <meta name="keywords" content={`${title}, XXXX, pokemon, pokedesk`} />
        </Head>

        <Navbar></Navbar>

        <main style={{
            padding: '0px 20px'
        }}>
            { children }
        </main>

    </>
  )
}
