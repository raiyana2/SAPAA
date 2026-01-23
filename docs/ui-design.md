# UI Design Documentation

## Overview

This document explains how UI design principles, usability heuristics, and accessibility considerations were applied in both the SAPAA mobile application (React Native) and web application (Next.js). The goal is to provide an intuitive, accessible, and efficient experience for environmental stewards and administrators managing site assessment data.

---

## Design Principles

### Visual Consistency

**Principle:** Maintain a consistent visual language to reduce cognitive load and build user confidence.

**Implementation:**

- **Unified navigation shell**
    - **Mobile**: All screens use the same green top app bar with title + back button. A persistent bottom tab bar provides access to: **Analytics**, **Sites**, and **SAPAA Map**.
    - **Web**: Consistent header with SAPAA logo, gradient green background, and navigation elements. Admin pages use a hamburger menu for navigation.

- **Standardized colour palette**
    - Primary green (`#2E7D32`, `#356B43`, `#254431`) for headers and primary actions.
    - White (`#FFFFFF`) for content cards and main background.
    - Light grey (`#F7F2EA`, `#E4EBE4`) for dividers and secondary surfaces.
    - Red (`#B91C1C`, `#DC2626`) for destructive actions (e.g., *Delete   Account*).
    - Gradient backgrounds (`from-[#F7F2EA] via-[#E4EBE4] to-[#F7F2EA]`) for visual depth.

- **Typography hierarchy**
    - Page titles: large, bold (24-32px).
    - Section headers: medium, semi-bold (18-20px).
    - Body text: regular weight (14-16px).
    - Supporting text: smaller, regular (12-14px).

---

### Clear Visual Hierarchy

**Principle:** Guide attention using size, weight, colour, and spacing.

**Implementation:**

- **Card-based layout**
    - Major information chunks are grouped into cards (e.g., *Site Details*, *Naturalness Details*, *Analytics charts*, *Account tiles*).
    - Cards have consistent padding, rounded corners, and subtle shadows.

- **Strategic emphasis**
    - Primary actions use filled green buttons with high visual weight (e.g., **Preview PDF**, **Sync Now**, **Login**).
    - Secondary actions use outlined buttons or lower-contrast styling.
    - Critical information like site names and scores appears in larger, bolder text.

- **Consistent spacing**
    - Padding inside cards (16-24px) and consistent vertical spacing between sections (16-32px) creates rhythm and improves readability.

---

### Progressive Disclosure

**Principle:** Show only what users need at each step, and reveal more detail on demand.

**Implementation:**

- **Inspection Reports**
    - Tabs for **By Date** and **By Question** instead of putting all data into one long view.
    - Expandable sections for detailed observations.

- **PDF generation** (Mobile)
    - Modal flow: choose fields → preview report → optionally share/download.

- **Site Details**
    - High-level information at the top (name, location, key metrics).
    - Detailed observations, naturalness details, and other sections appear further down the page in separate cards.

- **Admin Features**
    - Admin-specific features are hidden from regular users.
    - Admin navigation is accessible via menu or dedicated button.

---

### Action-Oriented Design

**Principle:** Make key tasks obvious and easy to complete.

**Implementation:**

- **Clear primary action per screen**
    - **Preview PDF** on the report modal (Mobile).
    - **Sync Now** on Analytics (Mobile).
    - **Search** on Sites/Protected Areas pages.
    - **Delete Account** on Admin tiles (clearly styled in red).

- **Button hierarchy**
    - Primary: solid green, often full width.
    - Secondary: outlined or low-emphasis.
    - Destructive: red, clearly labelled.

- **Immediate feedback**
    - PDF field counter updates as checkboxes are toggled (Mobile).
    - Tabs highlight the active state.
    - Lists and cards visually respond to taps/clicks.
    - Loading states show progress indicators.

---

## 2. Usability Heuristics (Nielsen's 10)

### 1. Visibility of System Status

**Heuristic:** The system should always keep users informed about what is going on.

**Application in SAPAA:**

- **Mobile:**
    - Field counter in the PDF modal (e.g., `14 of 14 fields selected`) updates live as users toggle checkboxes.
    - The app bar title reflects the current screen (e.g., **Site Details**, **Report**).
    - Bottom navigation highlights the active tab.
    - Sync actions provide visual feedback while data is refreshing.
    - Online/Offline badge shows connection status.

- **Web:**
    - Loading spinners appear during data fetches.
    - Page titles reflect current location.
    - Active navigation items are highlighted.
    - Search results show count (e.g., "X sites found").

**Why This Matters:** Users can see that their actions are working and where they are in the app, which reduces confusion and frustration.

---

### 2. Match Between System and the Real World

**Heuristic:** Speak the users' language and use real-world concepts.

**Application in SAPAA:**

- Uses real steward terminology: *Naturalness Score*, *Recreational Activities*, *Observations*.
- **Mobile**: SAPAA Map uses Google Maps with familiar map interactions.
- **Web**: Leaflet maps provide familiar zoom and pan interactions.
- Icons:
    - Tree (🌲) for **Sites**.
    - Chart (📊) for **Analytics**.
    - Map (🗺️) for **SAPAA Map**.
    - Eye (👁️) for **Preview PDF**.
    - Calendar (📅) for dates.
    - Map Pin (📍) for locations.
- Inspection questions are labelled with codes (Q52, Q62, etc.) that stewards already know.

**Why This Matters:** Familiar language and visuals reduce training time and make the app feel like a natural extension of existing workflows.

---

### 3. User Control and Freedom

**Heuristic:** Provide clearly marked exits and ways to undo actions.

**Application in SAPAA:**

- **Mobile:**
    - Back arrow on every top bar to return to the previous screen.
    - Modals can be dismissed with an **X** or the system back gesture.
    - Users can toggle PDF fields freely.
    - Use **Select All** and **Clear All** before committing.
    - Preview a report before sharing it.

- **Web:**
    - Back buttons on detail pages.
    - Modal dialogs can be closed with X button or clicking outside.
    - Cancel buttons on forms.
    - Breadcrumb navigation where applicable.

**Why This Matters:** Users feel safe exploring features because they know they can easily back out or adjust their choices.

---

### 4. Consistency and Standards

**Heuristic:** Follow platform conventions and maintain internal consistency.

**Application in SAPAA:**

- **Mobile:**
    - Consistent bottom navigation layout across screens.
    - Primary actions are always solid green buttons; destructive actions are always red.
    - List items follow the same pattern: icon left, label and detail text right.
    - Card layouts and spacing follow a consistent grid.

- **Web:**
    - Consistent header design across all pages.
    - Button styles are standardized (primary, secondary, destructive).
    - Form inputs follow the same styling.
    - Card components are reused throughout.

**Why This Matters:** Once users learn basic patterns, they can apply them everywhere in the app.

---

### 5. Error Prevention

**Heuristic:** Design to prevent errors before they happen.

**Application in SAPAA:**

- **Mobile:**
    - PDF flow separates **Preview PDF** and **Share PDF** so users don't accidentally share a report before checking it.
    - Destructive actions such as *Delete Account* are clearly styled in red and can be guarded by confirmation dialogs.
    - Many inputs are constrained to checkboxes and predefined fields instead of free text for critical data.
    - Labels on buttons and fields are explicit (e.g., **Delete Account**, **Share PDF**).

- **Web:**
    - Form validation prevents invalid submissions.
    - Confirmation dialogs for destructive actions.
    - Disabled states prevent invalid actions.
    - Clear error messages guide users.

**Why This Matters:** Preventing mistakes saves time and protects data integrity.

---

### 6. Recognition Rather Than Recall

**Heuristic:** Minimize the user's memory load by making options visible.

**Application in SAPAA:**

- Clear labels for all fields: *Region*, *Area (HA/AC)*, *Naturalness Details*, etc.
- **Mobile**: Bottom tabs always visible with both icons and text labels.
- **Web**: Navigation menu items are clearly labeled.
- PDF field selection list mirrors the Site Details layout and naming (Mobile).
- Question lists show IDs and titles instead of expecting users to remember them.
- Status badges show inspection recency with color coding.

**Why This Matters:** Users don't have to remember information across screens; they can simply recognize it.

---

### 7. Flexibility and Efficiency of Use

**Heuristic:** Provide accelerators for expert users while keeping the interface simple for novices.

**Application in SAPAA:**

- **Bulk actions**
    - **Select All** / **Clear All** for PDF fields (Mobile).
    - **Sync Now** for on-demand data refresh (Mobile).
    - Bulk selection for offline downloads (Mobile).

- **Multiple access paths**
    - Inspection reports can be viewed:
        - **By Date** (chronological workflow).
        - **By Question** (comparison/analysis workflow).

- **Quick navigation**
    - **Mobile**: Bottom tab bar offers one-tap switching between **Analytics**, **Sites**, and **SAPAA Map**.
    - **Web**: Admin menu provides quick access to all admin features.

- **Smart defaults**
    - PDF generation starts with all fields selected, so users usually only need to deselect a few (Mobile).
    - Search is always available.
    - Sort options are remembered.

- **Larger devices**
    - On tablets and larger screens, standard OS gestures and shortcuts are respected.
    - **Web**: Responsive design adapts to different screen sizes.

**Why This Matters:** New users can follow straightforward flows, while experienced users can speed up their work with bulk actions and shortcuts.

---

### 8. Aesthetic and Minimalist Design

**Heuristic:** Interfaces should not contain irrelevant or rarely needed information.

**Application in SAPAA:**

- Focused screens: each screen supports one main task (view analytics, inspect a site, manage accounts, generate PDF).
- Limited colour palette: green, white, grey, and red for warnings.
- Cards group only related information, with enough white space for breathing room.
- Icons are only used where they add meaning (e.g., map pin, chart, tree), not for decoration.
- **Web**: Clean, modern design with ample whitespace.
- **Mobile**: Material Design principles with clear visual hierarchy.

**Why This Matters:** A clean interface makes it easier to focus on what matters and reduces cognitive overload.

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors

**Heuristic:** Error messages should be expressed in plain language, indicate the problem, and suggest a solution.

**Application in SAPAA:**

- **Mobile:**
    - Error messages appear as snackbars/toasts with clear explanations.
    - Network errors show retry options.
    - Validation errors appear inline with form fields.
    - "No sites found" messages suggest checking search terms or connection.

- **Web:**
    - Error messages are displayed in red, clearly visible.
    - Form validation shows specific field errors.
    - Network errors provide retry buttons.
    - 404 pages guide users back to main content.

**Why This Matters:** Users can quickly understand what went wrong and how to fix it, rather than feeling frustrated.

---

### 10. Help and Documentation

**Heuristic:** Help should be easy to search, focused on the user's task, list concrete steps, and not be too large.

**Application in SAPAA:**

- User manual is available (separate document).
- In-app tooltips and hints where appropriate.
- Clear labels and placeholders guide users.
- Status messages explain what actions do (e.g., "Syncing data...").
- **Web**: Contextual help through clear page titles and descriptions.

**Why This Matters:** While the interface should be self-explanatory, having documentation available helps users learn advanced features.

---

## 3. Accessibility Considerations

### Mobile Application

- **Touch Targets**: All interactive elements meet minimum 44x44pt touch target size.
- **Color Contrast**: Text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
- **Screen Reader Support**: React Native Paper components provide built-in accessibility labels.
- **Keyboard Navigation**: Support for external keyboards on tablets.
- **Dynamic Type**: Text scales with system font size settings.
- **Dark Mode**: Full support for system dark/light mode preferences.

### Web Application

- **Keyboard Navigation**: All interactive elements are keyboard accessible.
- **Screen Readers**: Semantic HTML and ARIA labels where needed.
- **Color Contrast**: All text meets WCAG AA standards.
- **Focus Indicators**: Clear focus states for keyboard navigation.
- **Responsive Design**: Works on various screen sizes from mobile to desktop.
- **Alt Text**: Images include descriptive alt text.

---

## 4. Mobile Application UI Design

### Login Screen

**Location:** `/login` – First page for unauthenticated users.

**Layout:**

- Full-screen gradient background (`from-[#E4EBE4] via-[#F7F2EA] to-[#E4EBE4]`)
- Centered login card:
  - SAPAA logo at the top
  - "Welcome Back" heading
  - "Sign in to your account" subtitle
  - OAuth buttons (Google, Microsoft) – full width, primary actions
  - Divider with “OR” text
  - Email input field with icon
  - Password input field with icon and show/hide toggle
  - "Login" button (primary, green gradient)
  - "Don't have an account? Create one" link
  - Error message display


**Key Features:**

  - OAuth authentication (Google, Microsoft)
  - Email/password authentication
  - Error messages displayed below form
  - Loading states on buttons during authentication
  - Navigation to Signup screen

**Design Elements:**

  - Green primary buttons for OAuth
  - Outlined button for email/password login
  - Clean, centered layout
  - Consistent spacing and padding

---

### Signup Screen

**Location:** Accessed from Login screen.

**Layout:**

  - SAPAA logo
  - "Create Account" heading
  - OAuth signup options (Google, Microsoft)
  - Divider
  - Email and password input fields
  - "Sign Up" button
  - "Already have an account? Login" link

**Key Features:**

  - OAuth signup (Google, Microsoft)
  - Email/password signup
  - Password validation
  - Error handling
  - Navigation back to Login

**Design Elements:**

  - Similar layout to Login for consistency
  - Clear call-to-action buttons
  - Form validation feedback

---

### Analytics Screen

**Location:** First tab in bottom navigation (Analytics Tab).

**Layout:**

  - Green app bar with "Analytics" title and menu icon (three dots)
  - Scrollable content:
      - KPI cards (Total Sites Inspected, Last Inspection)
      - Naturalness Score Distribution (Pie Chart)
      - Site Locator section:
          - Search bar
          - "Show Markers" toggle
          - Map view
  - "Sync Now" button

**Key Features:**

  - Real-time statistics display
  - Interactive pie charts
  - Site search and heatmap visualization
  - Manual sync functionality
  - Settings access via menu

**Design Elements:**

  - Card-based layout for KPIs
  - Color-coded pie chart segments
  - Map integration with markers/heatmap
  - Prominent "Sync Now" button

---

### Sites Screen (Home)

**Location:** Second tab in bottom navigation (Sites Tab).

**Layout:**

  - Green app bar with "Sites" title and menu icon
  - Online/Offline status badge
  - Search bar
  - Sort button (dropdown menu)
  - Scrollable list of site cards:
      - Site name (bold)
      - Location/county
      - Last inspection date
      - Status badge (color-coded)
      - Checkbox for offline download (when online)

**Key Features:**

  - Search by site name or location
  - Sort options: Name (A-Z, Z-A), Newest First, Oldest First
  - Offline download functionality
  - Status badges: Recently Visited, Visited This Year, Visited Recently, Needs Review
  - Tap site card to view details

**Design Elements:**

  - Card-based list items
  - Color-coded status badges
  - Clear visual hierarchy
  - Checkbox selection for bulk actions

---

### Site Detail Screen

**Location:** Accessed by tapping a site card.

**Layout:**

  - Green app bar with site name and back button
  - Scrollable content:
      - Site overview card (name, type, region, area, activities)
      - Naturalness Score display (large number with color-coded slider)
      - Inspection Reports section:
          - Tabs: "By Date" and "By Question"
          - Expandable inspection cards
          - Question comparison view
      - "Generate Report" button (bottom)

**Key Features:**

  - Two view modes: By Date and By Question
  - Expandable inspection details
  - Naturalness score visualization
  - PDF report generation
  - Pull-to-refresh

**Design Elements:**

  - Large, prominent naturalness score
  - Color gradient slider (red to green)
  - Tab navigation for different views
  - Expandable/collapsible sections
  - Card-based information grouping

---

### Map Screen

**Location:** Third tab in bottom navigation (Map Tab).

**Layout:**

  - Green app bar with "SAPAA Map" title
  - Full-screen map view
  - Site markers/pins
  - Tap marker shows site name
  - "Open in Google Maps" button

**Key Features:**

  - Interactive map with all sites
  - Marker clustering
  - Tap to view site name
  - Navigation to Google Maps
  - GPS location support

**Design Elements:**

  - Full-screen map
  - Custom markers
  - Overlay buttons for actions

---

### Settings Screen

**Location:** Accessed via menu (three dots) on Analytics or Sites screens.

**Layout:**

  - Green app bar with "Settings" title and back button
  - Settings options:
      - Auto-delete downloaded sites (days selector)
      - Theme toggle (Light/Dark)
      - Logout button

**Key Features:**

  - Offline site management
  - Theme preferences
  - Account management

**Design Elements:**

  - List-based settings layout
  - Toggle switches
  - Number input for days
  - Destructive action (Logout) styled in red

---

### Admin Dashboard Screen

**Location:** Accessed via menu → "Admin Dashboard" (admins only).

**Layout:**

  - Green app bar with "Admin Dashboard" title
  - Scrollable content:
      - Summary statistics cards
      - Naturalness Distribution pie chart
      - Top 5 Sites pie chart
      - Site Heatmap section:
          - Search bar
          - Map with heatmap visualization
          - Toggle for markers

**Key Features:**

  - Program-wide statistics
  - Data visualizations
  - Geographic site analysis
  - Keyword-based site search

**Design Elements:**

  - Multiple chart types
  - Interactive maps
  - Card-based statistics
  - Search functionality

---

### Admin Sites Screen

**Location:** Part of Admin Dashboard navigation (if using tab navigation).

**Layout:**
- Similar to regular Sites screen
- Additional admin actions
- Edit/delete capabilities

**Key Features:**
- Full site list with admin controls
- Site management capabilities

---

### Account Management Screen

**Location:** Accessed from Admin Dashboard.

**Layout:**
- Green app bar with "Account Management" title
- Summary cards (Total Users, Admins, Stewards)
- Search bar
- Filter/Sort button
- Scrollable list of user cards:
    - User email
    - Role badge (Admin/Steward)
    - Tap to edit

**Key Features:**
- User list with roles
- Search functionality
- Add user button
- Edit user modal
- Delete user capability

**Design Elements:**
- Card-based user list
- Role badges
- Modal dialogs for editing
- Destructive actions in red

---

### PDF Viewer Screen

**Location:** Accessed after generating a PDF report.

**Layout:**
- Green app bar with "Report" title and back button
- PDF document viewer
- Share/Download buttons

**Key Features:**
- PDF preview
- Share functionality
- Download to device

**Design Elements:**
- Full-screen PDF viewer
- Action buttons at bottom

---

## 5. Web Application UI Design

### Login Page

**Location:** `/login` - First page for unauthenticated users.

**Layout:**
- Full-screen gradient background (`from-[#E4EBE4] via-[#F7F2EA] to-[#E4EBE4]`)
- Centered login card:
    - SAPAA logo at top
    - "Welcome Back" heading
    - "Sign in to your account" subtitle
    - OAuth buttons (Google, Microsoft) - full width, outlined
    - Divider with "OR" text
    - Email input field with icon
    - Password input field with icon and show/hide toggle
    - "Login" button (primary, green gradient)
    - "Don't have an account? Create one" link
    - Error message display

**Key Features:**
- OAuth authentication (Google, Microsoft)
- Email/password authentication
- Password visibility toggle
- Form validation
- Error handling with clear messages
- Responsive design

**Design Elements:**
- Gradient background for visual appeal
- White card with rounded corners and shadow
- Icon-enhanced input fields
- Primary green button with hover effects
- Clean, modern typography

---

### Signup Page

**Location:** `/signup` - User registration.

**Layout:**
- Similar to Login page layout
- "Create Account" heading
- OAuth signup options
- Email and password fields
- Password confirmation field
- "Sign Up" button
- Link back to Login

**Key Features:**
- OAuth signup
- Email/password signup
- Password strength validation
- Email format validation
- Error handling

**Design Elements:**
- Consistent with Login page
- Additional password confirmation field
- Validation feedback

---

### Protected Areas Page (Sites)

**Location:** `/sites` - Main landing page after login.

**Layout:**
- **Header Section:**
    - Gradient green background (`from-[#254431] to-[#356B43]`)
    - SAPAA logo and "Protected Areas" title
    - Tagline: "Monitor and track site inspections across Alberta"
    - Admin button (top right, admins only)

- **Statistics Cards:**
    - Four cards in a row:
        - Total Sites
        - Total Inspections
        - Active This Year
        - Needs Attention
    - Each card shows number and label

- **Search and Sort:**
    - Search bar with search icon
    - "Sort" button with dropdown menu
    - Results count ("X sites found")

- **Site List:**
    - Grid/list of site cards:
        - Site name (bold)
        - County with location icon
        - Inspection date or "No inspection date"
        - Status badge (color-coded)
        - Last visit age (e.g., "10d ago")
    - Click card to view details

**Key Features:**
- Quick statistics overview
- Search by site name or county
- Sort options: Name (A-Z, Z-A), Most Recent, Oldest First
- Status badges with color coding
- Responsive grid layout
- Admin access button

**Design Elements:**
- Gradient header for visual hierarchy
- Card-based statistics
- Color-coded status badges
- Hover effects on site cards
- Clean, spacious layout

---

### Site Detail Page

**Location:** `/detail/[namesite]` - Individual site information.

**Layout:**
- **Header:**
    - "Back to Sites" button
    - Site name (large, bold)
    - County with map pin icon
    - Last inspection date
    - Last visit badge

- **Statistics Cards:**
    - Three cards:
        - Total Reports
        - Avg. Score
        - Condition

- **Naturalness Score:**
    - Large numeric display
    - Color gradient bar (red → yellow → green)
    - Scale labels (1.0 Poor to 4.0 Excellent)
    - Indicator showing score position

- **View Toggle:**
    - Two buttons: "View by Date" and "Compare by Question"

- **Inspection Reports Section:**
    - **By Date View:**
        - Collapsible inspection cards
        - Date and score
        - Expand to see: Steward name, Naturalness details, Observations
    - **By Question View:**
        - Question cards with IDs
        - Expand to see all responses over time
        - Sorted newest to oldest

**Key Features:**
- Two viewing modes for inspection data
- Expandable sections
- Naturalness score visualization
- Historical data comparison
- Responsive layout

**Design Elements:**
- Large, prominent score display
- Color gradient for visual feedback
- Tab-like button toggle
- Collapsible cards
- Clear information hierarchy

---

### Admin Dashboard

**Location:** `/admin/dashboard` - Admin-only statistics and analytics.

**Layout:**
- **Navigation Bar:**
    - Green gradient header
    - Home button (left)
    - Hamburger menu (right)
    - Dropdown menu: Dashboard, Account Management, Sites

- **Content:**
    - **Summary Statistics:**
        - Two cards: Total Records, Last Record
    - **Naturalness Distribution:**
        - Pie chart showing distribution across categories
        - Color-coded segments
    - **Top 5 Sites:**
        - Pie chart showing sites with most inspections
    - **Site Heatmap:**
        - Search bar with "Search" button
        - Map with heatmap/markers
        - Toggle for marker view
        - Results count

**Key Features:**

  - Program-wide analytics
  - Data visualizations
  - Geographic site analysis
  - Keyword search for sites
  - Interactive charts

**Design Elements:**

  - Chart.js pie charts
  - Leaflet map integration
  - Card-based layout
  - Search functionality
  - Responsive grid

---

### Account Management Page

**Location:** `/admin/account-management` - User account administration.

**Layout:**
- **Navigation Bar:** Same as Admin Dashboard
- **Header:**
    - "Account Management" title
    - "Manage user accounts and permissions" subtitle
    - "Add User" button (top right)

- **Summary Cards:**
    - Three cards: Total Users, Admins, Stewards

- **Search and Filter:**
    - Search bar ("Search by email...")
    - "Filter & Sort" button

- **User List:**
    - Grid of user cards:
        - Avatar (circle with first letter)
        - Email address
        - Role badge (Admin/Steward)
        - Click to edit

- **Account Details Modal:**
    - Opens when clicking user card
    - Fields: Email, Role (radio buttons), Password (optional)
    - Save and Delete buttons

**Key Features:**
- User list with roles
- Search by email
- Filter and sort options
- Add new users
- Edit existing users
- Delete users
- Role management

**Design Elements:**
- Card-based user list
- Avatar circles
- Role badges
- Modal dialogs
- Form inputs with icons
- Destructive actions in red

---

### Admin Sites Page

**Location:** `/admin/sites` - Admin view of all sites.

**Layout:**
- Similar to regular Sites page
- Additional admin controls
- Edit capabilities
- Site management features

**Key Features:**
- Full site list
- Admin-specific actions
- Site editing capabilities

---

## 6. Color Palette

### Primary Colors

- **Dark Green**: `#254431` - Headers, primary text
- **Medium Green**: `#356B43` - Primary buttons, accents
- **Light Green**: `#2E7D32` - Mobile app bars, highlights
- **Pale Green**: `#E4EBE4` - Backgrounds, subtle accents

### Secondary Colors

- **Cream/Beige**: `#F7F2EA` - Card backgrounds, light surfaces
- **White**: `#FFFFFF` - Content backgrounds, text on dark
- **Grey**: `#7A8075` - Secondary text, borders
- **Light Grey**: `#86A98A` - Input borders, dividers

### Status Colors

- **Success/Good**: `#1C7C4D`, `#E4EBE4` (background)
- **Warning**: `#E0A63A`, `#FEF3C7` (background)
- **Caution**: `#C76930`, `#FED7AA` (background)
- **Error/Destructive**: `#B91C1C`, `#DC2626`, `#FEE2E2` (background)
- **Neutral**: `#7A8075`, `#E4EBE4` (background)

### Gradients

- **Header Gradient**: `from-[#254431] to-[#356B43]`
- **Background Gradient**: `from-[#F7F2EA] via-[#E4EBE4] to-[#F7F2EA]`
- **Button Gradient**: `from-[#356B43] to-[#254431]`

---

## 7. Typography

### Font Families

- **Mobile**: System default (San Francisco on iOS, Roboto on Android)
- **Web**: System font stack with fallbacks

### Font Sizes

- **Page Titles**: 24-32px (Mobile: 28-32px, Web: 24-28px)
- **Section Headers**: 18-20px
- **Body Text**: 14-16px
- **Supporting Text**: 12-14px
- **Small Text**: 10-12px

### Font Weights

- **Bold**: 700 - Page titles, important labels
- **Semi-bold**: 600 - Section headers, button text
- **Regular**: 400 - Body text, descriptions
- **Light**: 300 - Secondary information

### Line Heights

- **Titles**: 1.2-1.3
- **Body**: 1.5-1.6
- **Dense Text**: 1.4

---

## 8. Conclusion

The SAPAA applications (both mobile and web) follow established UI/UX principles to create an intuitive, accessible, and efficient experience for stewards and administrators. Key strengths include:

1. **Consistent Design Language**: Both platforms share color schemes, typography, and interaction patterns while respecting platform conventions.

2. **Clear Information Architecture**: Hierarchical organization makes it easy to find and understand information.

3. **Progressive Disclosure**: Complex information is revealed gradually, preventing cognitive overload.

4. **Accessibility**: Both applications meet WCAG standards and support assistive technologies.

5. **Responsive Design**: Web application adapts to various screen sizes, while mobile app supports tablets and phones.

6. **Error Prevention and Recovery**: Clear validation, error messages, and confirmation dialogs protect users from mistakes.

7. **Efficiency Features**: Bulk actions, shortcuts, and smart defaults help experienced users work faster.

The design prioritizes the needs of field stewards who may be working in challenging conditions (poor connectivity, mobile devices) while also supporting administrators who need comprehensive data views and management tools.

---

**Document Version:** 2.0  
**Last Updated:** November 2025  
**Prepared for:** Stewards of Alberta's Protected Areas Association
