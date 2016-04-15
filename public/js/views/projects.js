window.ProjectsView = Backbone.View.extend({

    initialize: function () {
        // this.searchResults = new EmployeeCollection();
        // this.searchresultsView = new EmployeeListView({model: this.searchResults, className: 'dropdown-menu'});
    },

    render: function () {
        $(this.el).html(this.template());
        // $('.navbar-search', this.el).append(this.searchresultsView.render().el);
        return this;
    },



});
