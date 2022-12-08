import Head from "next/head";
const redirectLink = "https://replit.com/@returnSTEM/Introduction-to-Game-Development-with-Pygame-Code-Template#main.py"
export default function FoodForm() {
    return (
        <div>
            <Head>
                <link rel="canonical" href={redirectLink}/>
                <meta property="og:title" content="Pygame Workshop Template | Return STEM"/>
            </Head>
            <meta httpEquiv="refresh" content={`0 ; url = ${redirectLink}`}/>
            <a href={redirectLink}>Go to redirect</a>
        </div>
    )
}