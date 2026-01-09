import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menuItems = {
  drinks: [
    { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
    { name: "Punk IPA", price: "3,20 €", desc: "Remeselné pivo" },
    { name: "Kofola", price: "1,50 €", desc: "0,5l čapovaná" },
    { name: "Domáca Limonáda", price: "2,80 €", desc: "Podľa dennej ponuky" },
    { name: "Fernet Stock", price: "2,00 €", desc: "Klasika" },
    { name: "Borovička", price: "2,50 €", desc: "Tradičný slovenský nápoj" },
  ],
  food: [
    { name: "Nakladaný Hermelín", price: "4,50 €", desc: "S cibuľkou a chlebom" },
    { name: "Utopenec", price: "3,50 €", desc: "Klasika s feferónkou" },
    { name: "Hranolky", price: "3,00 €", desc: "S domácim dresingom" },
    { name: "Burger Weranda", price: "8,90 €", desc: "Hovädzie mäso, cheddar, slanina" },
    { name: "Parenice", price: "4,20 €", desc: "Tradičné slovenské parenice" },
    { name: "Chlieb s maslom a cesnakom", price: "2,50 €", desc: "Domáci chlieb" },
  ]
};

export default function Menu() {
  return (
    <div className="container py-20 max-w-4xl">
      <h1 className="font-serif text-5xl md:text-7xl font-bold text-center mb-12">MENU</h1>
      
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
        
        {Object.entries(menuItems).map(([category, items]) => (
          <TabsContent key={category} value={category} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-end border-b-2 border-dotted border-foreground/30 pb-4 group hover:bg-accent/5 p-2 transition-colors">
                <div className="space-y-1">
                  <h3 className="font-bold text-xl uppercase tracking-wide">{item.name}</h3>
                  <p className="text-sm font-mono opacity-70">{item.desc}</p>
                </div>
                <span className="font-bold text-xl font-mono">{item.price}</span>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
