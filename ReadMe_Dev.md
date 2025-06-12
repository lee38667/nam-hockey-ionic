* Goal: Add the following enhancements to the application:
 *
 * 1. Role-Based Functionalities:
 *    - Implement role-based access control (RBAC) using Firebase Authentication + Firestore.
 *    - Roles: Admin, Coach, Player, Spectator
 *    - Store user roles in Firestore (e.g., collection: 'userRoles', doc: user.uid, field: 'role').
 *    - Use a custom hook (see `src/hooks/useUserRole.ts`) to fetch and provide the user's role.
 *    - Use the `RoleGuard` component (`src/components/RoleGuard.tsx`) to restrict access to UI features based on role.
 *    - Example usage:
 *      <RoleGuard allowedRoles={["Admin"]}>
 *        <AddTeamModal />
 *      </RoleGuard>
 *    - Only Admins can create teams, Coaches can assign players, etc.
 *
 * 2. Forget Password Feature:
 *    - Use Firebase Authentication's password reset functionality (see `src/firebase/auth.ts`).
 *    - Add a "Forgot Password?" link to the login page (`src/pages/LoginPage.tsx`).
 *    - On click, show a form to enter email and call `sendPasswordResetEmail` from Firebase Auth.
 *    - Show success/error feedback using Toast or Snackbar (e.g., Ionic's `useIonToast`).
 *
 * 3. Player Assignment Feedback:
 *    - When assigning a player to a team (see `src/pages/Teams.tsx`, `src/components/AddTeamModal.tsx`):
 *      - Visually indicate if a player is already assigned (e.g., fade out or change background color).
 *      - Disable interaction or show a checkmark if already assigned.
 *    - Use a list (e.g., IonList) with conditional styling and disable logic.
 *    - Use ViewModel/data binding via React state/hooks.
 *
 * 4. Notifications for Events:
 *    - Use Firebase Cloud Messaging (FCM) (see `src/firebase/firebaseConfig.ts`).
 *    - When a new event is created (see `src/pages/AddEventPage.tsx`), send a push notification to all users.
 *    - Notification should open the app and show event details (handle notification click in app logic).
 *    - Use Firestore triggers (Cloud Functions) or an admin panel to schedule/send notifications.
 *    - Example Cloud Function (Node.js):
 *      exports.sendEventNotification = functions.firestore.document('events/{eventId}').onCreate((snap, context) => { /* ... */ });
 *
 * Key Libraries:
 * - Firebase Auth
 * - Firebase Firestore
 * - Firebase Cloud Messaging (FCM)
 * - Jetpack ViewModel + LiveData (for Android native, use React state/hooks for Ionic/React)
 * - Material Design Components (Ionic UI)
 *
 * Write the necessary Activity/Fragment classes, XML layouts, and Firebase logic to implement the above (for Android native). For Ionic/React, use the referenced files and patterns above.
 *
 * Add appropriate styling and use the existing firebase configuration for necessary firebase setup for passwords, etc. (see `src/firebase/firebaseConfig.ts`).
 *
 * For more details, see:
 * - RBAC: `src/hooks/useUserRole.ts`, `src/components/RoleGuard.tsx`, `src/firebase/userRoles.ts`
 * - Password Reset: `src/pages/LoginPage.tsx`, `src/firebase/auth.ts`
 * - Player Assignment: `src/pages/Teams.tsx`, `src/components/AddTeamModal.tsx`, `src/firebase/teamService.ts`
 * - Notifications: `src/pages/AddEventPage.tsx`, `src/firebase/firebaseConfig.ts`, Cloud Functions (backend)

