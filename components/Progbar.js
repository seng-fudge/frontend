import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function ProgBar({ index }) {
  return (
    <div className="progbar">
      <Link href="/customer" passHref>
        <button className={index == 0 ? "active" : ""}>Customer</button>
      </Link>
      <Link href="/payment" passHref>
        <button className={index == 1 ? "active" : ""}>Payment</button>
      </Link>
      <Link href="/product" passHref>
        <button className={index == 2 ? "active" : ""}>Product</button>
      </Link>
      <Link href="/showInvoice" passHref>
        <button className={index == 3 ? "active" : ""}>Preview</button>
      </Link>

      {index == 0 ? (
        <Link href="/payment" passHref>
          <button>❯</button>
        </Link>
      ) : index == 1 ? (
        <>
          <Link href="/customer" passHref>
            <button>❮</button>
          </Link>
          <Link href="/product" passHref>
            <button>❯</button>
          </Link>
        </>
      ) : index == 2 ? (
        <>
          <Link href="/payment" passHref>
            <button>❮</button>
          </Link>
          <Link href="/showInvoice" passHref>
            <button>❯</button>
          </Link>
        </>
      ) : (
        <Link href="/product" passHref>
          <button>❮</button>
        </Link>
      )}
    </div>
  );
}
