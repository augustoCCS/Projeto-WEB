// app/layout.tsx
export const metadata = {
  title: 'techaccs.com.br',
  description: 'Site da TechAccs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
