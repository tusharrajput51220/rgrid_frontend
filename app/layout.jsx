import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/context/SocketContext";

export const metadata = {
  title: "Online Live Polling System",
  description: "Real-time polling system built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          {children}

          <Toaster position="top-right" reverseOrder={false} />
        </SocketProvider>
      </body>
    </html>
  );
}
