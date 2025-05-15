import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO CON VIDEO */}
      <div className="relative h-screen w-full overflow-hidden">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src="/imagenes/HERO.mp4"
    autoPlay
    loop
    muted
    playsInline
  />
</div>


      {/* ¿QUIÉNES SOMOS? */}
      <section className="px-6 py-16 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">¿Quiénes somos?</h2>
          <p className="text-lg leading-relaxed">
            Somos una organización sin fines de lucro dedicada a mejorar la calidad de vida
            de comunidades vulnerables mediante proyectos sociales, voluntariado y donaciones.
          </p>
        </div>
      </section>

      {/* VISIÓN Y MISIÓN */}
      <section className="px-6 py-16 bg-gray-100 text-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 border-l-4 border-blue-600 pl-3">Visión</h3>
            <p className="text-lg leading-relaxed">
              Ser una organización líder en el desarrollo de iniciativas solidarias que generen impacto positivo en la sociedad.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 border-l-4 border-blue-600 pl-3">Misión</h3>
            <p className="text-lg leading-relaxed">
              Fomentar la participación ciudadana mediante programas de voluntariado y donaciones, promoviendo la equidad y el desarrollo comunitario.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-6 text-center mt-auto">
        <p className="text-sm">&copy; 2025 FUNDECODES. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;