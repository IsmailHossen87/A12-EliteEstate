import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
//   show the error
    const[error,setError]= useState('')
    const [clientSecret,setClientSecret]= useState('')
    const axiosSecure = UseAxiosSecure()
    const {user}= useAuth()
    const navigate = useNavigate()
    const [transactionId,setTransactionId]= useState('')

    const { state } = useLocation();
    const { amount, title ,location,sellerEmail,sellsId } = state || {}; 


// 2 backend e post korar jonno and backend theke secret keu pawar jonno
    useEffect(()=>{
        axiosSecure.post('/createPayment',{price:amount})
        .then(res =>{
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure,amount])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const {error:PaymentError,paymentMethod}= await stripe.createPaymentMethod({
        type:'card',
        card
    })
    if(PaymentError){
        console.log('Payment Error',PaymentError)
    }else{
        
    }
    if(PaymentError){
        setError(PaymentError.message)
    }else{
        setError('')
    }
    // last e corfirm payment 3
    const {paymentIntent,error:confirmError}= await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card: card,
            billing_details:{
                email:user?.email,
                name:user?.displayName || 'anonimus',

            }
        }
    })
    if(confirmError){
        console.log('confirm error')
    }else{
        if(paymentIntent.status == "succeeded"){
            setTransactionId(paymentIntent.id);
            const payment ={
              buyerEmail:user?.email,
              buyerName:user?.displayName,
              sellerEmail:sellerEmail,
              title:title,
              transsectionId:paymentIntent.id,
              date:new Date(),
              location:location ,
              soldPrice:parseInt(amount) ,
              status:'pending',
              sellsId:sellsId
            }
           const res =await axiosSecure.post('/payment',payment)
            .then(res =>{
              if(res.data.insertedId){
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Your payment has been saved",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/dashboard/propertyBought')
              }
            })
        }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#424770",
          }}
        >
          Payment Details
        </h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          style={{ marginBottom: "20px" }}
        />
        <button
          className="btn btn-primary my-3"
          type="submit"
          disabled={!stripe || !clientSecret}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Pay
        </button>
       {error && (<p className="text-red-600 text-center ">{error}</p>)}
       
      </form>
    </div>
  );
};

export default CheckOutFrom;
