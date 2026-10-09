import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Divas dress well. | Alta-Costura & Combinações de Roupas',
  description: 'Encontre seu estilo e combinações perfeitas de roupas. Explore a harmonia de cores, texturas e estampas para criar looks incríveis sem complicação.',
  openGraph: {
    title: 'Divas dress well. | Alta-Costura & Inspiração de Looks',
    description: 'Explore combinações de roupas, paletas cromáticas e texturas luxuosas para o seu estilo.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divas dress well. | Combinações de Roupas',
    description: 'Explore combinações de roupas, paletas cromáticas e texturas luxuosas.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="bg-[#0e0e0e] text-[#e5e2e1] antialiased selection:bg-[#a1045a] selection:text-white min-h-screen relative" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
