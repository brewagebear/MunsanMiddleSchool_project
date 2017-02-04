var app = app || {};
(function() {
    'use strict';
    //views linitalize
    var views = app.view = app.view || {};
    views.Application = Backbone.View.extend({
        initialize: function() {
           this.$content = this.$('#main');
            //this.$loading = this.$('#loading');
        },
        setContent: function(view, target) {
            var content = this.content;
            var subUrl = this.target;

            if (content) content.remove();

            content = this.content = view;
            subUrl = this.target = target;

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
            this.$content.html(content.render(tmpl_string).el);
        },
        showSpinner: function() {
          this.$loading.show();
        },
        hideSpinner: function() {
          this.$loading.hide();
        }
    });
    views.Home = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
        return this;
      }
        //how to get return result? in parent object?
    });
    views.Situation = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
        return this;
      }
    });
    views.Video = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
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
    views.Level = Backbone.View.extend({
      render: function(templateName) {
        var template = _.template(templateName);
        this.$el.html(template);
        return this;
      }
    });
})();
