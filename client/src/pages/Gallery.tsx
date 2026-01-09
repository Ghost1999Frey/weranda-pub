export default function Gallery() {
  // Placeholder images
  const images = Array.from({ length: 6 }).map((_, i) => i);

  return (
    <div className="container py-20">
      <h1 className="font-serif text-5xl md:text-7xl font-bold text-center mb-12">GALÉRIA</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((i) => (
          <div key={i} className="group relative aspect-square border-2 border-foreground bg-muted overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,168,150,1)] transition-all duration-300">
            <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 text-white font-mono">
              <span>Photo {i + 1}</span>
            </div>
            {/* Actual image would go here */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-mono text-4xl">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
