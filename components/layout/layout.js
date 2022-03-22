import Head from 'next/head'

export default function Layout({children}) {
    return(
        <>
        <Head>
            
        </Head>
        {children}
        <script src='/js/animations.js'></script>
        </>
    )
}