const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "creatorType",
    },
    creatorType: {
      type: "string",
      enum: ["User", "Agency"],
    },
    comment: {
      type: String,
      required: [true, "Unesite poruku!"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
