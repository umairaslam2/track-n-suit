"use client"
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import Image from "next/image";
// import avatarImg from '@/app/public/Images/avatareco.png'

export function UpperFooter({title,subtitle,customStyle,target, url}) {
  return (
    <Card className={`mt-6 w-full sm:w-80  flex flex-col border-secondary border  shadow-xl items-center justify-center  hover:scale-105 hover:cursor-pointer + ${customStyle}`}>
      <CardBody className="flex flex-col items-center justify-center">
      <Avatar
        src={url}
        alt="avatar"
        size="xxl"
        // withBorder={true}
        className="bg-blue-gray-50 "
      />

        <Typography variant="h3" color="blue-gray" className="mt-2 capitalize fontbold text-4xl  myfont">
       {target}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2 fontbold myfont">
       {title}
        </Typography>
        <Typography variant="h6" className="text-sm capitalize">
         {subtitle}
        </Typography>
      </CardBody>
    </Card>
  );
}