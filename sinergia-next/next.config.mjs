/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Força o Next.js a reconhecer o diretório atual como a raiz do projeto.
    // Isso resolve os problemas de "multiple lockfiles" em ambientes aninhados.
    outputFileTracingRoot: __dirname,
  },
};

export default nextConfig;
