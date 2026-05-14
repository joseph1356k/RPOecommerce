"use client";

interface Chip {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface Props {
  chips: Chip[];
  active?: string;
  onSelect?: (value: string) => void;
  ariaLabel?: string;
}

export default function QuickNavChips({ chips, active, onSelect, ariaLabel = "Navegación rápida" }: Props) {
  return (
    <nav
      aria-label={ariaLabel}
      style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        scrollbarWidth: "none",
        padding: "4px 0",
      }}
    >
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          className={`chip ${active === chip.value ? "chip--active" : ""}`}
          onClick={() => onSelect?.(chip.value)}
        >
          {chip.icon}
          {chip.label}
        </button>
      ))}
    </nav>
  );
}
