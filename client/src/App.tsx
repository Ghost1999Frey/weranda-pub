import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Partners from "./pages/Partners";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Layout from "./components/Layout";

function Router() {
  const [location] = useLocation();
  const isAdminPage = location.startsWith("/admin");

  if (isAdminPage) {
    return (
      <Switch>
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/o-nas" component={About} />
        <Route path="/menu" component={Menu} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/komunita" component={Community} />
        <Route path="/podujatia" component={Events} />
        <Route path="/partneri" component={Partners} />
        <Route path="/kontakty" component={Contact} />
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
