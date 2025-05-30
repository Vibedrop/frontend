import type { Metadata } from "next";

const title: string = "Vibedrop";
const description: string =
    "From idea to banger. Together. – Collaborate, comment, and keep your tracks organized.";
const url: string = "https://vibedrop-frontend.cc25.chasacademy.dev/";

export const metadata: Metadata = {
    title: title,
    description: description,
    icons: [
        {
            rel: "icon",
            type: "image/png",
            url: "/favicon.png",
        },
        {
            rel: "icon",
            type: "image/svg+xml",
            url: "/favicon-white.svg",
            media: "(prefers-color-scheme: dark)",
        },
        {
            rel: "icon",
            type: "image/svg+xml",
            url: "/favicon-black.svg",
            media: "(prefers-color-scheme: light)",
        },
    ],
    openGraph: {
        title: title,
        description: description,
        url: url,
        siteName: title,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Vibedrop OG Image",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: ["/og-image.png"],
    },
    metadataBase: new URL(url),
};

