const express = require('express');
const db = require("./data/hubs-model");
const server = express();

server.listen(4000, () => {
    console.log('*** listening on port 4000')
});

//  global middleware section

server.use(express.json());

server.get('/now', (request, response) => {
res.send(new Date().toString());
});


//CRUD
// C - create - POST
// R - read- GET
// U - update - PUT
//  D- Delete 

//  retireve info from db
server.get('/hubs', (req, res) => {
    db.find()
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        res.status(500).json({success: false, err});
    });
});

//  add record to db

server.post('/hubs', (req, res) => {
    const hubInfo = req.body;

    db.add(hubInfo)
        .then(hub => {
            res.status(201).json({ success: true , hub });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });

});


//  deleting record

server.delete('/hubs/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(deleted => {
        if(deleted){
            res.status(204).end();

        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, err});
    });
});

// modify a record

server.put('/hubs/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(updated => {
        if(updated) {
            res.status(200).json({success: true, updated});
        } else {
            res.status(404).json({sucess: false, message: ""});
        
        }
    })
    .catch(err => {
        res.status(500).json({success: false, err});
    });
});




