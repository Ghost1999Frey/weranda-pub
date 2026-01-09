import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addReservation } from "@/lib/submissions";

export default function Reservations() {
  const [reservationForm, setReservationForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    date: "", 
    time: "", 
    guests: "2", 
    specialRequests: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-center mb-12">REZERVÁCIA STOLA</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6" />
              <h2 className="font-bold text-2xl uppercase tracking-widest">Rezervujte si stôl</h2>
            </div>

            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Meno *</label>
                  <Input 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                    placeholder="Vaše meno"
                    value={reservationForm.name}
                    onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Email *</label>
                  <Input 
                    type="email" 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                    placeholder="vasa@email.com"
                    value={reservationForm.email}
                    onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Telefón *</label>
                <Input 
                  className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent" 
                  placeholder="+421 948 318 527"
                  value={reservationForm.phone}
                  onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Dátum *</label>
                  <Input 
                    type="date" 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
                    value={reservationForm.date}
                    onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Čas *</label>
                  <Input 
                    type="time" 
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase flex items-center gap-2">
                    <Users className="h-4 w-4" /> Počet osôb *
                  </label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="100"
                    className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent bg-transparent"
                    value={reservationForm.guests}
                    onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase">Špeciálne požiadavky</label>
                <Textarea 
                  className="rounded-none border-2 border-foreground focus-visible:ring-0 focus-visible:border-accent min-h-[100px] bg-transparent" 
                  placeholder="Napr. alergické požiadavky, osláva, iné..."
                  value={reservationForm.specialRequests}
                  onChange={(e) => setReservationForm({ ...reservationForm, specialRequests: e.target.value })}
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors text-lg uppercase font-bold py-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {isSubmitting ? "Odosielam..." : "Rezervovať stôl"}
              </Button>

              <p className="text-xs opacity-60 font-mono text-center">
                * Povinné polia. Budeme vás kontaktovať na potvrdenie rezervácie.
              </p>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-accent text-accent-foreground border-2 border-accent p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-bold text-lg mb-3 uppercase">Informácie o rezervácii</h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>📞 Môžete nás tiež zavolať: <strong>+421 948 318 527</strong></li>
              <li>📍 Adresa: <strong>Májová 3303/23, Bratislava-Petržalka</strong></li>
              <li>🕐 Otváracie hodiny: Pondelok zatvorené, Ut-Št 14:00-21:00, Pia 14:00-22:00, So 12:00-22:00, Ne 12:00-21:00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
