var app = app || {};
(function() {
    'use strict';
    //views linitalize
    var views = app.view = app.view || {};
    views.Application = Backbone.View.extend({
        initialize: function() {
           this.$content = this.$('#main');
        },
        setContent: function() {
           var paramCount = arguments;
           switch (paramCount.length) {
             case 2:
               var content = this.content;
               var pageSelect = this.target;

               if (content) content.remove();

               content = this.content = paramCount[0];
               pageSelect = this.target = paramCount[1];

               var templateName = pageSelect;
               var tmpl_dir = '../assets/static';
               var tmpl_url = tmpl_dir + '/' + templateName + '.html';
               var tmpl_string = '';

               $.ajax({
                   url: tmpl_url,
                   method: 'GET',
                   async: false,
                   dataType : 'html',
                   success: function (data) {
                       tmpl_string = data;
                   }
               });
               console.log('Name :'+ templateName + ' tmpl_dir :' + tmpl_dir + ' tmpl_url :' +tmpl_url);
               this.$content.html(content.render(tmpl_string).el);
             break;
             case 3:
               var content = this.content;
               var pageSelect = this.target;
               var subUrl = this.url;

               if (content) content.remove();

               content = this.content = paramCount[0];
               pageSelect  = this.target = paramCount[1];
               subUrl = this.url = paramCount[2];

               var templateName = subUrl;
               var tmpl_dir = '../assets/static';
               var tmpl_url = tmpl_dir + '/' + templateName + '.html';
               var tmpl_string = '';

               $.ajax({
                   url: tmpl_url,
                   method: 'GET',
                   async: false,
                   dataType : 'html',
                   success: function (data) {
                       tmpl_string = data;
                   }
               });
               console.log('Name :'+ templateName + ' tmpl_dir :' + tmpl_dir + ' tmpl_url :' +tmpl_url);
               this.$content.html(content.render(tmpl_string).el);
             break;
           }//switch ~ case end.
        },
        showSpinner: function(time){
            $('.loading').show(0).delay(time).hide(0);
        }
    });
    views.Home = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
        return this;
      }
    });
    views.Situation = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
        return this;
      }
    });
    views.list = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template({result : this.collection.models}));
        _.each(this.collection.models, function(model){
          console.log(model.get("id"));
        });
        return this;
      }
    });
    views.Culture = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
        return this;
      }
    });
    views.Livingword = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        _.each(this.collection.models, function(model){
          for(var i in model.attributes){
            if (model.attributes.hasOwnProperty(i)){
              console.log(model.attributes[i]);
            }
          }
        });
        this.$el.html(template({result : this.collection.model}));
        return this;
      }
    });
})();
