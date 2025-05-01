import { Box } from '@mui/material'
import { CardElement } from '@stripe/react-stripe-js'
import React from 'react'

const CheckoutForm = () => {
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
