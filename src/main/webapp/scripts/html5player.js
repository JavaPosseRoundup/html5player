steal(  'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
        '../lib/modernizr.js',
        'app' )
	.css( '../style/html5player' )		        // Loads 'html5player.css'
	.then(function(){						// Adds a function to be called back once all prior files have been loaded and run 
        // do nothing
	});
	 