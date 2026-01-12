import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { addContactMessage } from "@/lib/submissions";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
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

  return (
    <div className="min-h-screen bg-accent/10">
      <div className="container py-20">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-center mb-12">KONTAKTY</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Forms */}
          <div className="space-y-8">
            {/* Address & Info */}
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

            {/* Contact Form */}
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

            {/* Reservation Link */}
            <Link href="/rezervacia" className="block">
              <div className="bg-accent text-accent-foreground border-2 border-accent p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                <h2 className="font-bold text-2xl mb-4 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon className="h-6 w-6" /> Rezervácia stola
                </h2>
                <p className="font-mono mb-4">
                  Chcete si rezervovať stôl? Prejdite na našu rezervačnú stránku.
                </p>
                <Button className="rounded-none bg-accent-foreground text-accent hover:bg-background transition-colors font-bold uppercase">
                  Rezervovať →
                </Button>
              </div>
            </Link>
          </div>

          {/* Opening Hours */}
          <div className="space-y-8">
            <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-6 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-6 w-6" /> Otváracie hodiny
              </h2>
              <div className="space-y-3 font-mono">
                <div className="flex justify-between border-b border-foreground/20 pb-2">
                  <span className="font-bold">Pondelok</span>
                  <span className="text-right">Zatvorené</span>
                </div>
                <div className="flex justify-between border-b border-foreground/20 pb-2">
                  <span className="font-bold">Utorok</span>
                  <span className="text-right">14:00 - 21:00</span>
                </div>
                <div className="flex justify-between border-b border-foreground/20 pb-2">
                  <span className="font-bold">Streda</span>
                  <span className="text-right">14:00 - 21:00</span>
                </div>
                <div className="flex justify-between border-b border-foreground/20 pb-2">
                  <span className="font-bold">Štvrtok</span>
                  <span className="text-right">14:00 - 21:00</span>
                </div>
                <div className="flex justify-between border-b border-foreground/20 pb-2">
                  <span className="font-bold">Piatok</span>
                  <span className="text-right">14:00 - 22:00</span>
                </div>
                <div className="flex justify-between border-b border-foreground/20 pb-2">
                  <span className="font-bold">Sobota</span>
                  <span className="text-right">12:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Nedeľa</span>
                  <span className="text-right">12:00 - 21:00</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-4 uppercase tracking-widest">Nájdite nás</h2>
              <div className="bg-accent/20 border-2 border-foreground p-4 text-center">
                <p className="font-mono text-sm opacity-70 mb-3">Vedľa cyklotrasy v Petržalke</p>
                <a 
                  href="https://maps.google.com/?q=48.1486,17.1077" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-foreground text-background px-4 py-2 font-bold uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Otvoriť v Mapách
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
