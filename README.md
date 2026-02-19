This Branch demonstrates navigation patterns and mock API integration in a React Native application.

🚀 Features
🔹 Navigation 
1. Bottom Tab Navigation
Home
Profile
and Other

2. Drawer Navigation
Setting
Profile

3. Stack Navigation
profile Detail

Profile screen is accessible from both Drawer and Bottom Bar.

🔹 Home Screen
Fetches and displays list of posts.
Each post navigates to Post Detail Screen.
Comments are fetched and displayed for selected post.

🔹 Post Detail Screen
Shows post details.
Displays comments related to the selected post.

🔹 Settings Screen
Contains FAQ and Log out to show a dialog

Displays dialog components (e.g., confirmation / info dialogs).

🌐 API Integration
Mock APIs are used from:
👉 https://jsonplaceholder.typicode.com/

APIs Used
GET /posts → Fetch post list (Home Screen)
GET /comments?postId={id} → Fetch comments (Post Detail Screen)

These APIs are used to simulate real-world post listing and comment functionality.

Sample video of this branch
[Screencast from 20-02-26 01:56:39 AM IST.webm](https://github.com/user-attachments/assets/462552bb-ff25-4897-9741-58638100c1d7)

