import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator } from "lucide-react";
import { useState } from "react";

interface Results {
  monthlyRevenue: number;
  operatingCost: number;
  netProfit: number;
  breakEvenDays: number;
  roi: number;
}

export default function ProfitCalculator() {
  const [form, setForm] = useState({
    startupCost: "",
    sellingPrice: "",
    unitsPerDay: "",
    operatingDays: "",
  });
  const [results, setResults] = useState<Results | null>(null);

  const calculate = () => {
    const sc = Number.parseFloat(form.startupCost) || 0;
    const sp = Number.parseFloat(form.sellingPrice) || 0;
    const upd = Number.parseFloat(form.unitsPerDay) || 0;
    const od = Number.parseFloat(form.operatingDays) || 0;

    const monthlyRevenue = sp * upd * od;
    const operatingCost = monthlyRevenue * 0.4;
    const netProfit = monthlyRevenue - operatingCost;
    const breakEvenDays = netProfit > 0 ? Math.ceil(sc / (netProfit / od)) : 0;
    const roi = sc > 0 ? Math.round((netProfit / sc) * 100) : 0;

    setResults({
      monthlyRevenue,
      operatingCost,
      netProfit,
      breakEvenDays,
      roi,
    });
  };

  const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Profit Calculator</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Estimate your monthly earnings before you start.
        </p>
      </div>

      <Card className="shadow-card" data-ocid="calculator.form.panel">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Enter Your Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Startup Cost (₹)</Label>
              <Input
                data-ocid="calculator.startup_cost.input"
                type="number"
                placeholder="e.g. 5000"
                value={form.startupCost}
                onChange={(e) =>
                  setForm((p) => ({ ...p, startupCost: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label>Selling Price per Unit (₹)</Label>
              <Input
                data-ocid="calculator.selling_price.input"
                type="number"
                placeholder="e.g. 15"
                value={form.sellingPrice}
                onChange={(e) =>
                  setForm((p) => ({ ...p, sellingPrice: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label>Units Sold per Day</Label>
              <Input
                data-ocid="calculator.units.input"
                type="number"
                placeholder="e.g. 100"
                value={form.unitsPerDay}
                onChange={(e) =>
                  setForm((p) => ({ ...p, unitsPerDay: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label>Operating Days per Month</Label>
              <Input
                data-ocid="calculator.days.input"
                type="number"
                placeholder="e.g. 26"
                value={form.operatingDays}
                onChange={(e) =>
                  setForm((p) => ({ ...p, operatingDays: e.target.value }))
                }
              />
            </div>
          </div>
          <Button
            data-ocid="calculator.calculate.primary_button"
            onClick={calculate}
            className="w-full sm:w-auto bg-primary text-primary-foreground shadow-orange font-semibold"
          >
            <Calculator className="w-4 h-4 mr-2" /> Calculate Profit
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card
          className="shadow-card border-green-200"
          data-ocid="calculator.results.panel"
        >
          <CardHeader>
            <CardTitle className="font-display text-lg text-green-700">
              📊 Your Estimated Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs text-blue-600 font-medium">
                  Monthly Revenue
                </p>
                <p className="font-display text-xl font-bold text-blue-700 mt-1">
                  {fmt(results.monthlyRevenue)}
                </p>
              </div>
              <div className="rounded-xl bg-orange-50 p-4">
                <p className="text-xs text-orange-600 font-medium">
                  Operating Costs (40%)
                </p>
                <p className="font-display text-xl font-bold text-orange-700 mt-1">
                  {fmt(results.operatingCost)}
                </p>
              </div>
              <div className="rounded-xl bg-green-50 border-2 border-green-200 p-4 sm:col-span-2">
                <p className="text-xs text-green-600 font-medium">
                  Net Monthly Profit
                </p>
                <p className="font-display text-2xl font-bold text-green-700 mt-1">
                  {fmt(results.netProfit)}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Break-even Time
                  </p>
                  <p className="font-semibold">
                    {results.breakEvenDays > 0
                      ? `${results.breakEvenDays} days`
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Return on Investment
                  </p>
                  <p className="font-semibold text-green-600">
                    {results.roi}% per month
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
