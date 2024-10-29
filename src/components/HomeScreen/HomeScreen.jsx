import React, {useState, useEffect, useCallback} from "react"; // Import useCallback for optimization
import {useSelector} from "react-redux";
import engJs from "../../Constants/en"; // English translations
import spainJs from "../../Constants/es"; // Spanish translations
import {Balances, Collectibles, Certificates, RecentTrxns} from ".."; // Importing child components

const HomeScreen = ({isSideBar}) => {
  // Hooks
  const {lang} = useSelector(state => state.wallet); // Access language preference from Redux state

  // Translations based on selected language
  const translations = {
    en: {
      balance: engJs.balance,
      collectibles: engJs.collectibles,
      certificates: engJs.certificates,
      txn: engJs.txn
    },
    es: {
      balance: spainJs.balance,
      collectibles: spainJs.collectibles,
      certificates: spainJs.certificates,
      txn: spainJs.txn
    }
  };

  // Create buttons array and initial button text based on language
  const buttons = Object.values(translations[lang]);
  const [btnText, setBtnText] = useState(buttons[0]); // Set initial button text
  const [buttonId, setButtonId] = useState(0); // State to track currently selected button index

  // useEffect to update button text when the language changes
  useEffect(() => {
    setBtnText(buttons[buttonId]); // Reset button text to the currently selected button's text
  }, [lang, buttons, buttonId]); // Include buttons and buttonId as dependencies

  // Handler to update button state
  const handleButtonClick = useCallback(
    id => {
      setButtonId(id);
      setBtnText(buttons[id]);
    },
    [buttons]
  ); // Memoize handler to avoid recreating on each render

  // Styles for active and inactive buttons
  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bit-btn text-lg text-bitBg cursor-pointer transition-all duration-300 font-semibold rounded-xl px-4 ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-lg text-center text-white cursor-pointer transition-all duration-300 rounded-xl";

  return (
    <div className={isSideBar ? "pointer-events-none" : ""}>
      {" "}
      {/* Disable pointer events if sidebar is active */}
      <div className='flex justify-center h-10 my-3 space-x-3'>
        {/* Render buttons for each category with click handlers */}
        {buttons.map((text, index) => (
          <div
            key={index} // Use index as key since button order is static
            className={btnText === text ? activeStyle : inActiveStyle}
            onClick={() => handleButtonClick(index)} // Use handler with index
          >
            {text}
          </div>
        ))}
      </div>
      {/* Render the appropriate component based on the selected category */}
      {btnText === buttons[0] ? (
        <Balances /> // Show Balances component
      ) : btnText === buttons[1] ? (
        <Collectibles /> // Show Collectibles component
      ) : btnText === buttons[2] ? (
        <Certificates /> // Show Certificates component
      ) : (
        <RecentTrxns /> // Show RecentTrxns component
      )}
    </div>
  );
};

export default HomeScreen;
