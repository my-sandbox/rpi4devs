/*=================================================================
	HeaderView
=================================================================*/


window.HeaderView = Backbone.View.extend({
	el : $("#header-container"),
	initialize : function (blog) {
		this.template = _.template($("#header-template").html());
		this.blog = blog;
	},
	render : function () {
        var renderedContent = this.template({blog : this.blog });

        this.$el.html(renderedContent);

        return this;				
	}			
});
