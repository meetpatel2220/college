const express = require("express");
const router = express.Router();


//Load Profile Model
const Company = require("../../models/Company");

//Load Profile Model
const Profile = require("../../models/Profile");


// @type    GET
//@route    /api/tcp
// @desc    route for showing all company
// @access  PUBLIC
router.get("/get", (req, res) => {
    Company.find()
      .sort({ date: "desc" })
      .then(companies => res.json(companies))
      .catch(err => res.json({ nocompanies: "NO companies to display" }));
  });
  

  
// @type    GET
//@route    /api/tcp/allprofile
// @desc    route for showing all profile
// @access  PUBLIC
router.get("/allprofile", (req, res) => {
  Profile.find()
    .sort({ date: "desc" })
    .then(companies => res.json(companies))
    .catch(err => res.json({ nocompanies: "NO companies to display" }));
});

// @type    POST
//@route    /api/tcp
// @desc    route for adding company 
// @access  public

router.post(
    "/post", (req, res) => {

      
                const newCompany = new Company({
                    company: req.body.company,
                    salary: req.body.salary,
                   time: req.body.time
                  });

                 
                  newCompany
                  .save()
                  .then(question => res.json({success: true}))
                  .catch(err => console.log(err));
        
                  
       }
  );

module.exports = router;
