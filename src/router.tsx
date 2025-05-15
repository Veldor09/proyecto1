// src/router.tsx
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  createBrowserHistory,
  redirect,
} from "@tanstack/react-router";
import RootLayout from "./Components/Layout";
import HomePage from "./Pages/HomePage";
import AliadosPage from "./Pages/AliadosPage";
import ProyectosPage from "./Pages/ProyectosPage";
import VoluntariosPage from "./Pages/VoluntariosPage";
import LoginPage from "./Pages/Login.Page";

export type RouterContext = {
  auth: {
    user: any;
  };
};

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: "/login" });
  },
});

const AliadosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aliados",
  component: AliadosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: "/login" });
  },
});

const proyectosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proyectos",
  component: ProyectosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: "/login" });
  },
});

const voluntariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/voluntarios",
  component: VoluntariosPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) throw redirect({ to: "/login" });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

rootRoute.addChildren([
  homeRoute,
  AliadosRoute,
  proyectosRoute,
  voluntariosRoute,
  loginRoute,
]);

export const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  context: {
    auth: {
      user: undefined
    }
  }
});