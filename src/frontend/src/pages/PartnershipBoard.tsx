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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Handshake, Loader2, MessageSquare, Phone, Plus } from "lucide-react";
import { useState } from "react";
import type { ComposeTarget } from "../App";
import {
  useGetAllPartnerOpportunities,
  usePostPartnerOpportunity,
} from "../hooks/useQueries";

interface PartnershipBoardProps {
  onMessage?: (target: ComposeTarget) => void;
}

export default function PartnershipBoard({ onMessage }: PartnershipBoardProps) {
  const { data: opportunities, isLoading } = useGetAllPartnerOpportunities();
  const postOpportunity = usePostPartnerOpportunity();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    businessType: "",
    investmentNeeded: "",
    location: "",
    contactPhone: "",
  });

  const handleSubmit = async () => {
    if (
      !form.title.trim() ||
      !form.businessType.trim() ||
      !form.location.trim()
    )
      return;
    await postOpportunity.mutateAsync({
      title: form.title,
      description: form.description,
      businessType: form.businessType,
      investmentNeeded: BigInt(Number(form.investmentNeeded) || 0),
      location: form.location,
      contactPhone: form.contactPhone,
    });
    setForm({
      title: "",
      description: "",
      businessType: "",
      investmentNeeded: "",
      location: "",
      contactPhone: "",
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">
            🤝 Partnership Board
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Find co-founders, investors, and business partners.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="partnerships.add.primary_button"
              className="bg-primary text-primary-foreground shadow-orange"
            >
              <Plus className="w-4 h-4 mr-1" /> Post Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-lg"
            data-ocid="partnerships.form.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display">
                Post Partnership Opportunity
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Opportunity Title *</Label>
                <Input
                  data-ocid="partnerships.title.input"
                  placeholder="e.g. Looking for co-founder for juice bar"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  data-ocid="partnerships.description.textarea"
                  placeholder="Describe the partnership opportunity..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Business Type *</Label>
                  <Input
                    data-ocid="partnerships.business_type.input"
                    placeholder="e.g. Food & Beverage"
                    value={form.businessType}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, businessType: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Investment Needed (₹)</Label>
                  <Input
                    data-ocid="partnerships.investment.input"
                    type="number"
                    placeholder="e.g. 50000"
                    value={form.investmentNeeded}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        investmentNeeded: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Location *</Label>
                  <Input
                    data-ocid="partnerships.location.input"
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
                    data-ocid="partnerships.phone.input"
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
                data-ocid="partnerships.cancel.cancel_button"
              >
                Cancel
              </Button>
              <Button
                data-ocid="partnerships.submit.submit_button"
                onClick={handleSubmit}
                disabled={
                  postOpportunity.isPending ||
                  !form.title.trim() ||
                  !form.businessType.trim()
                }
                className="bg-primary text-primary-foreground"
              >
                {postOpportunity.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...
                  </>
                ) : (
                  "Post Opportunity"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="partnerships.loading_state"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : (opportunities ?? []).length === 0 ? (
        <Card className="shadow-card" data-ocid="partnerships.empty_state">
          <CardContent className="p-12 text-center">
            <Handshake className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-lg">
              No partnership opportunities yet.
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Post your first opportunity to find partners!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(opportunities ?? []).map((opp, i) => (
            <Card
              key={String(opp.id)}
              className="shadow-card hover:border-purple-400 transition-all"
              data-ocid={`partnerships.item.${i + 1}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-display text-base leading-tight">
                    {opp.title}
                  </CardTitle>
                  <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200 flex-shrink-0">
                    {opp.businessType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {opp.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {opp.description}
                  </p>
                )}
                <div className="rounded-lg bg-purple-50 border border-purple-100 px-3 py-2">
                  <p className="text-xs text-muted-foreground">
                    Investment Needed
                  </p>
                  <p className="font-bold text-purple-700 text-sm">
                    ₹{String(opp.investmentNeeded)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  📍 {opp.location}
                </p>
                {opp.contactPhone && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{opp.contactPhone}</span>
                  </div>
                )}
                {onMessage && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2 mt-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() =>
                      onMessage({
                        recipientId: opp.owner.toText(),
                        recipientName: "",
                        subject: `Re: ${opp.title}`,
                      })
                    }
                    data-ocid={`partnerships.message.button.${i + 1}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Message Partner
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
