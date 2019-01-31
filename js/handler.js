isDisappering = false;
$('#openMenu').mouseenter(function(){
	$('#rightMenu').removeClass('closed');
	isDisappering = false;
});

$('#openMenu').mouseleave(function(){
	isDisappering = true;
	setTimeout(function() {
		if(isDisappering){
			$('#rightMenu').addClass('closed');
		}
		isDisappering = false;
	}, 1000);
});