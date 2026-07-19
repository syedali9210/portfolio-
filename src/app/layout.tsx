import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Agentation } from "agentation";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";
import ViewportEdgeBlur from "@/components/ViewportEdgeBlur";
import "./globals.css";

const segoeUI = localFont({
  src: [
    { path: "./fonts/segoe-ui-light.otf", weight: "300", style: "normal" },
    { path: "./fonts/segoe-ui-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/segoe-ui-italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/segoe-ui-semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/segoe-ui-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syed Ali — Design Engineer",
  description:
    "The guy who designs things and brings them to life, cuz why not. Engineering taught me to do things the unconventional way.",
  openGraph: {
    title: "Syed Ali — Design Engineer",
    description:
      "The guy who designs things and brings them to life, cuz why not. Engineering taught me to do things the unconventional way.",
    siteName: "Syed Ali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Ali — Design Engineer",
    description:
      "The guy who designs things and brings them to life, cuz why not. Engineering taught me to do things the unconventional way.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${segoeUI.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <ViewportEdgeBlur />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <Agentation endpoint="http://localhost:4747" />
        )}
        <Analytics />
      </body>
    </html>
  );
}
