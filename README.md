# Installation

- NextJS

```bash
npx create-next-app@latest
```

### Shadcn/ui

```bash
npx shadcn@latest init
```

- ui components yang dibutuhkan

```bash
npx shadcn@latest add button card input label tetxtarea sonner label
```

- Dark mode

```bash
npm install next-themes
```

- buat file [theme-provider.tsx](/components/providers/theme-provider.tsx)

```bash
mkdir -p components/providers && touch components/providers/theme-provider.tsx
```

- bungkus [layout.tsx](/app/layout.tsx) dengan [theme-provider.tsx](/components/providers/theme-provider.tsx)

```typescript
import { ThemeProvider } from "@/components/providers/theme-provider";
```

```typescript
<html lang="en" suppressHydrationWarning>
<head />
```

```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Install Prisma

```bash
npm install prisma tsx --save-dev
```

```bash
npm install @prisma/extension-accelerate @prisma/client
```

```bash
npx prisma init --db --output ../app/generated/prisma
```

```bash
- pilih region up-southeast-1 - Asia Pacific (Singapore)
- enter a project name: nama-database-anda
```

- perintah npx prisma init --db --output ../app/generated/prisma akan menghasilkan :

```bash
- prisma/schema.prisma
- prisma database
- .env (didalam ada DATABASE_URL)
```

# Setup Database

- edit file [schema.prisma](/prisma/schema.prisma) contoh:

```typescript
model Posts {
  id    String @id @default(cuid())
  title String
  content  String
}

```

- jalankan perintah berikut untuk membuat migration:

```bash
npx prisma migrate dev --name init
```

- perintah diatas akan membuat file migration di folder [migrations](/prisma/migrations)

- periksa table di database :

```bash
npx prisma studio
```

- buat file [prisma.ts](/lib/prisma.ts) untuk membuat instance prisma client

```bash
touch lib/prisma.ts
```

# Menggunakan Koneksi dari database ke Frontend

- buat file API [route.ts](/app/api/posts/route.ts)

```bash
mkdir -p app/api/posts && touch app/api/posts/route.ts
```

- buat file [PostForm.tsx](/components/posts/PostForm.tsx) & [PostTable.tsx](/components/posts/PostTable.tsx) untuk mengirim & menerima data dari database

```bash
mkdir -p components/posts && touch components/posts/PostForm.tsx components/posts/PostTable.tsx
```

# Deployment di Vercel via GitHub

- bukan [vercel](https://vercel.com)
- buat akun bila belum punya akun vercel
- edit file [package.json](/package.json) pada bagian scripts:

```json
"scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "postinstall": "prisma generate --no-engine",
    "start": "next start",
    "lint": "next lint"
  },
```

- buka [GitHub](https://github.com)
- buat akun bila belum punya akun github
- buat repository baru
- push code ke github
- buka [Vercel](https://vercel.com) kembali
- klik "Import Project"
- pilih repository yang sudah dibuat
- pada kolom "Environment Variables" tambahkan variabel dari [env](/env)
- klik "Deploy"
