var app = app || {};

(function () {
	'use strict';
	var Model = app.Model = app.Model || {};
  	 Model.Subtitle = Backbone.Model.extend({
    	defaults: {
      	title : '병원'
    		}
  		});

  var Model = new Model.Subtitle({title : '병원',
														   title : '호텔',
														   title : '식당',
														   title : '관광',
														   title : '쇼핑',
													     title : '전화',
													 	   title : '교통',
												 		   title : '스포츠',
											 			   title : '기타표현' });

})();
