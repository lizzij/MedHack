const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    log: [{
            time: {
                type: String,
                required: true
            },
            bloodPressure: {
                type: Number,
                required: true
            }
        }]
});

// patientSchema.methods.addEntry = function (item) {
//     this.log.push({
//         time: item.time,
//         activity: item.activity
//     });
//     return this.save();
// };



// patientSchema.methods.clearLog = function() {
//   this.log = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model('Patient', patientSchema);