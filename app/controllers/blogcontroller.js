/*=================================================================
	BlogController
=================================================================*/

window.BlogController = Backbone.Controller.extend({},{

	displayHeader : function () {
		document.title = blog.masterBranch.repositoryName;
		window.headerView = new HeaderView(blog);
		headerView.render();
	},
	displayTitle : function () {
		window.titleView = new TitleView(blog);
		titleView.render();
	},

	displayPosts : function (start, end, disqus_id) {

		blog.posts
			.from(start)
			.to(end)
			.fetch({success: function(postCollection){
				
				window.postsView = new PostsView(postCollection);
				
				postsView.render();


				if(start == end && end == 0) {
					console.log("00--->", postsView.posts[0]);
					//disqus_id = "ID"+postsView.posts[0].get("name").split(".")[0].split("-").join("");
					disqus_id = "ID"+postsView.posts[0].get("sha");
				}


				//$('p:contains("layout: post")').hide();
				//hack to hide header of jekyll post
				$('p:contains("layout: post")').hide().next().hide()

				if(disqus_id) {
					$("#disqus_thread").hide();	
					console.log("RESET : ", disqus_id);
				    DISQUS.reset({
				      reload: true,
				      config: function () {  
				        this.page.identifier = disqus_id;
				      }
				    });
				    $("#disqus_thread").show();					
				} else {
					$("#disqus_thread").hide();					
				}
		

			}});

		
	},

	displayPost : function (post_name) {
		var the_post = blog.posts.find(function(model) {
				return model.get("name") == post_name;
			});
		var idx = the_post.get("index");

		document.title = the_post.get("name");

		//var disqus_id = "ID"+the_post.get("name").split(".")[0].split("-").join("");
		var disqus_id = "ID"+the_post.get("sha");


		BlogController.displayPosts(idx, idx, disqus_id);
	},



	displayPostsList : function () {
		window.postsListView = new PostsListView(blog);
		postsListView.render();
	}
});
