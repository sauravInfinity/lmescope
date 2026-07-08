# LME — UI Screen Generation Prompt

## App Overview
**Life Made Easier (LME)** is a document management app for UK consumers. Users store important personal documents (passport, driving licence, MOT, insurance, tenancy agreement, etc.), track expiry dates, get renewal reminders, and share selected documents with up to 4 family members.

MVP v1.0 ships on iOS and Android (single React Native codebase).

---

## Design Language

| Attribute | Direction |
|-----------|-----------|
| **Vibe** | Clean, confident, trustworthy. Think Monzo + Notion — friendly but not cartoonish, premium but not cold. |
| **Colours** | White/light grey backgrounds (#F7F8FA), dark text (#1A1D2E). Accent purple (#6C5CE7) for primary actions. Teal (#00B8B3) for secondary/success states. Red (#D85A3F) for expiries/alerts. |
| **Typography** | Inter family throughout. Heavy weights for impact (700–800 for headings, 500 for body). Clean, highly readable. |
| **Corners** | 12px–14px radius on cards. Softer but not pill-shaped. |
| **Shadows** | Subtle — `0 8px 32px rgba(0,0,0,0.06)`. No heavy drop shadows. |
| **Icons** | Line-style, consistent stroke width. Neutral grey, colour only when indicating status. |
| **iOS** | Edge-to-edge, respects safe areas (notch, Dynamic Island, home indicator). San Francisco system font fallback. |
| **Android** | Material Design guidelines. Edge-to-edge on Android 15+. 48dp touch targets. |

---

## Screens to Generate

### 1. Welcome / Onboarding (first-launch flow)
4 screens, swiped horizontally:
- **Intro** — App logo + tagline ("Your important documents, organised")
- **Category selection** — Grid of 7 categories (Vehicle, Home, Health, Finance, Identity, Family, Work) + Other. User taps the ones they have. Each has a subtle icon.
- **Upload prompt** — Illustration of a phone taking a photo of a document. CTA: "Upload your first document"
- **Reminder setup** — "We will remind you before things expire." Simple toggle for push + permission pre-prompt explanation card.
- Skip button always visible. Progress dots at bottom.

### 2. Login / Register
Clean, minimal. No clutter.
- **Email + password** fields. Big CTA: "Sign in" (purple filled).
- **Divider** with "or" text
- **Google Sign-In** button (light, with Google icon)
- **Apple Sign-In** button (dark, with Apple icon)
- **"Forgot password?"** link below
- **Bottom link**: "Don't have an account? Sign up"
- Register screen same layout but with "Create account" and optional phone field (collapsed/labelled "Phone (for account recovery — optional)")
- **Biometric prompt** after successful login (Face ID / fingerprint) — "Lock the app with Face ID?" — Skip or Enable.

### 3. Home Dashboard
This is the main screen users see every day. Must feel alive and useful at a glance.
- **Top bar** — App logo/brand left, profile avatar + notification bell (with badge count) right.
- **Big completeness ring** — Centre-aligned, ~120px diameter. Shows overall % complete (e.g., 65%). Animated arc. Colour: purple gradient.
- **Below ring** — "You've added 4 of 7 categories" text
- **Category cards** — Horizontal scroll of small tappable cards, one per category the user selected during onboarding. Each shows: icon, category name, count of docs uploaded, small progress bar (green/amber/red). Incomplete categories shown dashed/ghosted.
- **"Expiring soon" row** — Up to 3 horizontal cards showing document thumbnail (or generic doc icon), name, days left (red countdown). Tapping opens the document.
- **Recent uploads** — Last 3 documents, small thumbnails with filename + date.
- **AI suggestion card** (only one at a time) — Subtle purple-tinted card: "You have a mortgage — would you like to add home insurance?" with a dismiss (X) button.
- **Floating action button (FAB)** — Bottom right. Purple, "+" icon. Always visible. Starts a new document upload.

### 4. Document List (per category)
Tapping a category card from the dashboard opens this.
- **Header** — Category name + icon left. Back arrow top-left.
- **Sort / filter toggle** — Right of header: sort by name / expiry / upload date. Filter by document type if applicable.
- **Search bar** — Below header. Full-text across names and notes.
- **List** — Each row shows: document icon/thumbnail, name, expiry date (with colour dot: green >60d, amber 7–60d, red <7d or expired).
- **Empty state** — If no docs in this category, show a friendly illustration + "Nothing here yet — tap + to add your first document"
- **Long-press** context menu: View, Download, Delete.

### 5. Document Detail / View
- **Top bar** — Document name. Back arrow. Three-dot menu (Edit metadata, Download, Delete).
- **Document preview** — Large area showing the document image (or PDF). Pinch to zoom. Swipeable if multiple pages.
- **Metadata panel** — Below preview (or slide-up sheet):
  - Issued: date
  - Expires: date (with countdown in days)
  - Category: chip/badge
  - Notes: free text
  - File size: compact
- **"Set reminder" button** — Opens reminder picker (90/60/30/7 days before expiry).
- **Delete confirmation** — Two-tap: first tap turns button red, second tap deletes. "This will be recoverable for 30 days."

### 6. Upload Flow
Entry point: FAB from any screen.
- **Sheet slides up** — Two big options: "Take a photo" (camera icon) | "Choose from files" (folder icon).
- **After capture/pick** — Preview screen showing the document with a crop/rotate option.
- **Metadata form** — Fields: Document name (pre-filled from category), Category (dropdown with 8 options), Issue date, Expiry date (optional), Notes (optional, multiline).
- **CTA**: "Save document" — full-width, purple.
- **Success state** — Brief checkmark animation, then auto-navigate back to the category view with the new doc visible.

### 7. Profile / Settings
- **Avatar + name** at top. Edit button.
- **List rows**:
  - Personal details (name, DOB, country)
  - Notification preferences (per-type toggles: reminders, family updates, tips)
  - Manage subscription (shows current plan, storage used / total, upgrade button)
  - Family (shows member count, invite button)
  - Privacy policy (link)
  - Delete account (red, with confirmation flow)
  - Logout

### 8. Subscription / Plans Screen
- **Current plan card** at top — Shows plan name, storage used (visual bar: "240 MB of 1 GB used"), expiry/renewal date if paid.
- **Plan comparison table** — 3 columns: Free | Individual (£4–5/mo) | Family (£7–9/mo). Rows: Storage, Members, Geo-notifications, Priority support. Checkmarks for included features.
- **Monthly / Annual toggle** — Segmented control. Annual shows "Save 26%" tag.
- **CTA**: "Upgrade" / "Current plan" badge.
- **Restore Purchases** link at bottom.
- **Footer**: "Subscriptions managed through your App Store / Google Play settings."

### 9. Family Hub
- **Header**: "Family" with member count.
- **Member cards** — Horizontal or grid. Each shows: avatar circle with initial, name, their document count, completeness score. Owner has a crown icon.
- **Invite button** — "Invite member" CTA. Tapping opens email or share sheet with invite link.
- **Permission management** — Tap a member → see which document categories they have access to. Owner can toggle per category.
- **Shared notifications toggle** — "Weekly family digest" on/off.
- **Free-tier upgrade prompt** — If user is on free plan, show a note: "Upgrade to Family plan to add members."

### 10. Notifications Centre
- **Header**: "Notifications" with a "Mark all read" link.
- **List**: Each notification shows icon (bell, doc, family, warning), title, time ago, read/unread dot. Grouped by date (Today, This Week, Earlier).
- **Types of notifications**: Document expiring in X days, Family member added a document, Gap suggestion ("Add home insurance"), Geo-alert ("You are near the DVLA office — need your driving licence?").
- **Swipe to dismiss** (marks as read).
- **Empty state**: "No notifications yet. Set a reminder on a document and we will let you know before it expires."

### 11. Expiry Dashboard
A focused view of everything expiring.
- **Header**: "Expiry overview"
- **Timeline-style list** — Documents sorted by expiry date (closest first). Each row shows: doc name, category chip, expiry date, days remaining (large number), colour strip (green → amber → red).
- **Filter chips**: "Expiring this month | Next 3 months | All"
- **Calendar icon** option to view as mini-calendar with dots on expiry dates.

### 12. Search Results Screen
- **Search bar** at top, auto-focused. Below: recent searches as chips.
- **Results appear live** as user types. Grouped by category.
- Each result shows: document icon/thumbnail, name, category, matched text snippet, expiry.
- **Empty state**: "No documents match your search. Try a different term."

---

## User Flow Summary

```
App Install → Onboarding (4 steps) → Login/Register → Dashboard
                                                         ↓
                                              Upload doc ← FAB
                                              View doc
                                              Category list
                                              Expiry dashboard
                                              Search
                                              Notifications
                                              Profile / Settings
                                              Family hub
                                              Subscription
```

## Platform Notes
- React Native, single codebase
- iOS and Android — adapt safe areas and system bar behaviour per platform
- No tablet-specific layouts in v1.0, but must not crash on iPad/tablets
- Support Dynamic Type / font scaling
- Dark mode is Phase 2 — only light theme for v1.0

## Design Constraints
- Only collect email + password at sign-up. Phone is optional.
- Location and notification permissions are opt-in, requested at point of use.
- FAB must be accessible from every main screen.
- Maximum 4 family members. Private document spaces by default.
- Free tier = 1 GB storage. Show storage usage clearly.
