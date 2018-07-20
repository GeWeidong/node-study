/*
jade--破坏性、侵入式的模板引擎；
ejs --温和的、非侵入式的；
*/

const jade = require('jade');
const fs = require('fs');

// const str = jade.render('html');

const str = jade.renderFile('./views/1.jade', {pretty: true, name: 'jade', json: {width: '100px'}, arr:'active'});
fs.writeFile('./build/jade1.html', str, function(err) {
    if(err)
        console.log('fail');
    else 
        console.log('ok');
})

// console.log(str);
