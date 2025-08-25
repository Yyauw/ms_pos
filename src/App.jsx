import { useState } from "react";
import PosNumericKeyboard from "./components/PosNumericKeyboard";
import MainPage from "./components/MainPage";
function App() {
  // const [moneyInput, setMoneyInput] = useState({
  //   dollars: "",
  //   cents: "0",
  // });
  // const floatMoneyInput =
  //   parseFloat(moneyInput.dollars + "." + moneyInput.cents) || 0;
  return (
    <>
      <div className="w-full h-screen overflow-hidden flex">
        <MainPage />
      </div>

      {/* <h1>{moneyInput?.dollars + "." + moneyInput?.cents}</h1>
      <div className="w-lg mx-auto">
        <PosNumericKeyboard
          moneyInput={moneyInput}
          setMoneyInput={setMoneyInput}
        />
      </div> */}
    </>
  );
}

export default App;
