const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Crea la ventana del navegador.
    const mainWindow = new BrowserWindow({
        width: 1000, // Ajusta el tamaño de la ventana
        height: 700,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            // Carga scripts web en el contexto de Node.js
            nodeIntegration: true, 
            contextIsolation: false,
            // Establece la ruta a tu archivo JS (opcional, pero buena práctica)
            preload: path.join(__dirname, 'preload.js') 
        }
    });

    // Carga el archivo HTML de tu Pokédex.
    mainWindow.loadFile('index.html');

    // Abre DevTools (solo para desarrollo)
    // mainWindow.webContents.openDevTools();
}

// Cuando Electron esté listo, crea la ventana.
app.whenReady().then(createWindow);

// Cierra la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // En macOS, re-crea la ventana si la aplicación está activa sin ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});