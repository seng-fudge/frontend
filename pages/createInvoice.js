import { UserContext } from "../lib/context";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "../styles/Authentication.module.css";
import Loader from "../components/Loader";
import FormInput from "../components/FormInput";

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
    <body>
      <div>
      <form onSubmit={() => onSubmit()}>

        <div className="split left">
            
            <FormInput id="formBuyerReference" name="Buyer reference" type="text" />

            <h1 className="gradient-text">Customer Details</h1>

            <FormInput id="formCustomerContactName" name="Customer Name" type="text" />
            <FormInput id="formCustomerRegistration" name="Registered Business Name" type="text" />
            <FormInput id="formCustomerEmail" name="Email" type="email" />
            <FormInput id="formCustomerStreet" name="Street Address" type="text" />
            <FormInput id="formCustomerAddStreet" name="Additional Street Address" type="text" />
            <FormInput id="formCustomerCity" name="City" type="text" />
            <FormInput id="formCustomerPost" name="Postcode" type="number" />
            <FormInput id="formCustomerCountry" name="Country" type="text" />
            
        </div>

        <div className="split right">
            <h1 className="gradient-text">Payment Details</h1>
            <FormInput id="formPaymentType" name="Payment Type" type="number" />
        
            <FormInput id="formPaymentID" name="Payment ID" type="number" />
            <FormInput id="formPaymentTerms" name="Payment Terms" type="text" />

            <h1 className="gradient-text">Tax Details</h1>
            <FormInput id="formTaxAmount" name="Tax Amount" type="number" />
            <FormInput id="formTaxableAmount" name="Taxable Amount" type="number" />
            <FormInput id="formTaxSubtotalAmount" name="Tax Subtotal Amount" type="number" />
            <FormInput id="formTaxID" name="Tax ID" type="number" />
            <FormInput id="formTaxPercent" name="Tax Percent" type="number" />
            <FormInput id="formTaxSchemeID" name="Tax Scheme ID" type="number" />
            <FormInput id="formTaxExclusiveAmount" name="Tax Exclusive Amount" type="number" />
            <FormInput id="formPayableRoundingAmount" name="Payable Rounding Amount" type="number" />

            <h1 className="gradient-text">Invoice Item Details</h1>
            <FormInput id="formInvoiceID" name="Invoice ID" type="tenumberxt" />
            <FormInput id="formInvoiceQuantity" name="Invoice Quantity" type="number" />
            <FormInput id="formInvoiceLineExtension" name="Invoice Line Extension" type="number" />
            <FormInput id="formInvoiceName" name="Invoice Name" type="text" />
            <FormInput id="formInvoiceTaxID" name="Invoice Tax ID" type="number" />
            <FormInput id="formInvoiceTaxPercent" name="Invoice Tax Percent" type="number" />
            <FormInput id="formInvoiceTaxSchemeID" name="Invoice Tax Scheme ID" type="number" />
            <FormInput id="formInvoicePriceAmount" name="Invoice Price Amount" type="number" />
            <FormInput id="InvoiceBaseQuantity" name="Invoice Base Quantity" type="number" />

            <button
                type="submit"
                className="btn-gradient"
            >
            Create Invoice
            </button>
        </div>
        

      </form>
      </div>
    </body>
  );
}

function getFromForm(elementName) {
    return document.getElementById(elementName).value;
}