import type { Metadata } from "next";
import "./globals.css";
import { RotatingPipes } from "@/components/RotatingPipes";

export const metadata: Metadata = {
  title: "Жестяной Цех - Система Учета",
  description: "Профессиональная система управления жестяным цехом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <RotatingPipes />
        {children}
      </body>
    </html>
  );
}
