// Using ES5, assuming browser does not support ES6.
( function() {
	var contentDiv = 'content';

	// Data needs to be an array and have data.
	if ( Array.isArray( data ) && data.dogs && data.dogs.length === 0 ) {
		// No data found, just output an error message.
		var message = 'There is no data.';

		outputWarning( contentDiv, message );
	} else {
		outputDoggyCards( data.dogs );
	}

	/**
	 * Output a message.
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
	 * Output the dog cards.
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
			var parentDiv  = document.getElementById( contentDiv )
			var doggyDiv = document.createElement( 'div' );
			doggyDiv.className = 'card';
			doggyDiv.innerHTML = outputDoggyHtml( dogs[i] );
			parentDiv.appendChild( doggyDiv );
		}
	}

	function outputDoggyHtml( dog ) {
		return '<a href="' + dog.source + '" target="_blank"><img src="' + dog.image + '" alt="Doggy Image" />';
	}
} )();
