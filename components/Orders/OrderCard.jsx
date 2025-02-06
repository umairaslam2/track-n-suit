import {
    CardBody,
    Typography,
  } from "@material-tailwind/react";
   
  export function CardTitle({title, count}) {
    return (
      
        <CardBody className="text-center max-w-96 overflow-x-auto">
         
          <Typography variant="h5" color="blue-gray" className="mb-2">
           {title} 
          </Typography>
          <Typography variant="h6" color="blue" className="mb-2  font-bold text-xl ">
           {count} 
          </Typography>
          
        </CardBody>
      
      
    );
  }