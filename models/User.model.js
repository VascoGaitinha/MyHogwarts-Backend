const { Schema, model } = require("mongoose");
const nowGenerator = require('../utils/nowGenerator')
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required:true
    }, 
    name: {
      type: String, 
      required: true
    },
    firstLoggin:{
      type: Boolean, 
      default: true
    },
    firstJoined:{
      type: String,
      default: nowGenerator()
    },
    correctAnswers:{
      type: Number,
      default: 0
    },
    image: {
      type: String,
      required: false,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
