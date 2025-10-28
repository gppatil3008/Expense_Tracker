💰 F-Tracker: Modern Personal Expense Tracker
<img width="1024" height="1024" alt="F-Tracker" src="https://github.com/user-attachments/assets/e538f6d9-b359-4900-9de3-1ef6c7984798" />



This is a full-featured, single-page application (SPA) designed to help users track their income and expenses in real-time. It is built using React and uses a robust Firebase backend for secure authentication and persistent data storage.

🚀 Features
Core Functionality
Persistent Data: All registered users' transactions are securely stored and fetched in real-time using Firestore.

Conditional Access (Try Before You Buy): Guests can immediately use the full functionality (add/subtract transactions, view charts) without logging in. Data is local to the session and is deleted upon refreshing the page.

Seamless Upgrade: Guests can register or log in at any time, and their unsaved session data is automatically migrated to their new, permanent account.

UI & Navigation
Responsive Layout: Uses a 3-column grid on desktop (Summary | Main Tracker | Expenses Trend) and a stacked, prioritized view on mobile.

Clear Navigation: Includes a persistent Header and Footer with dedicated pages (/about, /contact).

Visual Data: Includes a main Pie Chart for income vs. expense distribution and a Bar Chart to show expense trends over the last 7 days.

Filtering: Users can filter their transaction history by Year and Month.
