var togglers = document.querySelectorAll('.offcanvas--toggler');

for (var i = 0; i < togglers.length; i++) {
	togglers[i].addEventListener('click', function() {
		document.body.classList.toggle('offcanvas--show')
	});
}
