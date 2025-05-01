import { Box } from '@mui/material'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import React from 'react'

const CheckoutForm = () => {
  const element=useElements();
  const submitPaymenthandler=(e:React.FormEvent<HTMLFormElement>)=>{}
  return (
    <>
   <Box sx={{mt:30}}>
   <form >
<CardElement/>
    <button type="submit">pay</button>
    </form> 
    </Box> 
    </>
  )
}

export default CheckoutForm
