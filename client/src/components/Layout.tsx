import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Главная страница", path: "/" },
    { label: "O nas", path: "/o-nas" },
    { label: "Меню", path: "/menu" },
    { label: "Галерея", path: "/gallery" },
    { label: "Kontakty", path: "/kontakty" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-mono bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-accent rounded-full blur opacity-0 group-hover:opacity-75 transition duration-200"></div>
              <span className="relative font-serif text-3xl font-bold tracking-tighter transform group-hover:-rotate-2 transition-transform duration-200">
                Weranda
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors relative",
                  location === item.path && "text-accent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground rounded-none">
              <Search className="h-5 w-5" />
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-foreground bg-background p-4 absolute w-full">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-lg font-bold uppercase tracking-widest hover:text-accent transition-colors",
                    location === item.path && "text-accent"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-foreground text-background py-12">
        <div className="container grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Weranda</h3>
            <p className="text-sm opacity-80 max-w-xs">
              Punk-rock bufet a koncertný priestor na bratislavskej hrádzi.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-accent">Kontakt</h4>
            <p className="text-sm opacity-80">weranda@example.com</p>
            <p className="text-sm opacity-80">+421 900 000 000</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-accent">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-background/20 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Weranda. All rights reserved. Punk's not dead.
        </div>
      </footer>
    </div>
  );
}
