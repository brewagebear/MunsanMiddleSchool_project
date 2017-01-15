var app = app || {};
(function() {
    'use strict';
    var views = app.view = app.view || {};

    app.Router = Backbone.Router.extend({
        initialize: function(){
          //this.bind("all", this.change)
          //console.log(this.change);
        },
        routes: {
            'situation': 'situationRoute',
            'video': 'videoRoute',
            'culture': 'cultureRoute',
            //와일드카드 디폴트 라우터는 맨 마지막에 삽입.
            '*home': 'homeRoute'
        },
        _bindRoutes: function() {
          if (!this.routes) return;
          this.routes = _.result(this, 'routes');
          var route, routes = _.keys(this.routes);
          while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
          }
        },
        initialize: function() {
            // create the layout once here
            this.layout = new views.Application({
                el: 'body',
            });
        },
        homeRoute: function() {
            var view = new views.Home();
            var target = 'Home';
            this.layout.setContent(view, target);
        },
        situationRoute: function() {
            var view = new views.Situation();
            var target = 'Situation';
            this.layout.setContent(view, target);
        },
        videoRoute: function() {
            var view = new views.Video();
            var target = 'Video';
            this.layout.setContent(view, target);
        },
        cultureRoute: function(){
            var view = new views.Culture();
            var target = 'Culture';
            this.layout.setContent(view, target);
        }
      });
      var router = new app.Router();
      Backbone.history.start();
})();
