import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MapView } from "@/components/Map";

export default function Contact() {
  return (
    <div className="min-h-screen bg-accent/10">
      <div className="container py-20">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-center mb-12">KONTAKTY</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Form */}
          <div className="space-y-12">
            <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-6 w-6" /> Adresa
              </h2>
              <div className="space-y-4 font-mono">
                <p>Weranda - Punk Rock Bufet</p>
                <p>Bratislavská hrádza</p>
                <p>851 01 Bratislava</p>
                <div className="pt-4 flex flex-col gap-2">
                  <a href="tel:+421900000000" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" /> +421 900 000 000
                  </a>
                  <a href="mailto:weranda@example.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <Mail className="h-4 w-4" /> weranda@example.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest">Napíšte nám</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Meno</label>
                    <Input className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Email</label>
                    <Input type="email" className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Správa</label>
                  <Textarea className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent min-h-[120px] bg-transparent" />
                </div>
                <Button className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors text-lg uppercase font-bold py-6">
                  Odoslať
                </Button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-8">
            <div className="bg-background border-2 border-foreground p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[400px] relative">
               <MapView 
                 className="w-full h-full"
                 onMapReady={(map: google.maps.Map) => {
                   new google.maps.Marker({
                     position: { lat: 48.135, lng: 17.135 }, // Approx Bratislava location
                     map: map,
                     title: "Weranda"
                   });
                   map.setCenter({ lat: 48.135, lng: 17.135 });
                   map.setZoom(14);
                 }}
               />
            </div>

            <div className="bg-accent text-accent-foreground border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-6 w-6" /> Otváracie hodiny
              </h2>
              <div className="grid grid-cols-2 gap-4 font-mono">
                <div>
                  <p className="font-bold">Pondelok - Štvrtok</p>
                  <p>16:00 - 22:00</p>
                </div>
                <div>
                  <p className="font-bold">Piatok</p>
                  <p>16:00 - 02:00</p>
                </div>
                <div>
                  <p className="font-bold">Sobota</p>
                  <p>14:00 - 02:00</p>
                </div>
                <div>
                  <p className="font-bold">Nedeľa</p>
                  <p>14:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
