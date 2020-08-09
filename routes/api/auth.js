const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");


const Person = require("../../models/Person");

router.get("/", (req, res) => res.json({ test: "Auth is being tested" }));


// @type    POST
//@route    /api/auth/register
// @desc    route for registration of users
// @access  PUBLIC
router.post("/register", (req, res) => {

    Person.findOne({ email: req.body.email })
    .then(person=>{
    
        if(person){

            return res
            .status(400)
            .json({  success: false });

        }else{
            const newPerson = new Person({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
              });
               //Encrypt password using bcrypt
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPerson.password, salt, (err, hash) => {
                  if (err){console.log(err)};
                  newPerson.password = hash;
                  newPerson
                    .save()
                    .then(person => 
					{
					res.json({success: true});
					
					})
                    .catch(err => console.log(err));
                });
              });

        }
   })
    .catch(err => console.log(err));
})


// @type    POST
//@route    /api/auth/login
// @desc    route for login of users
// @access  PUBLIC

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    Person.findOne({ email })
      .then(person => {
        if (!person) {
          return res
            .status(404)
            .json({ success: false,token: "User not found with this email" });
        }
        bcrypt
          .compare(password, person.password)
          .then(isCorrect => {
            if (isCorrect) {
         
                //use payload and create token for user
              const payload = {
                id: person.id,
                name: person.name,
                email: person.email
              };
              jsonwt.sign(
                payload,
                key.secret,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              res.status(400).json({ success: false,token: "" });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });



  
// @type    GET
//@route    /api/auth/profile
// @desc    route for user profile
// @access  PRIVATE

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      // console.log(req);
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
       
      });
    }
  );




module.exports = router;
