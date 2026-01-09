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
                <p className="font-bold text-lg">Weranda - Punk Rock Bufet</p>
                <p>Májová 3303/23</p>
                <p>851 01 Bratislava-Petržalka</p>
                <div className="pt-4 flex flex-col gap-3">
                  <a href="tel:+421948318527" className="flex items-center gap-2 hover:text-accent transition-colors font-bold">
                    <Phone className="h-4 w-4" /> +421 948 318 527
                  </a>
                  <a href="https://www.facebook.com/WerandaPunkRockBufet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <span>📘</span> Facebook
                  </a>
                  <a href="https://www.instagram.com/weranda_punk_rock_bufet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <span>📷</span> Instagram
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
                    <Input className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" placeholder="Vaše meno" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Email</label>
                    <Input type="email" className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" placeholder="vasa@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Správa</label>
                  <Textarea className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent min-h-[120px] bg-transparent" placeholder="Vaša správa..." />
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
                   // Bratislava-Petržalka coordinates
                   const werandaLocation = { lat: 48.1358, lng: 17.1348 };
                   new google.maps.Marker({
                     position: werandaLocation,
                     map: map,
                     title: "Weranda - Punk Rock Bufet"
                   });
                   map.setCenter(werandaLocation);
                   map.setZoom(15);
                 }}
               />
            </div>

            <div className="bg-accent text-accent-foreground border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-6 w-6" /> Otváracie hodiny
              </h2>
              <div className="grid grid-cols-1 gap-3 font-mono">
                <div className="flex justify-between border-b border-accent-foreground/20 pb-2">
                  <p className="font-bold">Pondelok</p>
                  <p>Zatvorené</p>
                </div>
                <div className="flex justify-between border-b border-accent-foreground/20 pb-2">
                  <p className="font-bold">Utorok - Štvrtok</p>
                  <p>14:00 - 21:00</p>
                </div>
                <div className="flex justify-between border-b border-accent-foreground/20 pb-2">
                  <p className="font-bold">Piatok</p>
                  <p>14:00 - 22:00</p>
                </div>
                <div className="flex justify-between border-b border-accent-foreground/20 pb-2">
                  <p className="font-bold">Sobota</p>
                  <p>12:00 - 22:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Nedeľa</p>
                  <p>12:00 - 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
