import {TbInfoSquareRounded} from "react-icons/tb";
import {LiaFileSignatureSolid} from "react-icons/lia";
import {MdPrivacyTip} from "react-icons/md";
import {IoExit} from "react-icons/io5";
import {BiReset} from "react-icons/bi";

export const sidebarLinks = [
  {
    logo: <TbInfoSquareRounded fontSize={21} />,
    title: "about us",
    destination: "/about"
  },
  {
    logo: <LiaFileSignatureSolid fontSize={21} />,
    title: "terms & conditions",
    destination: "/terms"
  },
  {
    logo: <MdPrivacyTip fontSize={21} />,
    title: "privacy policy",
    destination: "/privacy"
  },
  {
    logo: <IoExit fontSize={21} />,
    title: "log out",
    destination: "/logout"
  },
  {
    logo: <BiReset fontSize={21} />,
    title: "reset",
    destination: "/login/account-options"
  }
];
