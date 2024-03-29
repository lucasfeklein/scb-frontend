import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="about image"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Não precisa saber programar
                </h3>
                <p className="text-base font-medium leading-relaxed text-[#959CB1] sm:text-lg sm:leading-relaxed">
                  Você não precisa ter nenhuma habilidade de programação para
                  construir o chatbot. Basta inserir uma tag de script no seu
                  website.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Respostas específicas
                </h3>
                <p className="text-base font-medium leading-relaxed text-[#959CB1] sm:text-lg sm:leading-relaxed">
                  O chatbot responde apenas com base nos dados fornecidos.
                  Portanto, você sempre obtém resultados precisos.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Integração fácil
                </h3>
                <p className="text-base font-medium leading-relaxed text-[#959CB1] sm:text-lg sm:leading-relaxed">
                  Leva apenas alguns minutos para criar, treinar e adicionar um
                  chatbot ao seu website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
