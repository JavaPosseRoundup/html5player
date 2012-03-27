/**
 * @class steal.dev
 * @parent stealjs
 * Provides helper functions for development that get removed when put in production mode.
 * This means you can leave <code>steal.dev.log("hello world")</code> in your code and it
 * will get removed in prodution.
 * <h3>Examples</h3>
 * @codestart
 * steal.dev.log("Something is happening");
 * steal.dev.warn("Something bad is happening");
 * @codeend
 */
steal.dev = {
	regexps: {
		colons: /::/,
		words: /([A-Z]+)([A-Z][a-z])/g,
		lowerUpper: /([a-z\d])([A-Z])/g,
		dash: /([a-z\d])([A-Z])/g
	},
	underscore: function( s ) {
		var regs = this.regexps;
		return s.replace(regs.colons, '/').
		replace(regs.words, '$1_$2').
		replace(regs.lowerUpper, '$1_$2').
		replace(regs.dash, '_').toLowerCase()
	},
	isHappyName: function( name ) {
		//make sure names are close to the current path
		var path = steal.cur().path.replace(/\.[^$]+$/, "").split('/')
		//make sure parts in name match
		var parts = name.split('.')
		for ( var i = 0; i < parts.length && path.length; i++ ) {
			if ( parts[i].toLowerCase() != path[i] && this.underscore(parts[i]) != path[i] && this.underscore(parts[i]) != path[i].replace(/_controller/, "") ) {
				this.warn("Are you sure " + name + " belongs in " + steal.cur().path)
			}
		}
	},
	/**
	 * Adds a warning message to the console.
	 * @codestart
	 * steal.dev.warn("something evil");
	 * @codeend
	 * @param {String} out the message
	 */
	warn: function( out ) {
		if ( window.console && console.log ) {
			console.log("steal.js WARNING: " + out)
		} else if ( window.opera && window.opera.postError ) {
			opera.postError("steal.js WARNING: " + out)
		}
	},
	/**
	 * Adds a message to the console.
	 * @codestart
	 * steal.dev.log("hi");
	 * @codeend
	 * @param {String} out the message
	 */
	log: function( out ) {
		if ( window.console && console.log ) {
			console.log("steal.js INFO: " + out)
		} else if ( window.opera && window.opera.postError ) {
			opera.postError("steal.js INFO: " + out)
		}
	}
}

//stuff for jmvc
/**
 * @Constructor jQuery
 * @init blah
 */

//
/**
 * @Constructor jQuery.fn
 * @init blah
 */
//
/**
 * @class jQuery.event.special
 */
// as fasf sa