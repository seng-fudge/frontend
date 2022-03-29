import { UserContext } from "../lib/context";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "../styles/Authentication.module.css";
import Loader from "../components/Loader";

export default function CreateInvoice() {
  const { email } = useContext(UserContext);

  return (
    <>
        {<InvoiceCreationForm />}
    </>
  );
}

function InvoiceCreationForm() {

  const [loading, setLoading] = useState(false);


  const onSubmit = async (e) => {
    event.preventDefault();

    setLoading(true)

    console.log("Button pressed");

    console.log(getFromForm("formCustomerContactName"));

    try {
      const response = await fetch(
        // "https://seng-test.azurewebsites.net/json/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here

            // Already set
            UBLID: 2.1,
            CustomizationID: "urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0",
            ProfileID: "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
            
            ID: "EBWASP1002",
            IssueDate: formIssueDate,
            InvoiceCode: 380,
            Currency: "AUD",
            BuyerReference: "EBWASP1002",
            AddDocReference: "ebwasp1002",

            // details from sign up
            SupplierID: 80647710156,
            SupplierStreet: "100 Business Street",
            SupplierCity: "Dulwich Hill",
            SupplierPost: 2203,
            SupplierCountry: "AU",
            SupplierRegistration: "Ebusiness Software Services Pty Ltd",

            // details from create form

            // customer details
            CustomerStreet: getFromForm("formCustomerStreet"),
            CustomerAddStreet: getFromForm("formCustomerAddStreet"),
            CustomerCity: getFromForm("formCustomerCity"),
            CustomerPost: getFromForm("formCustomerPost"),
            CustomerCountry: getFromForm("formCustomerCountry"),
            CustomerRegistration: getFromForm("formCustomerRegistration"),
            CustomerEmail: getFromForm("formCustomerEmail"),
            CustomerContactName: getFromForm("formCustomerContactName"),

            // payment details
            PaymentType: getFromForm("formPaymentType"),
            PaymentID: getFromForm("formPaymentID"),
            PaymentTerms: getFromForm("formPaymentTerms"),

            // tax + amount details
            TaxAmount: getFromForm("formTaxAmount"),
            TaxableAmount: getFromForm("formTaxableAmount"),
            TaxSubtotalAmount: getFromForm("formTaxSubtotalAmount"),
            TaxID: getFromForm("formTaxID"),
            TaxPercent: getFromForm("formTaxPercent"),
            TaxSchemeID: getFromForm("formTaxSchemeID"),
            LegalLineExtension: getFromForm("formTaxExclusiveAmount"),
            TaxExclusiveAmount: getFromForm("formTaxExclusiveAmount"),
            TaxInclusiveAmount: getFromForm("formTaxExclusiveAmount") + getFromForm("formTaxAmount"),
            PayableRoundingAmount: getFromForm("formPayableRoundingAmount"),
            PayableAmount: getFromForm("formTaxExclusiveAmount") + getFromForm("formTaxAmount") + getFromForm("formPayableRoundingAmount"),

            // invoice item details
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
      <div>
      <form onSubmit={() => onSubmit()}>

        <div className="split left">
            <div>
            <input
                id="formBuyerReference"
                placeholder="Buyer reference"
            />
            </div>

            <h2>Customer Details</h2>

            <div>
            <input
                id="formCustomerContactName"
                placeholder="Customer Name"
            />
            </div>

            <div>
            <input
                id="formCustomerRegistration"
                placeholder="Registered Business Name"
            />
            </div>

            <div>
            <input
                id="formCustomerEmail"
                placeholder="Email"
            />
            </div>

            <div>
            <input
                id="formCustomerStreet"
                placeholder="Street Address"
            />
            </div>

            <div>
            <input
                id="formCustomerAddStreet"
                placeholder="Additional Street Address"
            />
            </div>

            <div>
            <input
                id="formCustomerCity"
                placeholder="City"
            />
            </div>

            <div>
            <input
                id="formCustomerPost"
                placeholder="Postcode"
            />
            </div>

            <div>
            <input
                id="formCustomerCountry"
                placeholder="Country"
            />
            </div>
            
        </div>

        <div className="split right">
            <h2>Payment Details</h2>

            <div>
            <input
                id="formPaymentType"
                placeholder="Payment Type"
            />
            </div>
            
            <div>
            <input
                id="formPaymentID"
                placeholder="Payment ID"
            />
            </div>

            <div>
            <input
                id="formPaymentTerms"
                placeholder="Payment Terms"
            />
            </div>

            <h2>Tax Details</h2>

            <div>
            <input
                id="formTaxAmount"
                placeholder="Tax Amount"
            />
            </div>

            <div>
            <input
                id="formTaxableAmount"
                placeholder="Taxable Amount"
            />
            </div>

            <div>
            <input
                id="formTaxSubtotalAmount"
                placeholder="Tax Subtotal Amount"
            />
            </div>

            <div>
            <input
                id="formTaxID"
                placeholder="Tax ID"
            />
            </div>

            <div>
            <input
                id="formTaxPercent"
                placeholder="Tax Percent"
            />
            </div>

            <div>
            <input
                id="formTaxSchemeID"
                placeholder="Tax Scheme ID"
            />
            </div>

            <div>
            <input
                id="formTaxExclusiveAmount"
                placeholder="Tax Exclusive Amount"
            />
            </div>

            <div>
            <input
                id="formPayableRoundingAmount"
                placeholder="Payable Rounding Amount"
            />
            </div>

            <button
                type="submit"
                className={"btn-gradient large"}
            >
            Create Invoice
            </button>
        </div>
        

      </form>
      </div>
    </section>
  );
}

function getFromForm(elementName) {
    return document.getElementById(elementName).value;
}