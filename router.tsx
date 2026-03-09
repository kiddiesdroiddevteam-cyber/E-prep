import { 
  createRouter, 
  createRoute, 
  createRootRouteWithContext, 
  Outlet, 
  redirect 
} from '@tanstack/react-router'
import AuthPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import QuizFlowPage from './pages/QuizFlowPage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { ProtectedRoute } from './components/protectedRoute';
import AdminPage from './pages/AdminPage';


// 1. Define the Context Interface
// This tells the router what to expect in the context
interface MyRouterContext {
  auth: {
    isAuthenticated: boolean;
    user: any; // Replace 'any' with your User type
    isLoading: boolean;
  };
}

// 2. Define root route with Context
// We use createRootRouteWithContext so child routes know about 'auth'
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <AuthProvider>
      <Outlet />
      <Toaster />
    </AuthProvider>
  ),
});

// 3. Protected route
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: ProtectedRoute, // component now handles auth logic
});


// 4. Define normal routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: DashboardPage,
});

export const quizRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/quiz',
  component: QuizFlowPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/settings',
  component: SettingsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/uzorisadmin',
  component: AdminPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
});

// 5. Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  protectedRoute.addChildren([dashboardRoute, quizRoute, settingsRoute, adminRoute]),
  authRoute,
]);

// 6. Create router
// We provide a default context here (it will be overridden in your main.tsx/App.tsx)
export const router = createRouter({
  routeTree,
});

// 7. Type safety registration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}