import RootLayout from "./Components/Layout";
import HomePage from "./Pages/HomePage";
import DonacionesPage from "./Pages/DonacionPage";
import ProyectosPage from "./Pages/ProyectosPage";
import VoluntariosPage from "./Pages/VoluntariosPage";

import {
  createRootRoute,
  createRoute,
  createRouter,
  createBrowserHistory,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});


const donacionesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donaciones",
  component: DonacionesPage,
});

const proyectosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proyectos",
  component: ProyectosPage,
});

const voluntariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/voluntarios",
  component: VoluntariosPage,
});

// Agregar todas las rutas hijas al root
rootRoute.addChildren([
  homeRoute,
  donacionesRoute,
  proyectosRoute,
  voluntariosRoute,
]);

const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;