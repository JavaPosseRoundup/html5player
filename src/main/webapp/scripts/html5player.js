steal(  '../lib/jquery',
        '../lib/jquery-ui-1.8.18/ui/jquery-ui.js',
        '../lib/modernizr.js' )
	.css( '../style/main',
	      '../lib/jquery-ui-1.8.18/themes/base/jquery.ui.all' )		        // Loads 'main.css'
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


        config = {
                "alpha": { "r": 135, "g": 203, "b": 252, "threshold": 100},
                "primary": { "x": 0, "y": 0, "w": 1200, "h": 720 },
                "secondary": { "x": 1200, "y": 480, "w": 320, "h": 240 }
            };
        $video = $('video');
        $primary = $('#primary');
        $secondary = $('#secondary');
        video = $video[0];
        primary = $primary[0];
        secondary = $secondary[0];

         removeFrameBackground = function (ctx, targetR, targetG, targetB, threshold, width, height) {
                var imgData = ctx.getImageData(0, 0, width, height);
                var imgDataArray = imgData.data;
                for (var i = 0; i < imgDataArray.length; i += 4) {
                    var red = imgDataArray[i];
                    var green = imgDataArray[i + 1];
                    var blue = imgDataArray[i + 2];

                    var dist = Math.sqrt((red - targetR) * (red - targetR) + (green - targetG) * (green - targetG) + (blue - targetB) * (blue - targetB));
                    if (dist < threshold) {
                        imgDataArray[i + 3] = 0;
                    }

                }
                ctx.putImageData(imgData, 0, 0);
            };

            $video.bind('timeupdate', function () {
                showValue(Math.round(100 * (video.currentTime / video.duration)));
            });

            function showValue(newValue) {
                $('#range')[0].innerHTML = newValue + " %";
                $('#slider')[0].value = newValue;
            }

            function setTime(newValue) {
                $('#range')[0].innerHTML = newValue;
                video.currentTime = Math.round(video.duration * newValue / 100);
                showValue(newValue);
            }

            function playControl() {
                if (video.paused == false) {
                    video.pause();
                    $('#play')[0].value = '>';
                } else {
                    video.play();
                    $('#play')[0].value = '||';
                }
            }
            $('#play').click(playControl);


        initializeCanvases = function () {
            var renderFrame;
            primaryCtx = primary.getContext('2d');
            secondaryCtx = secondary.getContext('2d');

            primary.height = config.primary.h;
            primary.width = config.primary.w;
            secondary.width = config.secondary.w;
            secondary.height = config.secondary.h;
            $('.videoSection').css( 'min-width' , config.primary.w + config.secondary.w + 10 + 50  )

            $( "div.canvasWrapper" ).draggable();
            $( "canvas.videoSnippet" ).resizable({ aspectRatio:true });

            $('canvas').dblclick(function() {
                config.largeFace = !config.largeFace;
                primaryCtx.clearRect(0, 0, primary.width, primary.height);
            });

            renderFrame = function() {
                var primarySource, secondarySource, width;

                if (config.largeFace) {
                    primarySource = config.secondary;
                    secondarySource = config.primary;
                    width = config.primary.h * (config.secondary.w / config.secondary.h);
                } else {
                    primarySource = config.primary;
                    secondarySource = config.secondary;
                    width = primarySource.w;
                }

                // Render a slice into the primary canvas.
                primaryCtx.drawImage(video, primarySource.x, primarySource.y, primarySource.w, primarySource.h,
                        0, 0, width, config.primary.h);

                secondaryCtx.drawImage(video, secondarySource.x, secondarySource.y, secondarySource.w, secondarySource.h,
                        0, 0, config.secondary.w, config.secondary.h);
                  if(config.alpha) {
                     removeFrameBackground(secondaryCtx, config.alpha.r, config.alpha.g, config.alpha.b,
                             config.alpha.threshold, config.secondary.w, config.secondary.h);
                  }

            };
            setInterval(renderFrame, 30);

        };
        $video.bind('canplay', initializeCanvases);

        video.play();
	});