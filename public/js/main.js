window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "contact": "contact",
        "projects": "projects",

    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);

        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        $("#content").html(this.homeView.el);
        this.headerView.select('home-menu');
    },


    contact: function () {
        if (!this.contactView) {
            this.contactView = new ContactView();
            this.contactView.render();
        }
        $('#content').html(this.contactView.el);
        this.headerView.select('contact-menu');
    },
    projects: function () {
        if (!this.projectsView) {
            this.projectsView = new ProjectsView();
            this.projectsView.render();
        }
        $('#content').html(this.projectsView.el);
        this.headerView.select('project-menu');
    },

});

templateLoader.load(["HomeView", "ContactView", "HeaderView", "ProjectsView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });
