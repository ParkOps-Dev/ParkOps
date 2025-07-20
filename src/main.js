// ===================================
//              BIENVENUE
// Bienvenue sur le script de
// démarrage du logiciel.
// Le script sera changé TRES RAREMENT
// et sera imposible à demander une
// pull request SUR CE SCRIPT.
// ===================================

console.log("[PARKOPS] Loading...")
console.log("[DATA] Loading...")
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
console.log("[DATA] Loaded!")

const DATA_PATH = path.join(__dirname, 'data.json');

console.log("[PRELOAD] Loading...")
const WINDOW_CONFIG = {
  width: 1200,
  height: 800,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,
    nodeIntegration: false
  },
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    color: '#2c3e50',
    symbolColor: '#ffffff',
    height: 30
  },
  frame: true
};
console.log("[PRELOAD] Loaded!")

function removeMenu() {
  Menu.setApplicationMenu(null);
}

function createWindow() {
  removeMenu();

  const win = new BrowserWindow(WINDOW_CONFIG);

  ipcMain.on('window-control', (event, action) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return;

    switch (action) {
      case 'minimize':
        window.minimize();
        break;
      case 'maximize':
        if (window.isMaximized()) {
          window.unmaximize();
        } else {
          window.maximize();
        }
        break;
      case 'close':
        window.close();
        break;
    }
  });

  const isFirstLaunch = !fs.existsSync(DATA_PATH) || JSON.parse(fs.readFileSync(DATA_PATH)).firstLaunch;
  win.loadFile(isFirstLaunch ? 'welcome.html' : 'index.html');

  return win;
}

app.whenReady().then(() => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({ maneges: [], historique: [] }, null, 2));
  }

  createWindow();
  console.log("[PARKOPS] Loaded!")
  console.log("=================")
  console.log("Parkops - 1.0.0")
  console.log("By Maxlware")
  console.warn("This is a BETA TEST!")
  console.log("=================")

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

console.log("[MSG] Loading...")
ipcMain.handle('get-maneges', () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH));
  } catch {
    return { maneges: [] };
  }
});
console.log("[MSG] Loaded!")

console.log("[UPT-MSG] Loading...")
ipcMain.handle('update-manege', (_, manege) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH));
  const index = data.maneges.findIndex(m => m.id === manege.id);
  if (index !== -1) {
    data.maneges[index] = manege;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return true;
  }
  return false;
});
console.log("[UPT-MSG] Loaded!")