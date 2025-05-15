import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO CON VIDEO */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          src="/imagenes/HERO.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            FUNDECODES
          </h1>
          <p style={{ fontSize: "1.25rem" }}>
            Transformando comunidades con compromiso social
          </p>
        </div>
      </div>

      {/* ¿QUIÉNES SOMOS? */}
      <section className="px-6 py-12 bg-white text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">¿Quiénes somos?</h2>
        <p>
          Somos una organización sin fines de lucro dedicada a mejorar la calidad de vida de comunidades vulnerables mediante proyectos sociales, voluntariado y donaciones.
        </p>
      </section>

      {/* VISIÓN Y MISIÓN */}
    {/* VISIÓN Y MISIÓN */}
<section className="px-6 py-12 bg-gray-50 text-gray-800">
  <div className="max-w-screen-xl mx-auto">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Visión</h2>
      <p>
        Ser una organización líder en el desarrollo de iniciativas solidarias que generen impacto positivo en la sociedad.
      </p>
    </div>

    
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Misión</h2>
      <p>
        Fomentar la participación ciudadana mediante programas de voluntariado y donaciones, promoviendo la equidad y el desarrollo comunitario.
      </p>
    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p className="text-sm">© 2025 Tu Organización. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;