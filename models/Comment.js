const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: 'Please fill out the reply field',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'Please enter you name for the comment!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'Please enter your name for the reply!',
      trim: true
    },
    commentBody: {
      type: String,
      required: 'Please fill out the comment!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;