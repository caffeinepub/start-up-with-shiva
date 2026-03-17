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
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  PlusCircle,
  ThumbsUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type NeedType = "Problem" | "Business Need" | "Supplier Wanted";

interface LocalNeed {
  id: string;
  title: string;
  description: string;
  type: NeedType;
  country: string;
  state: string;
  city: string;
  village: string;
  upvotes: number;
  date: string;
  phone?: string;
  upvotedByMe: boolean;
}

const STORAGE_KEY = "startup-shiva-place-needs";

const SAMPLE_NEEDS: LocalNeed[] = [
  {
    id: "1",
    title: "Need Fresh Milk Supply",
    description: "No reliable daily milk supplier in our area",
    type: "Problem",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    village: "Balapur",
    upvotes: 23,
    date: "2026-03-10",
    upvotedByMe: false,
  },
  {
    id: "2",
    title: "Wholesale Electronics Supplier Needed",
    description: "Looking for wholesale electronics distributor",
    type: "Supplier Wanted",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    village: "Hadapsar",
    upvotes: 45,
    date: "2026-03-08",
    upvotedByMe: false,
  },
  {
    id: "3",
    title: "Food Delivery Service Opportunity",
    description: "High demand for lunch tiffin delivery in tech parks",
    type: "Business Need",
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    village: "Koramangala",
    upvotes: 67,
    date: "2026-03-07",
    upvotedByMe: false,
  },
  {
    id: "4",
    title: "Need Organic Vegetable Farmer",
    description: "Restaurants want organic local vegetables",
    type: "Supplier Wanted",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    village: "Navrangpura",
    upvotes: 31,
    date: "2026-03-06",
    upvotedByMe: false,
  },
  {
    id: "5",
    title: "Transport/Logistics Gap",
    description: "No cold storage transport for perishable goods",
    type: "Problem",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    village: "Mansarovar",
    upvotes: 18,
    date: "2026-03-05",
    upvotedByMe: false,
  },
  {
    id: "6",
    title: "Online Tuition Demand",
    description: "Parents want affordable online coaching for kids",
    type: "Business Need",
    country: "India",
    state: "Kerala",
    city: "Kochi",
    village: "Edapally",
    upvotes: 52,
    date: "2026-03-04",
    upvotedByMe: false,
  },
];

function loadNeeds(): LocalNeed[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return SAMPLE_NEEDS;
}

function saveNeeds(needs: LocalNeed[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(needs));
}

const TYPE_COLORS: Record<NeedType, string> = {
  Problem: "bg-red-100 text-red-700 border-red-200",
  "Business Need": "bg-blue-100 text-blue-700 border-blue-200",
  "Supplier Wanted": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function PlaceNeeds() {
  const [needs, setNeeds] = useState<LocalNeed[]>(loadNeeds);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState<"All" | NeedType>("All");
  const [formOpen, setFormOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<NeedType>("Problem");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    saveNeeds(needs);
  }, [needs]);

  const allCountries = [
    "All",
    ...Array.from(new Set(needs.map((n) => n.country))),
  ];
  const allStates = [
    "All",
    ...Array.from(
      new Set(
        needs
          .filter((n) => filterCountry === "All" || n.country === filterCountry)
          .map((n) => n.state),
      ),
    ),
  ];

  const filtered = needs.filter((n) => {
    if (filterCountry !== "All" && n.country !== filterCountry) return false;
    if (filterState !== "All" && n.state !== filterState) return false;
    if (filterCity && !n.city.toLowerCase().includes(filterCity.toLowerCase()))
      return false;
    if (filterType !== "All" && n.type !== filterType) return false;
    return true;
  });

  const handleUpvote = (id: string) => {
    setNeeds((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              upvotes: n.upvotedByMe ? n.upvotes - 1 : n.upvotes + 1,
              upvotedByMe: !n.upvotedByMe,
            }
          : n,
      ),
    );
  };

  const handleSubmit = () => {
    if (!title.trim() || !state.trim() || !city.trim()) {
      toast.error("Please fill title, state, and city.");
      return;
    }
    const newNeed: LocalNeed = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      type,
      country,
      state: state.trim(),
      city: city.trim(),
      village: village.trim(),
      upvotes: 0,
      date: new Date().toISOString().slice(0, 10),
      phone: phone.trim(),
      upvotedByMe: false,
    };
    setNeeds((prev) => [newNeed, ...prev]);
    setTitle("");
    setDescription("");
    setState("");
    setCity("");
    setVillage("");
    setPhone("");
    setFormOpen(false);
    toast.success("Need posted successfully!");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Place-Based Needs
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold">
          What Does Your Area Need?
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Browse real needs and opportunities posted by people from across India
          — from villages to metro cities.
        </p>
      </motion.div>

      {/* Filters */}
      <Card className="shadow-card" data-ocid="place-needs.filters.section">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <Label className="text-xs mb-1 block">Country</Label>
              <Select
                value={filterCountry}
                onValueChange={(v) => {
                  setFilterCountry(v);
                  setFilterState("All");
                }}
              >
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="place-needs.country.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allCountries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1 block">State</Label>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="place-needs.state.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allStates.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1 block">City</Label>
              <Input
                placeholder="Search city..."
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="h-9 text-sm"
                data-ocid="place-needs.city.search_input"
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Need Type</Label>
              <Select
                value={filterType}
                onValueChange={(v) => setFilterType(v as "All" | NeedType)}
              >
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="place-needs.type.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Problem">Problem</SelectItem>
                  <SelectItem value="Business Need">Business Need</SelectItem>
                  <SelectItem value="Supplier Wanted">
                    Supplier Wanted
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Needs List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              needs
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFormOpen(!formOpen)}
              data-ocid="place-needs.post_need.button"
              className="gap-2 lg:hidden"
            >
              <PlusCircle className="w-4 h-4" /> Post a Need
            </Button>
          </div>

          {filtered.length === 0 ? (
            <Card className="shadow-card" data-ocid="place-needs.empty_state">
              <CardContent className="p-10 text-center">
                <p className="text-3xl mb-3">📍</p>
                <p className="text-muted-foreground text-sm">
                  No needs found for this location.
                </p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((need, i) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`place-needs.need.item.${i + 1}`}
              >
                <Card className="shadow-card hover:border-primary/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Upvote */}
                      <button
                        type="button"
                        onClick={() => handleUpvote(need.id)}
                        data-ocid={`place-needs.upvote.button.${i + 1}`}
                        className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl border transition-colors ${
                          need.upvotedByMe
                            ? "bg-primary/10 border-primary/40 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs font-bold">
                          {need.upvotes}
                        </span>
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-2 mb-1">
                          <h3 className="font-semibold text-sm">
                            {need.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`text-xs border ${TYPE_COLORS[need.type]}`}
                          >
                            {need.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {need.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {need.country} &rsaquo; {need.state} &rsaquo;{" "}
                            {need.city}
                            {need.village ? ` › ${need.village}` : ""}
                          </span>
                          <span className="ml-auto">{need.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Post a Need Form */}
        <div>
          {/* Mobile toggle */}
          <button
            type="button"
            className="w-full hidden lg:flex items-center justify-between"
            onClick={() => setFormOpen(!formOpen)}
            data-ocid="place-needs.form_toggle.button"
          >
            <span className="font-display font-semibold text-lg">
              Post a Need
            </span>
            {formOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence>
            {(formOpen || typeof window !== "undefined") && (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <Card
                  className="shadow-card mt-3"
                  data-ocid="place-needs.form.section"
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-base font-display">
                      Share a Local Need
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                    <div>
                      <Label className="text-xs mb-1 block">Title *</Label>
                      <Input
                        placeholder="e.g. Need fresh milk supply"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-sm"
                        data-ocid="place-needs.title.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Description</Label>
                      <Textarea
                        placeholder="Describe the need or problem..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                        className="text-sm resize-none"
                        data-ocid="place-needs.description.textarea"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Need Type</Label>
                      <Select
                        value={type}
                        onValueChange={(v) => setType(v as NeedType)}
                      >
                        <SelectTrigger
                          className="h-9 text-sm"
                          data-ocid="place-needs.form.type.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Problem">Problem</SelectItem>
                          <SelectItem value="Business Need">
                            Business Need
                          </SelectItem>
                          <SelectItem value="Supplier Wanted">
                            Supplier Wanted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs mb-1 block">Country</Label>
                        <Input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="text-sm"
                          data-ocid="place-needs.form.country.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs mb-1 block">State *</Label>
                        <Input
                          placeholder="e.g. Telangana"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="text-sm"
                          data-ocid="place-needs.form.state.input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs mb-1 block">City *</Label>
                        <Input
                          placeholder="e.g. Hyderabad"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="text-sm"
                          data-ocid="place-needs.form.city.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs mb-1 block">Village</Label>
                        <Input
                          placeholder="e.g. Balapur"
                          value={village}
                          onChange={(e) => setVillage(e.target.value)}
                          className="text-sm"
                          data-ocid="place-needs.form.village.input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">
                        Contact Phone
                      </Label>
                      <Input
                        placeholder="Optional"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="text-sm"
                        data-ocid="place-needs.form.phone.input"
                      />
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-orange-dark text-white font-semibold"
                      onClick={handleSubmit}
                      data-ocid="place-needs.form.submit_button"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" /> Post Need
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
