import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const ADMIN_PASSWORD = "weranda2024"; // Change this to your desired password

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("werandaAdminToken", "authenticated");
      setLocation("/admin");
    } else {
      setError("Nesprávne heslo");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Lock className="h-6 w-6" />
            <h1 className="font-serif text-3xl font-bold">Admin Panel</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest">Heslo</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Zadajte heslo"
                className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
              />
            </div>

            {error && (
              <div className="bg-destructive text-destructive-foreground p-3 font-mono text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors text-lg uppercase font-bold py-6"
            >
              Prihlásiť sa
            </Button>
          </form>

          <p className="text-center text-xs opacity-60 mt-6 font-mono">
            Iba pre administrátorov Werandu
          </p>
        </div>
      </div>
    </div>
  );
}
