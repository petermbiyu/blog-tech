import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar/navbar";
import Footer from "@/components/general/footer";
import SignInModal from "@/components/modals/signInModal";
import SearchModel from "@/components/modals/searchModel";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/queryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tech Blog tutorial",
  description: "A tutorial on blog web creation",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full bg-background antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <SignInModal />
          <SearchModel />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
