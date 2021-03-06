// catch simple errors
"use strict";

// declare aurora-app namespace if it doesn't already exist
var aurora =  aurora || {};

// note View-name (Footer) matches name of template file Footer.html
aurora.Footer = Backbone.View.extend({

    // render the View
    render: function () {
	// set the view element ($el) HTML content using its template
	this.$el.html(this.template());
	return this;    // support method chaining
    }

});
	