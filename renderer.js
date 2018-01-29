const electron = require('electron'),
    app = electron.app,
	broadcast = electron.ipcRenderer;

const $ = jQuery = require('jquery');

var window, document, current_window, window_arguments;


function initInterface () {
	
	var is_install = window_arguments['mode'];
	
	if ( is_install ) {
		
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
	
}




module.exports = function (window, document) {
	
	window = window,
	document = document,
	current_window = electron.remote.getCurrentWindow(),
	window_arguments = current_window.arguments;
	
	
	// Iniciar a interface do programa
	initInterface();
	
};