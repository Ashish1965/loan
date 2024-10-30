import mongoose from 'mongoose';

const RepaymentSchema = new mongoose.Schema({
  dueDate: Date,
  amount: Number,
  status: { type: String, default: 'PENDING' },
});

const LoanSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  term: Number,
  createdDate: Date,
  repayments: [RepaymentSchema],
  status: { type: String, default: 'PENDING' },
});

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
