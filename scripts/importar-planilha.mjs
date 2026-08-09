// Importa os dados preenchidos em data/planilha-modelo.csv (ou outro arquivo
// indicado) e atualiza data/products.json, preservando id, código, linha e imagem.
//
// Uso:
//   node scripts/importar-planilha.mjs
//   node scripts/importar-planilha.mjs caminho/para/outra-planilha.csv
//
// O CSV deve usar ";" como separador e manter a coluna "id" igual à gerada
// originalmente (não renomeie essa coluna nem reordene as linhas do id).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const csvPath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(root, "data", "planilha-modelo.csv");

const productsPath = path.join(root, "data", "products.json");

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  const headers = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const cells = line.split(";");
    const row = {};
    headers.forEach((h, i) => {
      row[h.trim()] = (cells[i] ?? "").trim();
    });
    return row;
  });
}

function toBool(v) {
  if (!v) return null;
  const s = v.toLowerCase();
  if (["sim", "true", "s", "yes"].includes(s)) return true;
  if (["não", "nao", "false", "n", "no"].includes(s)) return false;
  return null;
}

function toNumber(v) {
  if (!v) return null;
  const n = Number(String(v).replace(",", "."));
  return Number.isNaN(n) ? null : n;
}

const csvText = fs.readFileSync(csvPath, "utf-8");
const rows = parseCSV(csvText);
const rowsById = Object.fromEntries(rows.map((r) => [r.id, r]));

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

let atualizados = 0;
const semCorrespondencia = [];

const merged = products.map((p) => {
  const row = rowsById[p.id];
  if (!row) {
    semCorrespondencia.push(p.id);
    return p;
  }
  atualizados += 1;
  return {
    ...p,
    tipo: row.tipo || p.tipo,
    material: row.material || p.material,
    cor: row.cor || p.cor,
    acabamento: row.acabamento || p.acabamento,
    automatizavel: toBool(row.automatizavel),
    precoBase: toNumber(row.precoBase),
    descricao: row.descricao || p.descricao,
    ambiente: row.ambiente || p.ambiente,
    largura: toNumber(row.largura),
    altura: toNumber(row.altura),
  };
});

fs.writeFileSync(productsPath, JSON.stringify(merged, null, 2), "utf-8");

console.log(`Produtos atualizados: ${atualizados}/${products.length}`);
if (semCorrespondencia.length) {
  console.log(
    `Aviso: ${semCorrespondencia.length} produto(s) sem linha correspondente no CSV (mantidos como estavam).`
  );
}
