# The Mystery of 61

A beautiful, interactive graphical proof demonstrating a fascinating mathematical concept: **the probability that a 7-digit number is divisible by 11, given that its digits sum to 61**.

## 🎯 What's This About?

This interactive web application walks you through a step-by-step mathematical proof using visual elements and animations. The proof answers the question:

> If a 7-digit number has digits that sum to 61, what's the probability it's divisible by 11?

**Answer: 3/14 (≈ 21.4%)**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vksepm/mystery-of-61.git
cd mystery-of-61
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📚 Understanding the Proof

The application presents the proof in 5 interactive steps:

### Step 1: The Setup
- Establishes the constraint: 7-digit numbers with digit sum = 61
- Shows that 61 is exactly 2 less than the maximum possible sum (9×7 = 63)
- Identifies two cases to achieve this sum

### Step 2: The Suspect Lineup
- Lists all 28 possible 7-digit numbers meeting the constraint
- **Group A**: 7 numbers with one 7 and six 9s
- **Group B**: 21 numbers with two 8s and five 9s

### Step 3: The 11 Rule
- Explains divisibility by 11 using the alternating digit sum rule
- Introduces "Blue Team" (odd positions) and "Red Team" (even positions)
- Proves mathematically that the Blue Team sum must be exactly 36

### Step 4: The "Lock"
- Shows why Blue Team positions must all be 9s
- Since they need 36 points and can get maximum 36 (4×9), they're "locked" at all 9s

### Step 5: Final Filter
- Filters all 28 candidates by the constraint
- Shows only 6 numbers satisfy the requirement
- Displays the final probability: **6/28 = 3/14**

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Deploy
```bash
npm run deploy
```
Deploys the application to GitHub Pages using gh-pages.

## 🌐 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

**Automatic Deployment:**
- Push to `main` or `master` branch
- GitHub Actions workflow automatically builds and deploys
- Live at: `https://vksepm.github.io/mystery-of-61/`

**Manual Deployment:**
```bash
npm run deploy
```

**Manual Setup (if needed):**
1. Go to repository Settings → Pages
2. Set source to `gh-pages` branch
3. Save

## 📁 Project Structure

```
mystery-of-61/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app component
│   ├── DivisibilityProof.jsx  # Interactive proof component
│   └── index.css             # Tailwind CSS styles
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies and scripts
└── .github/
    └── workflows/
        └── deploy.yml        # GitHub Actions deployment workflow
```

## 🎨 Features

- **Interactive Step-by-Step Navigation** - Click through each step at your own pace
- **Beautiful UI** - Modern design with smooth animations and transitions
- **Color-Coded Groups** - Visual distinction between Blue Team and Red Team positions
- **Responsive Design** - Works on desktop and mobile devices
- **Icon Integration** - Lucide React icons for enhanced visual clarity

## 🧮 Mathematical Background

### The Problem
Find: P(divisible by 11 | digit sum = 61)

### Key Insights
1. For 7-digit numbers, the divisibility rule by 11 states:
   - (d₆ + d₄ + d₂ + d₀) - (d₅ + d₃ + d₁) ≡ 0 (mod 11)
   
2. With digit sum constraint = 61:
   - Blue Team + Red Team = 61
   - Blue Team - Red Team = 0 (or multiple of 11)
   - Solving: Blue Team = 36, Red Team = 25

3. With 4 positions in Blue Team needing sum of 36:
   - Maximum possible: 4×9 = 36
   - Therefore: All Blue Team positions MUST be 9

4. This constraint eliminates most candidates, leaving only 6 valid numbers.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as an interactive demonstration of mathematical reasoning and elegant proof techniques.

## 🔗 Links

- **Repository**: [GitHub](https://github.com/vksepm/mystery-of-61)
- **Live Demo**: [https://vksepm.github.io/mystery-of-61/](https://vksepm.github.io/mystery-of-61/)

## ❓ FAQ

**Q: What if I want to modify the proof?**
A: The main component is `src/DivisibilityProof.jsx`. You can edit the steps, styling, or add new features.

**Q: Can I use this for educational purposes?**
A: Absolutely! This is perfect for teaching mathematical reasoning, divisibility rules, and probability.

**Q: How do I deploy to my own GitHub Pages?**
A: Update the `homepage` in `package.json` with your GitHub username and repository name, then run `npm run deploy`.

**Q: Does this work offline?**
A: The development server requires internet for initial setup, but the built app can work offline once deployed.

## 🚨 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**GitHub Pages not updating?**
- Clear browser cache
- Check GitHub Actions in repository Settings → Actions
- Verify `base` path in `vite.config.js` matches your repository name

---

Made with ❤️ using React and Vite
