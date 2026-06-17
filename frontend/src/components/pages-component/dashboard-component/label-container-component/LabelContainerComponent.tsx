import "./LabelContainerComponent.css"

export type LabelContainerProps = {
  label: string;
  value: string;
};

export default function LabelContainerComponent({
  label,
  value,
}: LabelContainerProps) {
  return (
    <div className="label-container-component">
      <span className="label-container-label">{label}</span>
      <span className="label-container-value">{value}</span>
    </div>
  );
}
