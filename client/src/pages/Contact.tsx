import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MapView } from "@/components/Map";
import { useState } from "react";
import { addContactMessage, addReservation } from "@/lib/submissions";
import { toast } from "sonner";

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [reservationForm, setReservationForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", specialRequests: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Vyplňte všetky polia");
      return;
    }
    setIsSubmitting(true);
    try {
      addContactMessage({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message
      });
      toast.success("Správa bola odoslaná! Čakujeme!");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Chyba pri odoslaní správy");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationForm.name || !reservationForm.email || !reservationForm.phone || !reservationForm.date || !reservationForm.time) {
      toast.error("Vyplňte všetky povinné polia");
      return;
    }
    setIsSubmitting(true);
    try {
      addReservation({
        name: reservationForm.name,
        email: reservationForm.email,
        phone: reservationForm.phone,
        date: reservationForm.date,
        time: reservationForm.time,
        guests: parseInt(reservationForm.guests),
        specialRequests: reservationForm.specialRequests
      });
      toast.success("Rezervácia bola odoslaná! Kontaktujeme vás čoskoro!");
      setReservationForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", specialRequests: "" });
    } catch (error) {
      toast.error("Chyba pri odoslaní rezervácie");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Meno</label>
                    <Input 
                      className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                      placeholder="Vaše meno"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Email</label>
                    <Input 
                      type="email" 
                      className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                      placeholder="vasa@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Správa</label>
                  <Textarea 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent min-h-[120px] bg-transparent" 
                    placeholder="Vaša správa..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors text-lg uppercase font-bold py-6"
                >
                  {isSubmitting ? "Odosielam..." : "Odoslať"}
                </Button>
              </form>
            </div>

            <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest">Rezervácia stola</h2>
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Meno</label>
                    <Input 
                      className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                      placeholder="Vaše meno"
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Email</label>
                    <Input 
                      type="email" 
                      className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                      placeholder="vasa@email.com"
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Telefón</label>
                  <Input 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                    placeholder="+421 948 318 527"
                    value={reservationForm.phone}
                    onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Dátum</label>
                    <Input 
                      type="date" 
                      className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase">Čas</label>
                    <Input 
                      type="time" 
                      className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Počet osôb</label>
                  <Input 
                    type="number" 
                    min="1" 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
                    value={reservationForm.guests}
                    onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Špeciálne požiadavky</label>
                  <Textarea 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent min-h-[80px] bg-transparent" 
                    placeholder="Napr. alergické požiadavky, iné..."
                    value={reservationForm.specialRequests}
                    onChange={(e) => setReservationForm({ ...reservationForm, specialRequests: e.target.value })}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors text-lg uppercase font-bold py-6"
                >
                  {isSubmitting ? "Odosielam..." : "Rezervovať stôl"}
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="h-full min-h-[600px] border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <MapView 
              onMapReady={(map) => {
                map.setCenter({ lat: 48.1486, lng: 17.1077 });
                map.setZoom(15);
              }}
            />
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-20 bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest flex items-center gap-2">
            <Clock className="h-6 w-6" /> Otváracie hodiny
          </h2>
          <div className="grid md:grid-cols-2 gap-8 font-mono">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Pondelok</span>
                <span>Zatvorené</span>
              </div>
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Utorok</span>
                <span>14:00 - 21:00</span>
              </div>
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Streda</span>
                <span>14:00 - 21:00</span>
              </div>
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Štvrtok</span>
                <span>14:00 - 21:00</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Piatok</span>
                <span>14:00 - 22:00</span>
              </div>
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Sobota</span>
                <span>12:00 - 22:00</span>
              </div>
              <div className="flex justify-between border-b border-foreground/20 pb-2">
                <span className="font-bold">Nedeľa</span>
                <span>12:00 - 21:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
