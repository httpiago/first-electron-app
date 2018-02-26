// Module to control application life.
const {electron, app, BrowserWindow} = require('electron');


// this should be placed at top of main.js to handle setup events quickly
if ( handleSquirrelEvent() ) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  
}


const path = require('path');
const url = require('url');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createMainWindow() {
	
	// Create the browser window.
	mainWindow = new BrowserWindow(
	{
		transparent: false,
		frame: true, // Mostrar (ou não) somente o conteúdo html da janela
		titleBarStyle: 'default', // 'hiddenInset'
		autoHideMenuBar: true,
		width: 800,
		height: 600,
		resizable: true,
		maximizable: true,
		closable: true,
		alwaysOnTop: false,
		title: app.getName(),
		icon: 'src/icon.ico',
	})
	
	// Passar alguns argumentos 
	mainWindow.arguments = {
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
	
	createMainWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  
	if (process.platform !== 'darwin') app.quit();
  
});








function handleSquirrelEvent() {
	if (process.argv.length === 1) {
		return false;
	}

	const ChildProcess = require('child_process');
	const path = require('path');
	
	const appFolder = path.resolve(process.execPath, '..');
	const rootAtomFolder = path.resolve(appFolder, '..');
	const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
	const exeName = path.basename(process.execPath);
	
	const spawn = function(command, args) {
		let spawnedProcess, error;
		
		try {
			spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
		} catch (error) {}
		
		return spawnedProcess;
	};

	function spawnUpdate(args) {
		return spawn(updateDotExe, args);
	};

	const squirrelEvent = process.argv[1];
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':
		  // Optionally do things such as:
		  // - Add your .exe to the PATH
		  // - Write to the registry for things like file associations and
		  //   explorer context menus

		  // Install desktop and start menu shortcuts
		  spawnUpdate(['--createShortcut', exeName]);

		  setTimeout(app.quit, 1000);
		  return true;

		case '--squirrel-uninstall':
		  // Undo anything you did in the --squirrel-install and
		  // --squirrel-updated handlers

		  // Remove desktop and start menu shortcuts
		  spawnUpdate(['--removeShortcut', exeName]);

		  setTimeout(app.quit, 1000);
		  return true;

		case '--squirrel-obsolete':
		  // This is called on the outgoing version of your app before
		  // we update to the new version - it's the opposite of
		  // --squirrel-updated

		  app.quit();
		  return true;
	  }
};