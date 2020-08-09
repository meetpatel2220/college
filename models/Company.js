const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
 
    companyid: {
        type: Schema.Types.ObjectId,
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
   ,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Company = mongoose.model("myCompany", CompanySchema);
