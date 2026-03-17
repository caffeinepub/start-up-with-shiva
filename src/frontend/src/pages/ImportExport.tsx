import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const opportunities = [
  {
    id: 1,
    country: "🇦🇪 UAE",
    product: "Vegetables",
    demand: "Very High",
    price: "₹45/kg",
    category: "Food",
    details:
      "UAE imports large quantities of fresh vegetables from India, especially tomatoes, onions, and leafy greens. Hyderabad farmers can directly export via Hyderabad airport cargo. Required: APEDA registration, phytosanitary certificate.",
  },
  {
    id: 2,
    country: "🇺🇸 USA",
    product: "Spices",
    demand: "Very High",
    price: "₹320/kg",
    category: "Food",
    details:
      "Indian spices are in huge demand in the US market — turmeric, chili powder, cumin, coriander. Indian diaspora and health-conscious consumers drive this demand. Get FSSAI and FDA registration.",
  },
  {
    id: 3,
    country: "🇩🇪 Germany",
    product: "Handicrafts",
    demand: "High",
    price: "₹850/piece",
    category: "Handicrafts",
    details:
      "Handmade Indian crafts — Bidriware, Nirmal paintings, Pochampally silk — are popular in German boutique stores. Minimum order: 50 pieces. Contact Hyderabad crafts clusters.",
  },
  {
    id: 4,
    country: "🇬🇧 UK",
    product: "Textiles",
    demand: "High",
    price: "₹220/meter",
    category: "Textiles",
    details:
      "Handloom and printed fabrics from Hyderabad are sought in UK markets. Sultan Bazaar textile merchants can supply in bulk. Register with Textiles Export Promotion Council (TEXPROCIL).",
  },
  {
    id: 5,
    country: "🇯🇵 Japan",
    product: "Organic Food",
    demand: "Medium",
    price: "₹180/kg",
    category: "Food",
    details:
      "Japan has strict quality standards but high willingness to pay for certified organic products. Start with organic turmeric or moringa powder. Get Japan JAS certification.",
  },
  {
    id: 6,
    country: "🇦🇺 Australia",
    product: "Leather Goods",
    demand: "Medium",
    price: "₹1,200/piece",
    category: "Handicrafts",
    details:
      "Handmade leather bags and shoes from Hyderabad artisans have strong demand in Australia. Connect with Leather Industries Development Authority (LIDA) Hyderabad.",
  },
];

const categories = ["All", "Food", "Handicrafts", "Textiles"];

function DemandBadge({ level }: { level: string }) {
  if (level === "Very High")
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 font-medium">
        🔴 Very High
      </span>
    );
  if (level === "High")
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-medium">
        🟠 High
      </span>
    );
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 font-medium">
      🟡 Medium
    </span>
  );
}

export default function ImportExport() {
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState<(typeof opportunities)[0] | null>(
    null,
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-bold">
          Import-Export Opportunities
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Global demand for Indian products — start your export business today.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList data-ocid="import.filter.tab">
          {categories.map((c) => (
            <TabsTrigger
              key={c}
              value={c}
              data-ocid={`import.${c.toLowerCase()}.tab`}
            >
              {c}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((c) => (
          <TabsContent key={c} value={c} className="mt-4">
            <Card className="shadow-card">
              <CardContent className="p-0">
                <Table data-ocid="import.opportunities.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Demand</TableHead>
                      <TableHead>Avg Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(c === "All"
                      ? opportunities
                      : opportunities.filter((o) => o.category === c)
                    ).map((o, i) => (
                      <TableRow
                        key={o.id}
                        data-ocid={`import.opportunity.row.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {o.country}
                        </TableCell>
                        <TableCell>{o.product}</TableCell>
                        <TableCell>
                          <DemandBadge level={o.demand} />
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {o.price}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            data-ocid={`import.view_details.button.${i + 1}`}
                            onClick={() => setSelected(o)}
                            className="text-xs h-7"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" /> View
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent data-ocid="import.detail.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {selected?.country} — {selected?.product}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="flex items-center gap-3 flex-wrap">
              <DemandBadge level={selected?.demand ?? ""} />
              <span className="text-sm font-semibold text-green-600">
                Avg: {selected?.price}
              </span>
              <Badge variant="outline" className="text-xs">
                {selected?.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selected?.details}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelected(null)}
              data-ocid="import.detail.close_button"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
