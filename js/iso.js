var scaling = 'fit';
var width = 1024;
var height = 768;

var frame = new Frame(scaling, width, height);
frame.on('ready',function(){
    zog('ready from ZIM Frame');

    var stage = frame.stage;
    var stageW = frame.width;
    var stageH = frame.height;
    frame.outerColor = '#444';
    frame.color = '#ddd';

    var holder = new Container();
    var tiles = new Tile(new Rectangle(100,100,frame.light,frame.dark).centerReg({add:false}), 8, 8)
        .rot(45)
        .addTo(holder);
    holder.sca(1.718,1).center();

    tiles.on('mouseover',function(e){
        e.target.color = frame.pink;
        stage.update();
    });
    tiles.on('mouseout',function(e){
        e.target.color = frame.light;
        stage.update();
    });
    
    // 將圖檔load進來
    var img;
    frame.loadAssets('../assets/room.png');
    frame.on('complete',function(){
        img = frame.asset('../assets/room.png');
        img.sca(0.3).center().mov(0,-img.height/1.5);
        stage.update();
    })
    
    tiles.on('click', function(e){
        var point = tiles.localToGlobal(e.target.x, e.target.y);
        img.pos(point.x, point.y).mov(-img.width/2,-img.height/1.5);
        stage.update();
    });

    stage.update(); // this is needed to show any changes
});