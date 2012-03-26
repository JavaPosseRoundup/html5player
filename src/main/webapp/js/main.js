
(function() {
	var $video, $buffer, $primary, $secondary, video, buffer, primary, secondary, bufferCtx, primaryCtx, secondaryCtx;
	$video = $('video');
	$buffer = $('#buffer');
	$primary = $('#primary');
	$secondary = $('#secondary');
	video = $video[0];
	buffer = $buffer[0];
	primary = $primary[0];
	secondary = $secondary[0];

	$video.bind('canplay', function() {
		bufferCtx = buffer.getContext('2d');
		primaryCtx = primary.getContext('2d');
		secondaryCtx = secondary.getContext('2d');
		buffer.height = video.videoHeight;
		buffer.width = video.videoWidth;
		setInterval(function() {
			bufferCtx.drawImage(video, 0, 0);
		}, 30);
	});

	video.play();

})();