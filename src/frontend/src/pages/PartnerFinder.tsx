import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface Post {
  id: number;
  name: string;
  idea: string;
  budget: string;
  location: string;
  looking: string;
  time: string;
}

const initialPosts: Post[] = [
  {
    id: 1,
    name: "Rahul S.",
    idea: "Looking for partner to start juice stall",
    budget: "₹15,000",
    location: "Hitech City",
    looking: "Co-founder",
    time: "2 days ago",
  },
  {
    id: 2,
    name: "Priya M.",
    idea: "Need investor for cloud kitchen idea",
    budget: "₹80,000",
    location: "Madhapur",
    looking: "Investor",
    time: "5 days ago",
  },
  {
    id: 3,
    name: "Anil K.",
    idea: "Co-founder for mobile repair shop",
    budget: "₹25,000",
    location: "Kukatpally",
    looking: "Co-founder",
    time: "1 week ago",
  },
  {
    id: 4,
    name: "Sunita R.",
    idea: "Supplier needed for vegetable delivery startup",
    budget: "₹10,000",
    location: "Balapur",
    looking: "Supplier",
    time: "3 days ago",
  },
  {
    id: 5,
    name: "Venkat B.",
    idea: "Skill partner for coaching center",
    budget: "₹30,000",
    location: "Dilsukhnagar",
    looking: "Skill Partner",
    time: "2 weeks ago",
  },
];

const LOOKING_FOR = ["Co-founder", "Investor", "Supplier", "Skill Partner"];

export default function PartnerFinder() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [form, setForm] = useState({
    name: "",
    idea: "",
    budget: "",
    location: "",
    looking: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [connected, setConnected] = useState<number[]>([]);

  const handlePost = () => {
    if (!form.name.trim() || !form.idea.trim() || !form.looking) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newPost: Post = { id: Date.now(), ...form, time: "Just now" };
    setPosts((p) => [newPost, ...p]);
    setForm({ name: "", idea: "", budget: "", location: "", looking: "" });
    setShowForm(false);
    toast.success("Partnership request posted!");
  };

  const handleConnect = (id: number) => {
    setConnected((p) => [...p, id]);
    toast.success("Connection request sent!");
  };

  const lookingColors: Record<string, string> = {
    "Co-founder": "bg-blue-100 text-blue-700 border-blue-200",
    Investor: "bg-green-100 text-green-700 border-green-200",
    Supplier: "bg-purple-100 text-purple-700 border-purple-200",
    "Skill Partner": "bg-orange-100 text-orange-700 border-orange-200",
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Partner Finder</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Find co-founders, investors, and skill partners.
          </p>
        </div>
        <Button
          data-ocid="partners.post.primary_button"
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground shadow-orange"
        >
          + Post Request
        </Button>
      </div>

      {showForm && (
        <Card
          className="shadow-card border-primary/30"
          data-ocid="partners.form.panel"
        >
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Post a Partnership Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Your Name *</Label>
                <Input
                  data-ocid="partners.name.input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Looking For *</Label>
                <Select
                  value={form.looking}
                  onValueChange={(v) => setForm((p) => ({ ...p, looking: v }))}
                >
                  <SelectTrigger data-ocid="partners.looking.select">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOOKING_FOR.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Business Idea *</Label>
              <Textarea
                data-ocid="partners.idea.textarea"
                placeholder="Describe your business idea and what you need..."
                value={form.idea}
                onChange={(e) =>
                  setForm((p) => ({ ...p, idea: e.target.value }))
                }
                rows={3}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Budget</Label>
                <Input
                  data-ocid="partners.budget.input"
                  placeholder="e.g. ₹20,000"
                  value={form.budget}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, budget: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input
                  data-ocid="partners.location.input"
                  placeholder="e.g. Kukatpally"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                data-ocid="partners.submit.submit_button"
                onClick={handlePost}
                className="bg-primary text-primary-foreground"
              >
                Post Request
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="partners.cancel.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {posts.map((p, i) => (
          <Card
            key={p.id}
            className="shadow-card"
            data-ocid={`partners.item.${i + 1}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {p.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sm">{p.name}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        lookingColors[p.looking] ??
                        "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {p.looking}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 mb-2">{p.idea}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                    {p.budget && <span>💰 {p.budget}</span>}
                    {p.location && <span>📍 {p.location}</span>}
                    <span>🕒 {p.time}</span>
                  </div>
                </div>
                <Button
                  data-ocid={`partners.connect.button.${i + 1}`}
                  size="sm"
                  variant={connected.includes(p.id) ? "secondary" : "default"}
                  onClick={() =>
                    !connected.includes(p.id) && handleConnect(p.id)
                  }
                  className={`flex-shrink-0 text-xs ${
                    connected.includes(p.id)
                      ? ""
                      : "bg-primary text-primary-foreground"
                  }`}
                  disabled={connected.includes(p.id)}
                >
                  {connected.includes(p.id) ? "Sent ✓" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
