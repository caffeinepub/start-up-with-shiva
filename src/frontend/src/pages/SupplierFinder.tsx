import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star } from "lucide-react";
import { useState } from "react";

const suppliers = [
  {
    id: 1,
    name: "Begum Bazaar",
    area: "Hyderabad Old City",
    specialty: ["Grocery", "Spices", "Dry Fruits"],
    rating: 5,
    mapQuery: "Begum+Bazaar+Hyderabad",
  },
  {
    id: 2,
    name: "Gudimalkapur Market",
    area: "Mehdipatnam",
    specialty: ["Vegetables", "Flowers"],
    rating: 4,
    mapQuery: "Gudimalkapur+Market+Hyderabad",
  },
  {
    id: 3,
    name: "Sultan Bazaar",
    area: "Koti",
    specialty: ["Textiles", "Clothing"],
    rating: 4,
    mapQuery: "Sultan+Bazaar+Hyderabad",
  },
  {
    id: 4,
    name: "Laad Bazaar",
    area: "Charminar",
    specialty: ["Bangles", "Handicrafts", "Jewelry"],
    rating: 5,
    mapQuery: "Laad+Bazaar+Hyderabad",
  },
  {
    id: 5,
    name: "Malakpet Wholesale",
    area: "Malakpet",
    specialty: ["Electronics", "Mobile Parts"],
    rating: 3,
    mapQuery: "Malakpet+Wholesale+Market+Hyderabad",
  },
  {
    id: 6,
    name: "Secunderabad Market",
    area: "Secunderabad",
    specialty: ["Fruits", "Seasonal Produce"],
    rating: 4,
    mapQuery: "Secunderabad+Market+Hyderabad",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= count ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

export default function SupplierFinder() {
  const [query, setQuery] = useState("");

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.specialty.some((sp) => sp.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Supplier Finder</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Find wholesale markets and suppliers near you.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="suppliers.search.search_input"
          placeholder="Search by name or product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="suppliers.empty_state"
        >
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No suppliers found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <Card
            key={s.id}
            className="shadow-card hover:shadow-orange transition-shadow"
            data-ocid={`suppliers.item.${i + 1}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold text-sm">
                    {s.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {s.area}
                  </div>
                </div>
                <Stars count={s.rating} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.specialty.map((sp) => (
                  <Badge key={sp} variant="secondary" className="text-xs">
                    {sp}
                  </Badge>
                ))}
              </div>
              <Button
                data-ocid={`suppliers.directions.button.${i + 1}`}
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/${s.mapQuery}`,
                    "_blank",
                  )
                }
              >
                <MapPin className="w-3 h-3 mr-1" /> Get Directions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
