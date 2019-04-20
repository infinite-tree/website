const inquieriesScriptURL = 'https://script.google.com/macros/s/AKfycbzysJCY5HlE4StfHRKI5QgAdhow_Ti1CRssLVBIkQ95vwAlcGTS/exec'
const inquieriesForm = document.forms['submit-to-google-inqueries']

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
  
const contactusScriptURL = 'https://script.google.com/macros/s/AKfycbxUYqh3fzyT1vpKuOQaVciKCjSMbVqolbIM4kJ34KWx4AiSuRs/exec'
const contactusForm = document.forms['submit-to-google-contactus']

contactusForm.addEventListener('submit', e => {
	e.preventDefault()
	$('#contactForm').addClass('hidden')
	$('#contactProcessing').removeClass('hidden')
	fetch(contactusScriptURL, {
			method: 'POST',
			body: new FormData(contactusForm)
		})
		.then(response => {
			$('#contactForm').trigger("reset")
			$('#contactProcessing').addClass('hidden')
			$('#contactSuccess').removeClass('hidden')

			$('#contactModal').fadeTo(3000, 0, function () {
				$('#contactSuccess').addClass('hidden')
				$('#contactForm').removeClass('hidden')
				$('#contactModal').modal('hide')
				$('#contactModal').css({
					opacity: 1
				})
			});
		}).catch(error => {
			$('#contactForm').trigger("reset")
			$('#contactProcessing').addClass('hidden')
			$('#contactFailed').removeClass('hidden')
		})
});

$('.articles-sort__tag button').click(function() {
	$('#articles-sort__title').html($(this).html());
	});
	$('.articles-sort__tag button').on('click', function(){
	$(this).addClass('articles-sort__tag__current').parent().siblings().find('button').removeClass('articles-sort__tag__current');
});
	
$(function(){
	var includes = $('[data-include]');
	jQuery.each(includes, function(){
	  var file = 'views/' + $(this).data('include') + '.html';
	  $(this).load(file);
	});
});
	
	