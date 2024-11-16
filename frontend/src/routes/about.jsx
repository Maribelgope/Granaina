import 'tailwindcss/tailwind.css';
import Header from "../COMPONENTES/header.jsx";
import Footer from "../COMPONENTES/footer.jsx";

function AboutUs() {
  const links = [
    { name: "Compromiso con Granada", href: "#" },
    { name: "Oportunidades para Emprendedores/as", href: "#" },
    { name: "Nuestros valores", href: "#" },
    { name: "Conoce a nuestro equipo", href: "#" },
  ];

  const stats = [
    { name: "Nuestras tiendas", value: "12" },
    { name: "Equipo en  crecimiento", value: "300+" },
    { name: "Dedicación  a nuestros clientes", value: "40" },
    { name: "Compromiso  con  la ética empresarial", value: "Unlimited" },
  ];

  return (
    <div className="App">
      <Header />
        <div className="relative isolate overflow-hidden bg-white-300 py-24 sm:py-32">
          <img
          src="https://images.unsplash.com/photo-1714834722006-e07485788cde?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent -z-10"></div>
            <div
              className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                style={{
                clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
              </div>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-black bg-opacity-50 p-4 rounded-lg">
                    Quiénes somos
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300 bg-black bg-opacity-50 p-4 rounded-lg">
                  Somos un equipo apasionado de la ciudad de Granada, 
                  comprometido con impulsar la venta de productos locales que abarcan
                  desde artículos para el hogar e indumentaria hasta tecnología y mucho más. 
                  Creemos en la calidad y en apoyar a nuestra comunidad ofreciendo una variedad de categorías que reflejan el talento y la dedicación de nuestros productores locales.
                  </p>  
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                    {links.map((link) => (
                      <a key={link.name} href={link.href}>
                      {link.name} <span aria-hidden="true">&rarr;</span>
                      </a>
                    ))}
                  </div>
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-300">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
                </dl>
              </div>
            </div>
   {/* Seccion 2 Simple Grid */}
   <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Calidad local,  compromiso local
            </h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
            Nuestro compromiso es con la comunidad y el talento local, ofreciendo productos de calidad
             que representan el espíritu de Granada. Creemos en la colaboración y el apoyo a nuestros productores 
             y productoras locales, asegurándonos de llevar lo mejor de nuestra región a cada hogar
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Clientes satisfechos
                </dt>

                <dd className="text-4xl font-extrabold text-[#a23e48] md:text-5xl">
                  1.7k
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Productores y productoras locales
                </dt>

                <dd className="text-4xl font-extrabold text-[#a23e48] md:text-5xl">
                  73
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Productos exclusivos de Granada
                </dt>

                <dd className="text-4xl font-extrabold text-[#a23e48] md:text-5xl">
                  120
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
          
{/* Enlaces a cada sección al inicio de la página NUEVOS CONTENIDOS EN ABOUT */}

<nav className="flex justify-center space-x-8 my-8">
  <a href="#compromiso" className="text-white hover:text-red-400">Compromiso con Granada</a>
  <a href="#oportunidades" className="text-white hover:text-red-400">Oportunidades para emprendedores</a>
  <a href="#valores" className="text-white hover:text-red-400">Nuestros valores</a>
  <a href="#equipo" className="text-white hover:text-red-400">Conoce a nuestro equipo</a>
</nav>
      <Footer />
    </div>
  );
}

export default AboutUs;
