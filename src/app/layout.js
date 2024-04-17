import { Inter } from 'next/font/google';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Buscador de CEP',
    description: 'Projeto Buscador de CEP',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="icon" href="/logo.png" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
