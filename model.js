const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let mixedType = mongoose.Schema.Types.Mixed;

let years_schema = new Schema({
  year: {type: ObjectId, ref: 'years'},
  registered_date: Number,
  enrolled: Boolean,
  registered: Boolean,
  withdrawn: Boolean,
  withdrawn_after_period: String,
  withdrawn_notes: String,
  grade: ObjectId,
  group: {type: ObjectId, ref: 'groups'},
  registration_sequence: Number,
  registration_type: {type: ObjectId},
  registration_type_notes: String,
  paid: Boolean,
  late_payment: Boolean,
  subscription: {type: ObjectId, ref: 'subscriptions'}
});

let contacts_schema = new Schema({
  name: String,
  surname: String,
  relationship: String,
  phones: {mobile: String, home: String, work: String}
});

let period_conduct_schema = new Schema({
  period: {type: ObjectId},
  score: Number,
  score_letter: ObjectId,
  recommendation: String,
  improvement: String
});

let period_comments_schema = new Schema({
  period: {type: ObjectId},
  title: String,
  text: String
});

let schema = new Schema({
  code: String,
  general_information: String,
  citizenship: String,
  religion: String,
  phone: String,
  home_ownership: String,
  unique_electric_code: String,
  system_access: Boolean,
  blocked: Boolean,
  permissions: [ {type: ObjectId, ref: 'permissions_profiles'} ],
  school: {type: ObjectId, ref: 'schools', index: true},
  transport: Boolean,
  counseling: {
    siblings: {
      male: Number,
      female: Number,
      student_position: Number
    },
    living_arrangement_description: String,
    academic_needs: {has_special_needs: Boolean},
    professional_help: {received: Boolean, notes: String},
    notes: String
  },
  previous_school: {name: String, reasons: String},
  emergency: {
    contacts: [contacts_schema],
    preferred_hospital: {name: String, notes: String}
  },
  years: [ years_schema ],
  period_conduct: [ period_conduct_schema ],
  period_comments: [ period_comments_schema ],
  user: {type: ObjectId, ref: 'users'},

  relational_data: {
    all_data: String,
    name: {show: String, order: String},
    id_card: {show: String, order: String},
    email: String,
    gender: String,
    years: {type: mixedType}
  }
}, {collection: 'students'});

module.exports = Student = mongoose.model('students', schema);
