// ===================================
//              PRELOAD
// Bienvenue sur le script de
// preload du logiciel.
// Le script sera changé TRES RAREMENT
// et sera imposible à demander une
// pull request SUR CE SCRIPT.
// ===================================

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    performAction: (...args) => ipcRenderer.invoke('perform-action', ...args),
    emergencyAction: (action) => ipcRenderer.invoke('emergency-action', action),
    connectCamera: (ip) => ipcRenderer.invoke('connect-camera', ip),
    updateAttractionStatus: (attraction, status) => 
        ipcRenderer.invoke('update-attraction-status', attraction, status),
    
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    downloadUpdate: () => ipcRenderer.invoke('download-update'),
    
    saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
    loadSettings: () => ipcRenderer.invoke('load-settings'),
    
    runDiagnostic: () => ipcRenderer.invoke('run-diagnostic'),
    
    // Pour la gestion des fichiers
    saveBackup: () => ipcRenderer.invoke('save-backup'),
    restoreBackup: (filePath) => ipcRenderer.invoke('restore-backup', filePath)
});
