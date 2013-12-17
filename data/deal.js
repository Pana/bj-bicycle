var fs = require('fs');
var content = fs.readFileSync('data.txt', 'utf8');
var rows =content.split('\n');
var data = [];
for(var i = 0; i < rows.length; i+= 4){
    data.push({
        id: '',
        name: rows[i],
        address: rows[i+2],
        lock_num: Number(rows[i+1]),
        county: rows[i+3]
    });
}
fs.writeFileSync('data.json', JSON.stringify(data));
