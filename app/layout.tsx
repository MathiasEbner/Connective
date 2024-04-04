import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "@/styles/globals.scss";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeRegistry from "@/app/lib/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CONNECTIVE",
  description: "Discover Connective, your dashboard for exploring global connectivity trends. Dive into interactive charts showcasing internet usage and the transformative power of communication technologies. Gain valuable insights and explore the evolving digital landscape with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground" >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
