# CJC Personal Blog & Portfolio

This is a modern, responsive personal portfolio and blog built with a decoupled frontend (Vite + HTML/CSS/JS) and a lightweight, high-performance backend (FastAPI + SQLite).

## 🌟 Features

- **Modern UI & Animations**: Clean, premium design with scroll-triggered animations using AOS.js.
- **Dynamic Content Loading**: Projects and Articles are dynamically fetched from the backend API.
- **Project Detail View**: Unique, resume-style rendering for detailed project pages (`project.html`).
- **Visual Admin Panel**: Features a secure, built-in Admin Panel (`admin.html`) to manage articles and projects.
- **Dual Editing Modes**: Support for both WYSIWYG (Quill.js) rich text editing and "Raw HTML Mode" for pixel-perfect custom layouts.
- **CV Download Modal**: Elegant modal for choosing between Chinese and English CVs.

---

## 🏗️ Project Structure

The project has been restructured into two main directories:

```
cjc-blog/
│
├── frontend/                # Frontend (Vite)
│   ├── index.html           # Main portfolio and landing page
│   ├── project.html         # Dynamic project detail template
│   ├── admin.html           # Admin dashboard for content management
│   ├── package.json         # Frontend dependencies (Vite)
│   ├── index_page/          # Core CSS, JS, and Images for the landing page
│   └── blog/                # Static HTML files for older blog articles
│
├── backend/                 # Backend (FastAPI + SQLite)
│   ├── main.py              # FastAPI application and route definitions
│   ├── models.py            # SQLAlchemy database models (Article, Project)
│   ├── schemas.py           # Pydantic schemas for data validation
│   ├── database.py          # SQLite database connection setup
│   ├── seed.py              # Script to populate the database with initial data
│   ├── requirements.txt     # Python dependencies
│   └── blog.db              # SQLite Database file (auto-generated)
```

---

## 🚀 How to Run the Project

You need to run both the frontend and backend servers simultaneously in two separate terminals.

### 1. Start the Backend (FastAPI)

Open your first terminal and navigate to the `backend` directory:

```bash
cd backend

# Install the required Python packages (only needed the first time)
pip install -r requirements.txt

# Start the FastAPI server using Uvicorn
python -m uvicorn main:app --reload
```
*The backend API will run on `http://127.0.0.1:8000`.*

### 2. Start the Frontend (Vite)

Open your second terminal and navigate to the `frontend` directory:

```bash
cd frontend

# Install Node.js dependencies (only needed the first time)
npm install

# Start the Vite development server
npm run dev
```
*The frontend website will run on `http://localhost:5173`.*

---

## 🛠️ How to Manage Content (Admin Panel)

1. Ensure both your frontend and backend servers are running.
2. Open your browser and navigate to the Admin Panel: **[http://localhost:5173/admin.html](http://localhost:5173/admin.html)**
   *(You can also access this via the "Admin Panel" link in the footer of your homepage).*
3. **Articles Tab**: 
   - Add new blog posts. Provide a title, category, summary, cover image URL, and a `Read URL` (which links to the actual static HTML file of your blog, e.g., `blog/kth-largest-element-in-an-array/read.html`).
4. **Projects Tab**:
   - Manage your portfolio projects. 
   - **Rich Content**: You can use the visual editor to write your project details.
   - **Raw HTML Mode**: If you want to design a custom layout (like a resume format), toggle the "Raw HTML Mode" switch on the right side of the editor. This allows you to paste raw HTML code directly into the database, which will be beautifully rendered in `project.html`.

## 🔄 Resetting Database Data
If you ever want to reset your projects and articles back to the default state (the 5 projects and 3 articles), you can run the seed script:
```bash
cd backend
python seed.py
```
*(Warning: This will overwrite any changes you made in the Admin panel!)*

## Contact Form Email

The old PHP `send_email/send.php` endpoint has been migrated to FastAPI:

```text
POST /contact/send
```

Configure SMTP with environment variables before starting the backend:

```bash
export SMTP_HOST="smtphz.qiye.163.com"
export SMTP_PORT="465"
export SMTP_USERNAME="contact@caijiechao.com"
export SMTP_PASSWORD="your-email-authorization-code"
export SMTP_FROM="contact@caijiechao.com"
export SMTP_FROM_NAME="CJC Blog"
export CONTACT_TO="2651159710@qq.com"
export SMTP_USE_SSL="true"
```

For a reverse-proxy deployment, route frontend `/api/*` requests to the FastAPI backend, or set `window.CJC_BLOG_API_URL` before the frontend scripts load.
