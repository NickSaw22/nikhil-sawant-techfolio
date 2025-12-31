import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Navbar } from "../components/main/navbar";
import { StarsCanvas } from "../components/main/star-background";
import { cn } from "../lib/utils";
import { Footer } from "../components/main/footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikhil Sawant - Portfolio",
  description: "Nikhil Sawant's Personal Portfolio Website",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={geist.className}>{children}</body>
//     </html>
//   );
// }


export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          geist.className
        )}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

