const electron = require('electron'),
      app = electron.app;

// Criar um objeto com todos os valores na propriedade window.location.search
const queryStrings = (function(paramsArray) {
	let params = {};
	
	for (let i = 0; i < paramsArray.length; ++i) {
		let param = paramsArray[i].split('=', 2);

		if (param.length !== 2)
			continue;

		params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
	}

	return params;
})(window.location.search.substr(1).split('&'))


var is_install = queryStrings('install'),
    init_app = queryStrings('start_app');

if ( is_install === true ) {
	// Mostrar os componentes de instalação
	
	$('body').append('<center><h2>Instalando...</h2><progress value="0" max="100"></progress>');
	
	electron.ipcRenderer.on('install_progress', (event, message) => {
		
		$('progress').val( message );
		
    });
	
} if else ( init_app === true ) {
	// Iniciar a interface do programa
	
}