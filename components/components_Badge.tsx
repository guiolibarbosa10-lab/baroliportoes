import { ReactNode } from "react";

type BadgeVariant = "default" | "blue" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-baroli-gray-100 text-baroli-gray-700 border border-baroli-gray-300",
  blue:
    "bg-baroli-blue-50 text-baroli-blue border border-baroli-blue-100",
  success:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning:
    "bg-amber-50 text-amber-700 border border-amber-200",
  error:
    "bg-red-50 text-red-700 border border-red-200",
  info:
    "bg-blue-50 text-blue-700 border border-blue-200",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs font-medium uppercase tracking-wide",
  md: "px-3 py-1.5 text-sm font-semibold uppercase tracking-wider",
};

/**
 * Badge Component
 * Substitui etiquetas espalhadas como:
 * - Etiquetas de linha (Especial, Padrão, Prime)
 * - Tags de categorias
 * - Status indicators
 *
 * @example
 * <Badge variant="blue">Linha Especial</Badge>
 * <Badge variant="success" size="sm">Disponível</Badge>
 */
export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-body leading-none";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  return <span className={combinedClassName}>{children}</span>;
}
