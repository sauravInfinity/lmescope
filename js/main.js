/* =====================================================
   Life Made Easier — MVP Scope Freeze v1.0
   Area-based Interactions
   ===================================================== */

/* ---------- FEATURE DATA ---------- */
const FEATURES = [
  { key:'core', name:'Authentication', count:7,
    items:[
      ['Email signup','Standard registration flow'],
      ['Login','Email + password'],
      ['Forgot password','Self-serve reset'],
      ['Google login','Social sign-in'],
      ['Apple login','Required for App Store approval'],
      ['Biometric authentication','Face ID / fingerprint, returning users'],
      ['Logout','Session termination'],
    ]},
  { key:'core', name:'Onboarding', count:5,
    items:[
      ['Welcome screens','4-step guided session: intro → category → upload → reminder'],
      ['Category selection','What documents do you have?'],
      ['Upload first document','Moment-of-value within 60 seconds'],
      ['Set first reminder','Closes the onboarding loop'],
      ['Permissions flow','Notifications + location, pre-permission screens with rationale'],
    ]},
  { key:'core', name:'User profile', count:4,
    items:[
      ['Edit profile','Name, shown in notifications'],
      ['Date of birth','Optional, for age-related suggestions'],
      ['Country','UK default'],
      ['Notification settings','Per-type enable / disable'],
    ]},
  { key:'core', name:'Document management', count:10,
    items:[
      ['Upload via camera','Photograph a physical document'],
      ['Upload via file picker','PDF, JPG, PNG import'],
      ['Add metadata','Name, issue date, expiry date, notes'],
      ['View document','Open within the app'],
      ['Download document','Save to device'],
      ['Delete document','Two-tap confirm, 30-day soft delete'],
      ['Search documents','Full-text across names, notes, categories'],
      ['7 fixed categories','Vehicle, Home, Health, Finance, Identity, Family, Work + Other'],
      ['Completeness score','Per-category, default checklist'],
      ['Expiry status colour coding','Green / amber / red + countdown ring'],
    ]},
  { key:'core', name:'Dashboard', count:6,
    items:[
      ['Overall completeness ring','Combined across all categories'],
      ['Per-category completeness','Tappable category cards with progress bars'],
      ['Recent documents','Last 3 uploaded, quick access'],
      ['Expiry dashboard','Top 3 documents expiring soonest'],
      ['Quick-add button','Floating action button, accessible from every screen'],
      ['AI suggestion card','One Gap Detector prompt at a time, dismissible'],
    ]},
  { key:'core', name:'Family sharing', count:5,
    items:[
      ['Invite members','Up to 4, via email or in-app link'],
      ['Separate document spaces','Private by default per member'],
      ['Permission management','Owner controls document visibility per member'],
      ['Family hub','All members + completeness at a glance'],
      ['Shared notifications','Weekly household expiry digest'],
    ]},
  { key:'core', name:'Notifications', count:4,
    items:[
      ['Push notifications','APNs / FCM'],
      ['Email notifications','SendGrid, fallback if push unopened in 24h'],
      ['In-app notification centre','Persistent log with read/unread state'],
      ['Reminder preferences','90 / 60 / 30 / 7-day, user-configurable per document type'],
    ]},
  { key:'core', name:'Subscription', count:6,
    items:[
      ['Free plan','1 GB storage, all categories'],
      ['Individual plan','\u00A34\u20135/month'],
      ['Family plan','\u00A37\u20139/month'],
      ['Monthly billing','Standard cycle, auto-renew'],
      ['Annual billing','26\u201327% discount, lower churn'],
      ['RevenueCat integration','Cross-platform receipt validation, webhook entitlement sync'],
    ]},
  { key:'ai', name:'Geo-triggered notifications', count:1,
    items:[['Geofenced location alerts','Hospital, airport, DVLA, Post Office, school \u2014 rule-based, freq capped at 1/zone/7d']]},
  { key:'ai', name:'Renewal intelligence engine', count:1,
    items:[['Renewal knowledge base','Cost, requirements, processing time, links per doc type \u2014 curated via admin portal, not live AI']]},
  { key:'ai', name:'Document gap detector', count:1,
    items:[['Rule-based gap suggestions','"If user has X, suggest Y" \u2014 e.g. mortgage \u2192 home insurance, MOT \u2192 V5C']]},
];

const OUT_OF_SCOPE = [
  'OCR document recognition','AI photo scanning','Chatbot / conversational AI','Web user portal',
  'Dark mode','Custom categories','Business / multi-user accounts',
  'University / NHS / DVLA API integration','Auto document import','Desktop application',
  'Multi-language support','Full offline mode'
];

/* ---------- RENDER ACCORDION ---------- */
function renderAccordion(filter) {
  const grid = document.getElementById('catGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const list = filter === 'all' ? FEATURES : FEATURES.filter(c => c.key === filter);

  list.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'accordion-card';

    const head = document.createElement('div');
    head.className = 'accordion-head';
    head.tabIndex = 0;
    head.role = 'button';
    head.setAttribute('aria-expanded','false');
    head.innerHTML = `
      <div class="accordion-title-wrap">
        <span class="accordion-title">${cat.name}</span>
        <span class="accordion-count">${cat.count} included</span>
      </div>
      <span class="accordion-chevron" aria-hidden="true">&#x2304;</span>
    `;

    const body = document.createElement('div');
    body.className = 'accordion-body';

    const items = document.createElement('div');
    items.className = 'accordion-items';
    items.innerHTML = cat.items.map(it => `
      <div class="accordion-item">
        <div class="item-check" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6 11.5L13 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="item-text">
          <div class="item-name">${it[0]}</div>
          <div class="item-desc">${it[1]}</div>
        </div>
      </div>
    `).join('');

    body.appendChild(items);
    card.appendChild(head);
    card.appendChild(body);
    grid.appendChild(card);

    const toggle = () => {
      const open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
    };

    head.addEventListener('click', toggle);
    head.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

/* ---------- RENDER OUT OF SCOPE ---------- */
function renderOutOfScope() {
  const grid = document.getElementById('outGrid');
  if (!grid) return;
  grid.innerHTML = OUT_OF_SCOPE.map(f => `<div class="oos-card">${f}</div>`).join('');
}

/* ---------- PROGRESS ---------- */
function updateProgress() {
  const total = FEATURES.reduce((s,c) => s + c.count, 0);
  const all = total + OUT_OF_SCOPE.length;
  const el = document.getElementById('scopeCount');
  const label = document.getElementById('scopeLabel');
  const fill = document.getElementById('progressFill');
  const track = document.querySelector('.progress-track');

  if (el) el.textContent = total;
  if (label) label.textContent = `of ${all} candidate features locked`;

  if (fill && track) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        const pct = Math.round((total / all) * 100);
        fill.style.width = pct + '%';
        track.setAttribute('aria-valuenow', pct);
      }, 300);
    });
  }
}

/* ---------- FILTER SETUP ---------- */
document.querySelectorAll('.filter-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected','false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    renderAccordion(btn.dataset.filter);
  });
});

/* ---------- MOBILE NAV ---------- */
const topnav = document.querySelector('.topnav');
const toggleBtn = document.querySelector('.topnav-toggle');
if (topnav && toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const open = topnav.classList.toggle('open');
    toggleBtn.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(open));
  });

  topnav.querySelectorAll('.topnav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      topnav.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- SIDEBAR TOC SCROLL SPY ---------- */
const tocLinks = document.querySelectorAll('.toc-link');
const areas = document.querySelectorAll('.area');

function updateActiveTOC() {
  let current = '';
  areas.forEach(area => {
    const rect = area.getBoundingClientRect();
    if (rect.top <= 120) current = area.id;
  });

  tocLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateActiveTOC, { passive: true });

/* ---------- MODULE DATA ---------- */
const MODULES = [
  {
    num: 1, name: 'Onboarding & Account Management',
    stories: [
      { id: 'US-01', name: 'Email Registration',
        desc: 'As a new user, I want to register with email and password so that I can create a secure account.',
        notes: ['Password min 10 chars with complexity', 'Checked against HaveIBeenPwned API', 'Confirmation email sent after registration', 'User lands on guided onboarding flow after successful registration'],
        conditions: [
          [ 'User taps "Sign up with email"', 'Email + password + confirm-password fields appear, with a live password strength indicator.' ],
          [ 'User types a password', 'Length/complexity checked live. On blur, checked against HaveIBeenPwned; if breached, error shown and Create Account stays disabled.' ],
          [ 'User taps "Create Account"', 'Account created, confirmation email sent, user routed straight into Step 1 of onboarding.' ],
          [ 'User taps "Create Account" with an existing email', 'Inline error: account already exists, with a link to log in instead.' ],
        ]},
      { id: 'US-02', name: 'Social Sign-In (Google & Apple)',
        desc: 'As a new user, I want to sign in with Google or Apple ID so that I don\'t have to create a new password.',
        notes: ['Apple Sign In required for App Store approval', 'Social sign-in users complete the same onboarding flow', 'No duplicate accounts if email already exists'],
        conditions: [
          [ 'User taps "Continue with Apple"', 'Native Apple auth sheet appears; app checks the returned email against existing accounts.' ],
          [ 'User taps "Continue with Google"', 'Native Google auth flow appears; same email-matching check runs.' ],
          [ 'Email matches an existing account', 'User logged into that account and taken to Home — no duplicate created, onboarding skipped.' ],
          [ 'Email is new', 'New account created, user routed into Step 1 of onboarding.' ],
        ]},
      { id: 'US-03', name: 'Guided 4-Step Onboarding',
        desc: 'As a new user, I want to be guided through setup so that I understand the app\'s value within 60 seconds.',
        notes: ['Each step individually skippable', 'Completeness ring appears immediately after first upload'],
        conditions: [
          [ 'Onboarding loads (Step 1)', 'Full-screen value statement + "Next" button + small "Skip" link.' ],
          [ 'User taps "Next" on Step 1', 'Advances to Step 2: grid of the 7 fixed categories with checkboxes.' ],
          [ 'User selects categories, taps "Next"', 'Advances to Step 3: camera/file-picker prompt for first document.' ],
          [ 'User uploads a document in Step 3', 'Document stored, completeness ring appears immediately, advances to Step 4.' ],
          [ 'User taps "Skip" instead', 'Step bypassed, no document stored, advances to next step.' ],
          [ 'Step 4 completed or skipped', 'Onboarding ends; user lands on the Home Dashboard.' ],
        ]},
      { id: 'US-04', name: 'Pre-Permission Screens (Location & Notifications)',
        desc: 'As a new user, I want to see a clear explanation before being asked for permissions so that I understand why the app needs them.',
        notes: ['If location denied, geo-notifications disabled silently', 'If notifications denied, email fallback used'],
        conditions: [
          [ 'App needs notification permission', 'Custom screen shown first: "Get notified before your documents expire" + Enable / Not now.' ],
          [ 'User taps "Enable"', 'Native OS permission dialog fires; result stored against the account.' ],
          [ 'User denies at OS level', 'All reminders switch silently to email for that user.' ],
          [ 'App needs location permission', 'Custom screen shown first, explaining geo-reminders, before the native prompt.' ],
          [ 'User denies location', 'Geo-notifications disabled silently — no repeated prompts.' ],
        ]},
      { id: 'US-05', name: 'Biometric Login',
        desc: 'As a returning user, I want to log in with Face ID or fingerprint so that I can access my documents quickly.',
        notes: ['Face ID on iOS, fingerprint on Android', 'Re-auth required for document download and account deletion', 'Session expires after 30 minutes of inactivity'],
        conditions: [
          [ 'User opens app within an active session', 'Unlocks directly to Home — no biometric prompt.' ],
          [ 'User opens app after 30 minutes inactive', 'Biometric prompt appears; "Use password instead" always available.' ],
          [ 'User taps "Download" on a document', 'Re-triggers biometric/password prompt before proceeding.' ],
          [ 'User taps "Delete Account"', 'Re-triggers biometric/password prompt before proceeding.' ],
        ]},
      { id: 'US-06', name: '2FA Setup (Email OTP)',
        desc: 'As a security-conscious user, I want to enable two-factor authentication so that my account is better protected.',
        notes: ['Optional but prominently promoted during onboarding', 'Email OTP based — 6-digit code sent to registered email', 'Can be enabled/disabled from Settings'],
        conditions: [
          [ 'User taps "Enable 2FA"', 'OTP sent to the user\'s registered email address.' ],
          [ 'User enters the 6-digit OTP correctly', '2FA activated on the account.' ],
          [ 'User taps "Disable 2FA"', 'Requires password/biometric confirmation, then removes the requirement.' ],
          [ 'User logs in with 2FA active', 'After password, 6-digit OTP sent to email; user prompted to enter it.' ],
        ]},
    ]
  },
  {
    num: 2, name: 'Document Management',
    stories: [
      { id: 'US-07', name: 'Upload via Camera',
        desc: 'As a user, I want to photograph a physical document so that I can store it without scanning.',
        notes: ['Image stored securely (AES-256)', 'Upload confirmation animation and "securely stored" message'],
        conditions: [
          [ 'User taps the Camera upload option', 'In-app camera opens with a document-frame guide.' ],
          [ 'User taps the shutter', 'Photo shown on review screen with Retake / Use Photo.' ],
          [ 'User taps "Use Photo"', 'Image encrypted and uploaded; form appears for Document Name, Category, Expiry Date (optional).' ],
          [ 'User taps "Save"', 'Success animation + "Securely stored" message; document appears in its category.' ],
        ]},
      { id: 'US-08', name: 'Upload via File Picker',
        desc: 'As a user, I want to import a PDF, JPG, or PNG from my device or cloud storage so that I can upload digital documents.',
        notes: ['Supports PDF, JPG, PNG', 'Maximum file size: 50MB per upload'],
        conditions: [
          [ 'User taps the File Picker option', 'Native picker opens, scoped to device storage and connected cloud providers.' ],
          [ 'User selects a valid file (up to 50MB)', 'Same name/category/expiry form as the camera flow appears, then saves.' ],
          [ 'User selects a file over 50MB', 'Upload rejected before processing; error message states the 50MB limit and the file\'s actual size.' ],
        ]},
      { id: 'US-09', name: 'Document Expiry Tracking',
        desc: 'As a user, I want to see a visual indicator of my document\'s expiry status so that I know at a glance what needs attention.',
        notes: ['Green >90 days, Amber 1-90 days, Red ≤0 days', 'No expiry date = no ring shown'],
        conditions: [
          [ 'Document card renders', 'Ring colour computed from days-to-expiry: >90 green, 1–90 amber, ≤0 red, no date = no ring.' ],
          [ 'User taps the ring/card', 'Opens document detail screen with exact expiry date and days remaining.' ],
        ]},
      { id: 'US-10', name: 'Document Actions — View, Download, Delete',
        desc: 'As a user, I want to view, download, and delete my documents so that I have full control over my stored files.',
        notes: ['Documents fetched live via API on every view — no local cache', 'Delete = two-tap confirm, 30-day soft delete', 'Recoverable within 30-day window'],
        conditions: [
          [ 'User taps a document thumbnail', 'Full-screen viewer opens; document content fetched live via API — nothing read from local device storage or cache.' ],
          [ 'User taps "Download"', 'Re-authentication check runs, then file fetched via API and explicitly saved to device local storage.' ],
          [ 'User taps "Delete"', 'Confirmation dialog appears explaining the 30-day restore window.' ],
          [ 'User confirms delete', 'Document soft-deleted, removed from lists and completeness scores immediately.' ],
          [ 'User opens Recently Deleted within 30 days', 'Document listed with a Restore action.' ],
          [ '30 days pass with no restore', 'Document permanently and irreversibly deleted.' ],
        ]},
      { id: 'US-11', name: 'Category Assignment & Reassignment',
        desc: 'As a user, I want to assign a document to a category and change it later so that my documents stay organised.',
        notes: ['7 fixed categories + "Other" catch-all', 'Moving category updates completeness for both old and new category'],
        conditions: [
          [ 'User is on the upload form', 'Category dropdown shows the 7 fixed categories plus "Other".' ],
          [ 'User opens a document and taps "Change Category"', 'Same picker appears, current category pre-selected.' ],
          [ 'User selects a new category', 'Document moves instantly; both categories\' completeness scores recalculate.' ],
        ]},
      { id: 'US-12', name: 'Completeness Score per Category',
        desc: 'As a user, I want to see how complete each category\'s document profile is so that I know what\'s missing.',
        notes: ['Score based on predefined checklist per category', 'Updates in real time as documents are added or removed'],
        conditions: [
          [ 'User views a category screen', 'Percentage badge shown, based on checklist items present vs total for that category.' ],
          [ 'User uploads a matching document', 'Percentage recalculates immediately.' ],
          [ 'User deletes a counted document', 'Percentage recalculates down immediately.' ],
        ]},
      { id: 'US-13', name: 'Search',
        desc: 'As a user, I want to search across all my documents so that I can find a specific document quickly.',
        notes: ['Covers document names, notes, and category names', 'Results appear live as user types'],
        conditions: [
          [ 'User taps the Search bar', 'Keyboard opens; no results shown until typing starts.' ],
          [ 'User types a query', 'Matching results narrow live by name, notes, or category.' ],
          [ 'Query matches nothing', 'Empty state shown: no documents found for that query.' ],
        ]},
    ]
  },
  {
    num: 3, name: 'Home Screen & Navigation',
    stories: [
      { id: 'US-14', name: 'Home Dashboard',
        desc: 'As a returning user, I want to see what needs my attention within 10 seconds of opening the app so that I don\'t have to navigate to find issues.',
        notes: ['Top 3 soonest-expiring documents shown', 'Overall completeness ring + per-category cards', 'One AI gap suggestion shown as a card'],
        conditions: [
          [ 'User opens the app', 'Home renders: completeness ring, top-3 expiring documents, category cards, Recently Added, one AI suggestion card.' ],
          [ 'User taps a top-3 expiring document', 'Navigates to that document\'s detail screen.' ],
          [ 'User taps a category card', 'Navigates to that category\'s document list.' ],
          [ 'User taps the AI suggestion card', 'Opens the flow to add the suggested document, or dismiss it.' ],
        ]},
      { id: 'US-15', name: 'Quick Add Button',
        desc: 'As a user, I want a fast way to upload a new document from any screen so that adding documents feels effortless.',
        notes: ['Floating action button visible on all main screens', 'Works consistently on iOS and Android'],
        conditions: [
          [ 'User is on any main screen', 'Floating action button visible, fixed position.' ],
          [ 'User taps the button', 'Upload flow (Camera/File Picker choice) opens immediately.' ],
        ]},
    ]
  },
  {
    num: 4, name: 'Family Sharing',
    stories: [
      { id: 'US-16', name: 'Invite Family Members',
        desc: 'As a Family Plan subscriber, I want to invite up to 4 family members so that we can all manage documents in one place.',
        notes: ['Invite via email or in-app shareable link', 'Invite expires after 7 days', 'Free-tier user sees upgrade prompt'],
        conditions: [
          [ 'Owner taps "Invite Member"', 'Choice of email invite or shareable link; blocked once 4 members are reached.' ],
          [ 'Owner sends an email invite', 'Invitation email dispatched with a 7-day expiry.' ],
          [ 'Owner shares the link instead', 'OS share sheet opens with the join link.' ],
          [ 'Invitee opens an expired link', '"This invite has expired" screen shown.' ],
          [ 'Free-tier user taps "Invite Member"', 'Upgrade prompt shown instead of the invite flow.' ],
        ]},
      { id: 'US-17', name: 'Member Document Privacy',
        desc: 'As a family member, I want my documents to be private by default so that other family members can\'t see my files.',
        notes: ['All member documents private by default', 'Members can share individual documents with specific members'],
        conditions: [
          [ 'Member uploads a document', 'Private by default, visible only to that member.' ],
          [ 'Member taps "Share with..."', 'Picker of other members appears; selected members gain view access to that document only.' ],
          [ 'Owner views a member\'s profile in Family Hub', 'Sees document names, categories, and expiry status only — not file content unless explicitly shared.' ],
        ]},
      { id: 'US-18', name: 'Family Hub Screen',
        desc: 'As the account owner, I want to see all household members and their completeness scores in one view so that I can manage the household\'s document health.',
        notes: ['Weekly household digest sent to owner', 'Owner can remove a member'],
        conditions: [
          [ 'Owner opens Family Hub', 'List of all members with name, avatar, and completeness percentage.' ],
          [ 'Owner taps a member card', 'Navigates to that member\'s document profile.' ],
          [ 'Owner taps "Remove" on a member', 'Confirmation shown; on confirm, access is revoked immediately.' ],
          [ 'Every 7 days', 'Owner receives a weekly household digest notification/email.' ],
        ]},
      { id: 'US-19', name: 'Manage Member Permissions',
        desc: 'As the account owner, I want to add, remove, or change member permissions at any time so that I stay in control.',
        notes: ['Changes take effect immediately without app restart'],
        conditions: [
          [ 'Owner taps "Remove Member" and confirms', 'Member\'s access is invalidated immediately, live.' ],
          [ 'Owner adjusts a sharing permission', 'Change applies instantly on both owner\'s and member\'s devices.' ],
        ]},
    ]
  },
  {
    num: 5, name: 'Reminders & Notifications',
    stories: [
      { id: 'US-20', name: 'Expiry Reminders',
        desc: 'As a user, I want to receive push notifications before my documents expire so that I never miss a renewal deadline.',
        notes: ['Push at 90, 60, 30, and 7 days before expiry', 'Email fallback if push not opened within 24h', 'Each reminder type independently toggleable'],
        conditions: [
          [ 'Document reaches a 90/60/30/7-day milestone', 'Push notification sent referencing the document and days remaining.' ],
          [ 'Push not opened within 24 hours', 'Email fallback sent automatically.' ],
          [ 'User taps the notification', 'App opens directly to that document\'s detail screen.' ],
          [ 'User disabled a milestone in preferences', 'That milestone is skipped for all their documents.' ],
        ]},
      { id: 'US-21', name: 'In-App Notification Inbox',
        desc: 'As a user, I want to see a log of all notifications I\'ve received so that I can review past alerts.',
        notes: ['All push and email notifications appear in the inbox', 'Read/unread status shown'],
        conditions: [
          [ 'User opens the Notification Inbox', 'Reverse-chronological list of all notifications with timestamp, type, and document name.' ],
          [ 'User taps an unread notification', 'Marked read; navigates to the related document if applicable.' ],
        ]},
      { id: 'US-22', name: 'Notification Preferences',
        desc: 'As a user, I want to control which notifications I receive so that I\'m not overwhelmed.',
        notes: ['Separate toggle per notification type', 'Settings persist across sessions'],
        conditions: [
          [ 'User opens Notification Preferences', 'Independent toggles shown: Expiry Reminders (push/email), Engagement Prompts, AI Suggestions.' ],
          [ 'User turns off push only for a category', 'Push stops; email fallback still fires as normal.' ],
          [ 'User reopens the app or logs in elsewhere', 'All preferences persist exactly as set.' ],
        ]},
    ]
  },
  {
    num: 6, name: 'AI Features (Rule-Based)',
    stories: [
      { id: 'US-23', name: 'Geo-Triggered Notifications',
        desc: 'As an Individual or Family Plan subscriber, I want to receive contextual alerts when I\'m near a relevant location so that I\'m prepared with the right documents.',
        notes: ['Geofencing, not continuous GPS', 'Max 1 notification per location category per 7 days', 'Free-tier users do not receive geo notifications'],
        conditions: [
          [ 'Paid user enters a supported geofenced location', 'System checks 7-day frequency cap and document-gap relevance; notification fires if both pass.' ],
          [ 'Same location-category re-entered within 7 days', 'No second notification fires.' ],
          [ 'Free-tier user enters any geofenced location', 'No geo-notification generated.' ],
          [ 'User has denied location permission', 'Geofencing never activated for that user.' ],
        ]},
      { id: 'US-24', name: 'Renewal Intelligence Engine',
        desc: 'As a user with an expiring document, I want to see step-by-step renewal guidance inside the app so that I know exactly what to do without Googling.',
        notes: ['Knowledge base updateable via Admin Portal without app release', 'Free users see basic guide; paid users see full guide with location links'],
        conditions: [
          [ 'User opens document detail screen or expiry notification', '"How to renew" section available for supported document types.' ],
          [ 'User taps "How to renew" (free user)', 'Basic text guide shown (what\'s involved, general cost/time).' ],
          [ 'User taps "How to renew" (paid user)', 'Full guide shown, including renewal URL, exemptions, and nearest physical location.' ],
          [ 'Admin updates a renewal profile', 'Change reflected in the app immediately, no app release needed.' ],
        ]},
      { id: 'US-25', name: 'AI Document Gap Detector',
        desc: 'As a user, I want to receive suggestions for documents I\'m probably missing so that my profile is as complete as possible.',
        notes: ['Exactly one suggestion at a time on Home screen', 'Permanently dismissible via "Not applicable to me"'],
        conditions: [
          [ 'Home screen loads and a rule matches', 'One suggestion card appears with "Add now" and "Not applicable to me".' ],
          [ 'User taps "Add now"', 'Opens the upload flow pre-filtered to the suggested type.' ],
          [ 'User taps "Not applicable to me"', 'Suggestion permanently suppressed for this user.' ],
          [ 'Admin views the portal', 'Dismissal counts shown in aggregate only.' ],
        ]},
    ]
  },
  {
    num: 7, name: 'Admin Portal',
    stories: [
      { id: 'US-26', name: 'Admin Dashboard Access',
        desc: 'As an LME admin, I want to securely access a web dashboard so that I can monitor product performance.',
        notes: ['Login requires email + password + 2FA', 'All admin logins logged', 'Two access roles: read-only and full access'],
        conditions: [
          [ 'Admin logs in', 'Email + password, then mandatory TOTP 2FA code required.' ],
          [ 'Login succeeds', 'Timestamp, IP address, and session duration logged.' ],
          [ 'Read-only admin views a dashboard', 'Data visible, no edit/action controls rendered.' ],
          [ 'Full-access admin views a dashboard', 'Same data plus edit/action controls.' ],
        ]},
      { id: 'US-27', name: 'User & Engagement Metrics',
        desc: 'As an admin, I want to see user growth and engagement data so that I can make informed product decisions.',
        notes: ['Total registrations, daily/weekly/monthly signups, free vs paid split', 'DAU, MAU, retention cohorts'],
        conditions: [
          [ 'Admin opens the Growth dashboard', 'Registration trends, free/paid split, DAU, MAU, DAU/MAU ratio, and session frequency shown.' ],
          [ 'Admin views Retention section', 'Cohort table for Day 1/7/30/90 grouped by signup month.' ],
        ]},
      { id: 'US-28', name: 'Revenue Dashboard',
        desc: 'As an admin, I want to see subscription and revenue metrics so that I can track commercial performance for investors.',
        notes: ['MRR, ARR projection, plan breakdown', 'Data sourced from RevenueCat/Stripe integration'],
        conditions: [
          [ 'Admin opens the Revenue dashboard', 'MRR, ARR projection, plan breakdown, conversion rate, churn rate, and ARPU shown, pulled live from RevenueCat/Stripe.' ],
        ]},
      { id: 'US-29', name: 'Document Analytics',
        desc: 'As an admin, I want to see document upload trends and category data so that I can refine onboarding nudges.',
        notes: ['Aggregate-only data — GDPR strictly enforced', 'No individual user documents accessible'],
        conditions: [
          [ 'Admin opens Document Analytics', 'Aggregate-only figures shown: upload totals, category popularity, average docs per user, completeness distribution.' ],
        ]},
      { id: 'US-30', name: 'Notification Performance',
        desc: 'As an admin, I want to see how notifications are performing so that I can improve messaging strategy.',
        notes: ['Per notification type: push delivery rate, push open rate, email open rate, email click rate'],
        conditions: [
          [ 'Admin opens Notification Performance', 'Breakdown per notification type across delivery, push open, email open, and email click rates.' ],
        ]},
      { id: 'US-31', name: 'Knowledge Base Management',
        desc: 'As an admin, I want to update renewal guidance content without releasing an app update so that information stays current.',
        notes: ['Changes go live immediately without app store resubmission'],
        conditions: [
          [ 'Full-access admin opens a renewal profile', 'Editable fields shown: URL, cost, processing time, requirements, exemptions, location data.' ],
          [ 'Admin edits and taps "Publish"', 'Change live for all app users on next content fetch — no app release needed.' ],
        ]},
    ]
  },
  {
    num: 8, name: 'Security & GDPR',
    stories: [
      { id: 'US-32', name: 'Right to Erasure',
        desc: 'As a user, I want to delete my account and all associated documents so that my data is fully removed.',
        notes: ['Soft-delete for 30 days, then permanent deletion', 'Confirmation email sent', 'Recoverable within 30-day window via support'],
        conditions: [
          [ 'User taps "Delete Account"', 'Re-authentication required, then a warning dialog explains the 30-day window.' ],
          [ 'User confirms deletion', 'Account soft-deleted immediately; confirmation email sent; 30-day countdown begins.' ],
          [ 'User contacts support within 30 days', 'Account can still be restored.' ],
          [ '30 days elapse', 'All data permanently and irreversibly deleted.' ],
        ]},
      { id: 'US-33', name: 'Data Portability',
        desc: 'As a user, I want to export all my data so that I can take it elsewhere if I choose.',
        notes: ['Full export of document metadata and files', 'Delivered as ZIP with JSON metadata + files', 'Initiated from Settings; delivered via email'],
        conditions: [
          [ 'User taps "Export My Data"', 'Confirmation shown that a ZIP export will be prepared and emailed.' ],
          [ 'Export completes', 'Email sent with a secure download link to the ZIP file.' ],
        ]},
    ]
  },
  {
    num: 9, name: 'Subscriptions & Monetisation',
    stories: [
      { id: 'US-34', name: 'Free to Paid Upgrade',
        desc: 'As a Free user who has reached the 5-document limit, I want to upgrade to a paid plan so that I can continue adding documents.',
        notes: ['Upgrade prompt at 5-doc limit, paid-only feature access, and 50% completeness milestone', 'Limit enforced server-side'],
        conditions: [
          [ 'Free user attempts a 6th document upload', 'Upload blocked server-side; upgrade prompt shown.' ],
          [ 'Free user taps a paid-only feature', 'Action blocked; upgrade prompt explains it\'s paid-only.' ],
          [ 'User\'s completeness crosses 50%', 'One-time upgrade prompt shown.' ],
          [ 'Any client-side bypass attempt', 'API rejects the request regardless of client behaviour.' ],
        ]},
      { id: 'US-35', name: 'Annual Plan Upsell',
        desc: 'As a paying monthly user, I want to be offered an annual plan so that I can save money.',
        notes: ['Upsell presented at Month 9 via push and email', 'Switching is a one-tap action from the notification'],
        conditions: [
          [ 'Monthly subscriber reaches Month 9', 'Push and email sent stating the exact saving.' ],
          [ 'User taps the notification', 'One tap switches billing to annual — no extra checkout steps.' ],
        ]},
    ]
  },
];

/* ---------- RENDER MODULES ---------- */
function renderModules() {
  const grid = document.getElementById('moduleGrid');
  if (!grid) return;

  grid.innerHTML = MODULES.map(mod => {
    const storiesHtml = mod.stories.map(st => `
      <div class="story-card">
        <div class="story-head" tabindex="0" role="button" aria-expanded="false">
          <span class="story-id">${st.id}</span>
          <span class="story-name">${st.name}</span>
          <span class="story-chevron" aria-hidden="true">&#x2304;</span>
        </div>
        <div class="story-body">
          <div class="story-content">
            <div class="story-desc"><strong>Story:</strong> ${st.desc}</div>
            ${st.conditions.length ? `
              <table class="condition-table">
                <thead><tr><th>On this action...</th><th>This happens</th></tr></thead>
                <tbody>
                  ${st.conditions.map(c => `<tr><td>${c[0]}</td><td>${c[1]}</td></tr>`).join('')}
                </tbody>
              </table>
            ` : ''}
            ${st.notes && st.notes.length ? `
              <div class="story-notes">
                ${st.notes.map(n => `<span class="story-note-chip">${n}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="module-card">
        <div class="module-head" tabindex="0" role="button" aria-expanded="false">
          <div class="module-title-wrap">
            <span class="module-num">MODULE ${mod.num}</span>
            <span class="module-title">${mod.name}</span>
            <span class="module-count">${mod.stories.length} stories</span>
          </div>
          <span class="module-chevron" aria-hidden="true">&#x2304;</span>
        </div>
        <div class="module-body">
          <div class="module-stories">${storiesHtml}</div>
        </div>
      </div>
    `;
  }).join('');

  // Module accordion toggle (generous max-height for nested content)
  grid.querySelectorAll('.module-head').forEach(head => {
    const toggle = () => {
      const card = head.closest('.module-card');
      const body = card.querySelector('.module-body');
      const open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? '5000px' : '0px';
    };
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // Story accordion toggle
  grid.querySelectorAll('.story-head').forEach(head => {
    const toggle = () => {
      const card = head.closest('.story-card');
      const body = card.querySelector('.story-body');
      const open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? '1000px' : '0px';
    };
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

/* ---------- REVEAL ON SCROLL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('shown'); });
}, {threshold:0.15});

/* ---------- FLOATING PARTICLES ---------- */
(function createParticles(){
  for(let i = 0; i < 25; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.width = (2 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    p.style.animation = `float-particle ${8 + Math.random() * 12}s ease-in-out ${Math.random() * 10}s infinite`;
    p.style.opacity = 0.1 + Math.random() * 0.3;
    document.body.appendChild(p);
  }
})();

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float-particle{
    0%,100%{transform:translateY(0) translateX(0);opacity:0;}
    10%{opacity:0.3;}
    25%{transform:translateY(-80px) translateX(30px);opacity:0.2;}
    50%{transform:translateY(-160px) translateX(-20px);opacity:0.1;}
    75%{transform:translateY(-80px) translateX(40px);opacity:0.2;}
    90%{opacity:0.1;}
    100%{transform:translateY(0) translateX(0);opacity:0;}
  }
`;
document.head.appendChild(particleStyle);

/* ---------- PDF DOWNLOAD ---------- */
document.getElementById('downloadPdf')?.addEventListener('click', () => {
  window.print();
});

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderAccordion('all');
  renderOutOfScope();
  updateProgress();
  updateActiveTOC();
  renderModules();
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
