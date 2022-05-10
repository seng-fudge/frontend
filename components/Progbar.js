import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function ProgBar({ index, setIndex }) {
  return (
    <div className="progbar gap-left">
      <button className={index == 0 ? "active" : ""} onClick={() => {setIndex(0)}}>Customer</button>
      <button className={index == 1 ? "active" : ""} onClick={() => {setIndex(1)}}>Payment</button>
      <button className={index == 2 ? "active" : ""} onClick={() => {setIndex(2)}}>Product</button>
      <button className={index == 3 ? "active" : ""} onClick={() => {setIndex(3)}}>Preview</button>

      {index > 0 ? (
        <button
          onClick={() => {
            setIndex(currIndex => currIndex - 1);
          }}
        >
          ❮
        </button>
      ) : (
        <></>
      )}
      {index < 3 ? (
        <button
          onClick={() => {
            setIndex(currIndex => currIndex + 1);
          }}
        >
          ❯
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
