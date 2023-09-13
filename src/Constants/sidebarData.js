/*global chrome*/

import {TbInfoSquareRounded} from "react-icons/tb";
import {LiaFileSignatureSolid} from "react-icons/lia";
import {MdPrivacyTip} from "react-icons/md";
import {IoExit} from "react-icons/io5";
import {BiReset} from "react-icons/bi";

export const sidebarLinks = [
  {
    logo: <TbInfoSquareRounded fontSize={21} />,
    title: "about us",
    destination: "/about",
    handler: () => {}
  },
  {
    logo: <LiaFileSignatureSolid fontSize={21} />,
    title: "terms & conditions",
    destination: "/terms",
    handler: () => {}
  },
  {
    logo: <MdPrivacyTip fontSize={21} />,
    title: "privacy policy",
    destination: "/privacy",
    handler: () => {}
  },
  {
    logo: <IoExit fontSize={21} />,
    title: "log out",
    destination: "/logout",
    handler: () => {
      chrome.storage.sync.set({loggedIn: false});
    }
  },
  {
    logo: <BiReset fontSize={21} />,
    title: "reset",
    destination: "/login/welcome",
    handler: () => {
      localStorage.clear();
      chrome.storage.sync.clear();
      chrome.storage.sync.set({
        loggedIn: true
      });
    }
  }
];
