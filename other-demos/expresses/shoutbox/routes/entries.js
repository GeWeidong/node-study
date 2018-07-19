var Entry = require('../lib/entry');

exports.list = function(req, res, next) {
    Entry.getRange(0, -1, function(err, entries) {
        if(err) return next(err);

        res.render('entries', {
            title: 'Entries',
            entries: entries,
        })
    })
}

exports.submit = function(req, res, next) {
    var data = req.body.entry;
    if(!data.title || data.title.length < 4) {
        res.error('标题不能为空，并且大于4个字符');
        res.redirect('back');
        return ;
    }
    
    var entry = new Entry({
        "username": res.locals.user.name,
        "title": data.title,
        "body": data.body,
    });

    entry.save(function(err) {
        if(err) return next(err);

        res.redirect('/');
    })
}