import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Word & Character Counter",
  description: "Created by Aaron J. Campanella: https://github.com/acamp120/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
