# Google Sheets - User Manual

## Summary
A guide on how to integrate, configure and send data using the Supabase API through Google Sheets using built-in Google Apps Script.

---

## Quick Start
If you aren't familiar with using this, head down to [How to Use](#how-to-use)!  

* Ensure API URL and API Key are entered in Script Properties  
* Assign an inspection number to a specific form response row  
* Send data using the Supabase Functions button, clicking Step 1 and Step 2 in order.  
* Confirm data entry in Supabase tables.  

---

## Requirements
* Access to the Google Sheet  
* Authorized access to the apps script  
* API URL and API Key, which can be obtained from the Supabase project.   

Not sure if you've got these ready? Check [Installation & Setup](#installation-and-setup) for more information.  

---

## Installation and Setup
### Send Response Data to Google Sheets
* Ensure that the Google Form Responses are being written into the `Pre-FK Form Data` sheet  
* If they are not:  
    * Open the corresponding Google Form  
    * Select `Responses` in the top bar  
    * Either click the `Link to Sheets` button, or if it is already linked, click the three dots then click `Select desination for responses`  
    * Click `Select existing spreadsheet` and connect it to the corresponding Google Sheets file  
    * Make sure the sheet the data is written into is called `Pre-FK Form Data`, and the first column is a blank column called `Inspect No.` that can take record numbers  
### Add Your API Key
* In the top bar, click `Extensions` then click `Apps Script`  
* In the left, select the `Settings` cog and scroll down to `Script Properties`  
* Verify that the `PROD_URL` and `PROD_KEY` values are correctly filled out  
    * Find `PROD_URL` in [Supabase API Settings](https://supabase.com/dashboard/project/_/settings/api)  
    * Find `PROD_KEY` in [Supabase API Key Settings](https://supabase.com/dashboard/project/_/settings/api-key)  
### Authorize Script
* Open the Apps Script file by clicking `Extensions` then `Apps Script` in the top bar of the sheet.   
* Click `Run` in the top bar and you will get a request to authorize access.  

---

## Sheet Overview
The only sheet you write data into is `Conversion`, where you key in the inspection number at the very top. There should not be any reason to edit any cells in other sheets in the current version of the sheet.

---

## How to Use
### Write Data
* Go to the Google Sheet  
* In the top bar, click `Supabase Functions` and hover over `Get data from Supabase tables`  
* One by one, select the `Get data from ...` option for each table and verify that they have been added  
* In `Pre-FK Form Data`, assign a particular record an inspection number in the column `Inspect No.`  
* You may choose to verify the outgoing data as it appears in the sheets `Data for InspectHeader` and `Data for InspectDetails`  
### Send Data
* In the top bar, click `Supabase Functions` and click `Step 1 - Convert stewards to foreign keys`  
* Once you receive confirmation that it is complete, click `Supabase Functions` and click `Step 2 - Send data to Supabase`  
* Verify the information in the pop-up prompt and continue or cancel  
* That's it! You can check this data in the Supabase database.  

---

## Errors and Troubleshooting
The Apps Script is written in a way that issues are handled and explained to the user directly inside Google Sheets. Resolution steps are self-explanatory or can be resolved with a quick Google search.

---

## Contact Information
For more information and support, please contact SAPAA [here!](https://sapaastewards.com/contact-us/)

---