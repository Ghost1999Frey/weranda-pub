import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Music, Users } from "lucide-react";

export default function Events() {
  return (
    <div className="container py-20 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold">PODUJATIA & PRIESTOR</h1>
          <div className="w-full h-1 bg-foreground"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Events Info */}
          <div className="space-y-6">
            <div className="border-2 border-foreground p-6 bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-4 uppercase flex items-center gap-2">
                <Music className="h-6 w-6" /> Koncerty a podujatia
              </h2>
              <p className="font-mono mb-4">
                Weranda je otvorená pre všetky typy podujatí - koncerty, punk-večierky, diskusie, workshopy a stretnutia komunít.
              </p>
              <ul className="list-disc list-inside space-y-2 font-mono text-sm pl-2 marker:text-accent">
                <li>Živá hudba a koncerty</li>
                <li>Komunálne stretnutia</li>
                <li>Workshopy a prednášky</li>
                <li>Cyklokomunity stretnutia</li>
                <li>LGBTQ+ podujatia</li>
                <li>Rodinné akcie</li>
              </ul>
            </div>

            <div className="border-2 border-foreground p-6 bg-accent text-accent-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-4 uppercase flex items-center gap-2">
                <Users className="h-6 w-6" /> Voľný priestor
              </h2>
              <p className="font-mono mb-4">
                Máme dostupný priestor pre skupiny, komunity a organizácie. Ideálny na stretnutia, prednášky a menšie podujatia.
              </p>
              <p className="font-mono text-sm">
                Kapacita: 50-100 osôb | Vybavenie: Zvukový systém, projektor, stoličky a stoly
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="border-2 border-foreground p-8 bg-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest">Rezervovať podujatie</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Meno organizátora</label>
                <Input className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" placeholder="Vaše meno" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Email</label>
                <Input type="email" className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" placeholder="vasa@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Telefón</label>
                <Input className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" placeholder="+421 948 318 527" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Typ podujatia</label>
                <select className="w-full rounded-none border-2 border-foreground bg-transparent p-2 font-mono focus:border-accent focus:outline-none">
                  <option value="">Vyberte typ...</option>
                  <option value="concert">Koncert</option>
                  <option value="meeting">Stretnutie komunity</option>
                  <option value="workshop">Workshop</option>
                  <option value="party">Párty</option>
                  <option value="other">Iné</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Dátum a čas</label>
                <Input type="datetime-local" className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Popis podujatia</label>
                <Textarea className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent min-h-[100px] bg-transparent" placeholder="Povedzte nám o vašom podujatí..." />
              </div>
              <Button className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors text-lg uppercase font-bold py-6">
                Poslať žiadosť
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
