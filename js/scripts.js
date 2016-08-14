$(document).ready(function() {
	$('.offcanvas--toggler').on('click', function(e) {
		console.log('test');
		$('body').toggleClass('offcanvas--show');
	});
});
