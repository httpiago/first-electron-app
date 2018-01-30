// Esse arquivo serve para criar automaticamente um arquivo executável para distribuição
// Digite "npm run build" no terminal para iniciar (demora um pouco)

const packager = require('electron-packager');
const winstaller = require('electron-winstaller');
const path = require('path');

const npm_package = require('./package.json');


	

var programm_name = 'electron',
	version = 1.1,
    exeFileName = 'first_electron_app',
    platform = 'win32',
	arch = 'x64';
	
var package_path = null;

function package_fn() {

	packager({
		dir: require('path').join(__dirname),
		out: '',
		platform,
		arch,
		overwrite: true
	}, function done_callback (err, appPaths) {
		
		if ( err ) return console.log( '\x1b[31m%s\x1b[0m', 'Ocorreu um erro:', err );
		
		package_path = appPaths[0];
		console.log('\x1b[32m%s\x1b[0m', 'Primeira etapa concluida!', package_path);
		
		/* Segunda etapa */
		winstaller_fn();
	})
}

function winstaller_fn() {
	console.log('Iniciando segunda etapa...');
	
	var icon_url = path.join(__dirname, 'src', 'icon.ico');
	
	winstaller.createWindowsInstaller(
	{
		appDirectory: npm_package.name + '-' + platform + '-' + arch, // Pasta que foi criada no processo anterior
		exe: npm_package.name + '.exe', // Nome do arquivo criado no processo anteriro na pasta "appDirectory"
		outputDirectory: 'dist', // Pasta onde será colocado o arquvio exe final
		//loadingGif: '', // Animação que será exibida durante a instalação
		iconUrl: icon_url, // Ícone do aplicativo em todos os lugares do windows
		setupIcon: icon_url, // Ícone do arquivo setup
		setupExe: npm_package.name + '-v' + npm_package.version +'-setup.exe', // Nome do arquivo final exemplo: "electron-v2.0-setup.exe"
		authors: npm_package.author,
		noMsi: true
	}).then(function(){
		
		// COMPLETO!
		console.log('\x1b[32m%s\x1b[0m', 'Concluído com sucesso!', 'O arquivo final está em: dist');
		
	}, function (e) {
		
		// ERROR!
		console.log('\x1b[31m%s\x1b[0m', 'Ocorreu um erro na segunda etapa:', e.message);
		
	});
}


return package_fn(); // Iniciar todo o processo
winstaller_fn(); // Iniciar apartir da segunda parte do processo