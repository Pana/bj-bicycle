var fs = require('fs');
module.exports = {
    init: function(app){
        app.get('/bicycle', this.index);
        app.get('/bicycle/download', this.download);
    },

    /*
     * 首页
     */
    index: function(req, res){
        res.render('bicycle/index', {title: '北京公共自行车'});
    },

    /*
     * 下载协议文件
     */
    download: function(req, res){
        var name = req.param('filename'), 
            base = req.app.get('project_home'),
            full = base+'/public/downloads/'+name;
        if(fs.existsSync(full)){
            res.download(full);
        }else{
            res.send(name+'不存在');
        }
    }
}