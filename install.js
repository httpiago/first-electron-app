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

let window_url = url.format({
	pathname: path.join(__dirname, 'index.html?install=true'),
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
	
	// Criar uma instalação falsa de 1 segundo
	var progress = 0,
	timer = setInterval( function () {
		
		progress += 1;
		
		installWindow.webContents.send( 'install_progress', progress );
		
	}, 10);
	
	setTimeout(function(){
		
		resolve();
		
		// Fechar a janela de instalação quando abrir o programa
		installWindow.close();
		
		clearInterval( timer );
		
	}, 1000);
	
	
});