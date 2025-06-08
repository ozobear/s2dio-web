export default function SimpleHeader() {
  return (
    <header className="bg-black text-white p-4 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold gradient-text">S2dio</h1>
        <nav className="space-x-6">
          <a href="#nosotros" className="hover:text-orange-400">Nosotros</a>
          <a href="#proyectos" className="hover:text-orange-400">Proyectos</a>
          <a href="#servicios" className="hover:text-orange-400">Servicios</a>
          <a href="#equipo" className="hover:text-orange-400">Equipo</a>
        </nav>
      </div>
    </header>
  )
}