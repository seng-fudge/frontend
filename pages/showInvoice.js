import styles from "../styles/Frame.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import toast from "react-hot-toast";
import Link from "next/link";
import ProgBar from "../components/Progbar";

export default function ShowInvoice() {
  const { email, customer, payment, product } = useContext(UserContext);

  const test = () => {
    console.log(product);
    console.log(customer);
    console.log(payment);
  };

  return email ? (
    <main>
      <ProgBar index={3} />
      {customer && payment && product ? (
        <DisplayInvoice />
      ) : (
        <>
          <h1>You must create all parts of invoice first</h1>
          <button onClick={test}>
            Test
          </button>
        </>
      )}
    </main>
  ) : (
    <LoginButton />
  );
}

function DisplayInvoice() {
  const [htmlValue, setHtmlValue] = useState(
    `<html><main>Loading</main></html>`
  );

  const { token, setXml, customer, payment, product } = useContext(UserContext);

  useEffect(() => {
    async function getXml() {
      let data;
      let success;

      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/user/data",
          {
            method: "GET",
            headers: new Headers({
              token: token,
            }),
          }
        );

        if (response.status == 200) {
          data = await response.json();

          success = true;

          // router.push("/user");
        } else if (response.status == 204) {
          toast.error("You must enter user details before creating an invoice");
        } else {
          data = await response.json();

          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }

      if (success == true) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        try {
          const response = await fetch(
            "https://seng-donut-deployment.herokuapp.com/json/convert",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // your expected POST request payload goes here

                // Already set
                UBLID: 2.1,
                CustomizationID:
                  "urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0",
                ProfileID: "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",

                ID: "EBWASP1002",
                IssueDate: today,
                InvoiceCode: 380,
                Currency: data["currency"],

                BuyerReference: customer["buyerReference"],
                AddDocReference: "ebwasp1002",

                // details from sign up
                SupplierID: data["supplierID"],
                SupplierPartyName: data["businessName"],
                SupplierContactName: data["contactName"],
                SupplierEmail: data["electronicMail"],
                SupplierStreet: data["street"],
                SupplierCity: data["city"],
                SupplierPost: data["postcode"],
                SupplierCountry: data["country"],
                SupplierRegistration: data["businessName"],

                // details from create form

                // customer details
                CustomerStreet: customer["streetAddress"],
                CustomerAddStreet: customer["additionalStreetAddress"],
                CustomerCity: customer["city"],
                CustomerPost: customer["postcode"],
                CustomerCountry: customer["country"],
                CustomerRegistration: customer["businessName"],
                CustomerEmail: customer["email"],
                CustomerContactName: customer["customerName"],

                // payment details
                DueDate: payment["dueDate"],
                PaymentType: payment["paymentType"],
                PaymentID: payment["paymentId"],
                PaymentTerms: payment["paymentTerms"],

                // tax + amount details
                TaxAmount:
                  Math.round(
                    (product["invoicePriceAmount"] *
                      product["invoiceQuantity"] *
                      0.1 +
                      Number.EPSILON) *
                      100
                  ) / 100,
                TaxableAmount:
                  product["invoicePriceAmount"] * product["invoiceQuantity"],
                TaxSubtotalAmount:
                  Math.round(
                    (product["invoicePriceAmount"] *
                      product["invoiceQuantity"] *
                      0.1 +
                      Number.EPSILON) *
                      100
                  ) / 100,
                TaxID: "VAT",
                TaxPercent: 10,
                TaxSchemeID: "VAT",
                LegalLineExtension:
                  Math.round(
                    (product["invoicePriceAmount"] *
                      product["invoiceQuantity"] *
                      0.9 +
                      Number.EPSILON) *
                      100
                  ) / 100,
                TaxExclusiveAmount:
                  Math.round(
                    (product["invoicePriceAmount"] *
                      product["invoiceQuantity"] *
                      0.9 +
                      Number.EPSILON) *
                      100
                  ) / 100,
                TaxInclusiveAmount:
                  product["invoicePriceAmount"] * product["invoiceQuantity"],
                PayableRoundingAmount:
                  product["invoicePriceAmount"] * product["invoiceQuantity"],
                PayableAmount:
                  product["invoicePriceAmount"] * product["invoiceQuantity"],

                // invoice item details
                InvoiceID: product["invoiceId"],
                InvoiceQuantity: product["invoiceQuantity"],
                InvoiceLineExtension:
                  product["invoicePriceAmount"] * product["invoiceQuantity"],
                InvoiceName: product["invoiceName"],
                InvoiceTaxID: 1,
                InvoiceTaxPercent: 10,
                InvoiceTaxSchemeID: "VAT",
                InvoicePriceAmount: product["invoicePriceAmount"],
                InvoiceBaseQuantity: product["invoiceBaseQuantity"],
              }),
            }
          );

          console.log("created");

          console.log(response.status);

          if (response.ok) {
            const data = await response.text();

            console.log(data);

            setXml(data);

            return data;
          } else {
            const data = await response.json();

            console.log(data);
          }
        } catch (error) {
          // enter your logic for when there is an error (ex. error toast)

          console.log(error);
        }
      }
    }

    async function fetchData() {
      let curr_xml = await getXml();

      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/apis/render_forward",
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              token: token,
            }),
            body: JSON.stringify({
              xml: curr_xml,
            }),
          }
        );

        if (response.status == 200) {
          const data = await response.text();
          setHtmlValue(data);

          // router.push("/user");
        } else {
          const data = await response.json();
          console.log(data);
          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }
    }
    fetchData();
  }, [token]);

  return (
    <>
      <iframe className={styles.showpage} srcDoc={htmlValue}></iframe>
      <Link href="/sendInvoice" passHref>
        <button className="btn-gradient ">Next</button>
      </Link>
    </>
  );
}
