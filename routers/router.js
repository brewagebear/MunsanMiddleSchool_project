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
            'situation': 'situationRoute',
            'culture': 'cultureRoute',
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
        listRoute: function() {
            var url = Backbone.history.getFragment();
            var view = {};
            var lists = {};
            var target = 'list';
            var createListFlag = 0;
            var categoryNum = 0;
            var categoryName = ['전화', '저녁', '기타표현', '병원', '생생일본어', '쇼핑', '스포츠', '관광', '교통'];
            var urlLength = ['list/1', 'list/2', 'list/3', 'list/4', 'list/5', 'list/6', 'list/7', 'list/8', 'list/9', 'list/10']
            var jsonInfo;

            switch (url) {
              case 'list/1':
               	  createListFlag = 0;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[0];
                  break;
              case 'list/2':
                  createListFlag = 1;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[1];
                  break;
              case 'list/3':
                  createListFlag = 2;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[2];
                  break;
              case 'list/4':
                  createListFlag = 3;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[3];
                  break;
              case 'list/5':
                  createListFlag = 4;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[4];
                  break;
              case 'list/6':
                  createListFlag = 5;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[5];
                  break;
              case 'list/7':
                  createListFlag = 6;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[6];
                  break;
              case 'list/8':
                  createListFlag = 7;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[7];
                  break;
              case 'list/9':
                  createListFlag = 8;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[8];
                  break;
              case 'list/10':
                  createListFlag = 9;
                  categoryNum = createListFlag+1;
                  categoryName = categoryName[9];
                  break;
              default:
                break;
            }

            var generateList = function(flages, categoryName, categoryNum){
              var listArray = new Array();
              var listInfo = new Object();
              var listLength = ['4', '5', '4', '9', '6', '5', '5', '6', '5', '5'];
              var folderName = ['call', 'diner', 'etc', 'hospital', 'livejapanese', 'shopping', 'sport', 'tour', 'traffic'];
              var description = ['회화 인트로 동영상', '회화동영상'];

              listInfo.category = categoryName;
              listInfo.categoryNum = '/#/list/'+categoryNum;

              for (var i = 0; i < listLength[flages]; i++) {
                var k = i+1;
                listInfo.id = k;
                var folderSrc = folderName[flages];
                var videofileName = folderSrc+k+'.mp4';
                var imgfileName = k+'_'+'thumbnail.png';
                listInfo.url = 'assets/videos/'+folderSrc+'/'+videofileName;
                listInfo.imgSrc = 'assets/img/thumbnail/'+folderSrc+'/'+imgfileName;
                  if(i == 0){
                    listInfo.title = categoryName+' '+description[0];
                  } else {
                    listInfo.title = categoryName+' '+description[1]+i;
                  }
                  listArray.push(listInfo);
                  listInfo = new Object();
                }
                jsonInfo = listArray;
                return jsonInfo;
              }

              if(jQuery.inArray(url, urlLength) == -1){
                target = 'videoTotalList';
                lists = new this.lists();
                view = new views.list({collection:lists});
                this.layout.setContent(view, target);
                this.layout.showSpinner(300);
              } else {
                jsonInfo = generateList(createListFlag, categoryName, categoryNum);
                lists = new this.lists();
                lists.add(jsonInfo);
                view = new views.list({collection:lists});
                this.layout.setContent(view, target);
                this.layout.showSpinner(500);
              }
        },
        cultureRoute: function(){
            var target = 'culture';
            var view = new views.Culture();
            this.layout.setContent(view, target);
        },
        livingwordRoute: function(){
          //empty Model, Collection Object created.
          var wordModel = {};
          //Parent and Child Array and Object created.
          var wordData = {};
          var wordList = {};
          var categoryArray = [];
          var categoryInfo = {};
          //Detailed Array
          var cnt = ['8', '12', '9', '7', '8', '6', '11', '10', '10', '8'];
          var category = ['bedroom', 'sink', 'desk', 'blackfast', 'cleaning', 'bathroom', 'livingroom', 'entrance', 'washingmachine'];
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
          //Create Json as tree model.
          var idNum = 1;
          for (var i = 0 ; i < category.length; i++) {
            for (var j = 0; j < cnt[i]; j++) {
              var fileNum = j+1;
              console.log(idNum);
              categoryInfo.audioSrc = "assets/audios/"+category[i]+"/"+category[i]+"_"+fileNum+".mp3";
              categoryInfo.soundId = "sound"+idNum;
              categoryInfo.wordNum = number[fileNum];
              categoryInfo.circleId = "circle"+idNum;
              categoryInfo.blindwordId = "blindword"+idNum;
              categoryInfo.wordtestId = "word_test"+idNum;
              categoryInfo.word = wordContent[i][j];
              categoryArray.push(categoryInfo);
              categoryInfo = {};
              idNum ++;
            }
            wordData[category[i]] = categoryArray;
            categoryArray = [];
          }
            wordList.category = wordData;
             var jsonInfo = JSON.stringify(wordList);
             console.log(jsonInfo);
            var view = new views.Livingword({model:wordList});
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
