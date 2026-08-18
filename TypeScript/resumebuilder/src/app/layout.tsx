import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/providers/ThemeProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ToastHost } from "@/components/ui/ToastHost";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { sessionInitScript } from "@/lib/sessionHint";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ResumeAI — Build ATS-optimized resumes with AI",
    template: "%s · ResumeAI",
  },
  description:
    "Create professional, ATS-friendly resumes in minutes with AI-powered suggestions, real-time scoring, and instant PDF export.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Applies the stored (or system) theme before the first paint.
          Without this the page renders light, then snaps to dark on hydrate.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/*
          Same trick for the session: stamps `data-session` on <html> so the
          header can paint signed-in chrome on the first frame instead of
          flashing "Sign in" and then swapping once /api/auth/check answers.
        */}
        <script dangerouslySetInnerHTML={{ __html: sessionInitScript }} />
        {/*
          The splash is dismissed by JavaScript. Without this it would cover
          the page permanently for anyone who has scripting disabled.
        */}
        <noscript>
          <style>{`#splash{display:none !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-bg font-sans text-fg antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SessionProvider>
            <SplashScreen />
            {children}
            <ToastHost />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
