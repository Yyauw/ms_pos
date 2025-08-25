import PosNumericButton from "./PosNumericButton";
import { useState } from "react";

export default function PosNumericKeyboard({ moneyInput, setMoneyInput }) {
  const handleButtonClick = (value) => {
    // let tempObj = { ...moneyInput };
    // if (tempObj.cents.length < 2) {
    //   tempObj.cents = moneyInput.cents + value;
    // } else {
    //   tempObj.dollars = moneyInput.dollars + tempObj.cents[0];
    //   tempObj.cents = moneyInput.cents[1] + value;
    //   if (tempObj.dollars[0] == "0") tempObj.dollars = tempObj.dollars.slice(1);
    // }
    setMoneyInput(moneyInput + value);
  };

  const handleClear = () => {
    setMoneyInput("0");
  };

  return (
    <>
      <div className="grid grid-rows-3 gap-2 p-2">
        <div className="grid grid-cols-3 gap-2">
          <PosNumericButton handleButtonClick={handleButtonClick} value="7" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="8" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="9" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <PosNumericButton handleButtonClick={handleButtonClick} value="4" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="5" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="6" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <PosNumericButton handleButtonClick={handleButtonClick} value="1" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="2" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="3" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <PosNumericButton handleButtonClick={handleClear} value="C" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="0" />
          <PosNumericButton handleButtonClick={handleButtonClick} value="." />
        </div>
      </div>
    </>
  );
}
