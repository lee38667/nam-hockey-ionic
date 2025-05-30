# NAM Hockey Ionic App Documentation

## Overview

NAM Hockey is a cross-platform mobile application built with Ionic and React, designed to manage hockey events, teams, matches, news, and player profiles. The app integrates with Firebase for authentication, data storage, and real-time updates.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Key Features](#key-features)
3. [Main Directories & Files](#main-directories--files)
4. [Firebase Integration](#firebase-integration)
5. [Testing](#testing)
6. [Running the App](#running-the-app)
7. [Build & Deployment](#build--deployment)
8. [Styling & Theming](#styling--theming)
9. [Resources](#resources)

---

## Project Structure

```
Root
│   capacitor.config.ts
│   cypress.config.ts
│   eslint.config.js
│   index.html
│   ionic.config.json
│   package.json
│   tsconfig.json
│   vite.config.ts
├── android/                # Android native project files
├── cypress/                # End-to-end tests (Cypress)
├── public/                 # Static assets (images, icons, manifest)
├── resources/              # App icons and splash screens
└── src/                    # Main source code
    ├── App.tsx             # Main app component
    ├── main.tsx            # App entry point
    ├── backend/            # Backend logic (if any)
    ├── components/         # Reusable UI components
    ├── firebase/           # Firebase services and config
    ├── pages/              # App pages (screens)
    ├── theme/              # Global and variable CSS
```

---

## Key Features
- User authentication (Firebase Auth)
- Team and player management
- Match scheduling and results
- News and events
- Profile management
- Responsive UI with Ionic components
- Light and dark mode support

---

## Main Directories & Files

### src/components/
Reusable UI components such as modals (`AddMatchModal.tsx`, `AddTeamModal.tsx`), containers, and custom elements.

### src/pages/
Each file represents a screen in the app (e.g., `Home.tsx`, `Matches.tsx`, `Teams.tsx`, `Profile.tsx`, `More.tsx`).

### src/firebase/
- `auth.ts`, `firebaseAuth.ts`: Authentication logic
- `firebaseConfig.ts`: Firebase project configuration
- `firestore.ts`: Firestore database logic
- `matchService.ts`, `newsService.ts`, `playerService.ts`, `teamService.ts`, `storageService.ts`: Service files for CRUD operations

### src/theme/
- `global.css`: Global styles and dark mode overrides
- `variables.css`: CSS variables for theming

---

## Firebase Integration
- Configure your Firebase project in `src/firebase/firebaseConfig.ts`.
- Authentication, Firestore, and Storage are used for user data, app data, and media.

---

## Testing
- Cypress is used for E2E testing. Test files are in `cypress/e2e/`.
- Run tests with:
  ```powershell
  npx cypress open
  ```

---

## Running the App
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```
3. To run on Android:
   ```powershell
   npx cap open android
   ```

---

## Build & Deployment
- Build the app for production:
  ```powershell
  npm run build
  ```
- Sync with Capacitor:
  ```powershell
  npx cap sync
  ```
- Deploy to Android/iOS using Capacitor.

---

## Styling & Theming
- The app uses Ionic’s CSS variables and custom styles for a modern, responsive UI.
- Light and dark mode are fully supported. Dark mode can be toggled in the app or follows the system preference.
- Main styling files:
  - `src/theme/variables.css`: Color palette, spacing, and theme variables for both light and dark modes.
  - `src/theme/global.css`: Global styles, dark mode overrides, and component tweaks.
  - Page/component-specific CSS files (e.g., `Home.css`, `Teams.css`, `Matches.css`, `More.css`).

---

## Resources
- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

---

For further details, refer to the inline comments in the source code.