// ===================================
//              PRELOAD
// Bienvenue sur le script de
// preload du logiciel.
// Le script sera changé TRES RAREMENT
// et sera imposible à demander une
// pull request SUR CE SCRIPT.
// ===================================

const { contextBridge, ipcRenderer } = require('electron');

const api = {
  getManeges: () => ipcRenderer.invoke('get-maneges'),
  updateManege: (manege) => ipcRenderer.invoke('update-manege', manege),
  
  saveInitialConfig: (config) => ipcRenderer.invoke('save-initial-config', config),
  launchMainApp: () => ipcRenderer.invoke('launch-main-app'),
  
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  }
};

contextBridge.exposeInMainWorld('electronAPI', api);
