import type { ReactNode } from "react";
import "./StatCardComponent.css";
import Tooltip from "@mui/material/Tooltip";

export type StatCardComponentProps = {
  icon: ReactNode;
  value: string | number;
  label: string | number;
  tooltipDescription?: string;
};

export default function StatCardComponent({
  label,
  value,
  icon,
  tooltipDescription
}: StatCardComponentProps) {
  const content = (
    <div className="stat-card-component">
      <span className="stat-card-icon">{icon}</span>
      <h2 className="stat-card-value">{value}</h2>
      <p className="stat-card-label">{label}</p>
    </div>
  );

  if (!tooltipDescription) return content;

  return (
    <Tooltip title={tooltipDescription} arrow>
      <div>{content}</div>
    </Tooltip>
  );
}
