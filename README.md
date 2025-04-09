# 🗒️ Note Vault

A minimal, modern, and lightning-fast **note-taking web app** built with **React**, **TypeScript**, and **Vite** — containerized with Docker for easy deployment.

## 🚀 Features

- 📄 Create, update, and delete notes
- 🏷️ Add and manage tags
- 💾 Real-time local storage sync (no backend required)
- ⚡ Blazing fast with Vite and Zustand
- 📦 Dockerized and production-ready

---

## 🧱 Built With

- **React 19**
- **TypeScript**
- **Vite**
- **Zustand** for state management
- **TailwindCSS** for styling
- **Lucide Icons**
- **Docker** (multi-stage build)

---

## 🐳 Run with Docker

```bash
# Pull the image from Docker Hub
docker pull killercram/note-vault-app:1.0.0

# Run the app
docker run -d -p 10000:10000 killercram/note-vault-app:1.0.0




#Tech Stack Used in this project basically this will have some new tech as i'm trying some new stuffs.

- Here we have used:
  - React
  - lucide-react for the icons 
  - tanstack router instead of react router,it automatically create the router tree.
  - Zustand for state management