import type { ReactNode } from "react";

export type FilterComponentProps = {
  label: string;
  children: ReactNode;
};

export default function FilterGroupComponent({
  label,
  children,
}: FilterComponentProps) {
  return (
    <div className="filter-group">
      <label className="filter-group-label">{label}</label>
      {children}
    </div>
  );
}
