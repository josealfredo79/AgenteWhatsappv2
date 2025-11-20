import path from 'path';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler para optimizaciones automáticas
  reactCompiler: true,
  
  // Compresión para mejor performance
  compress: true,
  // Indica explícitamente a Turbopack cuál es la raíz del workspace
  // Esto evita la advertencia cuando hay múltiples lockfiles en el repo
  turbopack: {
    // Usar ruta absoluta evita que Next/Turbopack infiera la raíz
    // incorrecta cuando hay múltiples lockfiles en el repo (p.ej. root + frontend)
    root: path.resolve(__dirname)
  },
  
  // Remover header X-Powered-By por seguridad
  poweredByHeader: false,
  
  // React Strict Mode para detectar problemas
  reactStrictMode: true,
  
  // Configuración de imágenes (si se usan imágenes externas)
  images: {
    // Agregar dominios permitidos si usas imágenes externas
    // domains: ['example.com'],
    remotePatterns: [],
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
};

export default nextConfig;
