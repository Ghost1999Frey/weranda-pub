import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Save, Plus, Trash2 } from "lucide-react";
import { weeklyMenu } from "@/lib/menuData";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [selectedDay, setSelectedDay] = useState("Pondelok");
  const [menu, setMenu] = useState(weeklyMenu);
  const [newDrink, setNewDrink] = useState({ name: "", price: "", desc: "" });
  const [newFood, setNewFood] = useState({ name: "", price: "", desc: "" });

  useEffect(() => {
    const token = localStorage.getItem("werandaAdminToken");
    if (!token) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

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

  return (
    <div className="container py-20 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-5xl font-bold">Admin Panel</h1>
        <Button
          onClick={handleLogout}
          className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Odhlásiť sa
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Day Selector */}
        <div className="md:col-span-3">
          <h2 className="font-bold text-xl mb-4 uppercase">Vyberte deň</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {weeklyMenu.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`p-3 font-mono font-bold uppercase text-sm rounded-none border-2 transition-all ${
                  selectedDay === day.day
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent border-foreground hover:bg-foreground/5"
                }`}
              >
                {day.day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Drinks Management */}
        <div className="border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-bold text-xl mb-4 uppercase">Nápoje</h2>
          <div className="space-y-4 mb-6">
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
          <div className="space-y-4 mb-6">
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
            Zmeny sa ukladajú automaticky do prehliadača. Ak chcete zmeny trvale uložiť na server, kontaktujte vývojára.
          </p>
          <p className="font-mono text-xs opacity-80">
            Heslo: {process.env.NODE_ENV === "development" ? "weranda2024" : "***"}
          </p>
        </div>
      </div>
    </div>
  );
}
