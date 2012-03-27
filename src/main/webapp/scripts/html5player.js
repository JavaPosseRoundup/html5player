steal(  '../lib/jquery',
        '../lib/jquery-ui-1.8.18/ui/jquery-ui.js',
        '../lib/modernizr.js' )
	.css( '../style/main' )		        // Loads 'main.css'
	.then(function(){						// Adds a function to be called back once all prior files have been loaded and run 
        var $video, $buffer, $primary, $secondary, video, buffer, primary, secondary, bufferCtx, primaryCtx, secondaryCtx,
			initializeCanvases, config;

    //    var getResult = $.getJSON('/video/video.json');
    //
    //
    //    console.log(getResult);
    //    var configText = getResult.responseText;
    //    console.log(configText);
    //    config = jQuery.parseJSON(configText);


        config = { "primary": { "x": 0, "y": 0, "w": 1200, "h": 720 }, "secondary": { "x": 1200, "y": 480, "w": 320, "h": 240 } };
        $video = $('video');
        $primary = $('#primary');
        $secondary = $('#secondary');
        video = $video[0];
        primary = $primary[0];
        secondary = $secondary[0];

        initializeCanvases = function () {
            var renderFrame;
            primaryCtx = primary.getContext('2d');
            secondaryCtx = secondary.getContext('2d');

            primary.height = config.primary.h;
            primary.width = config.primary.w;
            secondary.width = config.secondary.w;
            secondary.height = config.secondary.h;
            $('.videoSection').css( 'min-width' , config.primary.w + config.secondary.w + 10 + 50  )

            renderFrame = function() {

                // Render a slice into the primary canvas.
                primaryCtx.drawImage(video, config.primary.x, config.primary.y, config.primary.w, config.primary.h, 0, 0,
                        config.primary.w, config.primary.h);

                secondaryCtx.drawImage(video, config.secondary.x, config.secondary.y, config.secondary.w,
                        config.secondary.h, 0, 0, config.secondary.w, config.secondary.h);
            };
            setInterval(renderFrame, 30);

        };
        $video.bind('canplay', initializeCanvases);

        video.play();
	});