// Arquivo de instalação dos componetes necessários e criação do atalho no computador

const electron = require('electron'),
      app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require('path'),
      url = require('url');

// Criar a janela de instalção
let installWindow = new BrowserWindow(
{
	transparent: false,
	frame: true, // Mostrar (ou não) somente o conteúdo html da janela
	titleBarStyle: 'hiddenInset',
	width: 600,
	height: 300,
	resizable: false,
	maximizable: false,
	closable: true,
	alwaysOnTop: false,
	title: app.getName(),
});

let window_url = url.format({
	pathname: path.join(__dirname, 'index.html?install=true'),
	protocol: 'file:',
	slashes: true
});
installWindow.loadURL( window_url );


installWindow.on('closed', () => {
	
	// Cancelar a instalação
	installWindow = null;
	
});
	
	
// Retornar uma promessa que será chamada quando a instalação estiver concluída
exports = new Promise(function (resolve, reject) {
	
	
	setTimeout(function(){
		
		resolve();
		
	}, 1000);
	
	
});