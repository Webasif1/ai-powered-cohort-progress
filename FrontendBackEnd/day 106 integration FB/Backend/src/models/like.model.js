/**
 * Require mongoose to create like Schema & model
 */
const mongoose = require("mongoose");

/**
 * Like Schema
 */
const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      require: [true, "post id is require for a like"],
    },
    user: {
      type: String,
      require: [true, "username is require for create a like"],
    },
  },
  {
    timestamps: true,
  },
);

/**
 * likeSchema.index
 * a user can like a post once
 */
likeSchema.index({ post: 1, user: 1 }, { unique: true });

/**Like model */
const likeModel = mongoose.model("likes", likeSchema);

/**module.export= likeModel */
module.exports = likeModel;
