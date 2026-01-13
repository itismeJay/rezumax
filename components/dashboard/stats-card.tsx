import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export function StatsCard({
  label,
  value,
  change,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 lg:p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">
          {label}
        </span>
      </div>

      <p className="text-2xl lg:text-3xl font-bold mb-1">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">
        {change}
      </p>
    </div>
  );
}
