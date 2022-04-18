import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function ProgBar({ index }) {

  return (
    <div className="progbar">
      <a
        href="/customer"
        class={index == 0 ? "active" : ""}
      >
        Customer
      </a>
      <a
        href="/payment"
        class={index == 1 ? "active" : ""}
      >
        Payment
      </a>
      <a
        href="/product"
        class={index == 2 ? "active" : ""}
      >
        Product
      </a>
      <a
        href="/showInvoice"
        class={index == 3 ? "active" : ""}
      >
        Preview
      </a>

      {index == 0 ? (
        <a href="/payment">❯</a>
      ) : index == 1 ? (
        <>
          <a href="/customer">❮</a>
          <a href="/product">❯</a>
        </>
      ) : index == 2 ? (
        <>
          <a href="/payment">❮</a>
          <a href="/showInvoice">❯</a>
        </>
      ) : (
        <a href="/product">❮</a>
      )}
    </div>
  );
}
