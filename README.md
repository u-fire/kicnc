# KiCNC
> just another pcb2gcode GUI

### Features
- most command-line options included
- working configuration by default
- can work with the mask and paste layers
- one-click to create all the files
- saves the project for re-use

### System requirements
Windows only currently.

### Building
This project uses [Tauri](https://tauri.app/) to turn HTML/TypeScript into a cross-platform application. It requires a working [Rust installation](https://doc.rust-lang.org/cargo/getting-started/installation.html) and [Node.js](https://nodejs.org/en/download/package-manager).
```shell
git clone https://github.com/u-fire/kicnc.git
cd kicnc
npm i
npm run tauri build
```
The application file will be in `./src-tauri/release/`.
