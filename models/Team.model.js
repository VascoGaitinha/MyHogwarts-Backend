const { Schema, model, SchemaType } = require("mongoose");
const nowGenerator = require('../utils/nowGenerator')

const teamSchema = new Schema(
  {
    name:{
      type: String,
      required: true
    },
    members:[
      [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }]
    ],
  }
);

const Team = model("Team", teamSchema);

module.exports = Team;
