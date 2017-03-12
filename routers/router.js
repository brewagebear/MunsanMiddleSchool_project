//State the global valueable
var app = app || {};
(function() {
    'use strict';
    //Privite state valueable
    var views = app.view = app.view || {};
    //State app.router
    app.Router = Backbone.Router.extend({
        routes: {
            'list/:id': 'listRoute',
            'culture/:id': 'cultureRoute',
            'situation': 'situationRoute',
            'livingword': 'livingwordRoute',
            //Wildcard is placed lastline.
            '*home': 'homeRoute'
        },
        //router of backbone.js privite function
        _bindRoutes: function() {
          if (!this.routes) return;
          this.routes = _.result(this, 'routes');
          var route, routes = _.keys(this.routes);
          while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
          }
        },
        initialize: function() {
            this.list = app.Model.Video;
            this.word = app.Model.Livingword;
            this.lists = app.Collection.VideoList;
            this.wordDatas = app.Collection.Livingwords;
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
        /*
        For example, i reach the www.example.com/#/list/1 then, running the switch case 1~11
        Default line run only that you enter over 11 param or don't enter the param
        */
        listRoute: function() {
            var url = Backbone.history.getFragment();
            console.log(url);
            var view = {};
            var listData = {};
            var lists = {};
            var target = 'list';

            switch (url) {
            case 'list/1':
             	 listData = [
                 		{
                 		   id : "1",
               		     url : "/assets/videos/hospital/MOV01679.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/1_thumbnail.png",
               		     title: "병원 회화 인트로 동영상"
                 	  },
                    {
                 		   id : "2",
               		     url : "/assets/videos/hospital/MOV01680.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/2_thumbnail.png",
               		     title: "병원 회화동영상 1"
                 	  },
                    {
                 		   id : "3",
               		     url : "/assets/videos/hospital/MOV01681.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/3_thumbnail.png",
               		     title: "병원 회화동영상 2"
                 	  },
                    {
                 		   id : "4",
               		     url : "/assets/videos/hospital/MOV01682.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/4_thumbnail.png",
               		     title: "병원 회화동영상 3"
                 	  },
                    {
                 		   id : "5",
               		     url : "/assets/videos/hospital/MOV01683.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/5_thumbnail.png",
               		     title: "병원 회화동영상 4"
                 	  },
                    {
                 		   id : "6",
               		     url : "/assets/videos/hospital/MOV01684.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/6_thumbnail.png",
               		     title: "병원 회화동영상 5"
                 	  },
                    {
                 		   id : "7",
               		     url : "/assets/videos/hospital/MOV01685.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/7_thumbnail.png",
               		     title: "병원 회화동영상 6"
                 	  },
                    {
                 		   id : "8",
               		     url : "/assets/videos/hospital/MOV01686.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/8_thumbnail.png",
               		     title: "병원 회화동영상 7"
                 	  },
                    {
                 		   id : "9",
               		     url : "/assets/videos/hospital/MOV01687.mp4",
               		     imgSrc : "assets/img/thumbnail/hospital/9_thumbnail.png",
               		     title: "병원 회화동영상 8"
                 	  },
                ];
                lists = new this.lists();
                lists.add(listData);
                view = new views.list({collection:lists});

                break;

            case 'list/2':
              listData = [
                 {
                    id : "1",
                    url : "/assets/videos/hotel/MOV01688.mp4",
                    imgSrc : "assets/img/thumbnail/hotel/1_thumbnail.png",
                    title: "호텔 회화 인트로 동영상"
                 },
                 {
                    id : "2",
                    url : "/assets/videos/hotel/MOV01689.mp4",
                    imgSrc : "assets/img/thumbnail/hotel/2_thumbnail.png",
                    title: "호텔 회화동영상 1"
                 },
                 {
                    id : "3",
                    url : "/assets/videos/hotel/MOV01690.mp4",
                    imgSrc : "assets/img/thumbnail/hotel/2_thumbnail.png",
                    title: "호텔 회화동영상 2"
                 },
                 {
                    id : "4",
                    url : "/assets/videos/hotel/MOV01691.mp4",
                    imgSrc : "assets/img/thumbnail/hotel/2_thumbnail.png",
                    title: "호텔 회화동영상 3"
                 },
                 {
                    id : "5",
                    url : "/assets/videos/hotel/MOV01692.mp4",
                    imgSrc : "assets/img/thumbnail/hotel/2_thumbnail.png",
                    title: "호텔 회화동영상 4"
                 },
                 {
                    id : "6",
                    url : "/assets/videos/hotel/MOV01694.mp4",
                    imgSrc : "assets/img/thumbnail/hotel/2_thumbnail.png",
                    title: "호텔 회화동영상 5"
                 }
               ];
             lists = new this.lists();
             lists.add(listData);
             view = new views.list({collection:lists});
            break;
            case 'list/3':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/diner/MOV01695.mp4",
                  imgSrc : "assets/img/thumbnail/diner/1_thumbnail.png",
                  title: "식당 회화 인트로 동영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/diner/MOV01697.mp4",
                  imgSrc : "assets/img/thumbnail/diner/2_thumbnail.png",
                  title: "식당 회화 동영상"
                },
                {
                  id : "3",
                  url : "/assets/videos/diner/MOV01698.mp4",
                  imgSrc : "assets/img/thumbnail/diner/3_thumbnail.png",
                  title: "식당 회화 동영상 2"
                },
                {
                  id : "4",
                  url : "/assets/videos/diner/MOV01699.mp4",
                  imgSrc : "assets/img/thumbnail/diner/4_thumbnail.png",
                  title: "식당 회화 동영상 3"
                },
                {
                  id : "5",
                  url : "/assets/videos/diner/MOV01700.mp4",
                  imgSrc : "assets/img/thumbnail/diner/5_thumbnail.png",
                  title: "식당 회화 동영상 4"
                }
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/4':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/tour/MOV01701.mp4",
                  imgSrc : "assets/img/thumbnail/tour/1_thumbnail.png",
                  title: "관광 회화 인트로 동영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/tour/MOV01702.mp4",
                  imgSrc : "assets/img/thumbnail/tour/2_thumbnail.png",
                  title: "관광 회화 동영상"
                },
                {
                  id : "3",
                  url : "/assets/videos/tour/MOV01704.mp4",
                  imgSrc : "assets/img/thumbnail/tour/3_thumbnail.png",
                  title: "관광 회화 동영상 2"
                },
                {
                  id : "4",
                  url : "/assets/videos/tour/MOV01705.mp4",
                  imgSrc : "assets/img/thumbnail/tour/4_thumbnail.png",
                  title: "관광 회화 동영상 3"
                },
                {
                  id : "5",
                  url : "/assets/videos/tour/MOV01706.mp4",
                  imgSrc : "assets/img/thumbnail/tour/5_thumbnail.png",
                  title: "관광 회화 동영상 4"
                }
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/5':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/shopping/MOV01707.mp4",
                  imgSrc : "assets/img/thumbnail/shopping/1_thumbnail.png",
                  title: "쇼핑 회화 인트로 동영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/shopping/MOV01708.mp4",
                  imgSrc : "assets/img/thumbnail/shopping/2_thumbnail.png",
                  title: "쇼핑 회화 동영상"
                },
                {
                  id : "3",
                  url : "/assets/videos/shopping/MOV01709.mp4",
                  imgSrc : "assets/img/thumbnail/shopping/3_thumbnail.png",
                  title: "쇼핑 회화 동영상 2"
                },
                {
                  id : "4",
                  url : "/assets/videos/shopping/MOV01710.mp4",
                  imgSrc : "assets/img/thumbnail/shopping/4_thumbnail.png",
                  title: "쇼핑 회화 동영상 3"
                },
                {
                  id : "5",
                  url : "/assets/videos/shopping/MOV01711.mp4",
                  imgSrc : "assets/img/thumbnail/shopping/5_thumbnail.png",
                  title: "쇼핑 회화 동영상 4"
                }
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/6':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/call/MOV01718.mp4",
                  imgSrc : "assets/img/thumbnail/call/1_thumbnail.png",
                  title: "전화 회화 인트로 동영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/call/MOV01722.mp4",
                  imgSrc : "assets/img/thumbnail/call/2_thumbnail.png",
                  title: "전화 회화 동영상"
                },
                {
                  id : "3",
                  url : "/assets/videos/call/MOV01723.mp4",
                  imgSrc : "assets/img/thumbnail/call/3_thumbnail.png",
                  title: "전화 회화 동영상 2"
                },
                {
                  id : "4",
                  url : "/assets/videos/call/MOV01724.mp4",
                  imgSrc : "assets/img/thumbnail/call/4_thumbnail.png",
                  title: "전화 회화 동영상 3"
                },
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/7':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/traffic/MOV01742.mp4",
                  imgSrc : "assets/img/thumbnail/traffic/1_thumbnail.png",
                  title: "교통 회화 인트로 동영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/traffic/MOV01743.mp4",
                  imgSrc : "assets/img/thumbnail/traffic/2_thumbnail.png",
                  title: "교통 회화 동영상"
                },
                {
                  id : "3",
                  url : "/assets/videos/traffic/MOV01743.mp4",
                  imgSrc : "assets/img/thumbnail/traffic/3_thumbnail.png",
                  title: "교통 회화 동영상 2"
                },
                {
                  id : "4",
                  url : "/assets/videos/traffic/MOV01743.mp4",
                  imgSrc : "assets/img/thumbnail/traffic/4_thumbnail.png",
                  title: "교통 회화 동영상 3"
                },
                {
                  id : "5",
                  url : "/assets/videos/traffic/MOV01743.mp4",
                  imgSrc : "assets/img/thumbnail/traffic/5_thumbnail.png",
                  title: "교통 회화 동영상 4"
                }
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/8':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/sport/MOV01712.mp4",
                  imgSrc : "assets/img/thumbnail/sport/1_thumbnail.png",
                  title: "스포츠 회화 인트로 동영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/sport/MOV01713.mp4",
                  imgSrc : "assets/img/thumbnail/sport/2_thumbnail.png",
                  title: "스포츠 회화 동영상"
                },
                {
                  id : "3",
                  url : "/assets/videos/sport/MOV01714.mp4",
                  imgSrc : "assets/img/thumbnail/sport/3_thumbnail.png",
                  title: "스포츠 회화 동영상2"
                },
                {
                  id : "4",
                  url : "/assets/videos/sport/MOV01715.mp4",
                  imgSrc : "assets/img/thumbnail/sport/4_thumbnail.png",
                  title: "스포츠 회화 동영상3"
                },
                {
                  id : "5",
                  url : "/assets/videos/sport/MOV01716.mp4",
                  imgSrc : "assets/img/thumbnail/sport/5_thumbnail.png",
                  title: "스포츠 회화 동영상4"
                },
                {
                  id : "6",
                  url : "/assets/videos/sport/MOV01717.mp4",
                  imgSrc : "assets/img/thumbnail/sport/6_thumbnail.png",
                  title: "스포츠 회화 동영상5"
                }
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/9':
              listData = [
                {
                  id : "1",
                  url : "/assets/videos/etc/MOV01725.mp4",
                  imgSrc : "assets/img/thumbnail/etc/1_thumbnail.png",
                  title: "기타 회화 표현 인트로 영상"
                },
                {
                  id : "2",
                  url : "/assets/videos/etc/MOV01726.mp4",
                  imgSrc : "assets/img/thumbnail/etc/2_thumbnail.png",
                  title: "기타 회화 표현"
                },
                {
                  id : "3",
                  url : "/assets/videos/etc/MOV01727.mp4",
                  imgSrc : "assets/img/thumbnail/etc/2_thumbnail.png",
                  title: "기타 회화 표현 2"
                },
                {
                  id : "4",
                  url : "/assets/videos/etc/MOV01729.mp4",
                  imgSrc : "assets/img/thumbnail/etc/2_thumbnail.png",
                  title: "기타 회화 표현 3"
                }
              ];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            case 'list/10':
              listData = [];
              lists = new this.lists();
              lists.add(listData);
              view = new views.list({collection:lists});
            break;
            default:
            }
            this.layout.setContent(view, target);
            this.layout.showSpinner(500);
        },
        cultureRoute: function(){
            var url = Backbone.history.getFragment();
            var view = {};
            var target = '';
            switch (url) {
              case 'culture/1':
                view = new views.Culture();
                target = '1';
                this.layout.setContent(view, target, url);
                break;
              default:
            }
        },
        livingwordRoute: function(){
          //empty Model, Collection Object created.
          var wordModel = {};
          var wordCollection = [];
          //Parent and Child Array and Object created.
          var wordData = new Object();
          var temp = new Object();
          var categoryArray = new Array();
          var categoryInfo = new Object();

          //Detailed Array
          var cnt = ['8', '12', '9', '7', '8', '6', '11', '10', '10', '8'];
          var category = ['bedroom', 'sink', 'desk', 'blackfast', 'cleaning', 'bathroom', 'livingroom', 'entrance', 'invitation', 'washingmachine'];
          var number = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦',  '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭','⑮'];
          var wordContent = [
            [
              'スタンド',
              'めざましいどけい',
              'めがね',
              'けいたい',
              'シーツ',
              'ねこ',
              'ねまき',
              'まくら',
              'ベット'
            ],
            [
              'かがみ',
              'でんとうはブラシ',
              'ティッシュ',
              'せっけん',
              'はブラシたて',
              'じゃぐち',
              'みず',
              'スリッパ',
              'はみがきこ',
              'はブラシ',
              'タオル',
              'タオルかけ',
              'かみそり'
            ],
            [
              'じしょ',
              'つくえ',
              'ふでばこ',
              'いす',
              'ボールペン',
              'えんぴつ',
              'けしゴム',
              'ノート',
              'ほんだな',
              'ほん'
            ],
            [
              'マグカップ',
            　'ミルク',
            　'シリアル',
            　'しょくたく',
            　'ジャム',
            　'コーヒー',
            　'コーヒーメーカ',
            　'トースト'
            ],
            [
              'モップ',
              'バケツ',
              'ほこり',
              'ぞうきん',
              'ほうき',
              'ちりとり',
              'ゴミバコ',
              'そうじき',
              'ゴミぶくろ',
            ],
            [
              'シャワーキ',
              'キャップ',
              'ゆぶね',
              'バスタオル',
              'カーテン',
              'リンス',
              'シャーンプ'
            ],
            [
              'かべ',
              'まど',
              'カーテン',
              'ビデオ',
              'ソファ',
              'テーブル',
              'かびん',
              'せんぶうき',
              'コンセント',
              'ドア',
              'クッション',
              'エアコン',
            ],
            [
              'ながぶつ',
              'おりたたみかさ',
              'くつ',
              'くつべら',
              'ブーツ',
              'スニーカー',
              'サンダル',
              'かさだて',
              'かさ',
              'オートロック',
              'げんかんのドア'
            ],
            [
              'ふうせん',
              'コーラ',
              'アイスクリーム',
              'カード',
              'あめ',
              'さけ',
              'ケーキ',
              'ビール',
              'リボン',
              'プレゼント',
              'ろうそく'
            ],
            [
              'せんたくき',
              'しみ',
              'ゴムてぶくろ',
              'せんたくかご',
              'せんざい',
              'じゅうなんざい',
              'れいすい',
              'ぬるまゆ',
              'おゆ'
            ],
          ];
          //Created Model and Collection.
          wordModel = new this.word();
          wordCollection = new this.wordDatas();

          //Create Json as tree model.
          for (var i = 0 ; i < category.length; i++) {
            for (var j = 0; j < cnt[i]; j++) {
              var k = j+1;
              categoryInfo.audioSrc = "assets/audios/"+category[i]+"/"+category[i]+"_"+k+".mp3";
              categoryInfo.soundId = "sound"+k;
              categoryInfo.wordNum = number[k];
              categoryInfo.circleId = "circle"+k;
              categoryInfo.blindwordId = "blindword"+k;
              categoryInfo.wordtestId = "word_test"+k;
              categoryInfo.word = wordContent[i][j];
              categoryArray.push(categoryInfo);
              categoryInfo = new Object();
            }
            wordData[category[i]] = categoryArray;
            categoryArray = new Array();
          }
            wordCollection.add(wordData);
            var view = new views.Livingword({collection:wordCollection});
            var target = 'livingword';

            this.layout.setContent(view, target);
            this.layout.showSpinner(2500);
        }
      });
      //Create the constructor
      var router = new app.Router();
      //app start
      Backbone.history.start();
})();
