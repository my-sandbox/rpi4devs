/*=================================================================
	Not really a Backbone Model
=================================================================*/


window.JekyllBlog = Backbone.Kind.extend({//instance members
	
	constructor : function (callback_on_instance) {
		var that = this
		   ,repository = new Gh3.Repository(github_repository_name, new Gh3.User(github_user_name))
		   ,_posts;
		async.series([
			//Fetch User
			function (callback) {
				repository.user.fetch(function (err, resUser) {
					if(err) { throw "outch ... when fetching user"; }
					that.user = resUser;
					callback(null, resUser);
				});
			},
			//Fetch Repository
			function (callback) {
				repository.fetch(function (err, resRepository) {
					if(err) { throw "outch ... when fetching repository"; }
					that.repository = resRepository
					callback(null, resRepository);
				});

			},
			function (callback) {//Fetch Branches & set master branch
				repository.fetchBranches(function (err, resBranches) {
					if(err) { throw "outch ... when fetching branches"; }
					that.masterBranch = that.repository.getBranchByName("master");
					callback(null, that.masterBranch);
				});						
			},
			function (callback) {//Fetch contents of master branch & set _posts
				that.masterBranch.fetchContents(function (err, resContents) {
					if(err) { throw "outch ... when fetching contents of master branch"; }
					_posts = that.masterBranch.getDirByName('_posts');
					callback(null, _posts);
				});
			},
			function (callback) {//Create collection of posts
				_posts.fetchContents(function (err, resContents) {
					var index = 0;
					if(err) { throw "outch ... when fetching contents of _posts directory"; }
					
					//resContents.reverseContents();
					
					that.posts = new Posts();
					
					resContents.eachContent(function (content) {
						content.index = index;
						content.previous = index-1;
						content.next = index+1;
						
						index+=1;
						that.posts.add(new Post(content));
						//that.posts.add(tmp_post_model);
					
					});
					callback(null, that.posts);
				});
			}
		],
	
		function(err, results){ //do something ...
			//console.log(results);

			that.posts.each(function(model) {
				var current_model = model;
				var next_model = that.posts.find(function(tmp_model){
					return tmp_model.get("index") == current_model.get("next");
				});

				var previous_model= that.posts.find(function(tmp_model){
					return tmp_model.get("index") == current_model.get("previous");
				});

				if (next_model) {
					current_model.set("next_post_name", next_model.get("name"))
				}

				if (previous_model) {
					current_model.set("previous_post_name", previous_model.get("name"))
				}
				

			});

			callback_on_instance();

	
		});
	}
	
}, {//class members
	
});