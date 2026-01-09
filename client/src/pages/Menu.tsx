import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { weeklyMenu, getTodayMenu } from "@/lib/menuData";

export default function Menu() {
  const [selectedDay, setSelectedDay] = useState(getTodayMenu().day);
  const currentMenu = weeklyMenu.find(m => m.day === selectedDay) || weeklyMenu[0];

  return (
    <div className="container py-20 max-w-5xl">
      <h1 className="font-serif text-5xl md:text-7xl font-bold text-center mb-12">MENU</h1>
      
      <div className="space-y-8">
        {/* Day Selector */}
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

        {/* Current Day Menu */}
        <div className="space-y-8">
          <h2 className="font-serif text-4xl font-bold text-center uppercase tracking-tight">
            Menu - {currentMenu.day}
          </h2>

          <Tabs defaultValue="drinks" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-transparent h-auto p-0 gap-4">
              <TabsTrigger 
                value="drinks" 
                className="text-xl font-mono uppercase border-2 border-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] data-[state=active]:shadow-none"
              >
                Nápoje
              </TabsTrigger>
              <TabsTrigger 
                value="food" 
                className="text-xl font-mono uppercase border-2 border-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] data-[state=active]:shadow-none"
              >
                Jedlo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="drinks" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {currentMenu.drinks.length > 0 ? (
                currentMenu.drinks.map((item, index) => (
                  <div key={index} className="flex justify-between items-end border-b-2 border-dotted border-foreground/30 pb-4 group hover:bg-accent/5 p-2 transition-colors">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl uppercase tracking-wide">{item.name}</h3>
                      <p className="text-sm font-mono opacity-70">{item.desc}</p>
                    </div>
                    <span className="font-bold text-xl font-mono">{item.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-center font-mono opacity-60">Dnes nie sú nápoje v ponuke</p>
              )}
            </TabsContent>

            <TabsContent value="food" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {currentMenu.food.length > 0 ? (
                currentMenu.food.map((item, index) => (
                  <div key={index} className="flex justify-between items-end border-b-2 border-dotted border-foreground/30 pb-4 group hover:bg-accent/5 p-2 transition-colors">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl uppercase tracking-wide">{item.name}</h3>
                      <p className="text-sm font-mono opacity-70">{item.desc}</p>
                    </div>
                    <span className="font-bold text-xl font-mono">{item.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-center font-mono opacity-60">Dnes nie je jedlo v ponuke</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
