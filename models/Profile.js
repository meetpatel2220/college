const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson"
  },
  username: {
    type: String,
    required: true,
    max: 50
  },
  mobileno: {
    type: String,
    },
    address: {
        type: String,
       },
  request: [
    {
    companyid: {
        type: String
       },
    company: {
        type: String
      },
    salary: {
        type: String
      },
    time: {
        type: String
      }
    }
  ],
  accepted: [
    {
    companyid: {
         type: String
       },
    company: {
        type: String
      },
    salary: {
        type: String
      },
    time: {
        type: String
      }
    }
  ],
 
});

module.exports = Profile = mongoose.model("myProfile", ProfileSchema);
