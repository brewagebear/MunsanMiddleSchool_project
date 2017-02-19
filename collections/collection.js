var app = app || {};
(function () {
	'use strict';
	 var collections = app.collection = app.collection || {};
	 collections.VideoLists =  Backbone.Collection.extend({
	   model: app.model
	 });
})();
