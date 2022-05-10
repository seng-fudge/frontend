import { useContext, useEffect } from "react";
import { UserContext } from "../../lib/context";
import jsCookie from "js-cookie";
import FormInput from "../FormInput";

export default function ProductForm({setIndex}){
  const { token, product, setProduct } = useContext(UserContext);

  useEffect(() => {

    const values = document.getElementById("productForm");

    if (product != null){
      values.elements["formInvoiceId"].value = product['invoiceId'];
    values.elements["formInvoiceQuantity"].value = product['invoiceQuantity'];
    values.elements["formInvoiceLineExtension"].value = product['invoiceLineExtension'];
    values.elements["formInvoiceName"].value = product['invoiceName'];
    values.elements["formInvoicePriceAmount"].value = product['invoicePriceAmount'];
    values.elements["formInvoiceBaseQuantity"].value = product['invoiceBaseQuantity'];
    }

  }, [product])

  const onSubmit = async () => {
    event.preventDefault();

    const values = document.getElementById("productForm");

    const newProduct = {
      invoiceId: values.elements["formInvoiceId"].value,
      invoiceQuantity: values.elements["formInvoiceQuantity"].value,
      invoiceLineExtension: values.elements["formInvoiceLineExtension"].value,
      invoiceName: values.elements["formInvoiceName"].value,
      invoicePriceAmount: values.elements["formInvoicePriceAmount"].value,
      invoiceBaseQuantity: values.elements["formInvoiceBaseQuantity"].value,
    };

    setProduct(newProduct);

    jsCookie.set("payment", newProduct, { expires: 1 / 24 });

    try {
      const response = await fetch(
        "https://fudge-backend.herokuapp.com/history/product",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            token: token,
          }),
          body: JSON.stringify(newProduct),
        }
      );

      console.log("created");

      console.log(response.status);

      if (response.ok) {
        const data = await response.text();

        console.log(data);

        setIndex(currIndex => currIndex + 1);
      } else {
        const data = await response.json();

        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <form id="productForm" onSubmit={() => onSubmit()}>
  <h1 className="gradient-text large-text reduce-margin">
    Product Details
  </h1>
  <FormInput id="formInvoiceId" name="Invoice id" type="number" />
  <FormInput
    id="formInvoiceQuantity"
    name="Product quantity"
    type="number"
  />
  <FormInput
    id="formInvoiceLineExtension"
    name="Line extention"
    type="number"
  />
  <FormInput id="formInvoiceName" name="Invoice name" type="text" />
  <FormInput
    id="formInvoicePriceAmount"
    name="Product price"
    type="number"
  />
  <FormInput
    id="formInvoiceBaseQuantity"
    name="Product base quantity"
    type="number"
  />
  <button type="submit" className="btn-gradient">
    Next
  </button>
</form>
}