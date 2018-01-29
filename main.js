const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createMainWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600})

	// and load the index.html of the app.
	let window_url = url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	});
	mainWindow.loadURL( window_url );

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	});
}

function initInstallWindow () {
	
	// Criar a janela de instalção
	let installWindow = new BrowserWindow({
		transparent: true,
		frame: false, // Mostrar (ou não) somente o conteúdo html da janela
		titleBarStyle: 'hiddenInset',
		width: 800,
		height: 600,
		resizable: false,
		maximizable: false,
		closable: true,
		alwaysOnTop: false,
		title: app.getName(),
	});
	
	let window_url = url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	});
	installWindow.loadURL( window_url );
	
	installWindow.on('closed', () => {
		
		// Cancelar a instalaçãp
		installWindow = null;
		
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
	
	
	if ( true ) {
		
		// Iniciar a instalação
		initInstallWindow();
		
	} else {
		
		// Já instalado iniciar o aplicativo
		createMainWindow();
		
	}
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  
	if (process.platform !== 'darwin') app.quit();
  
});