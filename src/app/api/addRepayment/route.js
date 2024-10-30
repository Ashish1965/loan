import connectMongo from '@/lib/database/page';
import Loan from '@/models/loan/page';
import { NextResponse } from 'next/server';

connectMongo();
export async function POST(req) {
  
    try{
        const { UserId, Amount } = await req.json();
        const loan = await Loan.findById({_id :UserId});
        // console.log(loan.amount);
  
    if (!loan || loan.status !== 'APPROVED') {
     
      return NextResponse.json(
        {
          success: false,
          error: 'Loan not approved or not found'
        },
        { status: 404 }
      );
    }
  
    // for (const repayment of loan.repayments) {
    //   if (repayment.status === 'PENDING' && amount >= repayment.amount) {
    //     repayment.status = 'PAID';
    //     await loan.save();
    //     break;
    //   }
    // }
    else if (loan.status === 'APPROVED' && Amount >= loan.amount) {
        loan.status = 'PAID';
        await loan.save();
        return NextResponse.json(
            {
              success: true,
              message: 'Congratulation Your loan amount is paid successfully'
            },
            { status: 200 }
          );
      }
  
    // if (loan.repayments.every((rep) => rep.status === 'PAID')) {
    //   loan.status = 'PAID';
    //   await loan.save();
    // }
    else{
        return NextResponse.json(
            {
              success: false,
              error : "Amount is not sufficient"
            },
            { status: 200 }
          );
    }
    }catch (err) {
        // console.error("Error processing loan request:", err);
        // Return error response with status 500
        return NextResponse.json(
          {
            success: false,
            error: "An error occurred while processing the loan request",
          },
          { status: 500 }
        );
      }
  }
  