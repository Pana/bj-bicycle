/*
 * 路由定义
 */
module.exports = function(app){
    // 初始化首页
    app.get('/', function(req, res){
        // res.render('index');
        res.redirect('/bicycle');
    });

    // 路由绑定
    var service = [
        "index"
    ];
    
    for(var e; service.length && (e = service.shift());){
        require('./bicycle/'+e).init(app);
    }
};

