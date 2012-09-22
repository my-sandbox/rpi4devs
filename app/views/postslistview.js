/*=================================================================
	PostsListView
=================================================================*/


window.PostsListView = Backbone.View.extend({
	el : $("#postslist-container"),
	initialize : function (blog) {
		this.template = _.template($("#postslist-template").html());
		this.posts = blog.posts;
	},
	render : function () {

		console.log("from view : ", this.posts);

        var renderedContent = this.template({posts : this.posts.models });

        this.$el.html(renderedContent);

        return this;				
	}			
});
