import type { Metadata } from "next";
import { Suspense } from "react";
import PriceCalculator from "../../components/PriceCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Preço",
  description:
    "Simule o investimento do seu portão sob medida: escolha tipo, medidas, material e automação, e receba uma estimativa instantânea.",
};

export default function CalculadoraPage() {
  return (
    <div className="container-baroli py-16 lg:py-24">
      <p className="eyebrow mb-4">Configurador de orçamento</p>
      <h1 className="font-display text-5xl sm:text-6xl mb-4">
        Calculadora de preço
      </h1>
      <p className="text-white/60 max-w-2xl mb-14">
        Preencha os campos abaixo e receba uma estimativa de investimento na
        hora. Depois, envie a simulação direto para o nosso WhatsApp.
      </p>

      <Suspense fallback={null}>
        <PriceCalculator />
      </Suspense>
    </div>
  );
}
