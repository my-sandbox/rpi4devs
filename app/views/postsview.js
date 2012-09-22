/*=================================================================
	PostsView
=================================================================*/


window.PostsView = Backbone.View.extend({
	el : $("#posts-container"),
	initialize : function (posts) {
		this.template = _.template($("#posts-template").html());
		this.posts = posts;
	},
	render : function () {

        var renderedContent = this.template({posts : this.posts });

        this.$el.html(renderedContent);

        return this;				
	}			
});
