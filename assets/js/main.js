const inquieriesScriptURL = 'https://script.google.com/macros/s/AKfycbzysJCY5HlE4StfHRKI5QgAdhow_Ti1CRssLVBIkQ95vwAlcGTS/exec';
var inquieriesForm;

var orderSetup = function() {
	// Setup the order form
	inquieriesForm = document.forms['submit-to-google-inqueries'];
	inquieriesForm.addEventListener('submit', e => {
	e.preventDefault()
	$('#orderForm').addClass('hidden')
	$('#orderProcessing').removeClass('hidden')
	fetch(inquieriesScriptURL, {
			method: 'POST',
			body: new FormData(inquieriesForm)
		})
		.then(response => {
		$('#orderForm').trigger("reset")
		$('#orderProcessing').addClass('hidden')
		$('#orderSuccess').removeClass('hidden')

		$('#orderModal').fadeTo(3000, 0, function(){
			$('#orderSuccess').addClass('hidden')
			$('#orderForm').removeClass('hidden')
			$('#orderModal').modal('hide')
			$('#orderModal').css({opacity: 1})
		});
		}).catch(error => {
		$('#orderForm').trigger("reset")
		$('#orderProcessing').addClass('hidden')
		$('#orderFailed').removeClass('hidden')
		})
	});
};
const contactusScriptURL = 'https://script.google.com/macros/s/AKfycbxUYqh3fzyT1vpKuOQaVciKCjSMbVqolbIM4kJ34KWx4AiSuRs/exec';
var contactusForm;


var contactSetup = function() {
	// Setup the contact us form
	contactusForm = document.forms['submit-to-google-contactus'];
	contactusForm.addEventListener('submit', e => {
		e.preventDefault()
		$('#contactForm').addClass('hidden')
		$('#contactSending').removeClass('hidden')
		fetch(contactusScriptURL, {
				method: 'POST',
				body: new FormData(contactusForm)
			})
			.then(response => {
				$('#contactForm').trigger("reset");
				$('#contactSending').addClass('hidden');
				$('#contactSuccess').removeClass('hidden');
				if ($('#contactModal').length > 0) {
					$('#contactModal').fadeTo(3000, 0, function () {
						$('#contactSuccess').addClass('hidden');
						$('#contactForm').trigger("reset");
						$('#contactForm').removeClass('hidden');
						$('#contactModal').modal('hide');
						$('#contactModal').css({
							opacity: 1
						});
					});
				} else {
					// When there is no modal
					console.log("sent");
					setTimeout(function() {
						$('#contactSuccess').addClass('hidden');
						$('#contactForm').delay(1500).trigger("reset");
						$('#contactForm').delay(1500).removeClass('hidden');
					}, 1500);
				}
			}).catch(error => {
				$('#contactForm').trigger("reset");
				$('#contactSending').addClass('hidden');
				$('#contactFailed').removeClass('hidden');
			});
	});
};

 // Twitter
 var processTweet = function (tweets) {
	// Hack to pull out the instagram link and make the whole text point there
	for (var x = 0; x < tweets.length; x++) {
		var loc = tweets[x].tweet.search("<a href");
		var href = "";
		if (loc >= 0) {
			href = tweets[x].tweet.slice(loc);
			href = href.slice(href.search('"') + 1);
			href = href.slice(0, href.search('"'));

			tweets[x].tweet = tweets[x].tweet.slice(0, loc);
			tweets[x].instagram = href;
		}
	}

	if (tweets.length > 0) {
		var div1 = document.getElementById('Tweet1');
		// console.log("tweets:");
		// console.log(tweets);
		if (tweets[0].instagram && tweets[0].instagram.length) {
			div1.href = tweets[0].instagram;
		}
		div1.innerHTML += tweets[0].tweet + "<hr class=\"hr-small\">";
	}
	if (tweets.length > 1) {
		var div2 = document.getElementById('Tweet2');
		if (tweets[1].instagram && tweets[1].instagram.length) {
			div2.href = tweets[1].instagram;
		}
		div2.innerHTML += tweets[1].tweet;
	}
};

var loadTweets = function() {
	var config = {
		"profile": {
			"screenName": 'infinitetreenu1'
		},
		"dataOnly": true,
		"maxTweets": 2,
		"domId": "foobar",
		"customCallback": processTweet
	};
	twitterFetcher.fetch(config);
};


$(function () {
	var includes = $('[data-include]');
	jQuery.each(includes, function () {
		var file = 'views/' + $(this).data('include') + '.html';
		if (file.search("contact") >= 0) {
			$(this).load(file, contactSetup);
		} else if (file.search("order") >= 0) {
			$(this).load(file, orderSetup);
		} else if (file.search("footer") >= 0) {
			$(this).load(file, loadTweets);
		} else {
			$(this).load(file);
		}
	});
});


$('.articles-sort__tag button').click(function() {
	$('#articles-sort__title').html($(this).html());
	});
	$('.articles-sort__tag button').on('click', function(){
	$(this).addClass('articles-sort__tag__current').parent().siblings().find('button').removeClass('articles-sort__tag__current');
});
