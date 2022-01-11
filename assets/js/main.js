// Load the chat widget into all pages
var widget = `
<button type="button" class="chat-float-content" data-rel="tooltip" title="Get in touch" data-toggle="modal" data-target="#contactModal">
	<i class="fas fa-comment-dots fa-3x"></i>
</button>
`;
var chat_container = document.createElement('div');
chat_container.setAttribute("id", "chat-widget");
chat_container.innerHTML = widget;
document.body.insertBefore(chat_container, document.body.firstChild);


const hempInquieriesScriptURL = 'https://hooks.zapier.com/hooks/catch/4519699/b9t7ek0';
const olccInquieriesScriptURL = 'https://hooks.zapier.com/hooks/catch/4519699/b9h3shs';
var inquieriesForm;
var orderSetup = function() {
	// Setup the order form
	inquieriesForm = document.forms['submit-to-google-inqueries'];
	inquieriesForm.addEventListener('submit', e => {
	e.preventDefault()
	$('#orderForm').addClass('hidden')
	$('#orderProcessing').removeClass('hidden')
	
	var data = new FormData(inquieriesForm);
	var inquieriesScriptURL = hempInquieriesScriptURL;
	var cloneType;
	for (var value of data.getAll("CloneType")) {
		if (value.length > 0) {
			cloneType = value;
		}
	}
	console.log(cloneType);
	data.set("CloneType", cloneType);

	var contactMethod;
	for (var value of data.get("ContactMethod")) {
		if (value.length > 0) {
			contactMethod = value;
		}
	}
	data.set("ContactMethod", contactMethod);

	if (cloneType === "OLCC") {
		inquieriesScriptURL = olccInquieriesScriptURL;
	}
	fetch(inquieriesScriptURL, {
			method: 'POST',
			body: new FormData(inquieriesForm)
		})
		.then(response => {
			$('#orderForm').trigger("reset");
			$('#orderProcessing').addClass('hidden')
			$('#orderSuccess').removeClass('hidden')
			if ($('#orderModal').length > 0) {
				$('#orderModal').fadeTo(3000, 0, function(){
					$('#orderSuccess').addClass('hidden')
					$('#orderForm').removeClass('hidden')
					$('#orderModal').modal('hide')
					$('#orderModal').css({opacity: 1})
				});
			} else {
				// No Order modal
				setTimeout(function() {
					$('#orderSuccess').addClass('hidden');
					$('#orderForm').delay(1500).trigger("reset");
					$('#orderForm').delay(1500).removeClass('hidden');
				}, 1500);
			}
		}).catch(error => {
			$('#orderForm').trigger("reset")
			$('#orderProcessing').addClass('hidden')
			$('#orderFailed').removeClass('hidden')
		})
	});
};

const contactusScriptURL = 'https://hooks.zapier.com/hooks/catch/4519699/b9tp8dr';
var contactusForm;
var contactSetup = function() {
	// Setup the contact us form
	contactusForm = document.forms['submit-to-google-contactus'];
	contactusForm.addEventListener('submit', e => {
		e.preventDefault();
		$('#contactForm').addClass('hidden');
		$('#contactSending').removeClass('hidden');
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
					setTimeout(function() {
						$('#contactSuccess').addClass('hidden');
						$('#contactForm').delay(1500).trigger("reset");
						$('#contactForm').delay(1500).removeClass('hidden');
					}, 1500);
				}
			}).catch(error => {
				console.log(error);
				$('#contactForm').trigger("reset");
				$('#contactSending').addClass('hidden');
				$('#contactFailed').removeClass('hidden');
			});
	});
};

const eventRegisterScriptURL = 'https://hooks.zapier.com/hooks/catch/4519699/b9h37zm';
var eventRegisterForm;
var eventRegisterSetup = function() {
	console.log("event setup!");
	// Setup the event registration form
	eventRegisterForm = document.forms['submit-to-google-events'];
	eventRegisterForm.addEventListener('submit', e => {
		e.preventDefault();
		$('#eventRegisterForm').addClass('hidden');
		$('#eventRegisterSending').removeClass('hidden');
		fetch(eventRegisterScriptURL, {
				method: 'POST',
				body: new FormData(eventRegisterForm)
		})
		.then(response => {
			$('#eventRegisterForm').trigger("reset");
			$('#eventRegisterSending').addClass('hidden');
			$('#eventRegisterSuccess').removeClass('hidden');
			if ($('#eventRegisterModal').length > 0) {
				$('#eventRegisterModal').fadeTo(3000, 0, function () {
					$('#eventRegisterSuccess').addClass('hidden');
					$('#eventRegisterForm').trigger("reset");
					$('#eventRegisterForm').removeClass('hidden');
					$('#eventRegisterModal').modal('hide');
					$('#eventRegisterModal').css({
						opacity: 1
					});
				});
			} else {
				// When there is no modal
				setTimeout(function() {
					$('#eventRegisterSuccess').addClass('hidden');
					$('#eventRegisterForm').delay(1500).trigger("reset");
					$('#eventRegisterForm').delay(1500).removeClass('hidden');
				}, 1500);
			}
		}).catch(error => {
			$('#eventRegisterForm').trigger("reset");
			$('#eventRegisterSending').addClass('hidden');
			$('#eventRegisterFailed').removeClass('hidden');
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
	// Include views
	var includes = $('[data-include]');
	jQuery.each(includes, function () {
		var file = '/views/' + $(this).data('include') + '.html';
		if (file.search("contact") >= 0) {
			$(this).load(file, contactSetup);
		} else if (file.search("order") >= 0) {
			$(this).load(file, orderSetup);
		} else if (file.search("register") >= 0) {
			$(this).load(file, eventRegisterSetup);
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

