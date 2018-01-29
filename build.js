// Esse arquivo serve para criar automaticamente um arquivo executável para distribuição
// Digite "npm run build" no terminal para iniciar (demora um pouco)

const packager = require('electron-packager');
const winstaller = require('electron-winstaller');


var programm_name = 'electron',
	version = 1.0,
    exeFileName = 'first_electron_app',
    platform = 'win32',
	arch = 'x64';


function package_fn() {

	packager({
		dir: require('path').join(__dirname),
		out: '',
		platform,
		arch,
		overwrite: true
	}, function done_callback (err, appPaths) {
		
		if ( err ) return console.log( '\x1b[31m%s\x1b[0m', 'Ocorreu um erro:', err );
		
		const path = appPaths[0].replace(/\\/g, '/');
		console.log('\x1b[32m%s\x1b[0m', 'Primeira etapa concluida!', path);
		
		/* Segunda etapa */
		winstaller_fn();
	})
}

function winstaller_fn() {
	console.log('Iniciando segunda etapa...');
	
	winstaller.createWindowsInstaller(
	{
		appDirectory: 'first_electron_app-' + platform + '-' + arch,
		outputDirectory: 'dist',
		exe: exeFileName + '.exe',
		//loadingGif: '',
		iconUrl: 'resources/icon.ico',
		setupIcon: 'resources/icon.ico',
		setupExe: programm_name + '-' + version +'-setup.exe',
		authors: 'Iago Bruno',
		noMsi: true
	}).then(function(){
		
		// COMPLETO!
		console.log('\x1b[32m%s\x1b[0m', 'Concluído com sucesso!', 'O arquivo final está em: dist/Setup.exe');
		
	}, function (e) {
		
		// ERROR!
		console.log('\x1b[31m%s\x1b[0m', 'Ocorreu um erro na segunda etapa:', e.message);
		
	});
}




return package_fn(); // Iniciar todo o processo
winstaller_fn(); // Iniciar apartir da segunda parte do processo