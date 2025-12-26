import mongoose from 'mongoose';
const conversationMemberSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },
    joinedAt: { type: Date, default: Date.now },
    leftAt: { type: Date, default: null },
  },
  { timestamps: true }
);

conversationMemberSchema.index({ conversationId: 1 });
conversationMemberSchema.index({ userId: 1 });

export default mongoose.model(
  'ConversationMember',
  conversationMemberSchema
);
