import type { Metadata } from "next";

const title: string = "Vibedrop";
const description: string = "Share your tracks privately and get feedback from collaborators – securely and effortlessly.";
const url: string = "https://vibedrop.app"; // TODO: add a real URL

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon-black.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon-white.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    images: [
      {
        url: "/og-image.png", // TODO: add a real image
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
    images: ["/og-image.png"], // TODO: add a real image
  },
  metadataBase: new URL(url),
};