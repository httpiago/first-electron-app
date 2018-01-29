// Arquivo de instalação dos componetes necessários e criação do atalho no computador

const electron = require('electron'),
      app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require('path'),
      url = require('url');

// Criar a janela de instalção
const installWindow = new BrowserWindow(
{
	transparent: false,
	frame: true, // Mostrar (ou não) somente o conteúdo html da janela
	titleBarStyle: 'hiddenInset',
	autoHideMenuBar: true,
	width: 600,
	height: 300,
	resizable: false,
	maximizable: false,
	closable: true,
	alwaysOnTop: false,
	title: app.getName(),
	icon: '',
});
// Passar alguns argumentos 
installWindow.arguments = {
	'mode': 'install' // Forçar o carregamento do programa
};

let window_url = url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true
});
installWindow.loadURL( window_url );


installWindow.on('ready-to-show', function () {
	
})
.on('closed', function () {
	
	// Cancelar a instalação
	
	
});
	
	
// Retornar uma promessa que será chamada quando a instalação estiver concluída
module.exports = new Promise(function (resolve, reject) {
	
	installWindow.webContents.on('did-finish-load', () => {
		// Criar uma instalação falsa de 1 segundo
		var progress = 0,
		timer = setInterval( function () {
			
			progress += 1;
			
			installWindow.webContents.send('install_progress', progress);
			
		}, 10);
		
		setTimeout(function(){
			
			// resolve();
			
			clearInterval( timer );
			
			// Salvar alteração
			require('./storage-module.js').set('installed', true);
			
			installWindow.webContents.send('install_complete');
			
			// Reiniciar o aplicativo
			app.relaunch(), app.exit(0);
			
		}, 1000);
		
	});
	
})
.then(() => { installWindow.webContents.send('install_complete'); })
.catch(() => { installWindow.webContents.send('install_error'); });