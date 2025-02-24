"use client";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export function PaymentCard({shippingPrice, }) {
  // console.log(shippingPrice)
 // payment card
 const {allCartItem,isLoader} = useSelector((state)=> state.cartItem)
  //  console.log("get all cart item ", allCartItem)
   const Comparetotal = allCartItem?.reduce((acc, item)=> acc + (Number(item.COMPARE_PRICE|| 0)*item?.Cart_Quantity),0)
  //  console.log("Comparetotal",Comparetotal)
   const subtotal = allCartItem?.reduce((acc, item)=> acc + (Number(item.PRICE || 0)*item?.Cart_Quantity),0)
  //  console.log("subtotal ",subtotal)
   
   //  const shipping = shippingPrice;
   const discount = Comparetotal - subtotal;
    // console.log("discount ",discount)

   const total = subtotal + shippingPrice;
// console.log("total",total)
    const Paymentcard = [
    {
      name: " Price ",
      price: allCartItem?.length > 0 || null ? Comparetotal : 0
    },
    {
      name: "Discount",
      price:  allCartItem?.length > 0 || null ?  discount : 0
    },
    {
      name: " Total",
      price:  allCartItem?.length > 0 || null ? subtotal : 0
    },
  //   {
  //     name: "Tax",
  //     price: tax.toFixed(),
  //   },
    {
      name: "Shipping",
      price: allCartItem?.length > 0 || null ?  shippingPrice : 0 ,
    },
    {
      name: "Total",
      price: allCartItem?.length > 0 || null ? total.toFixed() :0,
    },
  ];
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200 rounded-lg bg-white">
      <CardBody>
        <div className="mb-6">
          <Typography variant="h5" color="blue-gray" className="font-bold text-center text-xl">
            Order Summary
          </Typography>
        </div>

        <div className="border-b border-gray-300 mb-4"></div>
        <div className="space-y-4">
          {Paymentcard?.map(({ name, price }, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-2 px-3 rounded-lg ${index === Paymentcard.length - 1 ? "bg-gray-100 font-bold" : ""
                }`}
            >
              {
                name=="Total" ? 
                <div className=" bg-blue-50 p-4 rounded-lg w-full">
                <Typography variant="h6" color="blue-gray" className="text-lg font-bold text-center">
                  Grand Total: Rs.{price}
                </Typography>
              </div>:
              <>
              <Typography variant="body1" color="blue-gray" className="text-lg">
              {name}
            </Typography>
            <Typography variant="body1" color="blue-gray" className="text-lg">
            Rs. {name == "Discount" ? "-" : ""} {price}
            </Typography>
            </>
              }
              
            </div>
            
          ))}
        </div>

        
      </CardBody>
    </Card>
  );
}
