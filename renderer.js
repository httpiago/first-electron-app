const electron = require('electron'),
    app = electron.app;


function initInterface () {
	
	var is_install = windowArugments['mode'] === 'install',
		init_app = windowArugments['mode'] === 'start_app';

	if ( is_install ) {
		// Mostrar os componentes de instalação
		
		$('body').append('<center><h2>Instalando...</h2><progress value="0" max="100"></progress>');
		
		electron.ipcRenderer.on('install_progress', (event, message) => {
			
			$('progress').val( message );
			
		});
		
	} if else ( init_app ) {
		// Iniciar a interface normal do programa
		
	}
	
}



module.exports = function (window, document) {
	
	const window = window,
	    document = document,
		curentWindow = electron.remote.getCurrentWindow(),
		windowArugments = curentWindow.arguments;
	
	window.$ = window.jQuery = require('jquery');
	
	// Iniciar a interface do programa
	initInterface();
	
};