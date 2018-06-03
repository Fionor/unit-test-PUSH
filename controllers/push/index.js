module.exports.send = (req, res) => {
    try {
        if(!req.body.room || req.body.room == '') return res.send({status: 400, errors: [{error_msg: 'invalid room id'}]});
        if(!req.body.statistic || req.body.statistic == '') return res.send({status: 400, errors: [{error_msg: 'invalid statistic'}]});
        res.io.to(req.body.room).emit('update_statistic', {statistic: req.body.statistic});
        console.log(`SEND ${JSON.stringify(req.body.statistic)} INTO ${req.body.room}`);
        res.send({status: 200});
    } catch (error) {
        console.log('push error', error);
        res.send(500, {error});
    }
}