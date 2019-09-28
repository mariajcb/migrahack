const express = require('express');
const logger = require('morgan');

const { getRaids, newReport } = require('./controllers/reports');
const { createError } = require('./util/errors')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/fake', (req, res, next) => {
    res.json({
        data: 'got data!'
    }).send()
})


app.post('/api/reports/new', async (req, res, next) => {
    await newReport(req.body)
})

app.post('/api/reports', async (req, res, next) => {
    if (!req.body) {
        createError('Missing request body')
    }
    const raids = await getRaids(req.body)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('err')
});

module.exports = app;
