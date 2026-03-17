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
import { useGetAllListings, usePostListing } from "../hooks/useQueries";

const CATEGORIES = [
  "Food",
  "Retail",
  "Services",
  "Manufacturing",
  "Import-Export",
  "Technology",
];

export default function SellerMarketplace() {
  const { data: listings, isLoading } = useGetAllListings();
  const postListing = usePostListing();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    contactPhone: "",
  });

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.category || !form.location.trim()) return;
    await postListing.mutateAsync({
      title: form.title,
      description: form.description,
      price: BigInt(Number(form.price) || 0),
      category: form.category,
      location: form.location,
      contactPhone: form.contactPhone,
    });
    setForm({
      title: "",
      description: "",
      price: "",
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
          <h1 className="font-display text-2xl font-bold">
            🛒 Seller Marketplace
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse products and services from local sellers.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="sellers.add.primary_button"
              className="bg-primary text-primary-foreground shadow-orange"
            >
              <Plus className="w-4 h-4 mr-1" /> Post Your Product/Service
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-lg"
            data-ocid="sellers.form.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display">
                Post Product or Service
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Title *</Label>
                <Input
                  data-ocid="sellers.title.input"
                  placeholder="e.g. Fresh Organic Vegetables"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  data-ocid="sellers.description.textarea"
                  placeholder="Describe what you're offering..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Price (₹)</Label>
                  <Input
                    data-ocid="sellers.price.input"
                    type="number"
                    placeholder="e.g. 500"
                    value={form.price}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, price: e.target.value }))
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
                    <SelectTrigger data-ocid="sellers.category.select">
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
                    data-ocid="sellers.location.input"
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
                    data-ocid="sellers.phone.input"
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
                data-ocid="sellers.cancel.cancel_button"
              >
                Cancel
              </Button>
              <Button
                data-ocid="sellers.submit.submit_button"
                onClick={handleSubmit}
                disabled={
                  postListing.isPending || !form.title.trim() || !form.category
                }
                className="bg-primary text-primary-foreground"
              >
                {postListing.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...
                  </>
                ) : (
                  "Post Listing"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="sellers.loading_state"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : (listings ?? []).length === 0 ? (
        <Card className="shadow-card" data-ocid="sellers.empty_state">
          <CardContent className="p-12 text-center">
            <p className="text-3xl mb-3">🛍️</p>
            <p className="font-semibold text-lg">No listings yet.</p>
            <p className="text-muted-foreground text-sm mt-1">
              Be the first seller on the marketplace!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(listings ?? []).map((listing, i) => (
            <Card
              key={String(listing.id)}
              className="shadow-card hover:border-primary/50 transition-all"
              data-ocid={`sellers.item.${i + 1}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-display text-base leading-tight">
                    {listing.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {listing.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {listing.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {listing.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-orange-brand">
                    ₹{String(listing.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    📍 {listing.location}
                  </span>
                </div>
                {listing.contactPhone && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{listing.contactPhone}</span>
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
