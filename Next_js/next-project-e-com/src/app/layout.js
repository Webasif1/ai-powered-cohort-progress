import Navbar from "@/Components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Create Zewar E-Commerce App",
  description: "It is a simple e-commerce app built with Next.js and Tailwind CSS. It is a simple e-commerce app built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-screen antialiased`}>
      <body className="min-h-full flex flex-col px-6">
        <Navbar/>
        {children}</body>
    </html>
  );
}
