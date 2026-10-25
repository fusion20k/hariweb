# Hari - Tagalog Immersion Chrome Extension

![Hari Logo](./assets/HariLogo%20(bigger)%20(1).png)

## About

**Hari** is a Chrome extension that provides complete Tagalog immersion by translating all web content into Tagalog. Learn Tagalog naturally as you browse the internet.

## Features

- Real-time translation of all web content to Tagalog
- Seamless browsing experience
- Learn through immersion
- Easy toggle on/off functionality

## Website

This repository contains the landing page for the Hari Chrome extension.

## Development

The website is built with:
- HTML5
- CSS3
- Vanilla JavaScript

No build process required - it's a static site.

## Demo clips (Free vs Premium section)

The pricing section on the home page (`#compare-plans` in `index.html`) has four demo cards:
`swap` (Tagalog on any site), `hover` (hover dictionary), `thea` (AI tutor) and `youtube`
(YouTube subtitles). Each one plays a small built-in CSS animation until a real recording is added.

To use a real screen recording:

1. Record 5-10 seconds of the feature in Chrome (a 16:9 crop works best, for example 1280x720).
2. Export it as MP4 (H.264), muted, ideally under 1.5 MB. To turn a GIF into a much smaller MP4:
   `ffmpeg -i clip.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" clip.mp4`
3. Save it as `assets/demos/<name>.mp4` (for example `assets/demos/swap.mp4`).
4. In `index.html`, fill in that card's `data-video` attribute:
   `<div class="plan-demo-media" data-demo="swap" data-video="./assets/demos/swap.mp4">`

The clip loads only when the card scrolls into view, loops muted, and pauses off screen. If the file
is missing, the built-in animation keeps showing. `.webm` and `.gif` files also work.

## Deployment

Deployed on Netlify with continuous deployment from the main branch.

## License

All rights reserved.
