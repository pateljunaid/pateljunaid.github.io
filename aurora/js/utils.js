/*Step 1 SUBMITTED EARLY, BUT MINOR UI CHANGES MADE AFTER THE EARLY BIRD SUBMIT DEADLINE: Changed background image, changed name of the app, etc.*/

// catch simple errors
"use strict";

// declare aurora-app namespace, if it doesn't already exist
var aurora = aurora || {};

aurora.utils = {

    // Asynchronously load templates located in separate .html files using
    // jQuery "deferred" mechanism, an implementation of Promises.  Note we
    // depend on template file names matching corresponding View file names,
    // e.g. Home.html and home.js which defines Backbone View "Home".
    /*
     * @param {[String]} views:  filenames of templates to be loaded
     * @param {function} callback:  callback function invoked when file is loaded
     */
    loadTemplates: function(views, callback) {

		// Array of deferred actions to keep track of template load status
		var deferreds = [];

		// Process each template-file in views array
		/*
		 * @param {[integer]} index:  position of view template within views array
		 * @param {[String]} view:  root name (w/o .html) of view template file
		 */
		$.each(views, function(index, view) {
		    // If an associated Backbone view is defined, set its template function	
		    if (aurora[view]) {

			// Push task of retrieving template file into deferred array.
			// Task performs "get" request to load the template, then passes
			// resulting template data to anonymous function to process it.
			/*
			 * @param {String} data:  HTML from template file as String
			 */
		        deferreds.push($.get('tpl/' + view + '.html', function(data) {
		    	    // Set template function on associated Backbone view.
		            aurora[view].prototype.template = _.template(data);
		        }));

		    // No Backbone view file is defined; cannot set template function.
		    } else {
		        console.log(view + " not found");
		    }
		});

		// When all deferred template-loads have completed,
		// invoke callback function.
		$.when.apply(null, deferreds).done(callback);
	},
	
	showNotice: function(alert_type, display_text){
		$('#panel').stop();
		$('#panel').html(display_text);
		$('#panel').addClass("alert-".concat(alert_type));
		$('#panel').show();	
		return this;
	},

	hideNotice: function(){
		$('#panel').delay(5000).fadeOut();
		
		return this;
	},
	
	addValidationError: function(field, message) {
		// use jQuery to address input field by its
		// name attribute
		var sel = "input[name="+event.target.name+"]";
		$(sel).parent().addClass('has-error');
		$(sel).next().html(message);
	},
		
	removeValidationError: function (field) {
		// use jQuery to address input field by its
		// name attribute
		var sel = "input[name="+event.target.name+"]";
		$(sel).parent().removeClass('has-error');
		$(sel).next().html("");
	}
};
