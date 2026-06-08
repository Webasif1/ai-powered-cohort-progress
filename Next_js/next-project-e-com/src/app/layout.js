import Navbar from "@/Components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/Components/ThemeProvider";
import { AuthProvider } from "@/context/authContext";

export const metadata = {
  title: "Zewar E-Commerce App",
  description: "Simple e-commerce app built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              {/* Navbar */}
              <Navbar />

              {/* Page Content */}
              <main className="flex-1 container mx-auto px-4 py-6">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
