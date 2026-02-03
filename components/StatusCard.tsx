import { ReactNode } from "react";

interface StatusCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  color: "blue" | "indigo" | "green" | "cyan" | "yellow";
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-800 border-blue-300",
  indigo: "bg-indigo-100 text-indigo-800 border-indigo-300",
  green: "bg-green-100 text-green-800 border-green-300",
  cyan: "bg-cyan-100 text-cyan-800 border-cyan-300",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export default function StatusCard({ icon, title, value, color }: StatusCardProps) {
  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]}`}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-3">{icon}</div>
        <h3 className="font-semibold text-sm mb-2">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
