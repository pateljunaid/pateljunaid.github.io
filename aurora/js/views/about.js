// catch simple errors
"use strict";

// declare aurora-app namespace if it doesn't already exist
var aurora =  aurora || {};

// note View-name (About) matches name of template file About.html
aurora.About = Backbone.View.extend({
    // render the View
    render: function () {
	// set the view element ($el) HTML content using its template
	this.$el.html(this.template());
	return this;    // support method chaining
    }
});
