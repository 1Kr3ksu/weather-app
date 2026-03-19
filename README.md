
https://github.com/JasinskiSz/zadania/tree/main/programowanie/nextjs/weather-app



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

Projekt jest skonfigurowany pod statyczny export (`output: "export"`) i automatyczny deploy przez GitHub Actions.

### 1) Włącz GitHub Pages w repo

- Wejdź w **Settings → Pages**
- W sekcji **Build and deployment** wybierz **Source: GitHub Actions**

### 2) Wypchnij kod na `main`

Workflow z pliku [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) uruchomi się automatycznie po pushu.

### 3) Lokalny test buildu statycznego

```bash
npm install
npm run build
```

Po buildzie gotowe pliki strony są w katalogu `out/`.

### Adres strony

- Dla repozytorium projektu: `https://<twoj-login>.github.io/<nazwa-repo>/`
- Dla repozytorium użytkownika `<twoj-login>.github.io`: `https://<twoj-login>.github.io/`
