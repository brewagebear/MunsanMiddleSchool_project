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
            'Japcount' : 'countRoute',
            'picword' : 'picwordRoute',
            'katakana' : 'katakanaRoute',
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
                var videofileName = folderSrc+'_'+k+'.mp4';
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
                console.log(jsonInfo);
              }
        },
        cultureRoute: function(){
            /*
             category : culture, attracting, castle, Traditional religion
                attribute : id, title, img, modal_titel, modal_description
            */
            var cultureModel = {};
            var cultureData = {};
            var category = ['traditionalCulture', 'scenicSpot', 'traditionalReligion'];
            var cnt = ['10', '20', '11'];
            var title = [
              [
                '유도',
                '스모',
                '검도',
                '합기도',
                '의복',
                '식생활',
                '다도',
                '꽃꽃이',
                '노,분라쿠',
                '축제'
              ],
              [
                '오사카 성',
                '히메지 성',
                '히코네 성',
                '마츠모토 성',
                '이누야마 성',
                '금각사',
                '은각사',
                '청수사',
                '헤이안 신궁',
                '메이지 신궁',
                '후지산',
                '츠쿠바산',
                '핫코다산',
                '힛코산',
                '초카이산',
                '시라네산',
                '시로우마다케산',
                '아소산',
                '니세코산',
                '아리아케산'
              ],
              [
                '애마',
                '오마모리',
                '오미쿠지',
                '테루테루보우즈',
                '키티부적',
                '칠복신',
                '신사도리',
                '데미즈야',
                '구마데',
                '다루마',
                '마네기네코'
              ]
            ];
            var gridSet = [
              [],
              [
                'grid-item--width2',
                '',
                'grid-item--width2',
                '',
                'grid-item--width2',
                '',
                '',
                'grid-item--width2',
                '',
                'grid-item--width2',
                'grid-item--width2',
                '',
                '',
                '',
                '',
                '',
                'grid-item--width2',
                '',
                '',
                ''
              ],
              [
                'grid-item--width2',
                '',
                'grid-item--width2',
                '',
                'grid-item--width2',
                '',
                '',
                'grid-item--width2',
                'grid-item--height2',
                'grid-item--width2',
                'grid-item--width2',
                '',
                'grid-item--height2',
                '',
                ''
              ]
            ]
            var categoryInfo = {};
            var categoryArray = [];
            var idNum = 1;
            for (var i = 0; i < category.length; i++) {
              for (var j = 0; j < cnt[i]; j++) {
                var fileNum = j+1;
                  categoryInfo.titleNum = idNum;
                  if(i == 0){
                    categoryInfo.imgSrc = "assets/img/culture/"+category[i]+"/"+fileNum+".png";
                  } else {
                    categoryInfo.imgSrc = "assets/img/culture/"+category[i]+"/"+fileNum+".jpg";
                  }
                  categoryInfo.gridClass = gridSet[i][j];
                  categoryInfo.title = title[i][j];
                  categoryArray.push(categoryInfo);
                  categoryInfo = {};
                  idNum ++;
              }
              cultureData[category[i]] = categoryArray;
              categoryArray = [];
            }
            cultureModel.category = cultureData;
            var view = new views.Culture({model:cultureModel});
            var target = 'culture';
            console.log(cultureData);
            this.layout.setContent(view, target);
            this.layout.showSpinner(2500);
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
             var view = new views.Livingword({model:wordList});
             var target = 'livingword';
            this.layout.setContent(view, target);
            this.layout.showSpinner(2500);
        },
        picwordRoute: function(){
            //empty Model, Collection Object created.
            var wordModel = {};
            //Parent and Child Array and Object created.
            var wordData = {};
            var wordList = {};
            var categoryArray = [];
            var categoryInfo = {};
            //Detailed Array
            var cnt = ['12', '12', '12', '12', '12', '12', '6'];
            var category = ['animal', 'fish', 'bird', 'kitchen', 'apparel', 'vegetable', 'insect'];
            var wordContent = [
              [
                'いぬ(개)',
                'ねこ(고양이)',
                'くま(곰)',
                'ぶた(돼지)',
                'うま(말)',
                'うし(소)',
                'とら(호랑이)',
                'きつね(여우)',
                'さる(원숭이)',
                'うさぎ(토끼)',
                'ぞう(코끼리)',
                'かめ(거북이)'
              ],
              [
                'かに(꽃게)',
                'まぐろ(참치)',
                'きんぎょ(금붕어)',
                'たこ(문어)',
                'いか(오징어)',
                'えび(새우)',
                'ひらめ(광어)',
                'さめ(상어)',
                'さけ(연어)',
                'ロブスタ-(랍스타)',
                'こい(잉어)',
                'いわし(정어리)'
              ],
              [
                'にわとり(닭)',
                'すずめ(종달새)',
                'からす(까마귀)',
                'はと(비둘기)',
                'つばめ(제비)',
                'かもめ(기러기)',
                'おうむ(앵무새)',
                'わし(독수리)',
                'だちょう(타조)',
                'はくちょう(백조)',
                'つる(학)'
              ],
              [
                'ちゃわん(그릇)',
                'さら(접시)',
                'やかん(주전자)',
                'フライパン(후라이펜)',
                'ト-スタ-(토스터기)',
                'ガスレンジ(가스렌지)',
                'ほうちょう(칼)',
                'せんざい(세제)',
                'おたま(국자)',
                'じゃぐち(수도꼭지)',
                'ながしだい(싱크대)',
                'れいぞうこ(냉장고)'
              ],
              [
                'シャツ(셔츠)',
                'ブラウス(브라우스)',
                'ジャケット(자켓)',
                'スカ-ト(스커트)',
                'ズボン(바지)',
                'はんズボン(반바지)',
                'マフラ-(목도리)',
                'ネクタイ(넥타이)',
                'くつ(구두)',
                'くつした(양말)',
                'ハンカチ(수건)',
                'てぶくろ(장갑)'
              ],
              [
                'じゃがいも(감자)',
                'にんじん(당근)',
                'だいこん(무우)',
                'しいたけ(버섯)',
                'にんにく(양파)',
                'ピ-マン(피망)',
                'たまねぎ (다마네기)',
                'きゅうり(오이)',
                'まめ(콩)',
                'ほうれんそう(시금치)',
                'トマト(토마토)',
                'かぼちゃ(호박)'
              ],
              [
                'あり(개미)',
                'くも(거미)',
                'とんぼ(잠자리)',
                'てんとうむし(딱정벌레)',
                'はち(벌)',
                'ばった(메뚜기)'
              ]
            ];
            //Created Model and Collection.
            wordModel = new this.word();
            //Create Json as tree model.
            var idNum = 1;
            for (var i = 0 ; i < category.length; i++) {
              for (var j = 0; j < cnt[i]; j++) {
                var fileNum = j+1;
                categoryInfo.audioSrc = "assets/audios/"+category[i]+"/"+category[i]+fileNum+".mp3";
                categoryInfo.imgSrc = "assets/img/picword/"+category[i]+"/"+category[i]+fileNum+".png";
                categoryInfo.soundId = "sound"+idNum;
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
               var view = new views.Picword({model:wordList});
               var target = 'picword';
              this.layout.setContent(view, target);
              this.layout.showSpinner(2500);
          }
      });
      //Create the constructor
      var router = new app.Router();
      //app start
      Backbone.history.start();
})();
