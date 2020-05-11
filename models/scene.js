const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
    name: {type:String, unique:true},
    number: {type: Number},
    note: [{
      type: Schema.Types.ObjectId,
      ref: "Note"
    }]
})

const Scene = mongoose.model("Scene", sceneSchema);

module.exports = Scene;
