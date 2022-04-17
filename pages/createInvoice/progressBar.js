import Link from "next/link";

export default function ProgressBar() {
  return (
    <nav>
      <ul>
          <Link href="/createInvoice/customerDetails" passHref>
            <button className="btn-gradient">Customer Details</button>
          </Link>
      </ul>
      <ul>
          <Link href="/createInvoice/paymentDetails" passHref>
            <button className="btn-gradient">Payment Details</button>
          </Link>
      </ul>
      <ul>
          <Link href="/createInvoice/productDetails" passHref>
            <button className="btn-gradient">Product Details</button>
          </Link>
      </ul>
    </nav>
  );
}