"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Escolha o melhor plano"
          paragraph="Escolha um dos nossos planos e comece a automatizar as suas conversas com os clientes."
          center
          width="665px"
        />

        <div className="w-full">
          <div
            className="wow fadeInUp mb-8 flex justify-center md:mb-12 lg:mb-16"
            data-wow-delay=".1s"
          >
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-blue-600"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Mensal
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-blue-600"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Anual
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Básico"
            price={isMonthly ? "99" : "1089"}
            duration={isMonthly ? "mês" : "ano"}
            subtitle="Treine seu chatbot com até 25 páginas web"
            link={
              isMonthly
                ? "https://buy.stripe.com/test_aEU3d9gyJ1p65s46os"
                : "https://buy.stripe.com/test_14k5lh5U53xe4o06ot"
            }
          >
            <OfferList text="1 chatbot" status="active" />
            <OfferList text="25 páginas web" status="active" />
          </PricingBox>
          <PricingBox
            packageName="Pro"
            price={isMonthly ? "179" : "1969"}
            duration={isMonthly ? "mês" : "ano"}
            subtitle="Treine seu chatbot com até 100 páginas web"
            link={
              isMonthly
                ? "https://buy.stripe.com/test_cN29Bx1DP2tag6IeUW"
                : "https://buy.stripe.com/test_cN2fZV3LX0l21bO9AD"
            }
          >
            <OfferList text="1 chatbot" status="active" />
            <OfferList text="100 páginas web" status="active" />
          </PricingBox>
          <PricingBox
            packageName="Enterprise"
            price={isMonthly ? "499" : "5489"}
            duration={isMonthly ? "mês" : "ano"}
            subtitle="Treine seu chatbot com até 500 páginas web"
            link={
              isMonthly
                ? "https://buy.stripe.com/test_fZedRN1DP6JqdYAeUU"
                : "https://buy.stripe.com/test_5kA2954Q1c3K8Eg9AB"
            }
          >
            <OfferList text="1 chatbot" status="active" />
            <OfferList text="500 páginas web" status="active" />
          </PricingBox>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
