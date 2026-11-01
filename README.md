# ESTRATEGICAMENTE

Sitio web full stack de marketing digital con estrategia, contenido y datos. La aplicación combina una landing editorial con un feed de insights obtenido de la API pública de Dev.to, autenticación de usuarios y una biblioteca personal de artículos guardados.

- Repositorio: [github.com/Giiraldo/project-estrategicamente](https://github.com/Giiraldo/project-estrategicamente)
- Demo: [project-estrategicamente-pqxi.vercel.app](https://project-estrategicamente-pqxi.vercel.app)
- API: [project-estrategicamente.vercel.app](https://project-estrategicamente.vercel.app)

## Funcionalidades

- Landing responsive con identidad visual propia, hero, propuesta de valor y llamados a la acción.
- Feed de insights de marketing digital consumido desde la API pública de [Dev.to](https://dev.to).
- Búsqueda por tema y filtros por categorías: marketing, SEO, social media, contenido, branding y analytics.
- Paginación con botón "Mostrar más", caché local de la última consulta y estados de carga, error y vacío.
- Registro e inicio de sesión con JWT y contraseñas cifradas con bcrypt.
- Sesión persistente en el navegador y restauración automática del usuario.
- Guardado y eliminación de artículos en una biblioteca personal protegida por autenticación.
- Páginas de inicio, sobre el proyecto, autenticación, biblioteca y 404.
- Diseño accesible: navegación por teclado, etiquetas, textos alternativos, foco visible y mensajes de estado.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router |
| Estilos | CSS propio con normalize.css, tipografías Sora, Manrope e Instrument Serif |
| Backend | Node.js, Express 5, TypeScript |
| Base de datos | MongoDB Atlas con Mongoose |
| Autenticación | JWT, bcryptjs |
| API externa | Dev.to API (`/api/articles?tag=marketing`) |
| Despliegue | Vercel (frontend y API) + MongoDB Atlas |

## Estructura

```text
.
├── client/                 # Aplicación React + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   └── vercel.json
├── server/                 # API Express + MongoDB
│   ├── api/                # Entrada serverless para Vercel
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── test/
│   ├── .env.example
│   └── vercel.json
└── README.md
```

## Puesta en marcha local

### Requisitos

- Node.js 20 o superior.
- Una base de datos MongoDB Atlas (o una instancia local de MongoDB).

### 1. API

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Completa `server/.env` con tus credenciales. La API queda disponible en `http://localhost:3001`.

Variables de entorno del servidor:

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto local de la API. Por defecto `3001`. |
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas. |
| `JWT_SECRET` | Clave larga y aleatoria para firmar los tokens. |
| `CLIENT_ORIGIN` | Origen permitido por CORS. Admite varios separados por coma o `*`. |

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Variables de entorno del cliente:

| Variable | Descripción |
| --- | --- |
| `VITE_API_URL` | URL base de la API. Por defecto `http://localhost:3001`. |

La aplicación queda disponible en `http://localhost:5173`.

## Scripts

### Cliente

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Verificación de TypeScript y build de producción
npm run lint      # Linter oxlint
npm run preview   # Previsualización del build
```

### Servidor

```bash
npm run dev        # Servidor con recarga automática
npm run typecheck  # Verificación de TypeScript
npm run build      # Compilación a dist/
npm start          # Servidor compilado
npm test           # Pruebas de integración con MongoDB en memoria
```

## API

Todas las rutas de usuario y artículos requieren el encabezado `Authorization: Bearer <token>`, excepto el registro y el inicio de sesión.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/health` | Estado de la API. |
| `POST` | `/signup` | Crea una cuenta y devuelve un token. |
| `POST` | `/signin` | Inicia sesión y devuelve un token. |
| `GET` | `/users/me` | Devuelve el usuario autenticado. |
| `GET` | `/articles` | Lista los artículos guardados del usuario. |
| `POST` | `/articles` | Guarda un artículo en la biblioteca. |
| `DELETE` | `/articles/:id` | Elimina un artículo guardado. |

### Modelos

- `User`: nombre entre 2 y 30 caracteres, correo único y válido, contraseña cifrada.
- `SavedArticle`: artículo de Dev.to asociado a un usuario, con índice único por `owner` y `articleId`.

## Pruebas

```bash
cd server
npm test
```

Las pruebas cubren el health check, registro, validaciones, inicio de sesión, protección de rutas, guardado, listado, duplicados y eliminación de artículos. Usan `mongodb-memory-server`, por lo que no necesitan una base de datos externa.

## Despliegue

### MongoDB Atlas

1. Usa un clúster de MongoDB Atlas; el plan gratuito es suficiente.
2. Crea un usuario de base de datos y permite el acceso desde Vercel (`0.0.0.0/0` para un proyecto académico).
3. Usa una base de datos llamada `estrategicamente` y copia la cadena de conexión como `MONGODB_URI`.

### API en Vercel

1. Importa el repositorio y selecciona `server` como directorio raíz.
2. Configura `MONGODB_URI`, `JWT_SECRET` y `CLIENT_ORIGIN=https://project-estrategicamente-pqxi.vercel.app`.
3. Despliega. `server/vercel.json` redirige todas las rutas a `api/index.ts` e instala las dependencias necesarias para compilar TypeScript.
4. Verifica el estado con `GET https://project-estrategicamente.vercel.app/health`.

> `CLIENT_ORIGIN` debe coincidir exactamente con el origen del frontend, sin barra final. Para producción se configuró con la URL del frontend.

### Frontend en Vercel

1. Crea un segundo proyecto desde el mismo repositorio y selecciona `client` como directorio raíz.
2. Configura `VITE_API_URL=https://project-estrategicamente.vercel.app`.
3. Despliega. `client/vercel.json` permite que React Router resuelva las rutas al recargar la página.
4. La aplicación queda disponible en `https://project-estrategicamente-pqxi.vercel.app`.

## Decisiones técnicas

- La API de Dev.to se consume directamente desde el cliente porque es pública y permite CORS; el backend se reserva para autenticación y persistencia.
- La sesión se guarda en `localStorage` y se valida contra `GET /users/me` al iniciar la aplicación.
- El backend usa un middleware de conexión cacheada para funcionar tanto en local como en funciones serverless de Vercel.
- El despliegue usa dos proyectos de Vercel desde el mismo repositorio: `server` para la API y `client` para la SPA.
- `server/tsconfig.json` declara `typeRoots` y `server/src/app.ts` referencia `express.d.ts` para que TypeScript resuelva los tipos en el entorno serverless de Vercel.
- Las contraseñas nunca se devuelven en las respuestas y los errores de validación se muestran en español.

## Autor

Jerson Foronda — [@Giiraldo](https://github.com/Giiraldo)
