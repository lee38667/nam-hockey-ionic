# NAM Hockey Ionic App Documentation

## Overview

NAM Hockey is a cross-platform mobile application built with Ionic and React, designed to manage hockey events, teams, matches, news, and player profiles. The app integrates with Firebase for authentication, data storage, and real-time updates.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Key Features](#key-features)
3. [Main Directories & Files](#main-directories--files)
4. [Functionality Locations](#functionality-locations)
5. [Firebase Integration](#firebase-integration)
6. [Testing](#testing)
7. [Running the App](#running-the-app)
8. [Build & Deployment](#build--deployment)
9. [Styling & Theming](#styling--theming)
10. [Resources](#resources)

---

## Project Structure

```
Root
│   capacitor.config.ts
│   ionic.config.json
│   package.json
│   tsconfig.json
│   vite.config.ts
├── android/                # Android native project files
├── cypress/               # End-to-end tests
├── public/               # Static assets
├── resources/            # App icons and splash screens
└── src/                  # Main source code
    ├── App.tsx          # Main app component
    ├── components/      # Reusable UI components
    ├── firebase/       # Firebase services
    ├── hooks/          # Custom React hooks
    ├── pages/          # App pages/screens
    └── theme/          # Styling and theming
```

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

## Functionality Locations

### Authentication System
- **Login Implementation**: `src/pages/LoginPage.tsx`
  - Email/password authentication
  - Toast notifications for feedback
  - Animated transitions
  
- **Registration**: `src/pages/Register.tsx`
  - User registration with roles
  - Password confirmation
  - Default role assignment

- **Firebase Auth Service**: `src/firebase/firebaseAuth.ts`
  - Login/logout functions
  - User creation
  - Auth state management

### Role-Based Access Control
- **Role Management**: `src/hooks/useUserRole.ts`
  - Custom hook for role state
  - Permission checking functions
  - Role-based conditionals

- **Protected Routes**: `src/components/ProtectedRoute.tsx`
  - Route protection based on roles
  - Authentication checking
  - Loading states

- **Role Guard**: `src/components/RoleGuard.tsx`
  - UI element protection
  - Role-based visibility control
  
- **User Roles Service**: `src/firebase/userRoles.ts`
  - Role definitions
  - Role assignment
  - Permission checking

### Team Management
- **Team Registration**: `src/pages/RegisterTeam.tsx`
  - Team creation form
  - Division assignment
  - Admin-only access

- **Team Service**: `src/firebase/teamService.ts`
  - CRUD operations
  - Team data management
  - Real-time updates

### Player Management
- **Player Registration**: `src/pages/RegisterPlayer.tsx`
  - Player creation form
  - Team assignment
  - Position selection

- **Player Service**: `src/firebase/playerService.ts`
  - Player CRUD operations
  - Team association
  - Stats tracking

### Match & Event Management
- **Match Creation**: `src/pages/Matches.tsx`
  - Match scheduling
  - Score tracking
  - Real-time updates

- **Event Management**: `src/pages/Events.tsx`
  - Event creation
  - Event details
  - Calendar integration

### News System
- **News Management**: `src/pages/News.tsx`
  - News article creation
  - Admin posting capability
  - Public viewing

- **News Service**: `src/firebase/newsService.ts`
  - Article CRUD operations
  - Media handling
  - Categories management

### User Profile
- **Profile Management**: `src/pages/Profile.tsx`
  - Email updates
  - Password changes
  - Profile customization

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