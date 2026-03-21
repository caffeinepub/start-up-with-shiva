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
import { Loader2, MessageSquare, Phone, Plus } from "lucide-react";
import { useState } from "react";
import type { ComposeTarget } from "../App";
import {
  useGetAllBuyerRequests,
  usePostBuyerRequest,
} from "../hooks/useQueries";

const CATEGORIES = [
  "Food",
  "Retail",
  "Services",
  "Manufacturing",
  "Import-Export",
  "Technology",
  "Other",
];

interface BuyersBoardProps {
  onMessage?: (target: ComposeTarget) => void;
}

export default function BuyersBoard({ onMessage }: BuyersBoardProps) {
  const { data: requests, isLoading } = useGetAllBuyerRequests();
  const postRequest = usePostBuyerRequest();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
    location: "",
    contactPhone: "",
  });

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.category || !form.location.trim()) return;
    await postRequest.mutateAsync({
      title: form.title,
      description: form.description,
      budget: BigInt(Number(form.budget) || 0),
      category: form.category,
      location: form.location,
      contactPhone: form.contactPhone,
    });
    setForm({
      title: "",
      description: "",
      budget: "",
      category: "",
      location: "",
      contactPhone: "",
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">📢 Buyers Board</h1>
          <p className="text-muted-foreground text-sm mt-1">
            What people need — connect with buyers looking for products and
            services.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="buyers.add.primary_button"
              className="bg-primary text-primary-foreground shadow-orange"
            >
              <Plus className="w-4 h-4 mr-1" /> Post Your Need
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg" data-ocid="buyers.form.dialog">
            <DialogHeader>
              <DialogTitle className="font-display">
                Post Your Buying Need
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>What do you need? *</Label>
                <Input
                  data-ocid="buyers.title.input"
                  placeholder="e.g. Looking for bulk rice supplier"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Details</Label>
                <Textarea
                  data-ocid="buyers.description.textarea"
                  placeholder="Describe what you need in detail..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Budget (₹)</Label>
                  <Input
                    data-ocid="buyers.budget.input"
                    type="number"
                    placeholder="e.g. 10000"
                    value={form.budget}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, budget: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Category *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, category: v }))
                    }
                  >
                    <SelectTrigger data-ocid="buyers.category.select">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Location *</Label>
                  <Input
                    data-ocid="buyers.location.input"
                    placeholder="e.g. Balapur, Hyderabad"
                    value={form.location}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, location: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input
                    data-ocid="buyers.phone.input"
                    placeholder="e.g. 9876543210"
                    value={form.contactPhone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contactPhone: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="buyers.cancel.cancel_button"
              >
                Cancel
              </Button>
              <Button
                data-ocid="buyers.submit.submit_button"
                onClick={handleSubmit}
                disabled={
                  postRequest.isPending || !form.title.trim() || !form.category
                }
                className="bg-primary text-primary-foreground"
              >
                {postRequest.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...
                  </>
                ) : (
                  "Post Request"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="buyers.loading_state"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : (requests ?? []).length === 0 ? (
        <Card className="shadow-card" data-ocid="buyers.empty_state">
          <CardContent className="p-12 text-center">
            <p className="text-3xl mb-3">🛒</p>
            <p className="font-semibold text-lg">No buyer requests yet.</p>
            <p className="text-muted-foreground text-sm mt-1">
              Post what you need and let sellers find you!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(requests ?? []).map((req, i) => (
            <Card
              key={String(req.id)}
              className="shadow-card hover:border-blue-400 transition-all"
              data-ocid={`buyers.item.${i + 1}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-display text-base leading-tight">
                    {req.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {req.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {req.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {req.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">
                    Budget: ₹{String(req.budget)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    📍 {req.location}
                  </span>
                </div>
                {req.contactPhone && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{req.contactPhone}</span>
                  </div>
                )}
                {onMessage && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2 mt-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() =>
                      onMessage({
                        recipientId: req.owner.toText(),
                        recipientName: "",
                        subject: `Re: ${req.title}`,
                      })
                    }
                    data-ocid={`buyers.message.button.${i + 1}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Message Buyer
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
