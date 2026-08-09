import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  title?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-baroli-blue text-white hover:bg-baroli-blue-dark transition-colors",
  secondary:
    "bg-baroli-gray-100 text-baroli-blue hover:bg-baroli-gray-200 transition-colors",
  outline:
    "border border-baroli-blue text-baroli-blue hover:bg-baroli-blue hover:text-white transition-all",
  ghost:
    "text-baroli-blue hover:bg-baroli-blue-50 transition-colors",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs uppercase tracking-widest2",
  md: "px-6 py-3 text-sm uppercase tracking-widest2",
  lg: "px-8 py-4 text-base uppercase tracking-widest2",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  title,
  target,
  rel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-baroli-blue";
  
  const disabledStyles = disabled || loading ? "opacity-60 cursor-not-allowed" : "";
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim();

  // Se tem href, renderiza como Link (melhor para SEO)
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        title={title}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Link>
    );
  }

  // Caso contrário, renderiza como button
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClassName}
      title={title}
      type="button"
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
