"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  calcularOrcamento,
  formatarReais,
  MOTORES,
  type LinhaPortao,
  type MaterialPortao,
  type TipoPortao,
} from "../lib/pricing";
import { linkWhatsApp, mensagemOrcamento } from "../lib/whatsapp";

const TIPOS: { valor: TipoPortao; nome: string }[] = [
  { valor: "basculante", nome: "Basculante" },
  { valor: "deslizante", nome: "Deslizante" },
  { valor: "pivotante", nome: "Pivotante" },
];

const LINHAS: { valor: LinhaPortao; nome: string }[] = [
  { valor: "padrao", nome: "Linha Padrão" },
  { valor: "especial", nome: "Linha Especial" },
  { valor: "prime", nome: "Linha Prime" },
];

const MATERIAIS: { valor: MaterialPortao; nome: string }[] = [
  { valor: "ferro", nome: "Ferro" },
  { valor: "aco", nome: "Aço" },
];

const CORES = ["Branco", "Cinza Grafite"];

export default function PriceCalculator() {
  const searchParams = useSearchParams();
  const linhaInicial = (searchParams.get("linha") as LinhaPortao) || "padrao";

  const [tipo, setTipo] = useState<TipoPortao>("basculante");
  const [linha, setLinha] = useState<LinhaPortao>(linhaInicial);
  const [material, setMaterial] = useState<MaterialPortao>("ferro");
  const [largura, setLargura] = useState(4);
  const [altura, setAltura] = useState(2.2);
  const [cor, setCor] = useState(CORES[0]);
  const [automatico, setAutomatico] = useState(false);
  const [motorId, setMotorId] = useState(MOTORES[0].id);
  const [instalacao, setInstalacao] = useState(true);
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");

  const resultado = useMemo(
    () =>
      calcularOrcamento({
        tipo,
        linha,
        material,
        largura,
        altura,
        automatico,
        motorId,
        instalacao,
      }),
    [tipo, linha, material, largura, altura, automatico, motorId, instalacao]
  );

  const linhaNome = LINHAS.find((l) => l.valor === linha)?.nome ?? linha;
  const tipoNome = TIPOS.find((t) => t.valor === tipo)?.nome ?? tipo;
  const materialNome =
    MATERIAIS.find((m) => m.valor === material)?.nome ?? material;
  const motorNome = MOTORES.find((m) => m.id === motorId)?.nome ?? "";

  const whatsappHref = linkWhatsApp(
    mensagemOrcamento({
      tipo: tipoNome,
      linha: linhaNome,
      largura: largura.toString(),
      altura: altura.toString(),
      material: materialNome,
      cor,
      automatico: automatico ? "Sim" : "Não",
      motor: automatico ? motorNome : "",
      instalacao: instalacao ? "Sim" : "Não",
      cidade: cidade || "Não informado",
      cep: cep || "Não informado",
      valorEstimado: formatarReais(resultado.total),
    })
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      {/* FORM */}
      <div className="lg:col-span-3 space-y-8">
        <Field label="Tipo de portão">
          <SegmentGroup options={TIPOS} value={tipo} onChange={setTipo} />
        </Field>

        <Field label="Linha">
          <SegmentGroup options={LINHAS} value={linha} onChange={setLinha} />
        </Field>

        <Field label="Material">
          <SegmentGroup
            options={MATERIAIS}
            value={material}
            onChange={setMaterial}
          />
        </Field>

        <div className="grid grid-cols-2 gap-6">
          <Field label={`Largura: ${largura.toFixed(1)}m`}>
            <input
              type="range"
              min={1.5}
              max={10}
              step={0.1}
              value={largura}
              onChange={(e) => setLargura(Number(e.target.value))}
              className="w-full accent-baroli-blue"
            />
          </Field>
          <Field label={`Altura: ${altura.toFixed(1)}m`}>
            <input
              type="range"
              min={1.5}
              max={4}
              step={0.1}
              value={altura}
              onChange={(e) => setAltura(Number(e.target.value))}
              className="w-full accent-baroli-blue"
            />
          </Field>
        </div>

        <Field label="Cor">
          <select
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="w-full bg-white border border-baroli-gray-300 rounded-md px-4 py-3 text-sm text-baroli-gray-900 focus:border-baroli-blue outline-none focus:ring-2 focus:ring-baroli-blue/10"
          >
            {CORES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Automação">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={automatico}
              onChange={(e) => setAutomatico(e.target.checked)}
              className="w-5 h-5 accent-baroli-blue"
            />
            <span className="text-sm text-baroli-gray-700">
              Quero portão automático (motorizado)
            </span>
          </label>

          {automatico && (
            <select
              value={motorId}
              onChange={(e) => setMotorId(e.target.value)}
              className="mt-4 w-full bg-white border border-baroli-gray-300 rounded-md px-4 py-3 text-sm text-baroli-gray-900 focus:border-baroli-blue outline-none focus:ring-2 focus:ring-baroli-blue/10"
            >
              {MOTORES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                  {m.preco > 0 ? ` (+${formatarReais(m.preco)})` : ""}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Toggle
            label="Instalação inclusa"
            checked={instalacao}
            onChange={setInstalacao}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Cidade">
            <input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex: São Paulo"
              className="w-full bg-white border border-baroli-gray-300 rounded-md px-4 py-3 text-sm text-baroli-gray-900 placeholder:text-baroli-gray-400 focus:border-baroli-blue outline-none focus:ring-2 focus:ring-baroli-blue/10"
            />
          </Field>
          <Field label="CEP">
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="00000-000"
              className="w-full bg-white border border-baroli-gray-300 rounded-md px-4 py-3 text-sm text-baroli-gray-900 placeholder:text-baroli-gray-400 focus:border-baroli-blue outline-none focus:ring-2 focus:ring-baroli-blue/10"
            />
          </Field>
        </div>
      </div>

      {/* RESULTADO */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 border border-baroli-gray-200 bg-white rounded-lg shadow-product p-8">
          <p className="eyebrow mb-2">Estimativa de investimento</p>
          <p className="font-display text-5xl text-baroli-blue mb-8">
            {formatarReais(resultado.total)}
          </p>

          <ul className="space-y-3 mb-8 text-sm">
            <ResultLine label="Materiais" valor={resultado.materiais} />
            <ResultLine label="Fabricação" valor={resultado.fabricacao} />
            <ResultLine label="Instalação" valor={resultado.instalacao} />
            <li className="flex items-center justify-between text-baroli-gray-600">
              <span className="flex items-center gap-2">
                <CheckIcon /> Garantia
              </span>
              <span>Inclusa</span>
            </li>
          </ul>

          <p className="text-xs text-baroli-gray-500 leading-relaxed mb-8">
            Este valor é uma estimativa. Um consultor confirmará todas as
            medidas. Os preços usados aqui são de referência — a Baroli deve
            ajustá-los na tabela em{" "}
            <code className="text-baroli-blue">lib/pricing.ts</code>.
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="block text-center bg-baroli-blue text-white rounded-md px-6 py-4 text-sm uppercase tracking-widest2 hover:bg-baroli-blue-dark transition-colors"
          >
            Receber orçamento no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest2 text-baroli-gray-500 mb-3">
        {label}
      </label>
      {children}
    </div>
  );
}

function SegmentGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { valor: T; nome: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.valor}
          type="button"
          onClick={() => onChange(opt.valor)}
          className={`px-4 py-2.5 text-sm rounded-md border transition-colors ${
            value === opt.valor
              ? "bg-baroli-blue border-baroli-blue text-white"
              : "border-baroli-gray-300 text-baroli-gray-700 hover:border-baroli-blue hover:text-baroli-blue"
          }`}
        >
          {opt.nome}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-baroli-blue"
      />
      <span className="text-sm text-baroli-gray-700">{label}</span>
    </label>
  );
}

function ResultLine({ label, valor }: { label: string; valor: number }) {
  return (
    <li className="flex items-center justify-between text-baroli-gray-700">
      <span className="flex items-center gap-2">
        <CheckIcon /> {label}
      </span>
      <span className="font-mono">{formatarReais(valor)}</span>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-baroli-blue shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
