## Sprint 1

### September 19, 2025
**Key Discussions & Decisions**  
- Overview of the project scope and expectations  
- Team introductions  
- Discussion on the current database problem (Microsoft Access vs. Google options) and openness to alternatives  
- Raised questions: "Am I missing a technology?" and "How do we make it easier on Frank to use whatever software is recommended?"  
- Agreement to explore the existing Microsoft Access database in more detail  

**Action Items**  
- Implement a more efficient process for converting data from tabular format (Google Form) to record format (Access database)  
- Ensure the process can handle new Google Form questions without requiring manual updates to the conversion utility  

---

### September 24, 2025  
**Key Discussions & Decisions**  
- Frank Potter explained the full process of handling site inspection reports:  
  - Data flows from Google Forms → Excel for format conversion → Access database  
  - Manual updates required due to anomalies  
- Costs highlighted: $60/year for WordPress, $100/year for Microsoft Office  
- Team discussed requirements for a more streamlined, modern replacement for Microsoft Access  
- Agreement that manual workarounds are not sustainable long-term  

**Action Items**  
- Explore more efficient alternatives to Microsoft Access for managing inspection report data  
- Ensure process improvements can handle dynamic form changes (new questions in Google Form)  
- Reduce dependency on manual Excel-based transformations  

---

### September 26, 2025  
**Key Discussions & Decisions**  
- Continued exploration of data management and access control  
- Need identified to streamline pipeline from Google Forms to final database  
- Concern raised over which data should be visible to end users in the *Field Notes Reader*  
- Team considered a separation of reporting and transactional data layers   

**Action Items**  
- Explore options to streamline the process from Google Form submission to saving data in MS Access (or its replacement)  
- Determine extent of data to expose to users through the *Field Notes Reader* and restrict access to only necessary records  
- Investigate feasibility of separating reporting from transaction layer using a data warehouse model  
- Implement user authentication and access control for the *Field Notes Reader* application  

---

## Sprint 2  

### October 3, 2025  
**Key Discussions & Decisions**  
- Reviewed the current and proposed data management system.  
- Discussed streamlining data transformation using Google Apps Script and manual processes.  
- Raised concerns about malicious form entries and the need for an approval system.  
- Proposed using Supabase for hosting and PostgreSQL for data persistence, while retaining MS Access for local operations.  
- Identified the need for a clear project plan, improved client communication, and consideration of scalability and security.  
- **Questions Raised:** What happens when an entry exceeds field constraints? How do we account for data loss?  

**Action Items**  
- Provide the client with a sample Google Form and Sheet to test the proposed data transfer process.  
- Assess alternative form technologies that may simplify data flow.  
- Explore Cybera for nonprofit cloud hosting options.  

---

### October 10, 2025  
**Key Discussions & Decisions**  
- Discussed migration of the MS Access database to Supabase and development of a new field notes reader app.  
- Demonstrated successful migration of tables to a hosted PostgreSQL server, noting some tables lack primary keys.  
- Presented the offline field notes reader app built with React Native and SQLite, allowing users to view but not edit data.  
- The app includes analytics, site details, and photo capabilities.  
- Suggestions included adding the naturalness score and a link to the SAPAA map.  
- The app will initially launch for Android, with plans for future iOS support.  
- Explore addition of relevant record sections such as Q31 score, Q32 inspection, SAPAA protected area map, and site-specific photos. Explore SSO integration through Google Workspace.  

**Action Items**  
- Include an analysis of the costs and features of Supabase free and paid accounts.  
- Provide documentation and data standardization recommendations for the Supabase database.  
- Share screenshots of the field notes reader app for review.  
- Investigate Supabase support for the IPTC metadata standard for image management.  
- Explore options for making the field notes reader app available on both Android and iOS platforms.  

---

## Sprint 3

### October 17, 2025  
**Key Discussions & Decisions**  
- Reviewed progress on the data pipeline between Supabase and Google Sheets.  
- Achieved two-way data transfer, data mapping to foreign keys, and sorting of inspection data.  
- Demonstrated how new inspection records are added and validated to ensure data integrity.  
- Discussed the need for manual data entry in Supabase and potential future enhancements.  
- Confirmed implementation of a protected area map in Google Maps, allowing users to view designated areas through the app.  
- Planned refinements to handle new questions and improve overall system robustness.  

**Action Items**  
- Investigate performing data transformation and conversion functions directly in Supabase instead of Google Sheets.  
- Implement a system to handle transitions between program years (e.g., from 2025 to 2026) in inspection numbering.  
- Provide a recommendation in the final report on whether the programmatic functions currently done in Google Sheets could be transferred to Supabase, potentially removing Google Sheets as a transport layer.  
- Consider inclusion of native GIS/mapping files within the app.  
- Explore data analytics to capture both data within reports and metadata about the reports themselves.  

---

### October 24, 2025  
**Key Discussions & Decisions**  
- A fully automated database is challenging to achieve using Google Sheets alone. The team agreed to begin with a minimum viable product requiring limited manual work, such as text entry and one-click Apps Script functions, before exploring deeper automation.  
- Emphasized the importance of maintaining clear documentation throughout development.  
- Discussed adding a filter to the admin dashboard to manage records with unknown locations, allowing users to select which reports to view or exclude.  
- Considered a persistent filter that retains user selections offline (e.g., viewing only “3 = Good” reports even after restarting the app).  
- Reviewed the potential implementation of a KML map file in the next release.  
- Proposed giving users the ability to set their own data purge timeframe (e.g., extending from 7 to 30 days).  
- Discussed the feasibility of sharing data statistics with the WordPress site in real time.  
- Considered using Google’s Credential Manager for authentication, leveraging the existing Workspace subscription.  

**Action Items**  
- Develop a minimum viable product workflow using Google Sheets and Apps Script, ensuring documentation of all manual processes.  
- Add a filter function to the admin dashboard, including options for excluding or selecting records by location.  
- Implement persistent offline filter functionality within the app.  
- Integrate the KML map file in the next release.  
- Allow user-defined data purge durations within app settings.  
- Explore real-time data statistic sharing with the WordPress site.  
- Evaluate integration of Google Credential Manager for authentication.  

---

## Sprint 4

### October 31, 2025  
**Key Discussions & Decisions**  
- Demonstrated current version of the application and reviewed features and functionality.  
- Reported near completion of Google Sheets, working on final testing and future proofing.  
- Enquired about KML file to consider another approach for how the map is served.  
- Considered additional / alternative displays for graphics in the admin dashboard.  
- Addressed general feedback and questions.  

**Action Items**  
- Create a web app approach of the current mobile application as a sample demonstration as a choice in the future.  
- Consider SSO implementation instead of email verification.  

---

### November 7, 2025  
**Key Discussions & Decisions**  
- Reviewed progress with the application and estimated the expected completion.  
- Demonstrated heat map using report data as another option for the end user.  
- Discussed Frank's unavailability during scheduled meeting times because of international travel.  

**Action Items**  
- Finish implementing SSO on the mobile application if feasible.  
- Consider adding a function to open the corresponding location when clicking on one in the heat map.  
- Send new meeting time for remaining meeting based on team availability.  

---

## Sprint 5

### November 21, 2025  
**Key Discussions & Decisions**  
- Reported progress of web app variant of Field Notes Reader.  
- Confirmed SSO implementation.  
- Addressed concerns regarding heat map pointing to incorrect locations.  

**Action Items**  
- Finish documentation and address feedback.  
- Complete review and prepare for final version of Field Notes Reader and corresponding projects.  

---

### November 24, 2025  
**Key Discussions & Decisions**  
- Discussed feedback from TA.  
- Confirmed questions to ask Frank regarding project completion requirements.  

**Action Items**  
- Send out an email to Frank requesting access to the Form Responses.  
- Request permission to use the SAPAA logo, and confirm privacy of the project repository.   

---