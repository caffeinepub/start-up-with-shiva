import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Inbox,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Message, UserDirectoryEntry } from "../backend.d";
import ComposeMessageModal from "../components/ComposeMessageModal";
import {
  useGetMyInbox,
  useGetMySentMessages,
  useGetUserDirectory,
  useMarkAsRead,
} from "../hooks/useQueries";

const ACCOUNT_TYPE_BADGE: Record<string, string> = {
  seller: "bg-emerald-100 text-emerald-700 border-emerald-200",
  buyer: "bg-blue-100 text-blue-700 border-blue-200",
  investor: "bg-purple-100 text-purple-700 border-purple-200",
  partner: "bg-orange-100 text-orange-700 border-orange-200",
};

function formatTs(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AccountTypeBadge({ type }: { type: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs capitalize ${ACCOUNT_TYPE_BADGE[type] ?? "bg-muted text-muted-foreground"}`}
    >
      {type}
    </Badge>
  );
}

function MessageDetail({
  message,
  onBack,
}: {
  message: Message;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="gap-2 text-muted-foreground"
        data-ocid="messages.inbox.back.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Inbox
      </Button>
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="space-y-1">
              <CardTitle className="font-display text-lg">
                {message.subject}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  From: {message.senderName || "Unknown"}
                </span>
                <AccountTypeBadge type={message.senderAccountType} />
                {message.senderLocation && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {message.senderLocation}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTs(message.timestamp)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.body}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InboxTab() {
  const { data: inbox, isLoading } = useGetMyInbox();
  const markAsRead = useMarkAsRead();
  const [selected, setSelected] = useState<Message | null>(null);

  const handleOpen = (msg: Message) => {
    setSelected(msg);
    if (!msg.isRead) {
      markAsRead.mutate(msg.id);
    }
  };

  if (selected) {
    return (
      <MessageDetail message={selected} onBack={() => setSelected(null)} />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="messages.inbox.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!inbox || inbox.length === 0) {
    return (
      <Card className="shadow-card" data-ocid="messages.inbox.empty_state">
        <CardContent className="p-12 text-center">
          <Inbox className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-lg">Your inbox is empty</p>
          <p className="text-muted-foreground text-sm mt-1">
            Messages from other users will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {inbox.map((msg, i) => (
        <motion.div
          key={String(msg.id)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          data-ocid={`messages.inbox.item.${i + 1}`}
        >
          <Card
            className={`shadow-card cursor-pointer hover:border-primary/50 transition-all ${
              !msg.isRead ? "border-primary/30 bg-primary/5" : ""
            }`}
            onClick={() => handleOpen(msg)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                    <span
                      className={`font-semibold text-sm truncate ${
                        !msg.isRead
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.subject}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">
                      {msg.senderName || "Unknown"}
                    </span>
                    <AccountTypeBadge type={msg.senderAccountType} />
                    {msg.senderLocation && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {msg.senderLocation}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {formatTs(msg.timestamp)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function SentTab() {
  const { data: sent, isLoading } = useGetMySentMessages();
  const [selected, setSelected] = useState<Message | null>(null);

  if (selected) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelected(null)}
          className="gap-2 text-muted-foreground"
          data-ocid="messages.sent.back.button"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sent
        </Button>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="font-display text-lg">
                  {selected.subject}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  To: {selected.recipientId.toText()}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTs(selected.timestamp)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {selected.body}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="messages.sent.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!sent || sent.length === 0) {
    return (
      <Card className="shadow-card" data-ocid="messages.sent.empty_state">
        <CardContent className="p-12 text-center">
          <Send className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-lg">No sent messages</p>
          <p className="text-muted-foreground text-sm mt-1">
            Messages you send will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {sent.map((msg, i) => (
        <motion.div
          key={String(msg.id)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          data-ocid={`messages.sent.item.${i + 1}`}
        >
          <Card
            className="shadow-card cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => setSelected(msg)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{msg.subject}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    To: {msg.recipientId.toText()}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {formatTs(msg.timestamp)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function DirectoryTab({
  onCompose,
}: {
  onCompose: (entry: UserDirectoryEntry) => void;
}) {
  const { data: directory, isLoading } = useGetUserDirectory();
  const [search, setSearch] = useState("");

  const filtered = (directory ?? []).filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.accountType as string).toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="messages.directory.loading_state">
        <Skeleton className="h-10 rounded-xl" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        data-ocid="messages.directory.search_input"
        placeholder="Search by name, account type, or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {filtered.length === 0 ? (
        <Card
          className="shadow-card"
          data-ocid="messages.directory.empty_state"
        >
          <CardContent className="p-10 text-center">
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No users found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((user, i) => (
            <motion.div
              key={user.principal.toText()}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              data-ocid={`messages.directory.item.${i + 1}`}
            >
              <Card className="shadow-card hover:border-primary/40 transition-all h-full">
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <AccountTypeBadge type={user.accountType as string} />
                        {user.city && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {user.city}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => onCompose(user)}
                    data-ocid={`messages.directory.send.button.${i + 1}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

interface MessagesPageProps {
  initialCompose?: {
    recipientId: string;
    recipientName: string;
    subject?: string;
  } | null;
  onClearCompose?: () => void;
}

export default function Messages({
  initialCompose,
  onClearCompose,
}: MessagesPageProps) {
  const { data: inbox } = useGetMyInbox();
  const unreadCount = (inbox ?? []).filter((m) => !m.isRead).length;
  const [composeOpen, setComposeOpen] = useState(!!initialCompose);
  const [composeTarget, setComposeTarget] = useState<{
    recipientId: string;
    recipientName: string;
    subject?: string;
  } | null>(initialCompose ?? null);

  const openCompose = (target: {
    recipientId: string;
    recipientName: string;
    subject?: string;
  }) => {
    setComposeTarget(target);
    setComposeOpen(true);
  };

  const closeCompose = () => {
    setComposeOpen(false);
    setComposeTarget(null);
    onClearCompose?.();
  };

  const handleDirectoryCompose = (user: UserDirectoryEntry) => {
    openCompose({
      recipientId: user.principal.toText(),
      recipientName: user.name,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Messaging
              </span>
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <h1 className="font-display text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Connect directly with sellers, buyers, investors, and partners.
            </p>
          </div>
          <Button
            onClick={() =>
              openCompose({ recipientId: "", recipientName: "", subject: "" })
            }
            className="bg-primary text-primary-foreground gap-2"
            data-ocid="messages.compose.open_modal_button"
          >
            <MessageSquare className="w-4 h-4" /> Compose
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="inbox">
        <TabsList className="mb-4" data-ocid="messages.tabs.tab">
          <TabsTrigger value="inbox" className="gap-2">
            <Inbox className="w-4 h-4" /> Inbox
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0 ml-1">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent" className="gap-2">
            <Send className="w-4 h-4" /> Sent
          </TabsTrigger>
          <TabsTrigger value="directory" className="gap-2">
            <Users className="w-4 h-4" /> Directory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <ScrollArea className="max-h-[600px] pr-2">
            <InboxTab />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sent">
          <ScrollArea className="max-h-[600px] pr-2">
            <SentTab />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="directory">
          <DirectoryTab onCompose={handleDirectoryCompose} />
        </TabsContent>
      </Tabs>

      <ComposeMessageModal
        open={composeOpen}
        onClose={closeCompose}
        recipientId={composeTarget?.recipientId ?? ""}
        recipientName={composeTarget?.recipientName ?? ""}
        contextSubject={composeTarget?.subject ?? ""}
      />
    </div>
  );
}
