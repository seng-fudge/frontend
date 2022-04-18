import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function ProgBar({ index }) {

  return (
    <div class="progbar">
      <Link
        href="/customer"
        className={index == 0 ? "active" : ""}
      >
        Customer
      </Link>
      <Link
        href="/payment"
        className={index == 1 ? "active" : ""}
      >
        Payment
      </Link>
      <Link
        href="/product"
        className={index == 2 ? "active" : ""}
      >
        Product
      </Link>
      <Link
        href="/showInvoice"
        className={index == 3 ? "active" : ""}
      >
        Preview
      </Link>

      {index == 0 ? (
        <Link href="/payment">❯</Link>
      ) : index == 1 ? (
        <>
          <Link href="/customer">❮</Link>
          <Link href="/product">❯</Link>
        </>
      ) : index == 2 ? (
        <>
          <Link href="/payment">❮</Link>
          <Link href="/showInvoice">❯</Link>
        </>
      ) : (
        <Link href="/product">❮</Link>
      )}
    </div>
  );
}
