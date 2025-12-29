import WebDevelopmentServices from "./WebServicesClient"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebServices - Abhaya IT Solutions",
  description:
    "We offer a range of web development services including website design, development, and maintenance.",
};

export default function WebServices(){
    return <WebDevelopmentServices/>
}

