export default function About() {
  return (
    <div className="container py-20 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold">O NAS</h1>
          <div className="w-full h-1 bg-foreground"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-muted relative border-2 border-foreground p-2 rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-full h-full bg-accent/20 flex items-center justify-center overflow-hidden">
               {/* Placeholder for an image */}
               <span className="font-mono text-sm opacity-50">Fotografia priestoru</span>
            </div>
          </div>
          
          <div className="space-y-6 font-mono text-lg">
            <p>
              Weranda nie je len obyčajný bufet. Je to miesto, kde sa stretáva punk kultúra, hudba a dobré jedlo.
            </p>
            <p>
              Nachádzame sa na bratislavskej Petržalke, kde poskytujeme útočisko pre všetkých milovníkov punk-rocku, 
              alternatívnej scény a slobody.
            </p>
            <p>
              Naša ponuka zahŕňa kvalitné nápoje, chutné jedlo a pravidelné koncerty. Weranda je komunita, nie len podnik.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 marker:text-accent">
              <li>Živé koncerty a punk-rock podujatia</li>
              <li>Autentická punk atmosféra</li>
              <li>Kvalitné pivo a nápoje</li>
              <li>Otvorené celoročne</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
