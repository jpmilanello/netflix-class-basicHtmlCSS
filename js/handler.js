$( document ).ready(function() {
	console.log(movieInformation);
	$.ajax({
		type: "GET",
		url: "https://fast-fortress-11698.herokuapp.com/api/contacts",
		success: function(movies) {
			console.log(movies);
		},
		error: function(error){
			console.log("No se pudo completar por: " + error);
		}
	});

	var bannerMovie = movieInformation.find(function(movie){
		return movie.isBanner === 1;
	});

	$("#highlight .title").html(bannerMovie.Name);
	$("#highlight .subtitle").html("<span class='likeble'>" + bannerMovie.Match + "% de coincidencia</span> 2018 <span class='ageRestriction'>" + bannerMovie.Age + "</span> " + bannerMovie.NoSeason + " temporadas");
	$("#highlight .description").html(bannerMovie.Description);
	$("#highlight .cast").html("<img src='img/chair.png'> <p>" + bannerMovie.Director + "</p>");
	$("#highlight .extraText").html("<span>Protagonistas:</span>" + bannerMovie.Cast + "</br><span>Generos:</span>" + bannerMovie.Genre + "</br><span>Este programa es:</span>" + bannerMovie.Features);
	$("#highlight").css("background-image", "url('img/" + bannerMovie.backgroundImage + "')");
	
	var copyJson = movieInformation.slice();
	copyJson.splice(copyJson.indexOf(bannerMovie), 1);
	console.log(copyJson);

	copyJson.forEach(function(movie){
		$("#otherMovies ul").append("<li id = 'movie_" + movie.Id + "'><img src='img/" + movie.MiniImage + "'> <div class = 'infoWrapper'></div></li>")
	});

	$("#otherMovies #thumbs li").mouseenter(function(){
		$(this).addClass("open");
		var movieId = $(this).attr("id");
		movieIdArray = movieId.split("_");
		movieIdNumber = movieIdArray[1];	
		$(this).children(".infoWrapper").html("<div class='littleDetails'> \
												<img src='img/play_red.png'> \
												<p class='title'>" + copyJson[movieIdNumber].Name + "</p> \
												<p class='subtitle'><span class='likeble'>" + copyJson[movieIdNumber].Match + "% de coincidencia </span><span class='ageRestriction'>" + copyJson[movieIdNumber].Age + "</span> <span class='noSeasons'>" + bannerMovie.NoSeason + " temporada</span></p> \
												<p class='content'>" + copyJson[movieIdNumber].Genre.join("<span class = 'colorPoint'> &#149; </span>") + "</p> \
											</div> \
											<div class='thumbsWrapper'> \
												<a href=''><img src='img/thumbsUp.png'></a> \
												<a href=''><img src='img/thumbsDown.png'></a> \
												<a href=''><img src='img/check.png'></a> \
											</div> \
											<a class='arrowInformation' href=''><img src='img/arrow_information.png'></a>");
		$(this).children(".infoWrapper").css({"opacity": 1});
		if ($(this).is(":first-child")){
			$(".open ~ li").addClass("moveRightFirst");
		}else{
			if($(this).is(":last-child")){
				$(".open").prevAll("li").addClass("moveLeftLast");
			}else{
				$(".open ~ li").addClass("moveRight");
				$(".open").prevAll("li").addClass("moveLeft");
			}
		}
	});

	$('#otherMovies #thumbs li').mouseleave(function(){
		$("#thumbs li").removeClass("open").removeClass("moveRight").removeClass("moveLeft").removeClass("moveRightFirst").removeClass("moveLeftLast");
		$(this).children(".infoWrapper").css({"opacity": 0});
	});

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

});
