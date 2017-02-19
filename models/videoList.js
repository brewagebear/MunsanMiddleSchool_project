var app = app || {};
(function() {
	'use strict';
	var models = app.model = app.model || {};
	var collections = app.collection = app.collection || {};
	models.Video = Backbone.Model.extend({
		initialize: function(){
			console.log('model create');
		},
		defaults:{
				 id : "1",
				 url : "/assets/videos/call/MOV01718.mp4",
				 imgSrc : "assets/img/call/1_thumbnail.png",
				 title: "call situation conservation"
		}
	});
	collections.VideoLists =  Backbone.Collection.extend({
		model: models.Video
	});
	var lists = new collections.VideoLists([
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
	console.log(lists);
})();
