import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Somewhere, lately — Alice’s travel journal',description:'A personal scrapbook of photographs, field notes, drawings, and places still to come.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
