export default function Partners() {
  const partners = [
    {
      name: "CykloKuchina",
      description: "Komunita milovníkov cyklistiky a zdravého životného štýlu. Spájame ľudí cez bicykle a dobrú stravu.",
      link: "#"
    },
    {
      name: "Cyklokoalícia",
      description: "Organizácia na podporu cyklistiky v Bratislave. Budujeme bezpečnejšie mestá pre všetkých.",
      link: "#"
    },
    {
      name: "Bratislavská cyklotrasa",
      description: "Vedľa našej lokality prebieha populárna cyklotrasa. Weranda je ideálnym miestom na oddych.",
      link: "#"
    },
    {
      name: "Lokálne komunity",
      description: "Spolupracujeme s rôznymi komunitami - od cyklistov cez LGBTQ+ až po rodinné skupiny.",
      link: "#"
    }
  ];

  return (
    <div className="container py-20">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold">PARTNERI</h1>
          <div className="w-full h-1 bg-foreground"></div>
          <p className="font-mono text-lg max-w-2xl mx-auto">
            Weranda spolupracuje s rôznymi komunitami a organizáciami. Sme miestom stretávania pre všetkých.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="border-2 border-foreground p-6 bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,168,150,1)] transition-all duration-300 group"
            >
              <h3 className="font-bold text-2xl mb-3 uppercase group-hover:text-accent transition-colors">
                {partner.name}
              </h3>
              <p className="font-mono text-base leading-relaxed mb-4">
                {partner.description}
              </p>
              <a
                href={partner.link}
                className="inline-block font-bold uppercase text-sm tracking-widest text-accent hover:text-foreground transition-colors"
              >
                Viac informácií →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-accent text-accent-foreground border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-bold text-2xl mb-4 uppercase tracking-widest">Chcete byť našim partnerom?</h2>
          <p className="font-mono mb-6">
            Weranda je otvená pre spoluprácu s komunitami, organizáciami a iniciatívami. 
            Kontaktujte nás a poďme spolu budovať lepšiu komunitu.
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
