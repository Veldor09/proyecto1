import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  createBrowserHistory,
  redirect,
  NotFoundRoute,
} from '@tanstack/react-router';

import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import AliadosPage from './Pages/AliadosPage';
import ProyectosPage from './Pages/ProyectosPage';
import VoluntariosPage from './Pages/VoluntariosPage';
import LoginPage from './Pages/Login.Page';

export type RouterContext = {
  auth: {
    user: any;
  };
};

// Ruta raíz con layout común
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Layout,
});

// Página de inicio visible para todos los roles autenticados
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

// Página de Aliados (requiere login)
const aliadosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/aliados',
  component: AliadosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

// Página de Proyectos (requiere login)
const proyectosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/proyectos',
  component: ProyectosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

// Página de Voluntarios (requiere login)
const voluntariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/voluntarios',
  component: VoluntariosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

// Página de Login (sin protección)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

// Página 404 personalizada
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div style={{ padding: 50, textAlign: 'center', color: 'red' }}>
      <h1>404</h1>
      <p>Página no encontrada</p>
    </div>
  ),
});

// Registrar rutas
rootRoute.addChildren([
  homeRoute,
  aliadosRoute,
  proyectosRoute,
  voluntariosRoute,
  loginRoute,
  notFoundRoute,
]);

// Exportar el router
export const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  context: {
    auth: {
      user: undefined,
    },
  },
});
