import { UserContext } from "../lib/context";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "../styles/Authentication.module.css";
import Loader from "../components/Loader";

export default function CreateInvoice() {
  const { email } = useContext(UserContext);

  return (
    <>
      <div className="split left gradient"></div>
      <div className="split right">
        <div className="centered">
          {<InvoiceCreationForm />}
        </div>
      </div>
    </>
  );
}

function InvoiceCreationForm() {

  const [loading, setLoading] = useState(false);


  const onSubmit = async (e) => {
    event.preventDefault();

    setLoading(true)

    console.log("Button pressed");

    try {
      const response = await fetch(
        "https://seng-test.azurewebsites.net/json/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            UBLID: 2.1,
            CustomizationID: "urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0",
            ProfileID: "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
            
            ID: "EBWASP1002",
            IssueDate: formIssueDate,
            InvoiceCode: 380,
            Currency: "AUD",
            BuyerReference: "EBWASP1002",
            AddDocReference: "ebwasp1002",

            SupplierID: 80647710156,
            SupplierStreet: "100 Business Street",
            SupplierCity: "Dulwich Hill",
            SupplierPost: 2203,
            SupplierCountry: "AU",
            SupplierRegistration: "Ebusiness Software Services Pty Ltd",

            CustomerStreet: "Suite 132 Level 45",
            CustomerAddStreet: "999 The Crescent",
            CustomerCity: "Homebush West",
            CustomerPost: 2140,
            CustomerCountry: "AU",
            CustomerRegistration: "Awolako Enterprises Pty Ltd",
            CustomerEmail: "email",
            CustomerContactName: "Tay",

            PaymentType: 1,
            PaymentID: "EBWASP1002",
            PaymentTerms: "As agreed",

            TaxAmount: 10,
            TaxableAmount: 100,
            TaxSubtotalAmount: 10,
            TaxID: "S",
            TaxPercent: 10,
            TaxSchemeID: "GST",
            LegalLineExtension: 100,
            TaxExclusiveAmount: 100,
            TaxInclusiveAmount: 110,
            PayableRoundingAmount: 0,
            PayableAmount: 110,

            InvoiceID: 1,
            InvoiceQuantity: 500,
            InvoiceLineExtension: 100,
            InvoiceName: "Pencils",
            InvoiceTaxID: 5,
            InvoiceTaxPercent: 10,
            InvoiceTaxSchemeID: "GST",
            InvoicePriceAmount: 0.2,
            InvoiceBaseQuantity: 1
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        const data = await response.json();

        toast.error(data["message"]);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }

    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <section>
      <h2 className="title">XML Details</h2>
      <form onSubmit={() => onSubmit()}>
        <div>
          <input
            name="BuyerReference"
            placeholder="Buyer reference"
            value={formBuyerReference}
            className={styles.input}
          />
        </div>

        <div className="split right">
            <h2 className="title">Customer Details</h2>

            <div>
            <input
                name="CustomerContactName"
                placeholder="Name"
                value={formCustomerContactName}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerRegistration"
                placeholder="Registered Name"
                value={formCustomerRegistration}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerEmail"
                placeholder="Email"
                value={formCustomerEmail}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerStreet"
                placeholder="Street Address"
                value={formCustomerStreet}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerAddStreet"
                placeholder="Additional Street Address"
                value={formCustomerAddStreet}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerCity"
                placeholder="City"
                value={formCustomerCity}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerPost"
                placeholder="Postcode"
                value={formCustomerPost}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerCountry"
                placeholder="Country"
                value={formCustomerCountry}
                className={styles.input}
            />
            </div>
            
        </div>

        <div className="split left">
            <h2 className="title">Customer Details</h2>

            <div>
            <input
                name="CustomerRegistration"
                placeholder="Registered Name"
                value={formCustomerRegistration}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerStreet"
                placeholder="Street Address"
                value={formCustomerStreet}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerAddStreet"
                placeholder="Additional Street Address"
                value={formCustomerAddStreet}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerCity"
                placeholder="City"
                value={formCustomerCity}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerPost"
                placeholder="Postcode"
                value={formCustomerPost}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerCountry"
                placeholder="Country"
                value={formCustomerCountry}
                className={styles.input}
            />
            </div>
        </div>

        <div className="split right">
            <h2 className="title">Invoice Details</h2>

            <div>
            <input
                name="InvoiceQuantity"
                placeholder="Invoice Quantity"
                value={formInvoiceQuantity}
                type="number"
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerStreet"
                placeholder="Street Address"
                value={formCustomerStreet}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerAddStreet"
                placeholder="Additional Street Address"
                value={formCustomerAddStreet}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerCity"
                placeholder="City"
                value={formCustomerCity}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerPost"
                placeholder="Postcode"
                value={formCustomerPost}
                className={styles.input}
            />
            </div>

            <div>
            <input
                name="CustomerCountry"
                placeholder="Country"
                value={formCustomerCountry}
                className={styles.input}
            />
            </div>
        </div>
        

        <button
          type="submit"
          className={"btn-gradient large"}
        >
          Create Invoice
        </button>
      </form>
    </section>
  );
}