var app = app || {};

(function () {
	'use strict';
  //*localstorage에 저장되는 콜렉션
	var Collection = app.Collection = app.Collection || {};
  		Collection.a = Backbone.Collection.extend({
				model : app.Model
  		});
      // Collection.b =  Backbone.Collection.extend({
      //   model: app.Model
      // });
			// Collection.c =  Backbone.Collection.extend({
			//   model: app.Model
			// });
			var Collection = new Collection.a();
			//var Collection = new Collection.b();
			//var Collection = new Collection.c();
			Collection.add([app.Model]);
			console.log(Collection);
})();
