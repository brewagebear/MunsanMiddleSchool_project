var app = app || {};
(function() {
    'use strict';
    var views = app.view = app.view || {};
    app.Router = Backbone.Router.extend({
        routes: {
            'list/:id': 'listRoute',
            'situation': 'situationRoute',
            'culture': 'cultureRoute',
            'level': 'livingwordsRoute',
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
            var target = 'home';
            this.layout.setContent(view, target);
        },
        situationRoute: function() {
            var view = new views.Situation();
            var target = 'situation';
            this.layout.setContent(view, target);
        },
        listRoute: function(id) {
            switch (id) {
              case 1:
                var list = new app.collection([
                    {
                      id : "1",
                      url : "/assets/videos/call/MOV01718.mp4",
                      imgSrc : "assets/img/call/1_thumbnail.png",
                      title: "call situation conservation"
                    },
                    {
                      id : "2",
                      url : "/assets/videos/call/MOV01722.mp4",
                      imgSrc : "assets/img/call/2_thumbnail.png",
                      title: "call situation conservation"
                    }
                  ]);
                break;
              default:
              var list = new app.collection([
                  {
                    id : "1",
                    url : "/assets/videos/call/MOV01718.mp4",
                    imgSrc : "assets/img/call/1_thumbnail.png",
                    title: "call situation conservation"
                  },
                  {
                    id : "2",
                    url : "/assets/videos/call/MOV01722.mp4",
                    imgSrc : "assets/img/call/2_thumbnail.png",
                    title: "call situation conservation"
                  }
                ]);
            }
            var view = new views.list();
            var target = 'list';
            this.layout.setContent(view, target);
        },
        cultureRoute: function(){
            var view = new views.Culture();
            var target = 'culture';
            this.layout.setContent(view, target);
        },
        livingwordsRoute: function(){
            var view = new views.Level();
            var target = 'livingwords';
            this.layout.setContent(view, target);
        }
      });
      var router = new app.Router();
      Backbone.history.start();
})();
