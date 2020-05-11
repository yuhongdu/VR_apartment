const db = require('../models')

module.exports = {
    findAll: function(req, res){
        db.Scene
          .find({name:"scene"})
         // .populate("note")
          .then(data => res.json(data))
          .catch(err => res.status(400).json(err))
    },
    update: function(req, res){
        db.Scene
          .find({name:"scene"}, function(err, doc){
              if(doc.length){
                  console.log("here")
                  console.log(req.body)
                  console.log(doc)
                  doc[0].number = req.body.id
                  doc[0].save()
                  res.json("updated")
              }else{
                  const newScene = {
                      name:"scene",
                      number: req.body.id
                  }
                  db.Scene.create(newScene);
                  res.json("added")
              }

          })

    }

}
