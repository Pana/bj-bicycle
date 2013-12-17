/* 加载地图 */

var map = {
    map_config: {
        center: new AMap.LngLat(116.404, 39.915),
        level: 11
    },

    container_dom_id: 'container',

    init: initialize,

    bicycle_data: sites,

    geocoder: new AMap.Geocoder({poinum: 1})
};

$(function(){
    map.init();
});



/* 创建地图实例 */
function initialize(){  
    this.mapObj = new AMap.Map(this.container_dom_id, this.map_config);
    add_lend_sites(this);
    // add_plugin(this.mapObj);
}

/* 添加自行车借阅点 */
function add_lend_sites(self){
    function add_marker(item, cbk){
        setTimeout(function(){
            if(item.x && item.y)
                _add_marker(self.mapObj, item);
            else
                console.log(item); // 没有经纬度的数据
            cbk();
        }, 10);
    }
    async.eachSeries(self.bicycle_data, add_marker);
}


/* 添加插件 */
function add_plugin(mapObj){
    mapObj.plugin(["AMap.ToolBar", "AMap.OverView", "AMap.Scale"],function(){  
        //加载工具条  
        var tool = new AMap.ToolBar({
            direction:false,//隐藏方向导航  
            ruler:false,//隐藏视野级别控制尺  
            autoPosition:false//禁止自动定位
        });  
        mapObj.addControl(tool);
          
        //加载鹰眼  
        var view = new AMap.OverView();  
        mapObj.addControl(view);  
          
        //加载比例尺  
        var scale = new AMap.Scale();  
        mapObj.addControl(scale);
    });
}

/*********** helpers ************/

/* 添加marker */
function _add_marker(map, item){
    var x = item.x, y = item.y;
    var marker = new AMap.Marker({                  
        map:map,
        cursor: 'pointer',
        position: new AMap.LngLat(x, y),
        offset: new AMap.Pixel(-11, -35),
        icon: base64Marker                  
    });

    var info = [];                  
    info.push("<b>&nbsp;&nbsp;" + item.name + "</b>");          
    info.push("&nbsp;&nbsp;城区 : " + item.county);                  
    info.push("&nbsp;&nbsp;地址 : " + item.address); 
    info.push("&nbsp;&nbsp;车数 : " + item.lock_num); 
    var inforWindow = new AMap.InfoWindow({                  
       offset:new AMap.Pixel(1,-26),                  
       content:info.join("<br  />")                  
    });   
    AMap.event.addListener(marker, "click", function(a, b, c){
        console.log('hello');
        inforWindow.open(map,marker.getPosition());
    });
}


