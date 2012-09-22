/*=================================================================
	Models and Collections
=================================================================*/

//Post
//blog.posts.models[0].fetch({success: function(m) { console.log("m : ",m) }})
window.Post = Backbone.Model.extend({
	idAttribute : "_id",
	fetch : function(options) {
		/*
		Accepts success and error callbacks in the options hash, which are passed (model, response) as arguments.
		*/
		var that = this;
		if(!this.id) {
			//console.log("first");
			this.attributes.fetchContent(function (err, res) {
				if(err) {  options.error(err); }
				that.set("_id",that.get("name"));

				that.attributes.fetchCommits(function (err, res) {
					if(err) { throw "outch ..." }
					options.success(that);
				});

				
			});				
		} else {
			//console.log("not first");
			options.success(this);
		}
	
	}

}); //End of window.Post

//blog.posts.fetch({success: function(res){ console.log(res) }})
//blog.posts.from(0).to(5).fetch({success: function(res){ console.log(res) }})
window.Posts = Backbone.Collection.extend({
	model : Post,
	
	from : function (idx) {
		this.from_index = idx;
		return this;
	},

	to : function (idx) {
		this.to_index = idx;
		return this;
	},


	backgroundFetch : function (options) {
		var arrOfFunctions = []
		,	that = this;

		_.each(this.models, function(model) {
			//console.log(model);
			arrOfFunctions.push(function (callback) {
				model.fetch({
					success : function() { 
						console.log("---> ", model.get("index"), model.get("name"));
						callback(null, model.get("sha")); 
					}
				});
			});

		});
		async.series(arrOfFunctions, function(err, results){ //do something ...
		      options.success(that);
		});
	},

	//to : query pour fetch
	fetch : function(options) {
		/*
			The options hash takes success and error callbacks which will be passed (collection, response) as arguments
		*/
		var arrOfFunctions = []
		,	that = this
		,	what;

		if(this.from_index != undefined && this.to_index != undefined) {
			//console.log("some models");
			what = this.filter(function(model) { return (model.get("index") >= that.from_index && model.get("index") <= that.to_index);  });
			this.from_index = undefined;
			this.to_index != undefined;
		} else {
			//console.log("all models");
			what = this.models;
		}

		_.each(what, function(model) {
			//console.log(model);
			arrOfFunctions.push(function (callback) {
				model.fetch({
					success : function() { 
						console.log(model.get("name"));
						callback(null, model.get("sha")); 
					}
				});
			});

		});
		async.series(arrOfFunctions, function(err, results){ //do something ...
		      //console.log(results, what);
		      options.success(what);
		});

	}	
});

/* Je ne surcharge pas Backbone.sync au cas où on veuille l'utiliser pour autre chose */