import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 text-center relative overflow-hidden">
      {/* Background Texture/Noise could go here */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tighter animate-in fade-in zoom-in duration-1000">
          WERANDA
        </h1>
        
        <div className="w-24 h-2 bg-accent mx-auto transform -rotate-2"></div>

        <p className="font-mono text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Punk-rock bufet vedľa cyklotrasy. Otvená komunita pre všetkých - cyklistov, LGBTQ+, rodiny, hudobníkov. 
          Živá hudba, dobrý alkohol a autentická atmosféra. Weranda je miesto, kde sa stretáva punk kultúra s kvalitným jedlom a nápojmi.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link href="/menu">
            <Button size="lg" className="text-lg px-8 py-6 rounded-none border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
              POZRIEŤ MENU
            </Button>
          </Link>
          <Link href="/kontakty">
            <Button size="lg" className="text-lg px-8 py-6 rounded-none bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-transparent hover:border-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
              REZERVOVAŤ STÔL
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
