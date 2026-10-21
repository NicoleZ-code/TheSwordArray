# The Sword Array

青竹蜂云剑阵 (The Sword Array) /大庚剑阵

A browser-based 3D sword array controlled by hand gestures. Move your hand in front of the camera to switch between a flowing dragon, a spherical shield, a sword lotus, and the Grand Geng sword formation.

## Source and credits

**Original code source: Up主 (UP creator).** The creator's name and original video or source URL have not been provided yet. This repository preserves the supplied source and original instructions; it does not claim original authorship of that code.

The supplied React instructions include the credit “Created by User & Gemini 3.0”. See [the original React instructions](React/说明文档.md) and [the original HTML instructions](HTML/说明文档.md).

## Run locally

Use a Node.js version compatible with the locked Vite dependency, such as Node.js 22.12 or later in the Node.js 22 series.

```bash
git clone https://github.com/NicoleZ-code/TheSwordArray.git
cd TheSwordArray/React
npm ci
npm run dev
```

Open the local URL printed by Vite and allow camera access. Hand tracking needs a browser environment that permits camera access and supports the required graphics and model runtime. For remote access, use the HTTPS deployment. Landscape orientation and good lighting are recommended.

## Gestures

| Gesture | Formation |
| --- | --- |
| Thumb and index finger extended; other fingers folded | Dragon: swords follow the fingertip |
| Index and middle fingers extended; little finger folded | Dragon: an alternative sword gesture |
| Open palm | Lotus: a rotating sword disk |
| Closed fist | Shield: a spherical sword formation |
| Index and little fingers extended; middle and ring fingers folded | Grand Geng: concentric sword rings, lightning, and a magic circle |

Keep a new gesture steady for approximately 250 ms to confirm it. In the current classifier, extending only the index finger selects Shield rather than Dragon.

## Build and preview

```bash
cd React
npm run build
npm run preview
```

The production output is `React/dist/`. Model and WebAssembly assets under `React/public/models/` must be included in the deployment.

## Project structure

```text
React/       React + TypeScript implementation and local model assets
HTML/        Standalone HTML implementation using external CDN resources
doc/         Source analysis, architecture, algorithms, and verification notes
yuanma.zip   Original supplied source archive
LICENSE      MIT license
```

The HTML edition requires access to its external dependencies and model URLs. It does not use the React edition's local build output.

## Technology

- React, TypeScript, and Vite
- Three.js and React Three Fiber
- MediaPipe Tasks Vision with local hand-landmark model and WASM assets
- Zustand for shared gesture state
- React Three Postprocessing for Bloom
- Custom GLSL for the magic circle

See [the documentation index](doc/README.md) and [the technology-to-file guide](doc/06-技术栈与源码文件对应.md) for implementation details and known issues. The source analysis documents are in Chinese.

## Cloudflare Pages

The deployed application uses the React edition. The Pages project identifier is `theswordarray` and the production branch is `main`.

For a Git-integrated Pages project, use:

| Setting | Value |
| --- | --- |
| Root directory | `React` |
| Build command | `npm ci && npm run build` |
| Build output directory | `dist` |

## License

[MIT](LICENSE). Third-party libraries, generated runtime files, and model assets remain subject to their respective upstream licenses and notices. The original source credit is retained above and in the supplied instructions.
