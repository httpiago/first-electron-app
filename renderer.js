const electron = require('electron'),
    app = electron.app;


function initInterface () {
	
	var is_install = windowArugments['mode'] === 'install',
		init_app = windowArugments['mode'] === 'start_app';

	if ( windowArugments['mode'] === 'install' ) {
		// Mostrar os componentes de instalação
		
		$('body').append('<center><h2>Instalando...</h2><progress value="0" max="100"></progress>');
		
		electron.ipcRenderer.on('install_progress', (event, message) => {
			
			$('progress').val( message );
			
		});
		
	} if else ( init_app === true ) {
		// Iniciar a interface do programa
		
	}
	
}



module.exports = function (window, document){
	
	const window = window,
	    document = document,
		curentWindow = electron.remote.getCurrentWindow(),
		windowArugments = curentWindow.customArguments;
	
	window.$ = window.jQuery = require('jquery');
	
	// Iniciar a interface do programa
	initInterface();
	
};