/*=================================================================
	Router
=================================================================*/
window.RoutesManager = Backbone.Router.extend({
	routes : {
		"last5" : "getLastFivePosts",
		"!post/:post_name" : "getPost",
		"*path" : "root"
	},

	before : function () {
		if(!window.headerView) {
			BlogController.displayHeader();
			BlogController.displayPostsList();
			BlogController.displayTitle();			
		}
	},

	root : function () { 
		this.before();
		BlogController.displayPosts(0,0);
	},

	getPost : function(post_name) {
		this.before();
		BlogController.displayPost(post_name);
	},

	getLastFivePosts : function() {
		this.before();
		BlogController.displayPosts(0, 4);
	}
});