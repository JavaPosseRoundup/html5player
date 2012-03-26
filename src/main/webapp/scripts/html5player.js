steal(  '../lib/jquery',
        'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
        '../lib/modernizr.js',
        'main' )
	.css( '../style/html5player' )		        // Loads 'html5player.css'
	.then(function(){						// Adds a function to be called back once all prior files have been loaded and run 
        // do nothing
	});