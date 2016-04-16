window.ContactView = Backbone.View.extend({

  initialize: function() {
    console.log('Initializing Contact View');
    //        this.template = templates['Contact'];
  },

  events: {
    "click #sendContactBtn": "sendContactBtnClick"
  },

  render: function() {

    

    $(this.el).html(this.template());
    return this;
  },
  sendContactBtnClick: function(evt) {



    evt.preventDefault();
    var tmp = $(this.el);
    // console.log(tmp.find("#contactForm")[0]);
    var data = JSON.stringify({
      'action': 'contact',
      'replyTo': "'" + tmp.find("#name")[0].value + "'" + " <" + tmp.find("#email")[0].value + ">",
      'subject': tmp.find("#subject")[0].value,
      'text': tmp.find("#message")[0].value,
      'html': tmp.find("#message")[0].value,
      'g-recaptcha-response': tmp.find('#g-recaptcha-response')[0].value,
    })

    // console.log(evt)

    console.log(data);
    $.ajax({
      type: "POST",
      url: '/',
      dataType: 'json',
      contentType: 'application/json',
      processData: true,
      data: data,
      complete: function() {
        console.log("complete");
      },
      success: function(data) {
        console.log("success!");
        console.log(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

});
