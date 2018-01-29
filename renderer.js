// Require modules
const
	{app, Menu, ipcRenderer, remote, shell} = require('electron'),
	broadcast = ipcRenderer,
	
	$ = jQuery = require('jquery'),
	storage = require('./storage-module.js');

var window, document, current_window, window_arguments;


// Iniciar a interface de instalação
function initInstall () {
	
	// Mostrar a tela
	$('body').append('<center><h2>instalando...</h2><progress id="w" value="0" max="100"></progress>');
	
	var progress_bar = $('#w');
	
	broadcast.on('install_progress', (event, data) => {
		
		progress_bar.val( data );
		
	})
	.once('install_complete', (event, data) => {
		
		broadcast.removeAllListeners('install_progress');
		
		progress_bar.val( 100 );
		
	})
	.once('install_error', (event, data) => {
		
	});
	
}

// Iniciar a interface do programa
function initInterface () {
	
	buildMenuBar();
	
	$('body').prepend('OK!');
	
}

// Montar a a barra de menus
function buildMenuBar () {
	
	const {Menu, MenuItem} = remote;
	
	let template = [
		{
			label: 'Arquivo',
			submenu: [
				{
					label: 'Novo',
					click: function () {
						console.log('Novo arquivo')
					}
				},
				{
					role: 'reload'
				},
				{
					role: 'toggledevtools'
				},
				{
					type: 'separator'
				},
				{
					label: 'Abrir o site',
					click () { shell.openExternal('https://example.com/') }
				},
				{
					label: 'Versão: ' + remote.app.getVersion(),
					enabled: false
				},
				{
					role: 'close'
				}
			]
		}
	];
	
	let menu_object = Menu.buildFromTemplate( template );
	Menu.setApplicationMenu( menu_object );
	
}




module.exports = function (window, document) {
	
	window = window,
	document = document,
	current_window = remote.getCurrentWindow(),
	window_arguments = current_window.arguments;
	
	let mode = window_arguments['mode'];
	
	// Decidir oque deve ser mostrado
	if ( mode === 'install' ) initInstall();
	else if ( mode === 'default' ) initInterface();
	
};