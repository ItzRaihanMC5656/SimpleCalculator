import { useState, useEffect } from 'react'
import Button from "./components/Button.jsx"
import "./App.css";

const palette = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  ",",
  "0",
  "C",
  "+",
  "=",
];
//oC = operatorChange
const oC = {
  "÷": "/",
  "×": "*",
  ",": ".",
};


const isOperator = (v) =>
    v == palette[3] || v == palette[7] || v == palette[11] || v == palette[15];
const isC = (v) => v == palette[14];
const isComa = (v) => v == palette[12];
const isEqual = (v) => v == palette[16];

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  
  const lastChar = text.charAt(text.length - 1);
  const isTxtValid =
    text.split(" ").every((v) => {
      return v.length > 0;
    }) &&
    !isOperator(lastChar) &&
    !isComa(lastChar);
  const formattedText =
    text.length > 32 ? text.match(/.{1,33}/g).join("\n") : text;
  useEffect(() => {
    setResult(
      text == result
        ? ""
        : isTxtValid
          ? String(eval(text.replace(/[÷×,]/g, (m) => oC[m])))
          : text,
    );
  }, [text]);

  const buttons = palette.map((v) => {
    return <Button 
             key={v}
             name={v}
             setText={setText}
             result={result}
             isOperator={isOperator}
             isEqual={isEqual}
             isComa={isComa}
             isC={isC}
             />;
  });
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-2xl rounded-sm p-3">
      <h5
        className={`${isTxtValid && result !== "" ? "flex" : "hidden"} justify-end items-center w-full bg-gray-50 p-1 font-mono rounded-sm max-w-84 text-gray-400`}
      >
        {result}
      </h5>
      <h1 className="flex justify-end items-center w-full bg-gray-100 p-2 rounded-sm m-2 text-gray-700 font-bold font-mono max-w-84 min-h-12 max-h-36 whitespace-pre-line overflow-y-scroll">
        {formattedText}
      </h1>
      <div className="flex justify-center items-center" id="box">
        <ul className="flex justify-center items-center flex-wrap w-84 h-103 gap-1">
          {buttons}
        </ul>
      </div>
    </div>
  );
}

export default App;
