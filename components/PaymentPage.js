"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchUser, fetchPayment, initiate } from '@/actions/useractions'
import { Button } from './Button'
import Gallery from './Gallery'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'


const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({})
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setpayments] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [recentPayment, setRecentPayment] = useState(null);

  const searchparams = useSearchParams()

  useEffect(() => {
    //   if(searchparams.get("payment")==="true"){
    //     toast.success("Payment done",{ duration: 4000 })
    //     console.log("Payment done")
    //   }
    getdata()

  }, [])
  useEffect(() => {
    const paymentSuccess = searchparams.get("payment") == "true";

    if (paymentSuccess) {
      // Show the toast
      setTimeout(() => {
        toast.success("Payment done");
      })
    }

  }, [searchparams, username])

  const gallery = currentUser?.gallery?.length ? currentUser.gallery : null;

  const isDisabled =
    !paymentform.name || paymentform.name.length < 3 ||
    !paymentform.message || paymentform.message.length < 5 ||
    !paymentform.amount || isNaN(paymentform.amount) || paymentform.amount <= 0;

  const isDisabled2 = !paymentform.name || paymentform.name.length < 3 ||
    !paymentform.message || paymentform.message.length < 5;

  const getdata = async () => {
    try {
      const u = await fetchUser(username)
      if (!u) {
        toast.error("User not found")
        return;
      }
      setcurrentUser(u)
      const allpayments = await fetchPayment(username)
      setpayments(allpayments)
      //console.log(u, allpayments)
    }catch (error) {
      //console.log("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again later.");
    }
  }


  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }


  const pay = async (amount) => {
    //Get orderID
    console.log(amount, username, paymentform)
    let a = await initiate(amount, username, paymentform)
    let orderID = a.id
    console.log(orderID)

    // Simulate payment success with toast
    toast.success("Payment successful!");

    // Re-fetch updated data to show new payment
    await getdata();
    setRecentPayment({
      name: paymentform.name,
      amount: amount,
      message: paymentform.message,
    });

    setShowModal(true);

    // Optionally reset form after payment
    setPaymentform({});

  }

  //Modal for payment
  const PaymentModal = ({ visible, onClose, payment }) => {
    if (!visible) return null;

    return (
      <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex justify-center items-center">
        <div className="bg-neutral-600 text-white p-6 rounded-xl shadow-lg max-w-sm w-full bg-opacity-80 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-2"> Payment Successful!</h2>
          <p><strong>Name:</strong> {payment.name}</p>
          <p><strong>Amount:</strong> ₹{payment.amount}</p>
          <p><strong>Message:</strong> {payment.message}</p>
          <button onClick={onClose} className={Button + " mt-4"}>
            Close
          </button>
        </div>
      </div>
    );
  };



  return (
    <>

      <div className="cover w-full relative">
        <img loading='lazy' src={currentUser.coverPic || "/defaultCoverpic.svg"} alt="coverPic" className='object-cover w-full h-48 md:h-[250] lg:h-[450]' />
        <div className='absolute -bottom-20 left-1/2 transform -translate-x-1/2 border-white border-2 rounded-md'>
          <img loading='lazy' src={currentUser.profilePic || "/defaultprofilepic.jpg"} alt="profilePic" className='object-cover w-40 h-[150] rounded-md' />
        </div>
      </div>
      <div className="info mt-9 p-16 flex flex-col justify-center items-center">
        <h2 className='text-lg font-bold my-2'>{currentUser.name ? currentUser.name : currentUser.username}</h2>
        <div className='text-center'>{currentUser.bio}</div>
        <div className='text-center'> {payments.length} Donations. {username} got a total donation of ₹{payments.reduce((a, b) => a + b.amount, 0)}.</div>
      </div>


      <div className="donation-gallery flex flex-col md:flex-row m-auto pb-17 gap-2 md:gap-6 w-[90%] ">
        <div className="gallery p-5 sm:p-10 bg-neutral-700 rounded-lg shadow-md shadow-black hover:shadow-xl md:w-1/2 ">
          {/* cat gallery to show images of cat whose account it is */}
          <h2 className='text-lg font-bold my-4'>Cat-alogue</h2>
          <Gallery gallery={gallery} />
        </div>
        <div className="donation flex flex-col md:w-1/2 gap-2 md:gap-6">
          <div className="donators p-5 sm:p-10 bg-neutral-700 shadow-md shadow-black hover:shadow-xl rounded-lg">
            {/* List of donaters */}
            <h2 className='text-lg font-bold my-2 sm:my-5'>Catributors</h2>
            <ul className='mx-5 text-lg'>
              {payments.map((pay, i) => {
                return (
                  <li className='my-4 flex gap-2 items-center' key={i}><img loading='lazy' src="avatar.gif" width={33} alt="User Avatar" /><span>{pay.name} doanted <span className="font-bold">₹{pay.amount}</span> with a message {pay.message}</span></li>
                )
              })}


            </ul>
          </div>
          <div className="donate p-5 sm:p-10 bg-neutral-700 shadow-md shadow-black hover:shadow-xl rounded-lg">
            {/* donation feature */}
            <h2 className='text-lg font-bold my-2 sm:my-5'>Feed the Purrpose 🐾</h2>
            <div className="flex flex-col gap-2">
              <input onChange={handleChange} name='name' value={paymentform.name || ""} type="text" placeholder='Enter Name' className='w-full p-3 rounded-lg bg-neutral-900' />
              <input onChange={handleChange} name='amount' value={paymentform.amount || ""} type="text" placeholder='Enter Amount' className='w-full p-3 rounded-lg bg-neutral-900' />
              <input onChange={handleChange} name='message' value={paymentform.message || ""} type="text" placeholder='Enter Message' className='w-full p-3 rounded-lg bg-neutral-900' />

              <button className={Button} disabled={isDisabled} onClick={() => {
                pay(paymentform.amount)
              }
              }>Pay</button>
              <div className="w-full max-w-sm amount-buttons flex gap-0.5 sm:gap-2">
                <button className={Button} disabled={isDisabled2} onClick={() => {
                  pay(10)
                }
                }>Pay ₹10</button>
                <button className={Button} disabled={isDisabled2} onClick={() => {
                  pay(20)
                }
                }>Pay ₹20</button>
                <button className={Button} disabled={isDisabled2} onClick={() => {
                  pay(30)
                }
                }>Pay ₹30</button>
              </div>

            </div>
          </div>

        </div>
      </div>
      <PaymentModal visible={showModal} onClose={() => setShowModal(false)} payment={recentPayment} />
    </>
  )
}

export default PaymentPage