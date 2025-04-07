# CiteMatic 🎓

CiteMatic is a free and open-source tool that generates APA-style citations from YouTube video URLs — ideal for students, researchers, and content creators.

> Support for other citation styles and video platforms is planned.

[![Live Site](https://img.shields.io/badge/Live%20Site-citematic.com-0077cc?style=flat-square&logo=vercel&logoColor=white)](https://citematic.com/)

---

## ✨ Features

- 🎥 Paste a YouTube video URL
- 🧾 Instantly get a properly formatted APA citation
- 📋 One-click "Copy to Clipboard"
- 🌓 Light/Dark mode toggle
- ⚡ Fast, minimalist & fully serverless

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React + TypeScript)
- **Backend:** [AWS Lambda](https://aws.amazon.com/lambda/) (Node.js + TypeScript)
- **API:** [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **Hosting:** [Vercel](https://vercel.com/)

---

## 📦 Getting Started (Local Dev)

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npx serverless deploy
```

> You'll need a YouTube Data API key stored in AWS SSM Parameter Store at /citematic/youtubeApiKey.

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

PRs welcome! Feel free to open issues or suggest improvements.

---