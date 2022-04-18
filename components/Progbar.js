export default function ProgBar({ index }) {
  return <div class="progbar">
    <a href="/createInvoice/customerDetails" class={index == 0 ? "active" : ""}>
      Customer Details
    </a>
    <a href="/createInvoice/productDetails" class={index == 1 ? "active" : ""}>Product Details</a>
    <a href="/createInvoice/paymentDetails" class={index == 2 ? "active" : ""}>Payment Details</a>

    {index == 0 ? (
      <a href="/createInvoice/productDetails">❯</a>
    ) : index == 1 ? (
      <>
        <a href="/createInvoice/customerDetails">❮</a>
        <a href="/createInvoice/paymentDetails">❯</a>
      </>
    ) : (
      <a href="/createInvoice/productDetails">❮</a>
    )}
  </div>;
}
