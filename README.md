# 🚀 English Space Adventure

An interactive, colorful, space-themed website for **sixth-grade EFL learners (CEFR A2)**, built from the supplied teaching document **Pagina web.docx**.

## Features
- Fully English, responsive cartoon UI with Captain Lex and Verbix-3000
- All **three original embedded images from the Word document**, stored locally in `assets/`
- Grammar infographic, illustrated glossary, and Simple Present mind map
- Three native mini-games with instant explanations, stars and persistent local progress
- 13 original learning resource links including Google Drive, Canva, Educaplay, Vocaroo, YouTube, Quizlet, Genially and Padlet, plus ChatGPT speaking lab
- No backend, API keys, account creation, tracking scripts, or build step

## Run locally
Open `index.html` in a browser. For the best local preview, use a simple HTTP server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Publish on GitHub Pages
1. Create a **public** GitHub repository called `english-space-adventure`.
2. Upload everything in this directory (including the `assets` folder) to the `main` branch.
3. Go to **Settings → Pages** in the repository.
4. Under **Build and deployment**, select **Deploy from a branch**; choose `main` and `/ (root)`; click **Save**.
5. When published, the site will be available at `https://YOUR-USERNAME.github.io/english-space-adventure/`.

No changes to file paths are required. To update the website, modify files and push to `main`.

## Notes
- Star/progress data is saved **only on each learner's own browser** using `localStorage` and will not sync across devices. Five planets unlock after every three distinct correct challenges (15 total).
- Original external links are preserved as provided. Check that the owners have enabled public sharing. Some third-party resources require sign-in.
- Images are reproduced from the supplied Word document. Confirm that you have permission to publish them publicly.
- Google Fonts loads externally when internet is available, with system fonts as fallback.

## Attribution
Course: Technology in Foreign Language Teaching — UNAD  
Support Teacher: Max Stive Sanchez Benavides  
Created by: Maria Luisa Ramirez Betancurt, Kelly Yonadis Roncallo Lopez, Julieth Daniela Cruz Salgado, and Laura Carolina Aranguen Fagua.
