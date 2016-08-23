// catch simple errors
"use strict";

// declare aurora-app namespace if it doesn't already exist
var aurora =  aurora || {};

//Define Model
aurora.Movie = Backbone.Model.extend({
	// match localStorage (later server DB)
	// use of _id, rather than id
	idAttribute: "_id",
	
	defaults: {
	title: "",
	released: "",
	director: "",
	starring: [],
	rating: "",
	duration: null,
	genre: [],
	synopsis: "",
	freshTotal: 0.0,
	freshVotes: 0.0,
	trailer: null,
	poster: "img/placeholder.png",
	dated: new Date()
	},
	
	validators: {
		title: function(value){
			var expression = /^[a-zA-Z0-9 ,.?\-'*]*$/;
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "Only 1 or more letters-digits-spaces allowed"];
		},
		
		released: function(value){
			var expression = /^(19[1-9]\d|20[0-1][0-6])$/;
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "Release date must be between 1910-2016"];
		},
		
		director: function(value){
			var expression = /^[a-zA-Z0-9 ,.?\-'*]*$/;
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "Only 1 or more letters-digits-spaces allowed"];
		},
		
		rating: function(value){
			var expression = /^(G|PG|PG-13|R|NC-17|NR)$/;
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "Rating must be one of: G, PG, PG-13, R, NC-17, NR"];
		},
		
		starring: function(value){
			var expression = /(^[a-zA-z \-']*$)|(^[a-zA-z \-']*(,| |, )[a-zA-z \-']+$)*/;
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "1 or more comma/space-separated names required"];
		},
		
		duration: function(value){
			var expression = /^[0-9]{0,3}$/;  
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "Duration must be between 0-999"];
		},
		
		genre: function(value){
			var expression = /(^[a-zA-z \-']*$)|(^[a-zA-z \-']*(,| |, )[a-zA-z \-']+$)*/;
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "1 or more comma/space-separated genres required"];
		},
		
		synopsis: function(value){
			var expression = /^[\w .\-\/@!?&*()]*$/
			var not_empty = value.length != 0;
			// structure of model validator function
			return [not_empty && expression.test(value), "1 or more words required or you have entered invalid characters"];
		},
		
		trailer: function(value){
			var expression = /^(http|https)(:\/\/)([\w]*)(.[\w]*)+(\/[\w]*)+(.[\w]* | #[\w]*|\/){0,1}/;
			// structure of model validator function
			return [value.length == 0 || expression.test(value), "Enter a valid URL"];
		}
	},
	
	validateItem: function(key){
		
		var bool = this.validators[key.target.name](key.target.value)[0];
		var message = this.validators[key.target.name](key.target.value)[1];
		
		if (bool == false){
			aurora.utils.addValidationError(key, message);
			}
		else{
			aurora.utils.removeValidationError(key);
			}
	}
});