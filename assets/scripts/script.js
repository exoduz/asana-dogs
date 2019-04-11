// Using ES5, assuming browser does not support ES6.
( function() {
	var contentDiv = 'content';

	function load() {
		// Data needs to be an array and have data.
		if ( Array.isArray( data ) && data.dogs && data.dogs.length === 0 ) {
			// No data found, just output an error message.
			var message = 'There is no data.';

			outputWarning( contentDiv, message );
		} else {
			outputDoggyCards( data.dogs );
		}

		// Check for image clicks.
		onImageClick();
	}

	/**
	 * Output a warning message.
	 *
	 * @param  {String} div     The parent div.
	 * @param  {String} message The warning message.
	 */
	function outputWarning( div, message ) {
		var parentDiv  = document.getElementById( div )
		var divWarning = document.createElement( 'div' );
		divWarning.className   = 'warning warning__no-data';
		divWarning.textContent = message;
		parentDiv.appendChild( divWarning );
	}

	/**
	 * Output the doggy cards.
	 * @param  {Array} data An array of dogs.
	 */
	function outputDoggyCards( dogs ) {
		// Sanity check. Make sure there's data.
		if ( dogs.length < 0 ) {
			var div     = 'content';
			var message = 'There is no data.';

			return outputWarning( div, message );
		}

		for ( var i = 0; i < dogs.length; i++ ) {
			// If image or source is missing, just move on.
			if ( ! dogs[i].image || ! dogs[i].source ) {
				continue;
			}

			var parentDiv      = document.getElementById( contentDiv )
			var doggyDiv       = document.createElement( 'div' );
			doggyDiv.className = 'card';
			doggyDiv.innerHTML = outputDoggyHtml( dogs[i] );
			parentDiv.appendChild( doggyDiv );
		}
	}

	/**
	 * Output individual dog data for card.
	 * @param  {Object} dog The data for the dog.
	 * @return {String}     HTML output.
	 */
	function outputDoggyHtml( dog ) {
		return '<a class="doggy-images" href="' + dog.source + '" target="_blank"><img src="' + dog.image + '" alt="Doggy Image" data-image="' + dog.image + '" /></a>';
	}

	/**
	 * Check for image click.
	 */
	function onImageClick() {
		var el = document.querySelectorAll( '.doggy-images' );

		for ( i = 0; i < el.length; i++ ) {
			el[i].addEventListener( 'click', function( event ) {
				event.preventDefault();
				console.log( event.target );
				toggleModal( event.target );
			} );
		}
	}

	/**
	 * Toggle the modal.
	 */
	function toggleModal( target ) {
		var modal        = document.querySelector( '.modal' );
		var modalContentDiv     = document.querySelector( '.modal__content' );
		var currentState = modal.style.display;

		// TODO: Add click outsdie close.
		// TODO: Update URL so that it's bookmarkable.
		if ( currentState === 'none' ) {
			// Open modal.
			document.body.className = 'noscroll';
			modal.style.display     = 'block';

			// Insert image to modal.
			var doggyImageDiv       = document.createElement( 'div' );
			doggyImageDiv.className = 'modal__doggy-image';
			doggyImageDiv.innerHTML = '<img src="' + event.target.dataset.image + '" alt="Doggy Image" />';
			modalContentDiv.append( doggyImageDiv );

			attachModalListeners( modal );
		} else {
			// Close modal.
			document.body.className = document.body.className.replace( 'noscroll', '' );
			modal.style.display = 'none';

			// Remove previously appended image.
			document.querySelector( '.modal__doggy-image' ).remove();

			detachModalListeners( modal );
		}
	}

	/**
	 * Add click event listerenrs to the element.
	 * @param  {String} el The HTML element.
	 */
	function attachModalListeners( el ) {
		el.querySelector( '.modal__close' ).addEventListener( 'click', toggleModal );
	}

	/**
	 * Remove click event listerenrs to the element.
	 * @param  {String} el The HTML element.
	 */
	function detachModalListeners( el ) {
		el.querySelector( '.modal__close' ).removeEventListener( 'click', toggleModal );
	}

	load();
} )();
