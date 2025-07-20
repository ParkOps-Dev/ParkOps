// ===================================
//              RENDERER
// Bienvenue sur le script de
// renderer du logiciel.
// Le script est encore en test,
// une pull request est la bienvenue !
// :D
// ===================================

window.electronAPI.getManeges().then(data => {
  console.log("Données des manèges:", data);
});

window.electronAPI.saveInitialConfig(config).then(success => {
  if (success) {
    window.electronAPI.launchMainApp();
  }
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => ipcRenderer.send(channel, data),
});