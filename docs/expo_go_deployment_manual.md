# Expo Go Deployment Guide for the FNR App

**Project Directory:**\
`f25project-SAPAA\FNR`

This guide explains how to deploy and preview the FNR mobile app using
**Expo Go**.\
This method lets you test the app on real devices without generating
full APK or App Store builds.

------------------------------------------------------------------------

## 1. Navigate to the Project Directory

    f25project-SAPAA\FNR

------------------------------------------------------------------------

## 2. Install Expo CLI

    npm install -g expo-cli

Verify installation:

    expo --version

------------------------------------------------------------------------

## 3. Install Dependencies

Run inside the project folder:

    npm install

------------------------------------------------------------------------

## 4. Log into Expo (Optional for Expo Go)

    expo login

Logging in is **not required** for previewing in Expo Go.\
Login is required **only** when building APK/IPA files.

------------------------------------------------------------------------

## 5. Start the Expo Development Server

    npx expo start

This launches a server and displays a QR code.

------------------------------------------------------------------------

## 6. Switch to Expo Go Mode

Press:

    s

This changes the current build from development to Expo Go.

------------------------------------------------------------------------

## 7. Preview the App Using Expo Go

Install the **Expo Go** app on your phone, then either:

-   Scan the QR code displayed in your terminal
-   Or use an Android emulator that has Expo Go installed

Your app will load instantly.

------------------------------------------------------------------------

## 8. Build Standalone APK/IPA (Requires Expo Login)

To generate installable builds:

    npx eas build -p android
    npx eas build -p ios

You must be logged in to Expo to use these cloud build services.
