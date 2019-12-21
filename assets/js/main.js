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



$(function () {
	var includes = $('[data-include]');
	jQuery.each(includes, function () {
		var file = 'views/' + $(this).data('include') + '.html';
		if (file.search("contact") >= 0) {
			$(this).load(file, contactSetup);
		} else if (file.search("order") >= 0) {
			$(this).load(file, orderSetup);
		} else if (file.search("hemp") >= 0) {
			$(this).load(file, orderSetup);
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
