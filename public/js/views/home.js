window.HomeView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Home View');

    },

    events:{

    },

    render:function () {
      // console.log("Rendering Home");
        $(this.el).html(this.template());
        var tmp = $(this.el);
        // console.log(tmp.find("#instantQuotePrice"));
        // setTimeout(function(){console.log($("#instantQuotePrice"))}, 500);

        return this;
    },

    

});
