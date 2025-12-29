import ServicesClient from './ServicesClient'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Abhaya IT Solutions",
  description:
    "We offer a range of IT services including cybersecurity, software development, and digital marketing.",
};


export default function About(){
   return <ServicesClient/>
}