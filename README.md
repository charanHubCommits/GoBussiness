# Go Business Referral Dashboard

A secure, responsive, and modern web application built for Go Business to manage and track partner referrals, earnings, and activities. Built on React, Vite, React Router, and Vanilla CSS.

## Features

### Authentication and Security
- Protected Route System: Prevents unauthenticated users from accessing dashboard pages, redirecting them automatically to the login page.
- Secure Session Management: Stores the authenticated token in a cookie named jwt_token and attaches it to subsequent API requests as a Bearer token.
- Login Form Validation: Features semantic input labels, accessibility integrations, and clear API error messages (e.g., Invalid email or password) while keeping the sign in action enabled.

### Dashboard Core
- Header Navigation: Clean, responsive navigation header containing a brand logo linking to home, a nav element with a Home link, and a Log out action.
- Overview Metrics: Displays balance, discount percent, total referrals, commission amount, and other partner indicators under a region with accessible labels.
- Service Summary: Structured view showing Service, Your Referrals, Active Referrals, and Total Ref. Earnings.
- Referral Link Sharing: Read-only inputs exposing the referral link and code, paired with two separate Copy buttons utilizing navigator.clipboard and rendering temporary success overlays.
- Footer: Complete page footer with brand text, copyright details, and a secondary navigation menu (About, Privacy).

### Referrals Data Grid
- Server-Side Filtering: Input field that triggers real-time search queries by partner name or service name.
- Sort Controls: Wrapped drop-down selectors to re-sort results by date (newest first / oldest first) reactive to user selection.
- Client-Side Pagination: Lists sliced into 10 rows per page, supported by Previous and Next buttons (disabled appropriately), numbered pages, and summary indicators formatted using correct en dash separators (e.g., Showing 1–10 of 50 entries).
- Item Navigation: Clicking on any referral row redirects to its detail path.

### Detailed View and Error Fallbacks
- Referral Details: Specific detail cards loaded asynchronously using the referral ID.
- Flexible Response Parsing: Robust parser that extracts data whether the backend returns the row directly as the root data object or wraps it inside a nested referrals array.
- Definition List: Displays details semantic fields (Referral ID, Service Name, Date, Profit) using definition list elements.
- Back Links: Includes Back to dashboard anchors conforming to accessibly labelled text patterns.
- Error Handling: Graceful visual layouts displaying Referral not found if an invalid ID is requested.
- Not Found Page: Fallback route rendering 404 Page Not Found for missing endpoints.

## Technical Details

### API Integration Table

| Purpose | Request |
| :--- | :--- |
| User Authenticate / Sign In | POST /api/auth/signin |
| Full referrals overview data | GET /api/referrals |
| Search referrals by query | GET /api/referrals?search=query |
| Sort referrals by date | GET /api/referrals?sort=asc / GET /api/referrals?sort=desc |
| Retrieve specific referral details | GET /api/referrals?id=id |

### Response Parsing Resolution
During integration, we discovered that the single-referral detail API endpoint returns the matched object enclosed in a referrals array under the data property (e.g., data.referrals[0]) instead of exposing it directly as the root data object. To guarantee compatibility, the application implements a dual-check resolver:
1. First checks if data.id is present and matches the requested ID.
2. If not, searches for a matching ID within the data.referrals list if it exists as an array.

This prevents the detail routes from throwing unexpected Referral not found failures.

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm

### Installation
1. Clone the project files into your working workspace.
2. Open your terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```
Open http://localhost:5173/ in your browser.

### Test Credentials
- Email: admin@example.com
- Password: admin123

### Production Build
Compile and bundle the project files for production:
```bash
npm run build
```
The static assets will be generated in the dist directory.
