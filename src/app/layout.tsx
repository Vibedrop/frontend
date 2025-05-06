import { metadata } from "@/utilities/metadata";
import { inter } from "@/lib/fonts";
import { Theme } from "@radix-ui/themes";
import AuthGuard from "@/components/AuthGuard";
import "@radix-ui/themes/styles.css";
import "./globals.scss";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Theme
          appearance="dark"
          accentColor="iris"
          data-theme="custom"
          className="flex bg-background flex-col h-screen px-2 font-sans"
        >
          <AuthGuard>{children}</AuthGuard>
        </Theme>
      </body>
    </html>
  );
}
