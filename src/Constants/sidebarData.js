/*global chrome*/
import keyLogo from "../Assets/key.svg";
import terms from "../Assets/terms.svg";
import about from "../Assets/about.svg";
import privacy from "../Assets/Privacy.svg";
import logout from "../Assets/out.svg";
import reset from "../Assets/reset.svg";

export const sidebarLinks = [
  {
    logo: about,
    title: "about us",
    destination: "/about",
    handler: () => {}
  },
  {
    logo: terms,
    title: "terms & conditions",
    destination: "/terms",
    handler: () => {}
  },
  {
    logo: privacy,
    title: "privacy policy",
    destination: "/privacy",
    handler: () => {}
  },
  {
    logo: keyLogo,
    title: "reveal secret key",
    destination: "/reveal",
    handler: () => {}
  },
  {
    logo: logout,
    title: "log out",
    destination: "/logout",
    handler: () => {
      chrome.storage.sync.set({loggedIn: false});
    }
  },
  {
    logo: reset,
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
