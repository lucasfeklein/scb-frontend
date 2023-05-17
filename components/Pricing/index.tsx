"use client";
import Script from "next/script";
import SectionTitle from "../Common/SectionTitle";

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <Script src="https://js.stripe.com/v3/pricing-table.js" />

      <div className="container">
        <SectionTitle
          title="Escolha o melhor plano"
          paragraph="Escolha um dos nossos planos e comece a automatizar as suas conversas com os clientes."
          center
          width="665px"
        />

        <stripe-pricing-table
          pricing-table-id="prctbl_1N8bSdHMjqTlDAUmPLxnEf4G"
          publishable-key="pk_test_51N8ZxpHMjqTlDAUm6p27WVpm4eXoL4YcTQPLP1OvjNvO4X5TuONJybkHTE0kwISmyW6PzLQhKhBD8CLgKQdP8NwO00khZaKikJ"
        ></stripe-pricing-table>
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
