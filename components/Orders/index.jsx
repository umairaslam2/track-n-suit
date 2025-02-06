"use client"
import { getAllCartItem } from '@/API/response'
import { getAllOdersStart, getAllOdersSuccess } from '@/GlobalRedux/Slices/allOrders'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SortableTable } from './OrderTable'
import { CardTitle } from './OrderCard'


const AllOrders = () => {
  const dispatch = useDispatch()
  const [filterStatus, setFilterStatus] = useState("")
  const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const nextPage = () => {
      setSkip((prevSkip) => prevSkip + limit);
    };
    const previousPage = () => {
      setSkip((prevSkip) => Math.max(prevSkip - limit, 0));
    };
  const getAllOrders = async (status) => {

    // const route = `skip=0&limit=2&status=Pending`;
    const route = `cart/admin/orders?skip=${skip}&limit=${limit}&status=${status}`;
    try {
      dispatch(getAllOdersStart())
      let response = await getAllCartItem(route)
      // console.log("response", response)
      dispatch(getAllOdersSuccess(response))

    } catch (error) {
      console.log(error)
    }

  }
  const { allOders, isLoader } = useSelector((state) => state.orders)
  // console.log("all orders", allOders)
  const handleStatusChange = (value) => {
    setFilterStatus(value); // Update the category
    setSkip(0); 
    // console.log("Selected Status:", value);
  };
  useEffect(() => {
    getAllOrders(filterStatus)
  }, [filterStatus,limit, skip,])
  return (
    <div className='h-full w-full'>
      <span className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 bg-gray-100 rounded-xl shadow-sm  p-4">
        <CardTitle title={"Total Orders"} count={allOders?.totalOrders} />
        <CardTitle title={"Total Sales"} count={allOders?.totalSales} />
        <CardTitle title={"Pending Orders"} count={allOders?.totalPending} />
        <CardTitle title={"Success Orders"} count={allOders?.totalSuccess} />
      </span>

      <span className='w-full flex justify-center items-center mx-auto h-full my-8'>
        <SortableTable data={allOders} onStatusChange={handleStatusChange} previousPage={previousPage} nextPage={nextPage} />
      </span>
    </div>
  )
}

export default AllOrders