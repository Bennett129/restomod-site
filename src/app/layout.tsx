import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import { Providers } from "@/components/providers";
import { BRAND } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — E92 restomods, built by hand`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "A fictional workshop that restores and re-engineers 2007–2013 E92 coupes. Portfolio project.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the theme class on <html> before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
