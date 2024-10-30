import connectMongo from "@/lib/database/page";
import Loan from "@/models/loan/page";
import { NextResponse } from "next/server";

connectMongo();
export async function POST(req) {
    
    try {
    // Establish a connection to the database
    const {UserId , Amount , Term , CreatedDate} = await req.json();
    // console.log(UserId);
    // if(!Amount || !Term || !CreatedDate){
    //     return NextResponse.json(
    //         {
    //           success: false,
    //           error : "Please Add all Fields",
    //           id : loan._id
    //         },
    //         { status: 200 }
    //       );
    // }

    // Parse the JSON body of the request

    // Generate repayment schedule
    const Repayments = Array.from({ length: Term }, (_, i) => ({
      dueDate: new Date(
        new Date(CreatedDate).setDate(
          new Date(CreatedDate).getDate() + (i + 1) * 7
        )
      ),
      Amount: (Amount / Term).toFixed(2),
    }));

    // Create a new loan instance
    const loan = new Loan({
      user: UserId,
      amount: Amount,
      term: Term,
      createdDate: CreatedDate || new Date(),
      repayments: Repayments,
    });

    // Save the loan document to the database
    try{
        await loan.save();
        // console.log();
        // return NextResponse.json(
        //     {
        //       success: true,
        //       message: "Loan request submitted successfully",
        //     },
        //     { status: 200 }
        //   );
        
    }catch(err){
       console.log(err);
    }
    // console.log(loan);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Loan request submitted successfully",
        id : loan._id
      },
      { status: 200 }
    );
  } catch (err) {
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
