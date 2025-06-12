
 * Goal: Add the following enhancements to the application:
 *
 * 1. Role-Based Functionalities:
 *    - Implement role-based access control (RBAC) using Firebase Authentication + Firestore.
 *    - Roles: Admin, Coach, Player, Spectator
 *    - Based on role, limit access to certain UI features (e.g., only Admins can create teams, Coaches can assign players).
 *
 * 2. Forget Password Feature:
 *    - Use Firebase Authentication's password reset functionality.
 *    - Allow users to enter their email to receive a password reset link.
 *    - Show proper success and error handling (e.g., Toast or Snackbar).
 *
 * 3. Player Assignment Feedback:
 *    - When assigning a player to a team:
 *        - Visually indicate the player is already assigned (e.g., fade out player's name or change background color).
 *        - Disable interaction or show checkmark if already assigned.
 *    - Use RecyclerView with data binding or ViewModel.
 *
 * 4. Notifications for Events:
 *    - Use Firebase Cloud Messaging (FCM).
 *    - Send a push notification to all users when a new event (e.g., match or training) is created.
 *    - Notification should open the app and show event details.
 *    - Use Firestore triggers or an admin panel to schedule/send notifications.
 *
 * Key Libraries:
 * - Firebase Auth
 * - Firebase Firestore
 * - Firebase Cloud Messaging (FCM)
 * - Jetpack ViewModel + LiveData
 * - Material Design Components
 *
 * Write the necessary Activity/Fragment classes, XML layouts, and Firebase logic to implement the above.
 
 Add appropriate styling and use the existing firebase configuration for neccesary firebase setup for passwords and so fourth ( the location being "src\firebase\firebaseConfig.ts" )

 