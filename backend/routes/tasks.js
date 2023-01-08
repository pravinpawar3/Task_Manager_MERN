const router = require('express').Router()
let Task = require('../models/task.model')

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTask = new Task({
            username,
            description,
            duration,
            date
        });

        newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400)
            .json('Error:' + err))
});

router.route('/:id').get((req, res) => {
        Task.findById(req.params.id, function (err, task) {
            if (err){
                res.status(400).json('Error: ' + err)
                console.log(err);
            }
            else{
                res.json(task)
            }
        });
});

router.route('/:id').delete((req, res) => {


        Task.findByIdAndDelete(req.params.id, function (err, docs) {
            if (err){
                res.status(400).json('Error: ' + err)
                console.log(err)
            }
            else{
                res.json('Task deleted.')
                console.log("Deleted : ", docs);
            }
        });

});

router.route('/update/:id').put((req, res) => {

    Task.findById(req.params.id, function (err, task) {
        if (err){
            res.status(400).json('Error: ' + err)
            console.log(err);
        }
        else{
            task.username=req.body.username;
            task.description=req.body.description;
            task.duration=Number(req.body.duration);
            task.date=Date.parse(req.body.date);
            task.save()
            .then(()=> res.json('Task updated!'))
            .catch(err =>res.status(400)
            .json('Error: '+err))
        }
    });

 
});

module.exports = router;