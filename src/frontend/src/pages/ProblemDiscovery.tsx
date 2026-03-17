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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, ThumbsUp } from "lucide-react";
import { useState } from "react";
import {
  useGetAllProblems,
  usePostProblem,
  useUpvoteProblem,
} from "../hooks/useQueries";

const CATEGORIES = [
  "Food",
  "Transport",
  "Education",
  "Healthcare",
  "Services",
  "Technology",
  "Other",
];

function demandLevel(votes: bigint) {
  const n = Number(votes);
  if (n >= 30) return { label: "High", cls: "demand-high border" };
  if (n >= 15) return { label: "Medium", cls: "demand-medium border" };
  return { label: "Low", cls: "demand-low border" };
}

export default function ProblemDiscovery() {
  const { data: problems, isLoading } = useGetAllProblems();
  const postProblem = usePostProblem();
  const upvote = useUpvoteProblem();

  const [upvoted, setUpvoted] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleVote = (id: bigint) => {
    const key = String(id);
    if (upvoted.includes(key)) return;
    setUpvoted((p) => [...p, key]);
    upvote.mutate(id);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.location.trim() || !form.category) return;
    await postProblem.mutateAsync(form);
    setForm({ title: "", description: "", location: "", category: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Problem Discovery</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Find real needs and upvote problems you face too.
          </p>
        </div>
        <Button
          data-ocid="problems.add.primary_button"
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground shadow-orange"
        >
          <Plus className="w-4 h-4 mr-1" /> Post Problem
        </Button>
      </div>

      {showForm && (
        <Card
          className="shadow-card border-primary/30"
          data-ocid="problems.form.panel"
        >
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Post a New Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Problem Title *</Label>
              <Input
                data-ocid="problems.title.input"
                placeholder="e.g. No cheap food near my office"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                data-ocid="problems.description.textarea"
                placeholder="Describe the problem in detail..."
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Location *</Label>
                <Input
                  data-ocid="problems.location.input"
                  placeholder="e.g. Hitech City, Hyderabad"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger data-ocid="problems.category.select">
                    <SelectValue placeholder="Select category" />
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
            <div className="flex gap-3">
              <Button
                data-ocid="problems.submit.submit_button"
                onClick={handleSubmit}
                disabled={postProblem.isPending}
                className="bg-primary text-primary-foreground"
              >
                {postProblem.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit Problem"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="problems.cancel.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-3" data-ocid="problems.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : (problems ?? []).length === 0 ? (
        <Card className="shadow-card" data-ocid="problems.empty_state">
          <CardContent className="p-12 text-center">
            <p className="text-2xl mb-2">🔍</p>
            <p className="font-semibold">No problems posted yet.</p>
            <p className="text-muted-foreground text-sm mt-1">
              Be the first to post a local problem!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {(problems ?? []).map((p, i) => {
            const level = demandLevel(p.upvotes);
            const key = String(p.id);
            return (
              <Card
                key={key}
                className="shadow-card"
                data-ocid={`problems.item.${i + 1}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-sm">{p.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {p.category}
                        </Badge>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${level.cls}`}
                        >
                          {level.label === "High"
                            ? "🔴"
                            : level.label === "Medium"
                              ? "🟡"
                              : "🟢"}{" "}
                          {level.label} Demand
                        </span>
                      </div>
                      {p.description && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {p.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        📍 {p.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <Button
                        data-ocid={`problems.vote.button.${i + 1}`}
                        size="sm"
                        variant={
                          upvoted.includes(key) ? "secondary" : "outline"
                        }
                        onClick={() => handleVote(p.id)}
                        disabled={upvoted.includes(key) || upvote.isPending}
                        className="text-xs h-8 px-3"
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {upvoted.includes(key) ? "Voted" : "I Need This Too!"}
                      </Button>
                      <span className="text-xs font-bold text-primary">
                        {String(p.upvotes)} votes
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
