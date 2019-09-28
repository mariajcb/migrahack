const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { getRaids, newReport, newComment } = require('./controllers/reports');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/fake', (req, res, next) => {
    res.json({
        data: 'got data!'
    }).send()
})


app.post('/api/reports/new', async (req, res, next) => {
    try {
        await newReport(req.body)
        res.status(200).send()
    } catch (err) {
        console.log(err)
        res.status(500).send('Could not create new report')
    }

})

app.post('/api/reports', async (req, res, next) => {
    if (!req.body) {
        res.status(500).send('Missing request body')
    }
    const raids = await getRaids(req.body)
    res.send(raids)
})

app.post('/api/comments/new', async (req, res, next) => {
    await newComment(req.body)
    res.status(200).send()
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
