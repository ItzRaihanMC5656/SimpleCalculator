import { useState } from 'react'
import "../App.css";

const isLastNumberHasComa = (ls) => {
    const split = ls.split(" ");
    return split[split.length - 1].includes(",");
  };
const isFirstNumberHasZero = (ls) => {
    const split = ls.split(" ");
    const lastNumb = split[split.length - 1];
    return lastNumb.charAt(0) === "0";
  };

function Button({
  name,
  setText,
  result,
  isOperator,
  isEqual,
  isComa,
  isC
}) {
  const [animate, setAnimate] = useState(false);

  const colorType = isOperator(name)
    ? "bg-amber-500"
    : isEqual(name)
      ? "bg-black text-white"
      : isC(name)
        ? "bg-red-400 text-white"
        : "bg-white";
  const animateColorType = isOperator(name)
    ? "bg-amber-700 text-white"
    : isEqual(name)
      ? "bg-gray-600"
      : isC(name)
        ? "bg-white text-red-400"
        : "bg-amber-500";
  function handleClick() {
    setAnimate(true);
    setTimeout(() => {
      setText((prev) => {
        const last = prev.charAt(prev.length - 1);

        if (isEqual(name)) {
          if (result === "Infinity") return "";
          if (result === "NaN") return "";
          return result;
        }
        if (isC(name)) return "";
        if (isOperator(name)) {
          if (isOperator(last) || isComa(last)) {
            if (prev.length < 2 && last === "-") return "";
            if (isFirstNumberHasZero(prev) && isLastNumberHasComa(prev))
              return prev;
            return prev.substring(0, prev.length - 1) + name;
          }
          return prev === "" ? (name === "-" ? "-" : "") : prev + " " + name;
        }
        if (isComa(name)) {
          if (isOperator(last)) return prev + " 0,";
          if (last === "") return prev + "0,";
          if (isComa(last)) {
            return prev;
          }
          if (isLastNumberHasComa(prev)) {
            return prev;
          }
          return prev + ",";
        }
        if (isOperator(last)) return prev + " " + name;
        if (isFirstNumberHasZero(prev) && !isLastNumberHasComa(prev)) {
          return name === "0" ? prev : prev.slice(0, -1) + name;
        }
        return prev + name;
      });
      setAnimate(false);
    }, 200);
  }

  return (
    <button
      className={`flex flex-col justify-center items-center font-extrabold transition-all duration-200 grow ease-in-out min-h-20 min-w-20 ${animate ? animateColorType : colorType} rounded-sm shadow-sm`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

export default Button;