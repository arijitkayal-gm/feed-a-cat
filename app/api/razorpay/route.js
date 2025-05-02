import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import dbConnect from "@/lib/dbConnect";
import Razorpay from "razorpay";

export const POST=async(req)=>{
    await dbConnect();
    let body=await req.formData();
    body=Object.fromEntries(body);
    //check razorpay_order_id present in server
    let p=await Payment.findOne({oid:body.razorpay_order_id});
    if(!p){
        return NextResponse.json({success:false,message:"Order Id not found"})
    }
    //Verify payment
    let vp=validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,process.env.KEY_SECRET)

    if(vp){
        //update the payment in db
        const updatedPayment=await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payment=true`)
    }
    else{
        return NextResponse.json({success:false,message:"Payment Verification failed"})
    }

}