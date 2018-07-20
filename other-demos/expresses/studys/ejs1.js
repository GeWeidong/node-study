const ejs = require('ejs');

const str = ejs.renderFile('./views/1.ejs', {name: 'gewd'}, function(err, data) {
    console.log(data);
})

