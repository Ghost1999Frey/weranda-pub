export interface MenuItem {
  name: string;
  price: string;
  desc: string;
}

export interface DayMenu {
  day: string;
  drinks: MenuItem[];
  food: MenuItem[];
}

export const weeklyMenu: DayMenu[] = [
  {
    day: "Pondelok",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Kofola", price: "1,50 €", desc: "0,5l čapovaná" },
    ],
    food: [
      { name: "Nakladaný Hermelín", price: "4,50 €", desc: "S cibuľkou a chlebom" },
      { name: "Hranolky", price: "3,00 €", desc: "S domácim dresingom" },
    ]
  },
  {
    day: "Utorok",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Punk IPA", price: "3,20 €", desc: "Remeselné pivo" },
      { name: "Borovička", price: "2,50 €", desc: "Tradičný slovenský nápoj" },
    ],
    food: [
      { name: "Utopenec", price: "3,50 €", desc: "Klasika s feferónkou" },
      { name: "Burger Weranda", price: "8,90 €", desc: "Hovädzie mäso, cheddar, slanina" },
      { name: "Parenice", price: "4,20 €", desc: "Tradičné slovenské parenice" },
    ]
  },
  {
    day: "Streda",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Kofola", price: "1,50 €", desc: "0,5l čapovaná" },
      { name: "Domáca Limonáda", price: "2,80 €", desc: "Podľa dennej ponuky" },
    ],
    food: [
      { name: "Chlieb s maslom a cesnakom", price: "2,50 €", desc: "Domáci chlieb" },
      { name: "Nakladaný Hermelín", price: "4,50 €", desc: "S cibuľkou a chlebom" },
      { name: "Burger Weranda", price: "8,90 €", desc: "Hovädzie mäso, cheddar, slanina" },
    ]
  },
  {
    day: "Štvrtok",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Punk IPA", price: "3,20 €", desc: "Remeselné pivo" },
      { name: "Fernet Stock", price: "2,00 €", desc: "Klasika" },
    ],
    food: [
      { name: "Parenice", price: "4,20 €", desc: "Tradičné slovenské parenice" },
      { name: "Utopenec", price: "3,50 €", desc: "Klasika s feferónkou" },
      { name: "Hranolky", price: "3,00 €", desc: "S domácim dresingom" },
    ]
  },
  {
    day: "Piatok",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Punk IPA", price: "3,20 €", desc: "Remeselné pivo" },
      { name: "Borovička", price: "2,50 €", desc: "Tradičný slovenský nápoj" },
      { name: "Domáca Limonáda", price: "2,80 €", desc: "Podľa dennej ponuky" },
    ],
    food: [
      { name: "Burger Weranda", price: "8,90 €", desc: "Hovädzie mäso, cheddar, slanina" },
      { name: "Parenice", price: "4,20 €", desc: "Tradičné slovenské parenice" },
      { name: "Utopenec", price: "3,50 €", desc: "Klasika s feferónkou" },
      { name: "Nakladaný Hermelín", price: "4,50 €", desc: "S cibuľkou a chlebom" },
    ]
  },
  {
    day: "Sobota",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Punk IPA", price: "3,20 €", desc: "Remeselné pivo" },
      { name: "Fernet Stock", price: "2,00 €", desc: "Klasika" },
      { name: "Borovička", price: "2,50 €", desc: "Tradičný slovenský nápoj" },
    ],
    food: [
      { name: "Burger Weranda", price: "8,90 €", desc: "Hovädzie mäso, cheddar, slanina" },
      { name: "Parenice", price: "4,20 €", desc: "Tradičné slovenské parenice" },
      { name: "Chlieb s maslom a cesnakom", price: "2,50 €", desc: "Domáci chlieb" },
      { name: "Utopenec", price: "3,50 €", desc: "Klasika s feferónkou" },
      { name: "Hranolky", price: "3,00 €", desc: "S domácim dresingom" },
    ]
  },
  {
    day: "Nedeľa",
    drinks: [
      { name: "Pivo Čapované", price: "2,50 €", desc: "Ležiak 12°" },
      { name: "Kofola", price: "1,50 €", desc: "0,5l čapovaná" },
      { name: "Domáca Limonáda", price: "2,80 €", desc: "Podľa dennej ponuky" },
    ],
    food: [
      { name: "Nakladaný Hermelín", price: "4,50 €", desc: "S cibuľkou a chlebom" },
      { name: "Parenice", price: "4,20 €", desc: "Tradičné slovenské parenice" },
      { name: "Burger Weranda", price: "8,90 €", desc: "Hovädzie mäso, cheddar, slanina" },
    ]
  }
];

export const getAllDrinks = (): MenuItem[] => {
  const drinksSet = new Map<string, MenuItem>();
  weeklyMenu.forEach(day => {
    day.drinks.forEach(drink => {
      if (!drinksSet.has(drink.name)) {
        drinksSet.set(drink.name, drink);
      }
    });
  });
  return Array.from(drinksSet.values());
};

export const getAllFood = (): MenuItem[] => {
  const foodSet = new Map<string, MenuItem>();
  weeklyMenu.forEach(day => {
    day.food.forEach(food => {
      if (!foodSet.has(food.name)) {
        foodSet.set(food.name, food);
      }
    });
  });
  return Array.from(foodSet.values());
};

export const getTodayMenu = (): DayMenu => {
  const days = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
  const today = new Date().getDay();
  return weeklyMenu.find(m => m.day === days[today]) || weeklyMenu[0];
};
