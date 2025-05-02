import PaymentPage from '@/components/PaymentPage'
import React from 'react'


const Username = async ({ params }) => {
  const a = await (params)
  return (
    <>
      <PaymentPage username={a.username} />
    </>
  )
}

export default Username

// or Dynamic metadata
export async function generateMetadata({ params }) {
  const p=await params
  return {
    
    title: `${p.username} - Feed a Cat`,
  }
}