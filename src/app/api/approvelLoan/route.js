import connectMongo from '@/lib/database/page';
import Loan from '@/models/loan/page';
import { NextResponse } from 'next/server';

connectMongo();
export async function POST(req) {

    try{
      const { UserId } = await req.json();
      const loan = await Loan.findOne({_id : UserId});
    //   console.log(loan);

  if (loan) {
    loan.status = 'APPROVED';
    await loan.save();
    return NextResponse.json(
        {
          success: true,
          message: 'Congratulation Your Loan request is approved',
        },
        { status: 200 }
      );
  } else {
    
    return NextResponse.json(
        {
          success: false,
          error: 'Loan not found',
        },
        { status: 404 }
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
