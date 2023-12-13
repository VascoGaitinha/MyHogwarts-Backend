const { Schema, model, SchemaType } = require("mongoose");

const teamSchema = new Schema(
  {
    name:{
      type: String,
      required: true
    },
    members:[
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    totalPoints:[
      {
        type: Number,
        default: 0
      }
    ]
  }
);

const Team = model("Team", teamSchema);

module.exports = Team;
