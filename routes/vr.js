const express = require('express');
const path = require('path');
const sceneRoute = require('./scene')

const router = new express.Router();
router.use(express.static("client/VR_Components/vr/build"))
//router.use("/scene", sceneRoute)

router.get("/test", function(req,res){
    console.log("TEST CALLED")
    res.sendFile(path.join(__dirname, "../client/VR_Components/vr/build/index.html"))
});


module.exports = router;
