const
    electron = require('electron'),
    app = electron.app,
	broadcast = electron.ipcRenderer,
	
	$ = jQuery = require('jquery');

var window, document, current_window, window_arguments;

// Iniciar a interface de instalação
function initInstall () {
	
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
	
	
	
}





module.exports = function (window, document) {
	
	window = window,
	document = document,
	current_window = electron.remote.getCurrentWindow(),
	window_arguments = current_window.arguments;
	
	let mode = window_arguments['mode'];
	
	// Decidir oque deve ser mostrado
	if ( mode === 'install' ) initInstall();
	else if ( mode === 'default' ) initInterface();
	
};