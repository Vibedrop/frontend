# [Live version](https://vibedrop-frontend.cc25.chasacademy.dev/)

# Vibedrop – Användarguide

Vibedrop är en modern webbapplikation för samarbete kring musikprojekt. Den här guiden hjälper dig att komma igång, utveckla, bygga och förstå de viktigaste funktionerna i frontend-projektet.

## Techstack
- Next.js (React)
- TypeScript
- Zustand (state management)
- Tailwind CSS
- Radix Themes
- ESLint
- Lucide Icons

## Innehåll
- [Förutsättningar](#förutsättningar)
- [Installation](#installation)
- [Utvecklingsläge](#utvecklingsläge)
- [Bygga för produktion](#bygga-för-produktion)
- [Struktur och viktiga mappar](#struktur-och-viktiga-mappar)
- [Användbara npm-skript](#användbara-npm-skript)
- [Felsökning](#felsökning)
- [Ytterligare dokumentation](#ytterligare-dokumentation)

## Förutsättningar

- Node.js (rekommenderad version: 18.x eller senare)
- npm (medföljer Node.js)
- Git

## Installation

1. Klona repot:
   ```bash
   git clone https://git.chasacademy.dev/chas-challenge-2025/vibedrop/frontend.git
   ```
2. Gå in i projektmappen:
   ```bash
   cd frontend
   ```
3. Installera beroenden:
   ```bash
   npm install
   ```

## Utvecklingsläge

> **Viktigt:** Frontend måste köras på port 3001. Backend måste vara igång på port 3000 innan du startar frontend.

1. Starta backend-servern (i backend-mappen):
   ```bash
   npm run dev
   ```
   Backend körs då på [http://localhost:3000](http://localhost:3000).

2. Starta frontend:
   ```bash
   npm run dev
   ```
   - Appen körs på [http://localhost:3000](http://localhost:3000) om porten är ledig men eftersom backend redan behöver vara igång på port 3000 kommer den testa nästa lediga port (3001).
   - Alternativt tvinga den att starta på port 3001 genom att köra:
     ```bash
     PORT=3001 npm run dev
     ```
   - Alla ändringar i koden laddas automatiskt om i webbläsaren.

## Bygga för produktion

Bygg en optimerad version av appen:
```bash
npm run build
```
- Detta skapar en `.next`-mapp med produktionsfärdiga filer.

Starta produktionen lokalt (efter build):
```bash
npm start
```
- Används för att testa den byggda appen i produktionsläge.

## Struktur och viktiga mappar

- `src/app/` – Sidor och routing enligt Next.js App Router.
- `src/components/` – Återanvändbara React-komponenter.
- `src/context/` – React Contexts för global state.
- `src/stores/` – Zustand stores för state management.
- `src/utilities/` – Hjälpfunktioner och verktyg.
- `public/` – Statisk media (bilder, videos, fonter).
- `styles/` eller `src/app/globals.scss` – Globala stilar (Tailwind/SCSS).

## Användbara npm-skript

- `npm run dev` – Startar utvecklingsservern (se till att starta backend på port 3000 först, alternativt ange PORT=3001 för rätt port).
- `npm run build` – Bygger appen för produktion.
- `npm start` – Startar den byggda appen i produktionsläge.
- `npm run lint` – Kör ESLint för att hitta kodproblem.

## Felsökning

- Kontrollera att alla beroenden är installerade (`npm install`).
- Vid portkonflikt, försäkra dig att frontend körs på port 3001 med `PORT=3001 npm run dev`.
- Läs konsolens felmeddelanden för mer information.

## Ytterligare dokumentation

- [Next.js Docs](https://nextjs.org/docs)
- [Chas Academy GitLab](https://git.chasacademy.dev/chas-challenge-2025/vibedrop/frontend)
