# ai-design-builder

**ai-design-builder** is an AI-powered no-code web editor that allows users to create and edit UI components through natural language and direct manipulation.  
From buttons and texts to images and videos, you can drag, resize, and configure UI blocks easily—and save your work to continue later.

---
## ✨ Features

- 💬 Chat with AI to generate UI elements from plain instructions
- 🖱️ Drag & drop interface with real-time preview
- 📱 Multi-device view support (mobile, tablet, desktop)
- 📂 Save and load UI projects via MongoDB
- 🎨 Live customization of buttons, text, images, and video blocks

---
## 🧠 How it works

1. **User talks to the AI**  
   _e.g., “Create a large red button in the center”_

2. **AI adds UI elements live**  
   Button, image, input, video, etc.

3. **User drags/resizes elements**  
   Elements can be repositioned or edited in-place.

4. **Project is saved to MongoDB**  
   All layout data is stored for future editing.

5. **Reload and continue anytime**  
   Open `/list`, select a project, and keep building!

---
## 📁 Project structure

```
ai-design-builder/
├── app/                 # Next.js 14 App Router
├── components/          # UI blocks: Button, TextElement, Image, Video, etc.
├── context/             # Global UIBuilder context
├── lib/                 # MongoDB connection utils
├── models/              # Mongoose schema for Project
├── pages/               # API routes (save, load)
├── public/              # Icons and static assets
├── .env                 # MongoDB credentials
├── tailwind.config.js   # Tailwind setup
└── README.md
```

---
## 🛠 Setup

### 1. Clone the project

```bash
git clone https://github.com/yourusername/ai-design-builder.git
cd ai-design-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/builder-ai?retryWrites=true&w=majority
```

### 4. Start development server

```bash
npm run dev
```

Then visit `http://localhost:3000`

---
## 📂 Project Saving & Loading

- Projects are stored in the MongoDB database `builder-ai`, in the `project` collection.
- Each project includes a title, UI elements (positions, styles, etc), and timestamps.
- `/list` page shows all saved projects.
- Selecting one redirects to `/?id=...`, loading and restoring the layout into the live editor.

---
## 🚀 Sample prompts

```
Create a blue submit button
Add a text box with label “Email”
Upload an image and place it below the input
Switch to tablet view
Make the button rounded and centered
```

---
## 🔐 License
[Unlicense](./License)

