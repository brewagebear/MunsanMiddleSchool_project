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
            'count' : 'countRoute',
            'picword' : 'picwordRoute',
            'katakana' : 'katakanaRoute',
            'test/:id' : 'testRoute',
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
        listRoute: function() {
          var url = Backbone.history.getFragment();
          var view = {};
          var lists = {};
          var target = 'list';
          var createListFlag = 0;
          var categoryNum = 0;
          var categoryName = ['전화', '저녁', '기타표현', '병원', '생생일본어', '쇼핑', '스포츠', '관광', '교통', '학생실습'];
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
                categoryName = categoryName[5];
                break;
            case 'list/6':
                createListFlag = 5;
                categoryNum = createListFlag+1;
                categoryName = categoryName[6];
                break;
            case 'list/7':
                createListFlag = 6;
                categoryNum = createListFlag+1;
                categoryName = categoryName[7];
                break;
            case 'list/8':
                createListFlag = 7;
                categoryNum = createListFlag+1;
                categoryName = categoryName[8];
                break;
            case 'list/9':
                createListFlag = 8;
                categoryNum = createListFlag+1;
                categoryName = categoryName[9];
                break;
            default:
              break;
          }

          var generateList = function(flages, categoryName, categoryNum){
            var listArray = new Array();
            var listInfo = new Object();
            var listLength = ['4', '5', '4', '9', '5', '5', '6', '5', '7'];
            var folderName = ['call', 'diner', 'etc', 'hospital', 'shopping', 'sport', 'tour', 'traffic', 'main'];
            var description = ['회화 인트로 동영상', '회화동영상'];

            listInfo.category = categoryName;
            listInfo.categoryNum = '/#/list/'+categoryNum;

            for (var i = 0; i < listLength[flages]; i++) {
              var k = i+1;
              listInfo.id = k;
              var folderSrc = folderName[flages];
              var videofileName = '';
              var imgfileName = '';

              if(folderSrc == 'main'){
                  var mainVideoThumbName = ['clinic', 'hotel', 'restaurant', 'shopping', 'sport', 'telephone', 'tour', 'traffic'];
                  videofileName = mainVideoThumbName[k]+'.mp4';
                  imgfileName = 'thumbnail'+'_'+mainVideoThumbName[k]+'.png';
                  listInfo.imgSrc = 'assets/img/main_cover/'+imgfileName;
                  listInfo.url = 'assets/videos/main/'+videofileName;
              } else {
                  videofileName = folderSrc+'_'+k+'.mp4';
                  imgfileName = k+'_'+'thumbnail.png';
                  listInfo.imgSrc = 'assets/img/thumbnail/'+folderSrc+'/'+imgfileName;
                  listInfo.url = 'assets/videos/'+folderSrc+'/'+videofileName;
              }
              if(folderSrc == "main"){
                  var titleNum = i+1;
                  listInfo.title = categoryName+' '+description[1]+titleNum;
              } else if(i == 0){
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

            if(jQuery.inArray(url, urlLength) == -1 || jQuery.inArray(url, urlLength) < 0){
              target = 'videoTotalList';
              lists = new this.lists();
              view = new views.list({collection:lists});
              this.layout.setContent(view, target);
              this.layout.showSpinner(300);
            } else if (jQuery.inArray(url, urlLength) == 8){
              jsonInfo = generateList(createListFlag, categoryName, categoryNum);
              lists = new this.lists();
              lists.add(jsonInfo);
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
            /*
             category : culture, attracting, castle, Traditional religion
                attribute : id, title, img, modal_titel, modal_description
            */
            var cultureModel = {};
            var cultureData = {};
            var category = ['traditionalCulture', 'scenicSpot', 'traditionalReligion'];
            var cnt = ['9', '20', '11'];
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
              [
                'grid-item--height3',
                'grid-item--height2',
                'grid-item--height2',
                'grid-item--height3',
                'grid-item--height2'
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
          var cnt = ['8', '12', '9', '7', '8', '7', '11', '10', '11', '9'];
          var category = ['bedroom', 'sink', 'desk', 'blackfast', 'cleaning', 'bathroom', 'livingroom', 'entrance', 'invitation', 'washingmachine'];
          var number = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦',  '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭','⑮'];
          var wordContent = [
            [ //bedroom
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
            [ //sink
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
            [ //desk
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
            [ //blackfast
              'マグカップ',
            　'ミルク',
            　'シリアル',
            　'しょくたく',
            　'ジャム',
            　'コーヒー',
            　'コーヒーメーカ',
            　'トースト'
            ],
            [ //cleaning
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
            [ //bathroom
              'シャワーキ',
              'キャップ',
              'ゆぶね',
              'バスタオル',
              'カーテン',
              'リンス',
              'シャーンプ'
            ],
            [ //livingroom
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
            [ //entrance
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
            [ //invitation
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
            [ //washingmachine
              'せんたくき',
  　          'しみ',
              'ゴムてぶくろ',
  　          'せんたくかご',
  　          'せんざい',
  　          'じゅうなんざい',
  　          'れいすい',
              'ぬるまゆ',
  　          'おゆ'
            ]
          ];
          //Created Model and Collection.
          wordModel = new this.word();
          //Create Json as tree model.
          var idNum = 1;
          for (var i = 0 ; i < category.length; i++) {
            for (var j = 0; j < cnt[i]; j++) {
              var fileNum = j+1;
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
            this.layout.showSpinner(1500);
            this.layout.resetSoundManager();
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
                'ペンギン(펭귄)',
                'わし(독수리)',
                'だちょう(타조)',
                'はくちょう(백조)',
                'つる(학)',
                'おうむ(앵무새)'
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
                'てぶくろ(장갑)',
                'ハンカチ(수건)'
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
              this.layout.showSpinner(1500);
              this.layout.resetSoundManager();
          },
        katakanaRoute: function(){
          //empty Model, Collection Object created.
          var wordModel = {};
          //Parent and Child Array and Object created.
          var wordData = {};
          var wordList = {};
          var categoryArray = [];
          var categoryInfo = {};
          //Detailed Array
          var cnt = ['12', '12', '12', '6'];
          var category = ['fruit', 'sport', 'food', 'transportation'];
          var wordContent = [
            [
              'イチゴ(딸기)',
              'メロン(메론)',
              'バナナ(바나나)',
              'ナシ(배)',
              'スイカ(수박)',
              'リンゴ(사과)',
              'マクワウリ(참외)',
              'カキ(감)',
              'ピ-チ(복숭아)',
              'パイナップル(파인애플)',
              'ブドウ (포도)',
              'トマト(토마토)'
            ],
            [
              'ヤキュウ(야구)',
              'ラグビ-(럭비)',
              'ハンドボ-ル(핸드볼)',
              'ピンポン(탁구)',
              'ケンドウ(검도)',
              'アイキドウ(합기도)',
              'バスケットボ-ル(농구)',
              'バレ-ボ-ル (배구)',
              'バドミントン(배드민턴)',
              'ボクシング(복싱)',
              'スキ- (스키)',
              'フットボ-ル(축구)'
            ],
            [
              'ウドン(우동)',
              'ショウユラ-メン(간장라면)',
              'カラベン(캐릭터도시락)',
              'ソバ (메밀국수)',
              'ミソシル(된장라면)',
              'タイカレ-(카레)',
              'ドンカチュラ-メン(돈까스라면)',
              'ミソラ-メン(된장라면)',
              'ドンカチュ(돈까스)',
              'キンパプ(김밥)',
              'ハンバ-ガ-(햄버거)',
              'アイスクリ-ム (아이스크림)'
            ],
            [
              'シンカンセン(신칸센)',
              'ヒコウキ(비행기)',
              'チカテツ(지하철)',
              'タクシ-(택시)',
              'トラック(트럭)',
              'バス(버스)'
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
              if(i == 2){
                categoryInfo.imgSrc = "assets/img/katakana/"+category[i]+"/"+category[i]+fileNum+".jpg";
              } else {
                categoryInfo.imgSrc = "assets/img/katakana/"+category[i]+"/"+category[i]+fileNum+".png";
              }
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
             var target = 'katakana';
            this.layout.setContent(view, target);
            this.layout.showSpinner(1500);
            this.layout.resetSoundManager();
        },
        countRoute: function(){
          //empty Model, Collection Object created.
          var wordModel = {};
          //Parent and Child Array and Object created.
          var wordData = {};
          var wordList = {};
          var categoryArray = [];
          var categoryInfo = {};
          //Detailed Array
          var cnt = ['15', '15', '10', '20'];
          var category = ['number_cnt', 'minute_cnt', 'priceAndminute_cnt', 'peopleAnditem_cnt'];
          var divNumber_cntKOR = [
            '200',
            '500',
            '800',
            '2,000',
            '8,000',
            '300',
            '600',
            '900',
            '3,000',
            '10,000',
            '400',
            '700',
            '1,000',
            '6,000',
            '100,000,000'
          ];
          var divNumber_cntJPN = [
            'にひゃく',
            'ごひゃく',
            'はっぴゃく',
            'にせん',
            'はっせん',
            'さんびゃく',
            'ろっびゃく',
            'きゅうひゃく',
            'さんぜん',
            'いちまん',
            'よんひゃく',
            'ななひゃく',
            'せん',
            'ろくせん',
            'いちおく'
          ];
          var showKor = [
            [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '14',
              '17',
              '19',
              '20',
              '100',
            ],
            [
              '1분',
              '2분',
              '3분',
              '4분',
              '5분',
              '6분',
              '7분',
              '8분',
              '9분',
              '10분',
              '11분',
              '12분',
              '15분',
              '20분',
              '30분'
            ],
            [
              '350￥',
              '260￥',
              '420￥',
              '120￥',
              '150￥',
              '2시 15분',
              '4시 50분',
              '7시 10분',
              '10시 24분',
              '10시 30분'
            ],
            [
              '하나',
              '둘',
              '셋',
              '넷',
              '다섯',
              '여섯',
              '일곱',
              '여덟',
              '아홉',
              '열',
              '1명',
              '2명',
              '3명',
              '4명',
              '5명',
              '6명',
              '7명',
              '8명',
              '9명',
              '10명'
            ]
          ];
          var showJpn = [
            [
              'いち',
              'に',
              'さん',
              'し/よん',
              'ご',
              'ろく',
              'しち/なな',
              'はち',
              'きゅう/く',
              'じゅう',
              'じゅうよん',
              'じゅうなな/しち',
              'じゅうきゅう',
              'にじゅう',
              'ひゃく',
            ],
            [
              'いっぷん',
              'にふん',
              'さんぷん',
              'よんぷん',
              'ごふん',
              'ろっぷん',
              'ななふん',
              'はっぷん',
              'きゅうふん',
              'じゅっぷん',
              'じゅういっぷん',
              'じゅうにふん',
              'じゅうごふん',
              'にじゅっぷん',
              'さんじゅっぷん'
            ],
            [
              'さんびゃくごじゅうえん',
              'にひゃくろくじゅうえん',
              'よんひゃくにじゃうえん',
              'ひゃくにじゅうえん',
              'びゃくごじゅえん',
                '2시 15분',
              '4시 50분',
              '7시 10분',
              '10시 24분',
              '10시 30분'
            ],
            [
              'ひとり',
              'ふたり',
              'さんにん',
              'よにん',
              'ごにん',
              'ろくにん',
              'ななにん',
              'はちにん',
              'きゅうにん',
              'じゅうにん',
              'ひとつ',
              'ふたつ',
              'みっつ',
              'よっつ',
              'いつつ',
              'むっつ',
              'ななつ',
              'やっつ',
              'ここのつ',
              'やっつ',
              'ここのつ',
              'とお'
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
              categoryInfo.imgSrc = "assets/img/count/"+category[i]+"/"+category[i]+fileNum+".png";
              categoryInfo.soundId = "sound"+idNum;
              categoryInfo.circleId = "circle"+idNum;
              categoryInfo.blindwordId = "blindword"+idNum;
              categoryInfo.wordtestId = "word_test"+idNum;
              if(i == 0) {
                categoryInfo.kor = showKor[i][j];
                categoryInfo.jpn = showJpn[i][j];
                categoryInfo.kor2 = divNumber_cntKOR[j];
                categoryInfo.jpn2 = divNumber_cntJPN[j];
                categoryArray.push(categoryInfo);
              } else {
                categoryInfo.kor = showKor[i][j];
                categoryInfo.jpn = showJpn[i][j];
                categoryArray.push(categoryInfo);
              }
              categoryInfo = {};
              idNum ++;
            }
            wordData[category[i]] = categoryArray;
            categoryArray = [];
          }
            wordList.category = wordData;
            console.log(wordList);
             var view = new views.Picword({model:wordList});
             var target = 'count';
            this.layout.setContent(view, target);
            this.layout.showSpinner(1500);
            this.layout.resetSoundManager();
        },
        testRoute: function(){
          var url = Backbone.history.getFragment();
          var view = {};
          var lists = {};
          var flag = 0;
          var urlLength = ['test/1', 'test/2'];
          var target = 'finaltest';
          var matterCollection = {};
          var wordList = {};
          switch (url) {
            case 'test/1':
                flag = 1;
              break;
            case 'test/2':
                flag = 2;
              break;
            default:
                flag = 3;
              break;
          }

          var isEmpty = function(value){
            if( value == "" ||
                value == null ||
                value == undefined ||
                ( value != null && typeof value == "object" && !Object.keys(value).length)){
                return true
                } else {
                return false
              }
          }

          var createFinaltestView = function(flag){
            var listArray = {};
            var listTemp = [];
            var listInfo = {};
            var testTitle = [
              ['확인학습'],
              ['형성평가']
            ];
            var testBlindDescription = [
              [
                '1. はじめまして｡イユリです｡',
                '2. わたしは のだ めぐみです。',
                '3. こちらこそ｡よろしくおねがいします｡'
              ],
              [
                '4. わたしは かいしゃいんです。',
                '5. あなたは がくせいですか。',
                '6. いしださんは モデルですか。'
              ],
              [
                '7. これはりんきょうですか。',
                '8. わたししのテジカメでは ありません。',
                '9. あれはひこうきです。'
              ],
              [
                '10. ともだちのよしのです。',
                '11. この しゃしんのひとは だれですか。'
              ],
              [
                '12. ささきさん､うちは どこですか｡',
                '13. シンチョンです。'
              ],
              [
                '14. はこの なかに なにが ありますか。',
                '15. なにも ありません。'
              ],
              [
                '16. このビールは つめたくないです｡',
                '17. へやは せまくてくらいです｡'
              ],
              [
                '18. かのじょは きれいな ひとです｡',
                '19. かれは まじめでは ありません｡',
                '20. あそこはとてもまじめなレストランです。'
              ],
              [
                '21. ドアを あけますか｡',
                '22. あさごはんを たべます｡',
                '23. よる はやく ねません｡'
              ],
              [
                '24. かんこくごを おしえます｡',
                '25. かいしゃの まえで バスを おりますか｡',
              ]
            ];
            var testShowAnswer = [
              [
                '1. 처음 뵙겠습니다. 이유리입니다.',
                '2. 저는 노다 메구미 입니다.',
                '3. 이쪽이야말로 잘 부탁드립니다. '
              ],
              [
                '4. 저는 회사원입니다.',
                '5. 당신은 학생입니까?',
                '6. 이시다는 모델입니까?'
              ],
              [
                '7. 이것은 인형입니까?.',
                '8. 제 디카가 아니에요.',
                '9. 저것은 비행기입니다.'
              ],
              [
                '10. 친구인 요시노입니다.',
                '11. 이 사진에 있는 사람은 누구입니까?'
              ],
              [
                '12. 사사키씨 집은 어디입니까?',
                '13. 신촌입니다.'
              ],
              [
                '14. 상자 속에 무엇이 있습니까?',
                '15. 아무것도 없습니다.'
              ],
              [
                '16. 이 맥주는 차갑지 않습니다.',
                '17. 방은 좁고 어둡습니다.'
              ],
              [
                '18. 그녀는 예쁜 사람이에요.',
                '19. 그는 성실하지 않습니다.',
                '20. 저곳은 굉장히 유명한 레스토랑이에요.'
              ],
              [
                '21. 문을 열까요?',
                '22. 아침밥을 먹습니다.',
                '23. 밤에 일찍 자지 않아요.'
              ],
              [
                '24. 한국어를 가르칩니다.',
                '25. 회사 앞에서 버스를 내립니까?'
              ]
            ];
            var folderSrc = 'assets/img/test';

              //var imgfileName = k+'_'+'test.png';
              //listInfo.imgSrc = folderSrc+imgfileName;

              for (var i = 0; i <= 9; i++) {
                for (var j = 0; j <= 2; j++) {
                  if(isEmpty(testShowAnswer[i][j])){
                  } else {
                    listInfo.answer = testShowAnswer[i][j]; //i = 3까지 돌아야함.
                    listInfo.description = testBlindDescription[i][j];
                    listTemp.push(listInfo);
                    listInfo = {};
                  }
                }
              }
              listInfo.title = testTitle[0][1];
              listInfo.category = '확인학습';
              listInfo.categoryNum = '/#/list/'+flag;
              listInfo.QnA = listTemp;
              listArray['content'] = listInfo;

              return listArray;
              console.log(matterCollection);
            }
          var createCheckerView = function(){
            //empty Model, Collection Object created.
            var wordModel = {};
            //Parent and Child Array and Object created.
            var wordData = {};
            var wordList = {};
            var categoryArray = [];
            var categoryInfo = {};
            //Detailed Array
            var cnt = ['3', '1', '3', '6', '3', '2', '1'];
            var category = ['checker1', 'checker2', 'checker3', 'checker4', 'checker5', 'checker6'];
            var answerSelectorNum = ['','①', '②', '③'];
            var answerSelectorABC = ['', 'A', 'B', 'C'];
            var answerSelectorAB = ['', 'A', 'B', 'A', 'B', 'A', 'B'];
            var descriptContent = [
              [
                'またね',
                'バイバイ',
                'じゃあね'
              ],
              [
                'おじゃまします'
              ],
              [
                'ええ, いたたきます.(O)',
                'ありがとうございます.(O)',
                'ごちそうさまでした.(X)'
              ],
              [
              'かばんは　どこに　ありますか.',
              'いすの　まえに　あります.',
              'めがねは　どこに　ありますか.',
              'つくえの　うえに　あります.',
              'ほんは　どこに　ありますか.',
              'がばんのなかに　あります.'
              ],
              [
                'おたんじょうび',
                'ありがとう',
                'プレゼント'
              ],
              [
                'いただきます',
                'ごちそうさま'
              ]
            ];
            var answerContent = [
              [
                '그럼, 또 보자',
                '바이바이',
                '그럼 또 보자'
              ],
              [
                '실례하겠습니다.'
              ],
              [
                '예, 잘먹겠습니다.',
                '감사합니다.',
                '잘먹었습니다.'
              ],
              [
                '가방은 어디 있습니까?',
                '의자 앞에 있습니다. ',
                '안경은 어디 있습니까? ',
                '책상 위에 있습니다.',
                '책은 어디에 있습니까?',
                '가방 안에 있습니다.'
              ],
              [
                '생일',
                '고마워',
                '선물'
              ],
              [
                '잘 먹겠습니다.',
                '잘 먹었어'
              ]
            ]
            //Create Json as tree model.
            var idNum = 1;
            for (var i = 0 ; i < category.length; i++) {
              for (var j = 0; j < cnt[i]; j++) {
                var fileNum = j+1;
                categoryInfo.audioSrc = "assets/audios/"+category[i]+"/"+category[i]+"_"+fileNum+".mp3";
                categoryInfo.soundId = "sound"+idNum;
                if(i == 3){
                    categoryInfo.wordNum = answerSelectorAB[fileNum];
                  } else if(i > 3){
                    categoryInfo.wordNum = answerSelectorABC[fileNum];
                  } else {
                    categoryInfo.wordNum = answerSelectorNum[fileNum];
                }
                categoryInfo.circleId = "circle"+idNum;
                categoryInfo.blindwordId = "blindword"+idNum;
                categoryInfo.wordtestId = "word_test"+idNum;
                categoryInfo.description = descriptContent[i][j];
                categoryInfo.answer = answerContent[i][j];
                categoryArray.push(categoryInfo);
                categoryInfo = {};
                idNum ++;
              }
              wordData[category[i]] = categoryArray;
              categoryArray = [];
            }
              wordList.category = wordData;
              return wordList;
          }
          if(jQuery.inArray(url, urlLength) == -1){
            this.layout.setContent(view, target);
            this.layout.showSpinner(300);
          } else if(jQuery.inArray(url, urlLength) == 0) {
            matterCollection = createFinaltestView(flag);
            //var jsoninfo = JSON.stringify(matterCollection);
            console.log(matterCollection);
            view = new views.Test({model:matterCollection});
            this.layout.setContent(view, target);
            this.layout.showSpinner(500);
          } else if (jQuery.inArray(url, urlLength) == 1){
            wordList = createCheckerView();
            console.log(wordList);
            var view = new views.Livingword({model:wordList});
            var target = 'checker';
            this.layout.setContent(view, target);
            this.layout.showSpinner(1500);
            this.layout.resetSoundManager();
          }
        }
      });
      //Create the constructor
      var router = new app.Router();
      //app start
      Backbone.history.start();
})();
