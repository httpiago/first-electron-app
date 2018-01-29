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
	
	// Passar alguns argumentos 
	mainWindow.customArguments = {
		'mode': 'default' // Forçar o carregamento do programa
	};
	
	// and load the index.html of the app.
	let window_url = url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	});
	mainWindow.loadURL( window_url );

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
	
	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	});
	
	return mainWindow;
	
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
	
	if ( true ) {
		
		// Iniciar o módulo de instalação
		require('./install.js').then(function(){
			
			// Sucesso! Iniciar o programa
			createMainWindow();
			
		}).catch(function(){
			
		});
		
	} else {
		
		// Já instalado, iniciar o aplicativo
		createMainWindow();
		
	}
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  
	if (process.platform !== 'darwin') app.quit();
  
});