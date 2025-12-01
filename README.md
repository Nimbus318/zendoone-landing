# ZenDoOne Web OS

<p align="center">
  <a href="https://os.nimbus-nimo.com">
    <img src="public/readme-preview.png" alt="ZenDoOne Web OS Preview" width="100%">
  </a>
</p>

<p align="center">
  <strong><a href="https://os.nimbus-nimo.com">🌐 Live Demo</a></strong>
</p>

## Why this exists?

I built **ZenDoOne** ([macOS App](https://github.com/Nimbus318/ZenDoOne)) with a simple philosophy: **Less Noise, More Focus.**

In a world where every AI product fights for your attention, I wanted to create something that does the opposite. No complex hierarchies, no heatmaps, no gamification levels to chase. Just input your task, focus on it, and get out.

However, there was a small hurdle.

### The "Unidentified Developer" Problem

As an individual developer (currently working in AI Infra/Cloud Native), I built this as a free, open-source passion project. I decided not to pay the **$99/year Apple Developer fee** just to sign the app.

This results in macOS Gatekeeper flagging the app as "Unidentified" or "Damaged" upon installation. It's not a bug, it's just a paywall.

### The Solution: An Interactive Web OS

Instead of writing a boring text tutorial, I thought: **"Why not build a simulation?"**

This website (`zendoone-landing`) is a fully interactive React application that simulates a macOS desktop. It serves two purposes:

1. **Instant Demo:** You can experience the core "One Thing" focus flow of the app directly in your browser, without installing anything.
2. **Interactive Tutorial:** It guides users through the exact steps needed to "Allow" the app in System Settings, turning a security warning into a playful, educational experience.

## The Story Behind

The original inspiration came from [One Thing](https://sindresorhus.com/one-thing) by Sindre Sorhus. I loved the concept but wanted to tweak it to fit my specific workflow.

**Here's the plot twist:** I had zero experience with macOS development (Swift/SwiftUI) or modern frontend animations.

I am an AI Infrastructure engineer. My day job involves GPU virtualization and Cloud Native tech, not building beautiful UIs. But we live in an amazing time. With the help of LLMs, I was able to build:

1. The native macOS Menu Bar app (Swift).
2. This interactive Web OS landing page (Next.js + Tailwind + Framer Motion).

I've been "dogfooding" ZenDoOne throughout this entire process. Every feature iteration, and every component of this website, was built while staying focused using the app itself. That completion animation is a genuine dopamine hit that keeps me going.

## Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State:** React Context API (simulating OS state)

## Transparency

Both the macOS app and this website are 100% Open Source.

If you have any concerns about the unsigned app, I encourage you to let an AI (like DeepSeek or ChatGPT) audit the source code. I believe in total transparency and simple, honest tools.

---

*Built with focus, powered by AI.*
