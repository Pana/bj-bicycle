/*
var fs = require('fs');
var file = 'temp.txt';
var file2 = 'tmp2.txt';
var content = fs.readFileSync(file2).toString();
console.log(content.split('\n'));
var data = content.split('\n');

var res = [];
for(var i = 0; i<data.length; i+=6){
    res.push({
        county: data[i],
        name: data[i+1],
        address: data[i+2],
        phone: data[i+3],
        complaint_phone: data[i+4],
        email: data[i+5]
    });
}

console.log(JSON.stringify(res));
*/

var request = require('request');
var url = 'http://webapi.amap.com/geo/geocoding?keywords=';
var data = require('./origin_data').sites;
var async = require('async');
var fs = require('fs');

var fail_num = 0;
async.mapSeries(data, function(item, cbk){
    request(url+item.county+item.address, function(error, response, body){
        console.log(item.id);
        if(error){
            fail_num += 1;
            cbk(null, item);
        }else{
            var return_data = JSON.parse(body);
            if(return_data.status ==1 && return_data.data){
                var poi = return_data.data.list.poi[0];
                item.x = poi.x;
                item.y = poi.y;
            }else{
                fail_num += 1;
            }
            cbk(null, item);
        }
    });
}, function(err, result){
    console.log(fail_num);
    var content = JSON.stringify(result);
    fs.writeFileSync('lend_site.js', content);
});
