/*=================================================================
	TitleView
=================================================================*/


window.TitleView = Backbone.View.extend({
	el : $("#title-container"),
	initialize : function (blog) {
		this.template = _.template($("#title-template").html());
		this.masterBranch = blog.masterBranch;
	},
	render : function () {
        var renderedContent = this.template({masterBranch : this.masterBranch });

        this.$el.html(renderedContent);

        return this;				
	}			
});
