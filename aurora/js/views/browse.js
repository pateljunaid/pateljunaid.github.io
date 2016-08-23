// catch simple errors
"use strict";

// declare aurora-app namespace if it doesn't already exist
var aurora =  aurora || {};


// note View-name (Browse) matches name of template file Browse.html
aurora.Browse = Backbone.View.extend({
     moviesTemplate: _.template([
	"<% movies.each(function(movie) { %>",
	    "<%= movieTemplate(movie.toJSON()) %>",
	"<% }); %>",
    ].join('')),

    // "$el" is a jQuery-object wrapper around "el", which enables you
    // to use jQuery methods like "html()" to set the content of elements.
    render: function(){
    /*    this.template = _.template(aurora.thumbMarkup);

        // set the view element ($el) HTML content using its template
	var moviesMarkup = this.moviesTemplate({
		movies: this.collection,
		movieTemplate: this.template
	});*/
		var collection = new aurora.Movies();
		collection.fetch();
		var loadThumbTemplate = $.get('tpl/MovieThumb.html');
		loadThumbTemplate.done(function(markup) {
		var template = _.template(markup);
		var render = "";
		collection.each(function(movie){
		var temp = template({
		id: movie.get("_id"),
		title: movie.get("title"),
		released: movie.get("released"),
		director: movie.get("director"),
		starring: movie.get("starring"),
		rating: movie.get("rating"),
		duration: movie.get("duration"),
		genre: movie.get("genre"),
		synopsis: movie.get("synopsis"),
		trailer: movie.get("trailer"),
		poster: movie.get("poster")});
		render += temp;});
		if (render.length != 0){$('.home-hero').html(render);};});
	    this.$el.html(this.template());
        return this;    // support method chaining
    }
});




