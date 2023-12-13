const { Schema, model } = require("mongoose");

const quizzSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type: String
    },
    solvedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        answers: [
          {
            option: {
              type: String,
              required: true,
            },
            correct: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
  }
);

const Quizz = model("Quizz", quizzSchema);

module.exports = Quizz;
