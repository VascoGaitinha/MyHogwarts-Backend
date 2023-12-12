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
      default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
