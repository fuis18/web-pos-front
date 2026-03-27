# Una web tipo POS

![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-runtime-black?logo=bun)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-white)

## Resumen

Interfaz tipo **POS (Point of Sale)** para la gestión de ventas y productos, pensada para negocios como restaurantes o tiendas. Construida con herramientas modernas y de alto rendimiento.

> 🔑 **Token de acceso demo:** `123456` — configurable en `src/constants/config.ts`

|                | URL                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ |
| 🌐 Frontend     | [web-pos-frontend](http://web-pos-frontend-9h2hs3-b67272-144-225-147-25.traefik.me/) |
| ⚙️ Backend      | [web-pos-backend](http://web-pos-backend-vxrrd4-1172b8-144-225-147-25.traefik.me/)   |
| 📦 Repo Backend | [github.com/fuis18/web-pos-back](https://github.com/fuis18/web-pos-back)             |

###### Perdón no tener dominio .-. こめなさい

### Caracteristias:

- Registro y gestión de ventas en tiempo real
- CRUD de productos con categorías
- Sistema de roles: `user` / `admin`
- Filtros avanzados y reportes de ventas
- Exportación a Excel y CSV
- Interfaz responsive con tema claro/oscuro

## Super Importante

Esta es una web refactorizada de una aplicación [que yo hice](https://github.com/fuis18/app-pos) hace poco para un familiar, y cuando anunciaste el hackathon, se me ocurrio dividirla para la web.

## Breve historia para MIDU

Este proyecto me hizo utilizar todos los conocimientos y proyectos que he realizado, desde la web hasta archlinux, por docker, incluso forzarme a romper fronteras, al implementar tecnologías e ideas muy recientes, por ejmplo ver tu clon de spotify para los estados (usuarios). Así que fue como un exámen final este concurso, muchas gracias.
También ando postulando para la velada.

## Importante

Este proyecto no tiene ningún intento de clonar/copiar ni forkear a otro proyecto/aplicación, la inspiración nace de haber hecho tablas con filas dinámicas de un aplicación de yo mismo hice que no tiene ni base de datos. [Yanayra APP](https://github.com/fuis18/yanayra-app)

## Stack

| Área            | Tecnología                |
| --------------- | ------------------------- |
| Framework UI    | React 19 + React Compiler |
| Componentes     | shadcn/ui + Tailwind CSS  |
| Tablas          | TanStack Table            |
| Formularios     | React Hook Form + Zod     |
| Estado global   | Zustand                   |
| Routing         | React Router DOM          |
| Runtime / Build | Bun + Vite + tsc          |
| Exports         | xlsx + papaparse          |

## Estructura del proyecto

```
src/
├── components/   # Componentes reutilizables (UI, tablas, formularios)
├── features/     # Arquitectura para la especialización de funcionalidades
├── pages/        # Vistas principales (ventas, productos, reportes)
├── store/        # Estado global con Zustand
├── hooks/        # Custom hooks
├── lib/          # Utilidades
└── constants/    # Configuración global (config.ts)
```

## Setup local

```sh
bun create vite web-pos-front
cd ./web-pos-front

bun add -D tailwindcss @tailwindcss/vite -E
bun add -D shadcn-ui -E

bun add @tanstack/react-table -E
bun add react-hook-form zod -E
bun add react-router-dom -E
bun add zustand -E

bunx --bun shadcn@latest init --template vite
bunx --bun shadcn@latest add label button
bunx --bun shadcn@latest add input input-otp
bunx --bun shadcn@latest add table pagination
bunx --bun shadcn@latest add dialog button-group
bunx --bun shadcn@latest add checkbox select
bunx --bun shadcn@latest add popover dropdown-menu
bunx --bun shadcn@latest add combobox calendar

bun add xlsx papaparse
bun add -d @types/papaparse
```