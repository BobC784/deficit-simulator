import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const policies = [
  { name: "Value-Added Tax (20%)", value: 4.80, adjustable: false },
  { name: "Remove Payroll Tax Cap & Add Surtax", value: 1.75, adjustable: false },
  { name: "2% Wealth Tax > $100M", value: 0.80, adjustable: false },
  { name: "10% Tariff on All Imports", value: 3.20, adjustable: false },
  { name: "Carbon Tax ($60/ton)", value: 1.75, adjustable: false },
  { name: "Defense Budget Optimization", value: 0.85, adjustable: false },
  { name: "Raise Corporate Tax Rate to 35%", value: 1.35, adjustable: false },
  { name: "Raise Top Income Tax Rate to 70%", value: 0.50, adjustable: false },
  { name: "Social Security Modernization Plan", value: 0.60, adjustable: false }
];

export default function DeficitClosureSimulator() {
  const [selected, setSelected] = useState(policies.map(() => true));

  const togglePolicy = (index) => {
    const updated = [...selected];
    updated[index] = !updated[index];

    const vatIndex = policies.findIndex(p => p.name.includes("Value-Added Tax"));
    const tariffIndex = policies.findIndex(p => p.name.includes("Tariff"));

    if (updated[index]) {
      if (index === vatIndex) updated[tariffIndex] = false;
      if (index === tariffIndex) updated[vatIndex] = false;
    }

    setSelected(updated);
  };

  const total = policies.reduce((acc, p, i) => selected[i] ? acc + p.value : acc, 0);
  const target = 22;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Deficit Closure Simulator</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {policies.map((policy, i) => (
          <Card key={i} className="p-4 space-y-2">
            <CardContent className="p-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{policy.name}</p>
                <Switch checked={selected[i]} onCheckedChange={() => togglePolicy(i)} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Est. Revenue: ${policy.value.toFixed(2)}T
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-xl">
        <strong>Total Deficit Reduction:</strong> ${total.toFixed(2)}T / ${target}T
      </div>
      <div className="text-md">
        {total >= target ? (
          <span className="text-green-600 font-semibold">✅ Budget fully balanced or surplus achieved</span>
        ) : (
          <span className="text-yellow-600 font-semibold">⚠️ Shortfall of ${(target - total).toFixed(2)}T remains</span>
        )}
      </div>
    </div>
  );
}
