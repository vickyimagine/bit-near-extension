import {TbInfoSquareRounded} from "react-icons/tb";
import {LiaFileSignatureSolid} from "react-icons/lia";
import {MdPrivacyTip} from "react-icons/md";
import {IoExit} from "react-icons/io5";
import {BiReset} from "react-icons/bi";

export const sidebarLinks = [
  {
    logo: <TbInfoSquareRounded fontSize={21} />,
    title: "about us"
  },
  {
    logo: <LiaFileSignatureSolid fontSize={21} />,
    title: "terms & conditions"
  },
  {
    logo: <MdPrivacyTip fontSize={21} />,
    title: "privacy policy"
  },
  {
    logo: <IoExit fontSize={21} />,
    title: "log out"
  },
  {
    logo: <BiReset fontSize={21} />,
    title: "reset"
  }
];
