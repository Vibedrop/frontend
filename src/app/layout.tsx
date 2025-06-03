import { metadata } from "@/utilities/metadata";
import { inter } from "@/lib/fonts";
import { Theme } from "@radix-ui/themes";
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
            <body className={`${inter.variable} antialiased`}>
                <Theme
                    appearance="dark"
                    accentColor="iris"
                    grayColor="gray"
                    className="flex bg-background flex-col h-screen font-sans"
                >
                    {children}
                </Theme>
            </body>
        </html>
    );
}

