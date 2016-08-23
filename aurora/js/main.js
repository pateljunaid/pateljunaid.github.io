/*Step 1 SUBMITTED EARLY, BUT MINOR UI CHANGES MADE AFTER THE EARLY BIRD SUBMIT DEADLINE: Changed background image, changed name of the app, etc.*/

// catch simple errors
"use strict";

// declare aurora-app namespace if it doesn't already exist
var aurora =  aurora || {};

// Define Backbone router
aurora.AppRouter = Backbone.Router.extend({

    // Map "URL paths" to "router functions"
    routes: {
        "": "home",
		"Home": "home",
		"About": "about",
		"movies": "browse",
		"movies/:id": "details"
    },

    // When an instance of an AppRouter is declared, create a Header view
    initialize: function() {
		this.collection = new aurora.Movies();
		this.moviesFetch = this.collection.fetch();
		var self = this;
		
	// instantiate a Header view
        this.headerView = new aurora.Header();  
	// insert the rendered Header view element into the document DOM
        $('.header').html(this.headerView.render().el);
    },

    home: function() {
	//Setting the clicked button's bg to black
	this.headerView.selectMenuItem('.home-menu');
		
	// If the Home view doesn't exist, instantiate one
        if (!this.homeView) {
            this.homeView = new aurora.Home();
        };
	// insert the rendered Home view element into the document DOM
        $('#content').html(this.homeView.render().el);
    },
		
	about: function() {
	//Setting the clicked button's bg to black
		this.headerView.selectMenuItem('.about-menu');
		
	// If the About view doesn't exist, instantiate one
        if (!this.aboutView) {
            this.aboutView = new aurora.About();
        };
	// insert the rendered About view element into the document DOM
        $('#content').html(this.aboutView.render().el);
	 },
	 

	details: function(id) {
		// set the view element ($el) HTML content using its template
    	/*var moviesFetch = this.movies.fetch();
		… // somewhere else in code
		moviesFetch.done(function(coll, resp) {
		// get movie and instantiate
		// Details view
		}).fail(function(coll, resp) {
		// display error message
		});*/
	
	//Setting the clicked button's bg to black
		this.headerView.selectMenuItem('.addMovies-menu');
		var movies = new aurora.Movies();
		var movie = new aurora.Movie();
		if (id == "add"){
			//adding a new Movie from scratch
			
			this.detailsView = new aurora.Details({model: movie, collection: movies});
			
			$('#content').html(this.detailsView.render().el);
		}
	
		else{
			console.log("else");
			 //load the same form but also add an image
			 //go into editing mode, not new movie mode
			 //add image
		}
	},
	
	noSuchView: function() {
		// pull the unsupported hash value out of the Backbone history list
		var hash = Backbone.history.location.href.split('#')[1];
		// set the view content to error message showing unsupported view name
		$('#content').html('<h2>Sorry, no view "' + hash + '" in HelloWorld</h2>');
		},

	browse: function() {
	//Setting the clicked button's bg to black
		this.headerView.selectMenuItem('.browseMovies-menu');
		
		// If the About view doesn't exist, instantiate one
  	
		this.moviesFetch.done(function(movies, response){
			// now instantiate a Browse view using fetched collection
			this.browseView = new aurora.Browse();

	    // render the helloWorld View, and insert its root element "el"
	    // as the value of the view's #content element.
	    $('#content').html(this.browseView.render().el);
	});
    }
		
});
	
		
			
		
	/*
	
	
	
	insert the rendered Details view element into the document DOM
        $('#content').html(this.detailsView.render().el);
		this.movies.fetch({
		success: function(collection, response) {
		// can now get model from collection
		// to instantiate Details view
		},
		error: function(collection, response) {
			// show error message
		}
		});	/* 
		
		browse: function() {
	Sett	ing the clicked button's bg to black
		this.headerView.selectMenuItem('.about-menu');
		
	// If the About view doesn't exist, instantiate one
        if (!this.aboutView) {
            this.aboutView = new aurora.About();
        };
	// insert the rendered About view element into the document DOM
        $('#content').html(this.aboutView.render().el);
	 },*/
	  
	 //details: function(id) {*/  
	 



// Load HTML templates for Home, Header, About, Details views, and when
// template loading is complete, instantiate a Backbone router
// with history.
// load markup template for HelloWorld Thumbnail view
/*aurora.loadThumbTemplate = $.get('tpl/MovieThumb.html');
aurora.loadThumbTemplate.done(function(markup) {
// keep an app-level reference to the template markup for views to ref
aurora.thumbMarkup = markup;
// instantiate the app router    
});*/
aurora.utils.loadTemplates(['Home', 'Header', 'About', 'Details', 'Browse'], function() {
    aurora.app = new aurora.AppRouter();
    Backbone.history.start();
});
