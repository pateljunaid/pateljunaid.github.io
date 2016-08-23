// catch simple errors
"use strict";

// declare aurora-app namespace if it doesn't already exist
var aurora =  aurora || {};


// note View-name (Details) matches name of template file Details.html
aurora.Details = Backbone.View.extend({
	
    template: _.template(""),
	
    events: {
        "blur .input" : "blurHandler",
        "click #moviesave" : "saveHandler",
        "click #moviedel" : "deleteHandler",
		"dragover #drop-zone": "dragoverHandler",
		"drop #drop-zone": "dropHandler"
    },

    blurHandler: function(event) {
		aurora.utils.showNotice("info","Note! To make changes permanent, click \"Save Changes\" button").hideNotice();

		var key = event.target.name;	
        var value = event.target.value;
		
		this.model.validateItem(event);
        this.model.set(key, value);
    },
	
	
	saveHandler: function(event) {
		
		// run validation checks on all fields before proceeding
		var list = ['title', 'released', 'director', 'rating', 'starring', 'duration', 'genre', 'synopsis', 'trailer']
		var i = 0;
		var error = false;
		for (i=0; i<list.length; i++){
			var value = document.getElementsByName(list[i])[0].value;
			var bool = this.model.validators[list[i]](value)[0];
			var message = this.model.validators[list[i]](value)[1];
			if ( bool == false){
				error = true;
				var sel = "input[name="+list[i]+"]";
				$(sel).parent().addClass('has-error');
				$(sel).next().html(message);
			}
			else{
				var sel = "input[name="+list[i]+"]";
				$(sel).parent().removeClass('has-error');
				$(sel).next().html("");
			}
		}
		console.log();
		if (error == true){
			aurora.utils.showNotice("danger","Cannot save changes. Please fix the form errors first!").hideNotice();
		}
		else{
			//ready to proceed 
			this.collection.fetch();
			this.collection.add(this.model);
			this.model.save();
			//var url = "movies/";
			
			//aurora.app.navigate('#movies/', {replace:true});
			aurora.utils.showNotice("success", "Movie Saved!").hideNotice();
			
		}
	},
		
	deleteHandler: function(){
		this.model.destroy({
			wait: true,  // don't destroy client model until server responds
			success: function(model, response) {
				// later, we'll navigate to the browse view upon success
				aurora.app.navigate('#', {replace:true, trigger:true});
				// notification panel, defined in section 2.6
				aurora.utils.showNotice('Success', "Movie Deleted!", 'alert-success')
			},
		
		error: function(model, response) {
			// display the error response from the server
			aurora.utils.requestFailed(response);
		} 
		});		
	},
	
	// Handle drag-n-drop picture
	dragoverHandler: function(event) {
		// don't let parent element catch event
		event.stopPropagation();
		// prevent default to enable drop event
		event.preventDefault();
		// jQuery event doesn’t have dataTransfer
		// field - so use originalEvent
		event.originalEvent.dataTransfer.dropEffect =
		'copy';
	},

	dropHandler: function (event) {
		event.stopPropagation(); event.preventDefault();
		var ev = event.originalEvent;
		// set object attribute for use by uploadPicture
		this.pictureFile = ev.dataTransfer.files[0];
		// only process image files
		if (false) {
		// Read image file and display in img tag
		this.imageRead(this.pictureFile, this.pictureFile.type);
		}
		else{
				aurora.utils.showNotice("danger","Invalid file! You can only drag image files!").hideNotice();
		}
	},

	
    // render the View
    render: function () {    		
		this.$el.html(this.template(this.model.toJSON()));
    	return this;    // support method chaining
    }

});


