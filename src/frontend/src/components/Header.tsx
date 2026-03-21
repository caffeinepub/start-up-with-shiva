import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Mail, Menu, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "../App";
import type { Message } from "../backend.d";

interface HeaderProps {
  profile: UserProfile | null;
  onMenuToggle: () => void;
  onEditProfile: () => void;
  unreadMessages?: number;
  inbox?: Message[];
  onGoToMessages?: () => void;
}

const staticNotifs = [
  {
    id: "s1",
    text: "New opportunity near you - Cheap food demand in Hitech City",
    time: "2m ago",
    icon: "trend",
  },
  {
    id: "s2",
    text: "Demand increasing in Balapur area",
    time: "1h ago",
    icon: "trend",
  },
  {
    id: "s3",
    text: "Export opportunity: UAE wants vegetables from India",
    time: "3h ago",
    icon: "trend",
  },
];

export default function Header({
  profile,
  onMenuToggle,
  onEditProfile,
  unreadMessages = 0,
  inbox = [],
  onGoToMessages,
}: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [readStaticNotifs, setReadStaticNotifs] = useState<string[]>([]);
  const [readMessageNotifIds, setReadMessageNotifIds] = useState<bigint[]>([]);

  // Top 3 unread messages as notifications
  const unreadMsgs = inbox
    .filter((m) => !m.isRead && !readMessageNotifIds.includes(m.id))
    .slice(0, 3);

  const unreadStaticCount = staticNotifs.filter(
    (n) => !readStaticNotifs.includes(n.id),
  ).length;

  const totalUnread = unreadMessages + unreadStaticCount;

  const handleMarkMsgRead = (id: bigint) => {
    setReadMessageNotifIds((prev) => [...prev, id]);
    onGoToMessages?.();
    setNotifOpen(false);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      {/* Notifications */}
      <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-ocid="header.notification.button"
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell className="w-5 h-5" />
            {totalUnread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalUnread > 9 ? "9+" : totalUnread}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80"
          data-ocid="header.notification.popover"
        >
          <div className="px-3 py-2 border-b border-border">
            <p className="font-semibold text-sm">Notifications</p>
          </div>

          {/* Message notifications */}
          {unreadMsgs.map((msg) => (
            <DropdownMenuItem
              key={String(msg.id)}
              className="flex items-start gap-2.5 py-3 cursor-pointer"
              onClick={() => handleMarkMsgRead(msg.id)}
              data-ocid={`header.notification.message.${String(msg.id)}`}
            >
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-snug">
                  <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-1.5 align-middle" />
                  New message from {msg.senderName || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {msg.subject}
                </p>
              </div>
            </DropdownMenuItem>
          ))}

          {/* Static opportunity notifications */}
          {staticNotifs.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className="flex items-start gap-2.5 py-3 cursor-pointer"
              onClick={() => setReadStaticNotifs((prev) => [...prev, n.id])}
            >
              <div className="w-7 h-7 rounded-full bg-orange-brand/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-orange-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm leading-snug ${
                    readStaticNotifs.includes(n.id)
                      ? "text-muted-foreground"
                      : "font-medium"
                  }`}
                >
                  {!readStaticNotifs.includes(n.id) && (
                    <span className="inline-block w-1.5 h-1.5 bg-orange-brand rounded-full mr-1.5 align-middle" />
                  )}
                  {n.text}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            </DropdownMenuItem>
          ))}

          {totalUnread === 0 && (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              You're all caught up!
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-ocid="header.profile.button"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="hidden md:block text-sm font-medium">
              {profile ? profile.name.split(" ")[0] : "Guest"}
            </span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          data-ocid="header.profile.dropdown_menu"
        >
          {profile && (
            <div className="px-3 py-2 border-b border-border">
              <p className="font-medium text-sm">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.city}</p>
            </div>
          )}
          <DropdownMenuItem
            onClick={onEditProfile}
            data-ocid="header.profile.edit_button"
          >
            Edit Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
