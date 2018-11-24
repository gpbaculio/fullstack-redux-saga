import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    complete: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
  }
);

TodoSchema.plugin(mongoosePaginate);

export default mongoose.model('Todo', TodoSchema)