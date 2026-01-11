import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Save, Plus, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { weeklyMenu } from "@/lib/menuData";
import { 
  getSubmissions, 
  updateEventStatus, 
  updateMessageStatus, 
  updateReservationStatus,
  updateReviewStatus,
  deleteSubmission 
} from "@/lib/submissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("menu");
  const [selectedDay, setSelectedDay] = useState("Pondelok");
  const [menu, setMenu] = useState(weeklyMenu);
  const [newDrink, setNewDrink] = useState({ name: "", price: "", desc: "" });
  const [newFood, setNewFood] = useState({ name: "", price: "", desc: "" });
  const [submissions, setSubmissions] = useState(getSubmissions());

  useEffect(() => {
    const token = localStorage.getItem("werandaAdminToken");
    if (!token) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, [activeTab]);

  const currentDayMenu = menu.find(m => m.day === selectedDay);

  const handleLogout = () => {
    localStorage.removeItem("werandaAdminToken");
    setLocation("/");
  };

  const handleAddDrink = () => {
    if (newDrink.name && newDrink.price && currentDayMenu) {
      const updatedMenu = menu.map(day =>
        day.day === selectedDay
          ? { ...day, drinks: [...day.drinks, newDrink] }
          : day
      );
      setMenu(updatedMenu);
      localStorage.setItem("werandaMenuData", JSON.stringify(updatedMenu));
      setNewDrink({ name: "", price: "", desc: "" });
    }
  };

  const handleAddFood = () => {
    if (newFood.name && newFood.price && currentDayMenu) {
      const updatedMenu = menu.map(day =>
        day.day === selectedDay
          ? { ...day, food: [...day.food, newFood] }
          : day
      );
      setMenu(updatedMenu);
      localStorage.setItem("werandaMenuData", JSON.stringify(updatedMenu));
      setNewFood({ name: "", price: "", desc: "" });
    }
  };

  const handleRemoveDrink = (index: number) => {
    if (currentDayMenu) {
      const updatedMenu = menu.map(day =>
        day.day === selectedDay
          ? { ...day, drinks: day.drinks.filter((_, i) => i !== index) }
          : day
      );
      setMenu(updatedMenu);
      localStorage.setItem("werandaMenuData", JSON.stringify(updatedMenu));
    }
  };

  const handleRemoveFood = (index: number) => {
    if (currentDayMenu) {
      const updatedMenu = menu.map(day =>
        day.day === selectedDay
          ? { ...day, food: day.food.filter((_, i) => i !== index) }
          : day
      );
      setMenu(updatedMenu);
      localStorage.setItem("werandaMenuData", JSON.stringify(updatedMenu));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "approved":
      case "confirmed":
      case "read":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-900";
      case "approved":
      case "confirmed":
      case "read":
        return "bg-green-100 text-green-900";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <div className="container py-20 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-5xl font-bold">Admin Panel</h1>
        <Button
          onClick={handleLogout}
          className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Odhlásiť sa
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent h-auto p-0 gap-4">
          <TabsTrigger 
            value="menu" 
            className="text-lg font-mono uppercase border-2 border-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] data-[state=active]:shadow-none"
          >
            Menu
          </TabsTrigger>
          <TabsTrigger 
            value="submissions" 
            className="text-lg font-mono uppercase border-2 border-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] data-[state=active]:shadow-none"
          >
            Zápisov ({submissions.events.length + submissions.messages.length + submissions.reservations.length})
          </TabsTrigger>
        </TabsList>

        {/* Menu Tab */}
        <TabsContent value="menu" className="space-y-8">
          <div className="bg-background border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-bold text-lg mb-4 uppercase tracking-widest">Vyberte deň</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {weeklyMenu.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`p-3 font-mono font-bold uppercase text-sm rounded-none border-2 transition-all ${
                    selectedDay === day.day
                      ? "bg-accent text-accent-foreground border-accent shadow-[4px_4px_0px_0px_rgba(0,168,150,1)]"
                      : "bg-transparent border-foreground hover:bg-foreground/5"
                  }`}
                >
                  {day.day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Drinks Management */}
            <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-xl mb-4 uppercase">Nápoje</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {currentDayMenu?.drinks.map((drink, index) => (
                  <div key={index} className="flex justify-between items-start gap-2 p-2 bg-foreground/5 border border-foreground/20">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{drink.name}</p>
                      <p className="text-xs opacity-70">{drink.desc}</p>
                      <p className="text-sm font-mono">{drink.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveDrink(index)}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-foreground/20 pt-4">
                <Input
                  placeholder="Názov nápoja"
                  value={newDrink.name}
                  onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
                  className="rounded-none border-2 border-foreground bg-transparent"
                />
                <Input
                  placeholder="Cena (napr. 2,50 €)"
                  value={newDrink.price}
                  onChange={(e) => setNewDrink({ ...newDrink, price: e.target.value })}
                  className="rounded-none border-2 border-foreground bg-transparent"
                />
                <Input
                  placeholder="Popis"
                  value={newDrink.desc}
                  onChange={(e) => setNewDrink({ ...newDrink, desc: e.target.value })}
                  className="rounded-none border-2 border-foreground bg-transparent"
                />
                <Button
                  onClick={handleAddDrink}
                  className="w-full rounded-none bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Pridať
                </Button>
              </div>
            </div>

            {/* Food Management */}
            <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-xl mb-4 uppercase">Jedlo</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {currentDayMenu?.food.map((food, index) => (
                  <div key={index} className="flex justify-between items-start gap-2 p-2 bg-foreground/5 border border-foreground/20">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{food.name}</p>
                      <p className="text-xs opacity-70">{food.desc}</p>
                      <p className="text-sm font-mono">{food.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFood(index)}
                      className="text-destructive hover:text-destructive/80 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-foreground/20 pt-4">
                <Input
                  placeholder="Názov jedla"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  className="rounded-none border-2 border-foreground bg-transparent"
                />
                <Input
                  placeholder="Cena (napr. 8,90 €)"
                  value={newFood.price}
                  onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                  className="rounded-none border-2 border-foreground bg-transparent"
                />
                <Input
                  placeholder="Popis"
                  value={newFood.desc}
                  onChange={(e) => setNewFood({ ...newFood, desc: e.target.value })}
                  className="rounded-none border-2 border-foreground bg-transparent"
                />
                <Button
                  onClick={handleAddFood}
                  className="w-full rounded-none bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Pridať
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-accent text-accent-foreground">
              <h2 className="font-bold text-xl mb-4 uppercase">Informácie</h2>
              <p className="font-mono text-sm leading-relaxed mb-4">
                Zmeny sa ukladajú automaticky do prehliadača.
              </p>
              <p className="font-mono text-xs opacity-80">
                Heslo: {process.env.NODE_ENV === "development" ? "weranda2024" : "***"}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-8">
          <div className="grid gap-8">
            {/* Events */}
            <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-4 uppercase">Žiadosti o podujatia ({submissions.events.length})</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submissions.events.length === 0 ? (
                  <p className="text-center opacity-60 font-mono">Žiadne žiadosti</p>
                ) : (
                  submissions.events.map((event) => (
                    <div key={event.id} className="border border-foreground/20 p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{event.name}</p>
                          <p className="text-sm opacity-70">{event.email} | {event.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(event.status)}
                          <span className={`text-xs px-2 py-1 ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm"><strong>Typ:</strong> {event.eventType}</p>
                      <p className="text-sm"><strong>Dátum:</strong> {event.date}</p>
                      <p className="text-sm opacity-80">{event.description}</p>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateEventStatus(event.id, "approved");
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-green-600 hover:bg-green-700 text-white"
                        >
                          Schváliť
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            updateEventStatus(event.id, "rejected");
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-red-600 hover:bg-red-700 text-white"
                        >
                          Odmietnuť
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            deleteSubmission("event", event.id);
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-destructive hover:bg-destructive/90 text-white"
                        >
                          Vymazať
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-4 uppercase">Správy z kontaktu ({submissions.messages.length})</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submissions.messages.length === 0 ? (
                  <p className="text-center opacity-60 font-mono">Žiadne správy</p>
                ) : (
                  submissions.messages.map((msg) => (
                    <div key={msg.id} className="border border-foreground/20 p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{msg.name}</p>
                          <p className="text-sm opacity-70">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(msg.status)}
                          <span className={`text-xs px-2 py-1 ${getStatusColor(msg.status)}`}>
                            {msg.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm opacity-80">{msg.message}</p>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateMessageStatus(msg.id, "read");
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-green-600 hover:bg-green-700 text-white"
                        >
                          Prečítané
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            deleteSubmission("message", msg.id);
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-destructive hover:bg-destructive/90 text-white"
                        >
                          Vymazať
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Reservations */}
            <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-bold text-2xl mb-4 uppercase">Rezervácie ({submissions.reservations.length})</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submissions.reservations.length === 0 ? (
                  <p className="text-center opacity-60 font-mono">Žiadne rezervácie</p>
                ) : (
                  submissions.reservations.map((res) => (
                    <div key={res.id} className="border border-foreground/20 p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{res.name}</p>
                          <p className="text-sm opacity-70">{res.email} | {res.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(res.status)}
                          <span className={`text-xs px-2 py-1 ${getStatusColor(res.status)}`}>
                            {res.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm"><strong>Dátum:</strong> {res.date} o {res.time}</p>
                      <p className="text-sm"><strong>Počet osôb:</strong> {res.guests}</p>
                      {res.specialRequests && <p className="text-sm opacity-80">{res.specialRequests}</p>}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateReservationStatus(res.id, "confirmed");
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-green-600 hover:bg-green-700 text-white"
                        >
                          Potvrdiť
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            updateReservationStatus(res.id, "cancelled");
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-red-600 hover:bg-red-700 text-white"
                        >
                          Zrušiť
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            deleteSubmission("reservation", res.id);
                            setSubmissions(getSubmissions());
                          }}
                          className="rounded-none bg-destructive hover:bg-destructive/90 text-white"
                        >
                          Vymazať
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
