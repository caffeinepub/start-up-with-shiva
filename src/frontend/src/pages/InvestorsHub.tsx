import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Phone, Plus } from "lucide-react";
import { useState } from "react";
import {
  useGetAllInvestorProfiles,
  usePostInvestorProfile,
} from "../hooks/useQueries";

const SECTORS = [
  "Food",
  "Technology",
  "Retail",
  "Manufacturing",
  "Import-Export",
  "Real Estate",
  "Agriculture",
];

export default function InvestorsHub() {
  const { data: investors, isLoading } = useGetAllInvestorProfiles();
  const postInvestor = usePostInvestorProfile();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    sector: "",
    minBudget: "",
    maxBudget: "",
    location: "",
    description: "",
    contactPhone: "",
  });

  const handleSubmit = async () => {
    if (!form.sector || !form.location.trim()) return;
    await postInvestor.mutateAsync({
      sector: form.sector,
      minBudget: BigInt(Number(form.minBudget) || 0),
      maxBudget: BigInt(Number(form.maxBudget) || 0),
      location: form.location,
      description: form.description,
      contactPhone: form.contactPhone,
    });
    setForm({
      sector: "",
      minBudget: "",
      maxBudget: "",
      location: "",
      description: "",
      contactPhone: "",
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">💰 Investors Hub</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Connect with investors looking to fund businesses in your sector.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="investors.add.primary_button"
              className="bg-primary text-primary-foreground shadow-orange"
            >
              <Plus className="w-4 h-4 mr-1" /> Register as Investor
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-lg"
            data-ocid="investors.form.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display">
                Investor Profile
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Sector of Interest *</Label>
                  <Select
                    value={form.sector}
                    onValueChange={(v) => setForm((p) => ({ ...p, sector: v }))}
                  >
                    <SelectTrigger data-ocid="investors.sector.select">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Location *</Label>
                  <Input
                    data-ocid="investors.location.input"
                    placeholder="e.g. Hyderabad"
                    value={form.location}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, location: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Min Budget (₹)</Label>
                  <Input
                    data-ocid="investors.min_budget.input"
                    type="number"
                    placeholder="e.g. 50000"
                    value={form.minBudget}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, minBudget: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Max Budget (₹)</Label>
                  <Input
                    data-ocid="investors.max_budget.input"
                    type="number"
                    placeholder="e.g. 500000"
                    value={form.maxBudget}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, maxBudget: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>About You / Investment Criteria</Label>
                <Textarea
                  data-ocid="investors.description.textarea"
                  placeholder="Describe your investment interests and criteria..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  data-ocid="investors.phone.input"
                  placeholder="e.g. 9876543210"
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contactPhone: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="investors.cancel.cancel_button"
              >
                Cancel
              </Button>
              <Button
                data-ocid="investors.submit.submit_button"
                onClick={handleSubmit}
                disabled={
                  postInvestor.isPending ||
                  !form.sector ||
                  !form.location.trim()
                }
                className="bg-primary text-primary-foreground"
              >
                {postInvestor.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...
                  </>
                ) : (
                  "Post Profile"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="investors.loading_state"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : (investors ?? []).length === 0 ? (
        <Card className="shadow-card" data-ocid="investors.empty_state">
          <CardContent className="p-12 text-center">
            <p className="text-3xl mb-3">💼</p>
            <p className="font-semibold text-lg">
              No investors registered yet.
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Be the first to register as an investor!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(investors ?? []).map((inv, i) => (
            <Card
              key={String(inv.id)}
              className="shadow-card hover:border-emerald-400 transition-all"
              data-ocid={`investors.item.${i + 1}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-display text-base">
                    {inv.sector}
                  </CardTitle>
                  <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                    Investor
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {inv.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {inv.description}
                  </p>
                )}
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                  <p className="text-xs text-muted-foreground">Budget Range</p>
                  <p className="font-bold text-emerald-700 text-sm">
                    ₹{String(inv.minBudget)} – ₹{String(inv.maxBudget)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  📍 {inv.location}
                </p>
                {inv.contactPhone && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{inv.contactPhone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
