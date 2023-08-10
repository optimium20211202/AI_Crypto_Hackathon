import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

const notojp = Noto_Sans_JP({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children: React.ReactNode;
};

// https://github.com/vercel/next.js/issues/43704
// https://github.com/pacocoursey/next-themes/issues/152
// app routeで動的にbackground colorを変更する良い方法が定まっていない。
export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja" className={notojp.className}>
      {/* <body className={notojp.className}>{children}</body> */}
      {children}
    </html>
  );
}