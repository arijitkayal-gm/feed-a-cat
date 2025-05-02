"use server"

import Payment from "@/models/Payment"
import User from "@/models/User"
import dbConnect from "@/lib/dbConnect"


export const initiate = async (amount, to_user, paymentform) => {
  await dbConnect();

  // Generate fake order ID
  const fakeOrderId = 'order_' + Math.floor(Math.random() * 1e9);

  // Create mock order in your DB
  await Payment.create({
    oid: fakeOrderId,
    amount: parseFloat(amount),
    to_user: to_user,
    name: paymentform.name,
    message: paymentform.message,
    done: true,
  });

  return {
    id: fakeOrderId,
    amount,
    currency: 'INR',
    status: 'created',
  };

}

export const fetchUser = async (username) => {
  await dbConnect()
  let u = await User.findOne({ username: username })
  if (!u) return null; // handle user not found
  let user = u.toObject({ flattenObjectIds: true })
  return user
}

export const fetchAllUsers = async () => {
  await dbConnect()
  let u = await User.find({}).sort({ username: 1 })
  let users = u.map((params) => {
    return params.toObject({ flattenObjectIds: true })
  }
  )
  return users
}

export const fetchPayment = async (username) => {
  await dbConnect()
  let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 })
  let payment = p.map((params) => {
    return params.toObject({ flattenObjectIds: true })
  }
  )
  return payment
}

export const updateUser = async (ndata, oldusername) => {

  await dbConnect()
  
  //Check if username exists
  if (oldusername !== ndata.username) {
    //Check if any other user with same name exists
    let existingUsername = await User.findOne({ username: ndata.username })
    if (existingUsername) {
      return { success: false, error: "Username already exists!" };
    }
    await User.updateOne({ email: ndata.email }, ndata)
    //update Payment username
    await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    return { success: true, message: "Profile updated successfully!" };
  }
  else {
    await User.updateOne({ email: ndata.email }, ndata)
    return { success: true, message: "Profile updated successfully!" };
  }
}


