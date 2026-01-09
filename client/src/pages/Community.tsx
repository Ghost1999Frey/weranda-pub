import { Heart, Users, Bike } from "lucide-react";

export default function Community() {
  const reviews = [
    {
      author: "Mária",
      role: "Návštevníčka",
      text: "Weranda je úžasné miesto! Cítim sa tu bezpečne a prijatá. Všetci sú tu vítaní.",
      rating: 5
    },
    {
      author: "Jozef",
      role: "Cyklista",
      description: "Člen CykloKuchiny",
      text: "Ideálne miesto na oddych počas cyklovýletu. Dobrý alkohol a super atmosféra!",
      rating: 5
    },
    {
      author: "Petra",
      role: "Mamička",
      text: "Prišla som sem s deťmi a boli sme prekvapení, aké je to priateľské. Všetci sme sa cítili vítaní.",
      rating: 5
    },
    {
      author: "Lukáš",
      role: "Hudobník",
      text: "Weranda je domov pre všetkých, ktorí chcú byť sami sebou. Ďakujeme za tento priestor!",
      rating: 5
    }
  ];

  return (
    <div className="container py-20">
      <div className="space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold">KOMUNITA</h1>
          <div className="w-full h-1 bg-foreground"></div>
          <p className="font-mono text-lg max-w-3xl mx-auto">
            Weranda je pre všetkých. Bez ohľadu na to, kto si, odkiaľ si, alebo čo si myslíš - tu si vítaný.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-2 border-foreground p-8 bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,168,150,1)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-accent" />
              <h2 className="font-bold text-2xl uppercase">LGBTQ+ Priestor</h2>
            </div>
            <p className="font-mono leading-relaxed">
              Weranda je bezpečný a inkluzívny priestor pre LGBTQ+ komunitu. Všetci sú tu akceptovaní a rešpektovaní. Pravidelne organizujeme podujatia zamerané na našu komunitu.
            </p>
          </div>

          <div className="border-2 border-foreground p-8 bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,168,150,1)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Bike className="h-8 w-8 text-accent" />
              <h2 className="font-bold text-2xl uppercase">Cyklisti</h2>
            </div>
            <p className="font-mono leading-relaxed">
              Nachádzame sa vedľa populárnej cyklotrasy v Bratislave. Ideálne miesto na oddych počas jazdy. Spolupracujeme s CykloKuchinou a cyklokoalíciou.
            </p>
          </div>

          <div className="border-2 border-foreground p-8 bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,168,150,1)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-accent" />
              <h2 className="font-bold text-2xl uppercase">Všetci Ľudia</h2>
            </div>
            <p className="font-mono leading-relaxed">
              Rodinám, študentom, pracujúcim, starším ľuďom - všetci sú tu vítaní. Weranda je miesto, kde sa stretávajú rôzne generácie a komunity.
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center">SKÚSENOSTI NÁVŠTEVNÍKOV</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-2 border-foreground p-6 bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{review.author}</h3>
                    <p className="text-sm font-mono opacity-70">{review.role}</p>
                    {review.description && (
                      <p className="text-xs font-mono opacity-60 italic">{review.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                </div>
                <p className="font-mono italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-accent text-accent-foreground border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <h2 className="font-bold text-2xl mb-4 uppercase tracking-widest">Chcete zdieľať svoju skúsenosť?</h2>
          <p className="font-mono mb-6">
            Napíšte nám vašu recenziu alebo skúsenosť. Chceme počuť, ako sa cítite v Werande.
          </p>
          <a
            href="/kontakty"
            className="inline-block bg-background text-foreground font-bold uppercase px-6 py-3 rounded-none border-2 border-background hover:bg-transparent hover:text-background transition-colors"
          >
            Napíšte nám
          </a>
        </div>
      </div>
    </div>
  );
}
