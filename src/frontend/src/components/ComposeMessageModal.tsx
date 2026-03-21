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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useSendMessage } from "../hooks/useQueries";

interface ComposeMessageModalProps {
  open: boolean;
  onClose: () => void;
  recipientId?: string;
  recipientName?: string;
  contextSubject?: string;
}

export default function ComposeMessageModal({
  open,
  onClose,
  recipientId = "",
  recipientName = "",
  contextSubject = "",
}: ComposeMessageModalProps) {
  const sendMessage = useSendMessage();
  const [to, setTo] = useState(recipientId);
  const [subject, setSubject] = useState(contextSubject);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (open) {
      setTo(recipientId);
      setSubject(contextSubject);
      setBody("");
    }
  }, [open, recipientId, contextSubject]);

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !body.trim()) return;
    await sendMessage.mutateAsync({ recipientId: to.trim(), subject, body });
    onClose();
  };

  const canSend = to.trim() && subject.trim() && body.trim();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-lg"
        data-ocid="messages.compose.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Send className="w-4 h-4 text-primary" />
            Compose Message
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>
              To{" "}
              {recipientName ? (
                <span className="text-muted-foreground font-normal">
                  (to: {recipientName})
                </span>
              ) : null}
            </Label>
            <Input
              data-ocid="messages.compose.to.input"
              placeholder="Recipient's principal ID"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              readOnly={!!recipientId}
              className={recipientId ? "opacity-70" : ""}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Subject *</Label>
            <Input
              data-ocid="messages.compose.subject.input"
              placeholder="What's this about?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Message *</Label>
            <Textarea
              data-ocid="messages.compose.body.textarea"
              placeholder="Write your message here..."
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="messages.compose.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!canSend || sendMessage.isPending}
            className="bg-primary text-primary-foreground"
            data-ocid="messages.compose.submit_button"
          >
            {sendMessage.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Send
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
