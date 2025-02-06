"use client"
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Date", "ID", "Customer", "Contact", "Status", "City", "Action"];

export function SortableTable({ data , onStatusChange, previousPage, nextPage, active }) {
  const { allOders, isLoader } = useSelector((state) => state.orders)
  const handleStatusChange = (value) => {
    onStatusChange(value)
  };
  const sortedOrders = data?.orders?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // console.log("sort data ==>>>",sortedOrders)
  // for pagination
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {}, // No action for the icons since we handle page changes with buttons
  });
  return (
    <Card className="h-full my-4 w-full">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-9 py-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Order List
          </Typography>
          <Typography color="gray" className="mt-1 text-sm font-normal">
            See information about all orders
          </Typography>
        </div>
        <span className="w-full sm:w-1/2 flex ml-auto justify-end pt-4">
          <div className="w-72">
            <Select
              className="w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary"
              label="Filter Orders By Status"
              // value={category}
              onChange={(e) => handleStatusChange(e)}
            >
              <Option value="">All</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Success">Success</Option>
              <Option value="Cancel">Cancel</Option>
              <Option value="Return">Return</Option>
            </Select>
          </div>
        </span>
      </div>

      <CardBody className="overflow-x-auto px-4 sm:px-6 lg:px-8">
        <table className="mt-4 w-full min-w-[640px] table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoader ? (
              // Loader Skeleton
              Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr key={index}>
                    {TABLE_HEAD.map((_, colIndex) => (
                      <td key={colIndex} className="p-4 border-b border-blue-gray-50 animate-pulse">
                        <div className="h-4 bg-blue-gray-100 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))
            ) : data?.orders?.length === 0 ? (
              // No Orders Available Message
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 py-8 text-center text-gray-500">
                  No Orders Available
                </td>
              </tr>
            ) : (
              // Orders Data
              sortedOrders?.map(
                (
                  {
                    orderId,
                    customerName,
                    customerEmail,
                    customerPhone,
                    shippingDetails,
                    shippingAddress,

                    status,
                    createdAt
                  },
                  index
                ) => {
                  const isLast = index === data?.orders.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {new Date(createdAt).toLocaleDateString("en-CA").split("-").reverse().join("-")}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {orderId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {customerName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {customerEmail}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {customerPhone}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 truncate"
                          >
                            {shippingAddress}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status}
                            color={
                              status === "Cancel" ? "red" :  // Red for Cancel
                                status === "Success" ? "green" :  // Green for Success
                                  status === "Pending" ? "yellow" :  // Yellow for Pending
                                    status === "Return" ? "blue" :  // Blue for Return
                                      "gray"  // Default fallback color
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {shippingDetails.city}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link href={`/orders/${orderId}`}>
                          <Tooltip content="View more">
                            <IconButton variant="text">
                              <span className="bg-blue-gray-400 p-3 text-white rounded-xl">View</span>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:gap-0 border-t border-blue-gray-50 p-4">
          <div className="flex gap-2">
            <Button 
             disabled={active === 1}
             onClick={nextPage} variant="outlined" size="sm"
             className="flex items-center text-white bg-secondary hover:text-black gap-2 border-2 shadow-md"
             >
              Previous
            </Button>
             <div className="flex items-center gap-2">
                    {[1, 2,].map((index) => (
                      <IconButton key={index} {...getItemProps(index)}>
                        {index}
                      </IconButton>
                    ))}
                  </div>
            <Button 
            disabled={active === 5}
            className="flex text-white bg-secondary hover:text-black items-center gap-2 border-2 shadow-md"
            variant="outlined" onClick={previousPage} size="sm">
              Next
            </Button>
          </div>
           {/* <DefaultPagination nextPage={nextPage} previousPage={previousPage} /> */}
        </CardFooter>
    </Card>

  );
}