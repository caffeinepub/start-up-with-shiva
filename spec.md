# Start-up with Shiva

## Current State
Full-featured startup opportunity platform with messaging, sidebar notifications, and a bell icon in the header. The app already includes a `<Toaster>` component from sonner. When new messages arrive, the unread count shows in the sidebar badge and header bell, but no toast pop-up notification is shown.

## Requested Changes (Diff)

### Add
- Toast pop-up notification when a new unread message arrives (detected by comparing previous vs current inbox unread count)
- Sound alert (short chime) when a new message arrives

### Modify
- `App.tsx`: Add useEffect to watch inbox unread count and fire a toast + play a sound when count increases

### Remove
- Nothing

## Implementation Plan
1. In `App.tsx`, track previous unread message count with a ref
2. When `unreadCount` increases, call `toast()` from sonner with sender info if available, and optionally play a short audio chime via the Web Audio API
3. Toast should show sender name, subject, and a "View Messages" action button that navigates to the messages page
