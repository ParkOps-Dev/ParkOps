// ===================================
//              BIENVENUE
// Bienvenue sur le script de
// démarrage du logiciel.
// Le script sera changé TRES RAREMENT
// et sera imposible à demander une
// pull request SUR CE SCRIPT.
// ===================================

// ===================================
//              BIENVENUE
// Bienvenue sur le script de
// démarrage du logiciel.
// Le script sera changé TRES RAREMENT
// et sera imposible à demander une
// pull request SUR CE SCRIPT.
// ===================================

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createWindow() {
    // Créer la fenêtre d'écran de chargement
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    splashWindow.loadFile('splash.html');

    // Créer la fenêtre principale, mais ne pas l'afficher encore
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    mainWindow.loadFile('index.html');

    // Quand la fenêtre principale est prête, fermer le splash et afficher
    mainWindow.webContents.on('did-finish-load', () => {
        setTimeout(() => {
            splashWindow.close();
            mainWindow.show();
            mainWindow.focus();
        }, 2000); // Délai artificiel pour voir le splash
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Communication entre les processus
ipcMain.handle('perform-action', (event, ...args) => {
    // Exemple: Gérer des actions depuis le rendu
    console.log('Action demandée depuis le rendu:', args);
    return 'Action effectuée';
});

ipcMain.handle('emergency-action', (event, action) => {
    // Logique pour les actions d'urgence
    console.log(`Action d'urgence déclenchée: ${action}`);
    return { success: true, message: `Action ${action} exécutée` };
});

ipcMain.handle('connect-camera', (event, ip) => {
    // Simuler la connexion à une caméra
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                success: true, 
                ip: ip,
                message: `Caméra connectée à ${ip}` 
            });
        }, 1500);
    });
});

ipcMain.handle('update-attraction-status', (event, attraction, status) => {
    // Logique pour mettre à jour le statut d'une attraction
    return { 
        success: true, 
        attraction: attraction, 
        newStatus: status,
        timestamp: new Date().toISOString() 
    };
});
