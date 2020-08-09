const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


//Load Person Model
const Person = require("../../models/Person");

//Load Profile Model
const Profile = require("../../models/Profile");



// @type    POST
//@route    /api/profile/
// @desc    route for UPDATING/SAVING personnal user profile
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.mobileno) profileValues.mobileno = req.body.mobileno;
    if (req.body.address) profileValues.address = req.body.address;
   
    
    //Do database stuff
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileValues },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("problem in update" + err));
        } else {
          Profile.findOne({ mobileno: profileValues.mobileno })
            .then(profile => {
              //Username already exists
              if (profile) {
                res.status(400).json({ username: "mobileno already exists" });
              }
              //save user
              new Profile(profileValues)
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log("Problem in fetching profile" + err));
  }
);



// @type    GET
//@route    /api/profile/
// @desc    route for personnal user profile
// @access  PRIVATE
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (!profile) {
            return res.status(404).json({ profilenotfound: "No profile Found" });
          }
          res.json(profile);
        })
        .catch(err => console.log("got some error in profile " + err));
    }
  );


  
// @type    POST
//@route    /api/profile/request
// @desc    route for adding company request
// @access  PRIVATE

router.post(
    "/request",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
        
          const newWork = {
             company: req.body.company,
             companyid: req.body.companyid,
             salary: req.body.salary,
             time: req.body.time,
            };
          profile.request.unshift(newWork);
          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  );




module.exports = router;
