// Esse arquivo serve para criar automaticamente um arquivo executável para distribuição
// Digite "npm run build" no terminal para iniciar (demora um pouco)

const packager = require('electron-packager');
const winstaller = require('electron-winstaller');

var exeFileName = 'app-installer';

packager({
	name: exeFileName,
	dir: require('path').join(__dirname),
	out: '',
	platform: 'win32',
	arch: 'x64',
	overwrite: true
}, function done_callback (err, appPaths) {
	
	if ( err ) return console.log( '\x1b[31m%s\x1b[0m', 'Ocorreu um erro:', err );
	
	console.log('\x1b[32m%s\x1b[0m', 'Primeira etapa concluida!', appPaths[0]);
	
	/* Segunda etapa */
	
	console.log('Iniciando segunda etapa...');
	
	winstaller.createWindowsInstaller(
	{
		appDirectory: require('path').join(appPaths[0]),
		outputDirectory: 'dist',
		exe: exeFileName + '.exe',
		loadingGif: '',
		iconUrl: 'src/icon.ico',
		setupIcon: 'src/icon.ico',
		setupExe: 'Setup-install',
		authors: 'Iago Bruno',
	}).then(function(){
		
		// COMPLETO!
		console.log('\x1b[32m%s\x1b[0m', 'Concluído com sucesso!', 'O arquivo final está em: dist/Setup.exe');
		
	}, function (e) {
		
		// ERROR!
		console.log('\x1b[31m%s\x1b[0m', 'Ocorreu um erro na segunda etapa:', e.message);
		
	});
})
return;