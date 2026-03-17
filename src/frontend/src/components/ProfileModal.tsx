import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Briefcase,
  HandshakeIcon,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AccountType, UserProfile } from "../App";
import { useRegisterUser, useSaveProfile } from "../hooks/useQueries";

interface ProfileModalProps {
  open: boolean;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
  existingProfile: UserProfile | null;
}

const ACCOUNT_TYPES: {
  type: AccountType;
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}[] = [
  {
    type: "seller",
    label: "Seller",
    desc: "Sell products or services to buyers",
    icon: ShoppingBag,
    color: "text-orange-brand",
    bg: "bg-orange-50 border-orange-200 hover:border-orange-brand",
  },
  {
    type: "buyer",
    label: "Buyer",
    desc: "Find products and services you need",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200 hover:border-blue-500",
  },
  {
    type: "investor",
    label: "Investor",
    desc: "Fund startups and grow your portfolio",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200 hover:border-emerald-500",
  },
  {
    type: "partner",
    label: "Partner",
    desc: "Find co-founders and business partners",
    icon: HandshakeIcon,
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200 hover:border-purple-500",
  },
];

export default function ProfileModal({
  open,
  onSave,
  onClose,
  existingProfile,
}: ProfileModalProps) {
  const [form, setForm] = useState<{
    name: string;
    phone: string;
    email: string;
    city: string;
    accountType: AccountType;
  }>({
    name: "",
    phone: "",
    email: "",
    city: "",
    accountType: "buyer",
  });

  const registerUser = useRegisterUser();
  const saveProfile = useSaveProfile();

  useEffect(() => {
    if (existingProfile) setForm(existingProfile);
  }, [existingProfile]);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      if (existingProfile) {
        await saveProfile.mutateAsync({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          accountType: form.accountType as any,
        });
      } else {
        await registerUser.mutateAsync({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          accountType: form.accountType as any,
        });
      }
    } catch {
      // backend may fail if not connected, but we still save locally
    }
    onSave(form);
  };

  const isPending = registerUser.isPending || saveProfile.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="profile.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {existingProfile
              ? "Edit Profile"
              : "Welcome to Startup With Shiva! 🚀"}
          </DialogTitle>
          {!existingProfile && (
            <p className="text-sm text-muted-foreground">
              Set up your profile to discover business opportunities near you.
            </p>
          )}
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Account Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Account Type *</Label>
            <div className="grid grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map(
                ({ type, label, desc, icon: Icon, color, bg }) => (
                  <button
                    key={type}
                    type="button"
                    data-ocid={`profile.account_type.${type}.toggle`}
                    onClick={() =>
                      setForm((p) => ({ ...p, accountType: type }))
                    }
                    className={`rounded-xl border-2 p-3 text-left transition-all duration-150 ${
                      form.accountType === type
                        ? `${bg} ring-2 ring-offset-1 ring-current`
                        : `${bg} opacity-70`
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${color}`} />
                    <p className={`font-semibold text-sm ${color}`}>{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      {desc}
                    </p>
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Full Name *</Label>
              <Input
                id="profile-name"
                data-ocid="profile.name.input"
                placeholder="e.g. Shiva Kumar"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-phone">Phone Number</Label>
              <Input
                id="profile-phone"
                data-ocid="profile.phone.input"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                data-ocid="profile.email.input"
                type="email"
                placeholder="e.g. shiva@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-city">City / Location</Label>
              <Input
                id="profile-city"
                data-ocid="profile.city.input"
                placeholder="e.g. Hyderabad"
                value={form.city}
                onChange={(e) =>
                  setForm((p) => ({ ...p, city: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          {existingProfile && (
            <Button
              variant="outline"
              onClick={onClose}
              data-ocid="profile.cancel.button"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!form.name.trim() || isPending}
            data-ocid="profile.save.submit_button"
            className="bg-primary text-primary-foreground"
          >
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
