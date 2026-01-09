import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Search, Menu, X, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mainNavItems = [
    { label: "Domov", path: "/" },
    { label: "O nás", path: "/o-nas" },
    { label: "Menu", path: "/menu" },
    { label: "Komunita", path: "/komunita" },
    { label: "Podujatia", path: "/podujatia" },
  ];

  const dropdownItems = [
    { label: "Galéria", path: "/gallery" },
    { label: "Partneri", path: "/partneri" },
    { label: "Kontakty", path: "/kontakty" },
    { label: "Admin", path: "/admin-login", isAdmin: true },
  ];

  return (
    <div className="min-h-screen flex flex-col font-mono bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background">
        <div className="container flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tighter transform group-hover:-rotate-2 transition-transform duration-200">
              Weranda
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors relative whitespace-nowrap",
                  location === item.path && "text-accent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Search and Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground rounded-none hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Dropdown Menu (Three Dots) */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent hover:text-accent-foreground rounded-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <MoreVertical className="h-5 w-5" />
              </Button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span
                        className={cn(
                          "block px-4 py-3 font-mono text-sm uppercase hover:bg-accent hover:text-accent-foreground transition-colors border-b border-foreground/20 last:border-b-0",
                          location === item.path && "bg-accent text-accent-foreground",
                          (item as any).isAdmin && "bg-destructive/10 text-destructive font-bold"
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-foreground bg-background p-4">
            <nav className="flex flex-col gap-3">
              {mainNavItems.map((item) => (
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
              <div className="border-t border-foreground/20 pt-3 mt-3">
                {dropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors block py-2",
                      location === item.path && "text-accent",
                      (item as any).isAdmin && "text-destructive"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
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
              Punk-rock bufet vedľa cyklotrasy. Otvená komunita pre všetkých - cyklistov, LGBTQ+, rodiny, hudobníkov a všetkých, ktorí chcú byť sami sebou.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-accent">Kontakt</h4>
            <p className="text-sm opacity-80">Májová 3303/23</p>
            <p className="text-sm opacity-80">851 01 Bratislava-Petržalka</p>
            <p className="text-sm opacity-80 mt-2">+421 948 318 527</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-accent">Sociálne siete</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.facebook.com/WerandaPunkRockBufet/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors text-sm">📘 Facebook</a>
              <a href="https://www.instagram.com/weranda_punk_rock_bufet/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors text-sm">📷 Instagram</a>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-background/20 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Weranda Punk Rock Bufet. Všetky práva vyhradené. Punk nie je mŕtvy.
        </div>
      </footer>
    </div>
  );
}
