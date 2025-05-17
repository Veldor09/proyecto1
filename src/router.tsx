// src/router.tsx
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  createBrowserHistory,
  redirect,
  NotFoundRoute
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

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Layout,
});

// Página 404 personalizada
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <div style={{ padding: 50 }}>Página no encontrada</div>,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  beforeLoad: ({ context }) => {
    const user = context.auth.user;
    if (!user) throw redirect({ to: '/login' });

    // Redirección según rol
    if (user.role === 'admin') throw redirect({ to: '/proyectos' });
    if (user.role === 'aliado') throw redirect({ to: '/aliados' });
    if (user.role === 'voluntario') throw redirect({ to: '/voluntarios' });
  },
});

const aliadosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/aliados',
  component: AliadosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

const proyectosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/proyectos',
  component: ProyectosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

const voluntariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/voluntarios',
  component: VoluntariosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: '/login' });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

rootRoute.addChildren([
  homeRoute,
  aliadosRoute,
  proyectosRoute,
  voluntariosRoute,
  loginRoute,
  notFoundRoute,
]);

export const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  context: {
    auth: {
      user: undefined,
    },
  },
});
