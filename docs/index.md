# Project Requirements


## Executive summary

SAPAA currently manages site inspection data through a manual pipeline. Stewards submit observations via Google Forms, Admin converts them in MS Excel, and the results are stored in a local MS Access database. This project replaces that temporary setup with a sustainable, low-cost cloud data infrastructure that automatically ingests inspection data into a PostgreSQL database, enables Admin to manage the data and generate PDF reports. The primary user is the Admin, who needs a reliable, maintainable system that eliminates manual data handling, while keeping his access to the data as well as report generation and distribution. 


## Project glossary

- **SAPAA:** Stewards of Alberta’s Protected Areas Association. A volunteer society that supports the stewardship of Alberta’s protected natural areas.

- **Natural Area:** A provincially designated protected land, such as a Provincial Park, Wildland Park, Wilderness Area, Ecological Reserve, or Natural Area, managed by Alberta Parks.

- **Site:** A specific Natural Area monitored and reported on by SAPAA stewards.

- **Site Inspection:** A record of field observations, ecological conditions, safety notes, and steward activities for a given Site.

- **Steward** A SAPAA volunteer responsible for visiting Sites and submitting inspection data.

- **Admin:** The SAPAA administrator responsible for managing Site Inspection data, generating official reports, and distributing information to stewards.

- **Google Form:** The online form used by stewards to submit new Site Inspection data. The primary data entry method.

- **PDF Report:** An official, formatted document generated from a Site Inspection record, used for archival and distribution to stewards.

- **Field Notes Reader:** The mobile application that allows stewards to view historical Site Inspection data while offline in the field.

- **Data Bundle:** A complete, self-contained package of all Site Inspection records, associated images, and PDF Reports, downloaded by the Field Notes Reader for offline use.
     

## User Stories
---
### **Project 5A – Database Replacement for Access**
---

#### US 5A.01 – Affordable, Collaborative Data System | Story Points: 2 
> **As** an Admin, **I want** a data storage system that costs ≤ $60/year and allows remote collaboration, **so that** I don’t have to rely on a local Access file that others can’t access.

> **Acceptance Tests**

> 1. Total annual cost ≤ $60 (matches current WordPress + Office spend)
> 2. System integrates with Google Workspace (since we already use Google Forms)
> 3. Multiple stewards can view data (even if only Admin edits)


---
### **Project 5C – Implement the SAPAA Data Store**
---

#### US 5C.01 – Automate Data Entry from Google Forms| Story Points: 5   
> **As** an Admin, **I want** site inspection data from Google Forms to automatically appear in my database, **so that** I don’t have to manually copy it into Access.

> **Acceptance Tests**

>1. When a steward submits a Google Form, the record appears in the database automatically
>2. Data in database matches Google Form submission 
>3. Duplicate form submission do not create duplicate records 


#### US 5C.02 – Edit Records | Story Points: 3    
> **As** an Admin, **I want** to view and modify individual site records, **so that** I can correct errors or add details.

> **Acceptance Tests**

> 1. Admin sees individual site records
> 2. Form includes all fields: site name, notes, safety status, images
> 3. Admin can save updates to the database immediately


#### US 5C.03 – Generate and Preview PDF Reports Instantly | Story Points: 2  
> **As** an Admin, **I want** to click a button and instantly preview a PDF report of any site, **so that** I can verify it before distributing it.

> **Acceptance Tests**

> 1. Clicking the "preview" button generates a pdf
> 2. User can select which fields to display in the pdf
> 3. The preview must only contain fields selected by the user (default is all)
> 4. User can download the PDF
> 5. Downloaded PDF contains the same content as preview


#### US 5C.04 – Keep Using Familiar Tools | Story Points: 2   
> **As** an Admin, **I want** the option to keep using MS Access if the new system fails, **so that** I’m not locked into an unproven solution.

> **Acceptance Tests**

> 1. Access remains usable as fallback
> 2. Data remains in OR can be exported back to Access format


#### US 5C.05 – Migrate MS Access Queries into new database system | Story Points: 3   
> **As** an Admin, **I want** to be able to use the same MS Access queries in the new Supabase/Postgresql system, so that the same functionality is maintained between the two systems

> **Acceptance Tests**

> 1. The contents of the MS Access Queries are replicated in Postgresql as Views
> 2. The views should automatically update anytime data is inserted into the underlying tables


---
### **Project 5D – Implement an Admin Dashboard**
---

#### US 5D.01 – View Database Analytics | Story Points: 3 
> **As** an Admin, **I want** to view the analytics and summarized information of the data within my database so that I can monitor system performance and usage trends.

> **Acceptance Tests**

> 1. The dashboard retrieves and visualizes core database metrics, such as total inspections, last inspection date, naturalness score distribution, and site inspection distribution.
> 2. The displayed data automatically updates when the admin refreshes the dashboard by performing a downward swipe gesture.
> 3. If the database is empty or temporarily unavailable, the dashboard displays a clear “No Data Available” or error message.

#### US 5D.02 – View All Registered Users | Story Points: 3 
> As an admin, I want to view a list of all registered users in the Field Notes Reader app so that I can manage their accounts effectively.

> **Acceptance Tests**

> 1. The Account Management screen retrieves and displays the email and role of all registered users in a list view.
> 2. The list refreshes automatically when the admin performs a pull-down (swipe-down) gesture on the screen.
> 3. If the database is empty or temporarily unavailable, the Account Management screen displays a clear “No Data Available” or error message.

#### US 5D.03 – Delete Accounts of Registered Users | Story Points: 3 
> As an admin, I want to delete the accounts of registered users in the Field Notes Reader app so that I can manage their accounts effectively.

> **Acceptance Tests**

> 1. When the Delete Account button is pressed, the admin is prompted with a confirmation dialog.
> 2. When the admin deletes a user account, the list updates to reflect the change.
> 3. Deletion request successfully removes user data from the backend database.
> 4. If the database is empty or temporarily unavailable, the Account Management screen displays a clear “No Data Available” or error message.

#### US 5D.04 – Add a New Field Notes Reader Account as an Admin | Story Points: 3 
> I want to add new accounts for users of the Field Notes Reader app, so that I can manage user access and roles effectively.

> **Acceptance Tests**

> 1. When the Add Account (+) button is pressed, the admin is presented with a Create User form.
> 2. When the admin creates a new user account, the list updates to reflect the change.
> 3. Creation request successfully removes user data from the backend database.
> 4. If the database is empty or temporarily unavailable, the Account Management screen displays a clear “No Data Available” or error message.

#### US 5D.05 – Visualize Keyword Occurrences as a Heatmap | Story Points: 3 
> As an Admin, I want to enter a keyword that queries the notes column of the sites_report_fnr_test table, so that I can visualize the locations of matching sites as an interactive heatmap on the map screen.

> **Acceptance Tests**

> 1. When the search button is pressed, the admin is presented with an interactive heatmap on the map screen.
> 2. When the show names button pressed, map markers are displayed and the county name can be viewed.
> 3. If the database is empty or temporarily unavailable, the screen displays a clear error message.

---
### **Project 6B – Field Notes Reader**
---
#### US 6B.01 – Access Site Data Offline | Story Points: 5 
> **As** a User, **I want** to view a the most recent site inspection records on my phone without internet, **so that** I can prepare for visits in remote areas.

> **Acceptance Tests**

> 1. App works in airplane mode
> 2. Shows site name, inspection date, notes, safety status
> 3. Data matches what Admin sees in the database


#### US 6B.02 - Sort Sites by Name or Inspection Date | Story Points: 2
> **As** a User, **I want** to sort sites by name (A-Z) or newest inspection first, **so that** I can prioritize visits.

> **Acceptance Tests**

> 1. "Sort" button lets user toggle between name/date sorting
> 2. Sorting persists after search/filter
> 3. Name sort (A-Z) shows sites in alphabetical order
> 4. Date sort shows newest inspection first


#### US 6B.03 - View Full Inspection History Offline | Story Points: 3
> **As** a User, **I want** to see all historical inspections for a site (date + notes), **so that** I can track changes over time.

> **Acceptance Tests**

> 1. Tapping a site shows all inspections in reverse chronological order
> 2. Each inspection displays date and notes
> 3. Data loads in airplane mode 
> 4. Naturalness Score (Q31) appears in inspection history  
> 5. Inspection Details (Q32) appears in inspection history


#### US 6B.04 – View Site Photos Offline | Story Points: 3
> **As** a User, **I want** to see all photos from past inspections while offline, **so that** I can compare current conditions to historical ones.

> **Acceptance Tests**

> 1. Photos load in airplane mode
> 2. Gallery supports swipe and zoom
> 3. Images are clear and properly oriented


#### US 6B.05 – Read Official PDF Reports Offline | Story Points: 3
> **As** a User, **I want** to open and read the official PDF reports for a site without internet, **so that** I have formatted documentation in the field.

> **Acceptance Tests**

> 1. Site specific PDF report(s) are listed on Site Detail screen
> 2. PDF(s) opens in-app without internet
> 3. Text is readable on small screens


#### US 6B.06 – View SAPAA Protected Area Map | Story Points: 5  

> **As** a User, **I want** to view a map of SAPAA protected areas, **so that** I can understand site context.  

> **Acceptance Tests**

> 1. Map screen loads in airplane mode
> 2. Tapping a highlighted area shows name, description, and attributes


#### US 6B.07 – Select and Download Sites for Offline Use | Story Points: 5 
> **As** a User, **I want** to select specific sites when I have internet, **so that** I can view all historical information offline during field visits.

> **Acceptance Tests**

> 1. Users see checkboxes next to sites and an enabled "Download" button when online 
> 2. Downloaded sites have an icon
> 3. Users only see downloaded sites when offline
> 4. Sites not access in 7 days are automatically deleted


#### US 6B.08 - Secure Access to Sensitive Data | Story Points: 5
> **As** a User, **I want** to log in to view sensative site data, **so that** confidential information is protected.

> **Acceptance Tests**

> 1. App shows login screen on first launch
> 2. Valid credentials grant access to all data
> 3. Auth state persists between app restarts
> 4. Logout clears session and returns to login screen


#### TASK 6B.09 - Install Field Notes Reader via sideloaded APK | Story Point: 3
> **As** a User, **I want** to install the Field Notes Reader app on my Android device without using Google Play Store, so that I can access historical sites data in the field.

> **Acceptance Tests**

> 1. An unsigned APK is generated 
> 2. The APK installs successfully on Android devices
> 3. After installation, the app opens and syncs latest data
> 4. The app loads data in airplane mode

#### US 6B.10 – Sign in with Username & Password | Story Points: 3 

> **As** a User or an Admin, **I want** to sign in with a username and password so that I can access the app and only see permitted data.

> **Acceptance Tests**  

> 1. The login screen shows Username and Password fields, the password is masked, and the Continue button is disabled while a request is in progress.  
> 2. Tapping Continue calls login(username.trim(), password) and a loading indicator is shown.
> 3. On successful authentication, navigation resets to Home and the user cannot go back to the login screen.
> 4. On invalid credentials, a red error message is displayed and the user can try again.
> 5. On a network or server error, a readable error message is displayed and the user can try again.
> 6. If an error message is visible and the user edits either field, the error message is cleared

> **Tasks**  

> * Implement LoginScreen (UI, masked password, disabled/loading state).
> * Integrate login() service + error handling.
> * Add navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) on success.
> * Basic non-empty validation.

#### US 6B.11 – Sign out and clear session | Story Points: 2 

> **As** a signed in user, **I want** to sign out so that my session is cleared and protected screens are no longer accessible.

> **Acceptance Tests**  

> 1. A Logout action is visible in a logical place such as the header menu or settings screen  
> 2. Tapping Logout clears the authenticated user in memory and removes stored session data
> 3. After logging out the app navigates to the login screen and back navigation does not return to protected screens
> 4. After logging out protected screens and data are not visible
> 5. After logging out and restarting the app the user remains signed out and sees the login screen
> 6. If sign out fails an error message is displayed and the user can try again

#### US 6B.12 – Configure App Settings | Story Points: 3
> **As** a User, **I want** a Settings screen to manage app preferences, **so that** I can customize my experience.

> **Acceptance Tests**

> 1. Settings tab is accessible from all screens
> 2. Settings include sections for offline data and appearance
> 2. Changes presist after app restart

#### US 6B.13 – Manage Offline Data Retention | Story Points: 3
> **As** a User, **I want** to control how long downloaded sites are kept before auto-delete, **so that** I can balance storage usage, data freshness, and long trips.

> **Acceptance Tests**

> 1. Settings screen shows preset and custom retention options
> 2. Selected options are remembered on app restart


#### US 6B.14 – Toggle Dark Mode | Story Points: 2
> **As** a User, **I want** to enable dark mode, **so that** I can reduce eye strain in low-light conditions.

> **Acceptance Tests**

> 1. Dark mode toggle appears in Settings screen
> 2. Toggling immediately applies dark/light theme
> 3. Selection persists after app restart

#### US 6B.15 – Sign in with Google and Microsoft OAuth | Story Points: 5
> As a User or Admin, I want to sign in using my Google or Microsoft account so that I can quickly and securely access the app without managing a separate password.

> **Acceptance Tests**

> 1. The login screen displays "Continue with Google" and "Continue with Microsoft" buttons
> 2. Tapping "Continue with Google" allows me to sign in with my Google account
> 3. Tapping "Continue with Microsoft" allows me to sign in with my Microsoft account
> 4. After successful authentication, I am automatically logged into the app
> 5. If I cancel the sign-in process, I remain on the login screen and can try again
> 6. If I try to sign in with Microsoft but don't have an account, I see a message directing me to sign up first
> 7. The signup screen also offers Google and Microsoft sign-in options
> 8. If I try to sign up with an account that already exists, I see a message directing me to sign in instead
> 9. My login session persists when I close and reopen the app
> 10. OAuth sign-in works whether I'm connected to WiFi or cellular data

#### US 6B.16 – Compare Inspection Answers Across Reports | Story Points: 3
> As a User, I want to view inspection reports organized by question across all historical inspections, so that I can track how specific site conditions have changed over time.

> **Acceptance Tests**

> 1. The Inspection Reports section displays two tabs: "By Date" and "By Question"
> 2. The "By Date" tab shows inspection reports in reverse chronological order (newest first)
> 3. The "By Question" tab groups all observations by question number across all inspections
> 4. In "By Question" view, each question card is collapsible and shows the question ID (e.g., Q01, Q02)
> 5. Expanding a question displays all answers from different inspection dates in chronological order
> 6. Each answer shows the inspection date and the response text
> 7. Tab selection persists while navigating within the Site Detail screen
> 8. Both views work in airplane mode with downloaded site data
> 9. Questions are sorted numerically by question ID
> 10. If a question appears in some inspections but not others, it only shows dates where it was answered

---
### **Project 6C – Web-based Site Inspection Form**
---
#### US 6C.01 – Answer Site Inspection Questions on Web Page | Story Points: 3 

> As a User, I want to be able to answer the Site Inspection questions on the new web page, so that I can report the results of a site inspection back to SAPAA

> **Acceptance Tests**  

> 1. Form submits valid data into database successfully 
> 2. Error message response displayed for invalid data
> 3. The form is accessible and usable on different devices

#### US 6C.02 – Edit Site Inspections Form | Story Points: 5

> As an Admin, I want to be able to add or edit the details of the questions on the Site Inspection form, so that I can extend or modify the form as needed.

> **Acceptance Tests**  

> 1. Admin can see all the different questions on the site inspection form
> 2. Admin can show and hide individual questions to users
> 3. Changes to any questions or the Site Inspection form are saved

#### US 6C.03 – Integrate Field Notes Reader into Web app | Story Points: 8

> As a User, I want the Field Notes Reader to integrate with the web app, so that I can also view the fields notes and site data from a computer when needed.

> **Acceptance Tests**  

> 1. Web app displays the same information on the sites as the Field notes reader
> 2. Web app displays the sites map
> 3. Authentication and sign ups for accounts is shared between the two apps.
> 4. Admin dashboard is accessible and properly secured with authentication

---
### **Other**
---

#### US 7A.01 – Integrate Field Note Reader with Legacy "acs_checkin" App | Story Points: 8 

> **As** a User, **I want** the Field Note Reader in the new system to integrate with the legacy *acs_checkin* app, **so that** I can continue to open and view field notes in the old application when needed.  

> **Acceptance Tests**  

> 1. “Open in acs_checkin” option is available in the Field Note Reader  
> 2. Choosing this option launches the legacy *acs_checkin* app with the correct field note loaded  
> 3. If the *acs_checkin* app is not installed, the user is shown a message with a link to install it  
> 4. Returning from *acs_checkin* brings the user back to the same place in the new system.

## MoSCoW
### Must Have
* US 5A.01 – Affordable, Collaborative Data System
* US 5C.01 – Automate Data Entry from Google Forms
* US 5C.03 – Generate and Preview PDF Reports Instantly
* US 5C.05 - Migrate MS Access Queries into new database system
* US 6B.01 – View Latest Site Data Offline
* US 6B.03 - View Most Recent Inspection History Offline
* US 6B.08 - Secure Access to Sensitive Data

### Should Have
* US 5C.02 – Edit Records
* US 5D.01 - View Database Analytics
* US 5D.02 - View All Registered Users
* US 5D.03 - Delete Accounts of Registered Users
* US 5D.04 - Add a New Field Notes Reader Account as an Admin
* US 6B.02 - Sort Sites by Name or Inspection Date
* US 6B.06 – View SAPAA Protected Area Map
* US 6B.07 – Select and Download Sites for Offline Use
* TASK 6B.09 - Install Field Notes Reader via sideloaded APK
* US 6B.10 – Sign in with Username & Password
* US 6B.11 – Sign out and clear session
* US 6B.12 – Configure App Settings
* US 6B.13 – Manage Offline Data Retention
* US 6C.03 – Integrate Field Notes Reader into Web app

### Could Have
* US 6B.14 – Toggle Dark Mode
* US 6B.15 - Sign in with Google and Microsoft OAuth
* US 6B.16 – Compare Inspection Answers Across Reports
* US 6C.01 – Answer Site Inspection Questions on Web Page
* US 6C.02 – Edit Site Inspections Form

### Would Like But Won't Get
* US 7A.01 – Integrate Field Note Reader with Legacy "acs_checkin" App
* US 6B.04 – View Site Photos Offline
* US 5C.04 – Keep Using Familiar Tools
* US 6B.05 – Read Official PDF Reports Offline

## Similar Products
* [Global2000 Litterbug](https://www.spotteron.app/apps/global2000-litterbug)  
    - Citizen-science reporting app focused on quick incident submissions with photos and geolocation.
    - Inspiration: shows how quick submission workflows can be kept simple for volunteers, and how map-based visualizations can make field data engaging.  
    - Relevant to SAPAA: informs how stewards might log observations rapidly and visualize inspection results geographically.
* [KoboToolBox](https://www.kobotoolbox.org/)  
    - A humanitarian data collection tool widely used in low-resource environments.  
    - Inspiration: demonstrates robust offline form support, branching logic, and automatic syncing when connectivity is restored.
    - Relevant to SAPAA: provides models for designing steward inspection forms that must work reliably in remote protected areas.
* [iNaturalist](https://www.inaturalist.org/)  
    - A community platform for sharing and identifying nature observations.
    - Inspiration: offers ideas for building intuitive photo galleries, tagging ecological attributes, and storing long-term environmental data.
    - Relevant to SAPAA: helps shape how inspection data can be organized to show ecological change over time.
* [Avenza Maps](https://store.avenza.com/)  
    - A mobile app for offline maps and PDF map layers.
    - Inspiration: highlights clear workflows for downloading, caching, and updating large data bundles for offline use.
    - Relevant to SAPAA: directly applicable to the Field Notes Reader, which requires offline access to inspection data and reports.


## Open-source Projects
* [Supabase](https://supabase.com/)
    - **What it is:** Open-source backend (managed Postgres + Auth + Storage + Edge Functions).
    - **How we’ll use it (external interface):**  
      - PostgreSQL as the **system of record** for inspections/sites.  
      - Storage for **images** and generated **PDF reports**.  
      - Auth + **Row-Level Security (RLS)** to separate Admin vs Reader access.  
      - **Edge Functions / cron** to build nightly **offline data bundles** (JSON + thumbnails + PDFs).
    - **Reference/inspiration:** Supabase’s PostgREST and RLS patterns for secure CRUD without a custom API layer.
    - **Source of insights:** Example implementations for file storage policies and signed URLs.
    - **Risks/notes:** Free-tier and pricing limits can change; large media can impact storage/egress. We’ll set a monthly budget cap in the Project Plan and monitor usage.

* [psqlODBC](https://odbc.postgresql.org/)
    - **What it is:** Official PostgreSQL ODBC driver (open-source).
    - **How we’ll use it (external interface):**  
      - Connect **MS Access** to PostgreSQL via linked tables so Admin can keep familiar forms as a **fallback UI**.
    - **Reference/inspiration:** Minimal-change legacy integration pattern for teams migrating off Access.
    - **Source of insights:** ODBC connection options (SSL, performance tuning, Unicode).
    - **Clarification:** This is a **direct connection**, not a background “sync” service—edits in Access write to Postgres on save and are immediately visible to other clients.
    - **Risks/notes:** Schema changes may require relinking; performance over ODBC can be slower for large tables/high latency networks.

* [PDF.js](https://mozilla.github.io/pdf.js/)
    - **What it is:** Mozilla’s open-source, client-side PDF renderer.
    - **How we’ll use it (external interface):**  
      - **Preview Report** in the admin UI.  
      - Offline PDF reading in the Field Notes app (cached files).
    - **Reference/inspiration:** In-browser viewing without native dependencies; consistent rendering across platforms.
    - **Source of insights:** Progressive loading, thumbnails, and text layer accessibility.
    - **Risks/notes:** On mobile, typically wrapped in a WebView; very large PDFs can affect memory—consider pagination/thumbnails.


## Technical Resources
### Backend: Supabase + PostgreSQL
  * [Supabase Documentation](https://supabase.com/docs)  
  * [PostgreSQL Documentation](https://www.postgresql.org/docs/) 
  * [psqlODBC Driver Documentation](https://odbc.postgresql.org/)  
  * [Django REST Framework Documentation](https://www.django-rest-framework.org/)

### Deployment: Cybera
  * [Cybera Documentation](https://wiki.cybera.ca/spaces/RAC/pages/8880558/Rapid+Access+Cloud)

### Mobile: React Native
  * [React Native Documentation](https://reactnative.dev/docs/getting-started)
  * [PDF.js Documentation](https://mozilla.github.io/pdf.js/)  

### Testing & Tools
  * [Jest Testing Framework](https://jestjs.io/)
  * [Postman](https://www.postman.com/) for API testing  
