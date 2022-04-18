import { UserContext } from "../../lib/context";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import FormInput from "../../components/FormInput";
import { useRouter } from "next/router";
import LoginButton from "../../components/LoginButton";

export default function CreateInvoice() {
  const { email } = useContext(UserContext);

  return  email ? <InvoiceCreationForm /> : <LoginButton/>;
}

function InvoiceCreationForm() {
  const { token, setXml } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    event.preventDefault();

    const values = document.getElementById("form");

    setLoading(true);

    var data;

    let success = false;

    // Get user details
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
        toast.error("You must enter user details before creating an invoice")
      } else {
        data = await response.json();

        toast.error(data["message"]);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }

    console.log("got userdata");

    //send creation request
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

              BuyerReference: values.elements["formBuyerReference"].value,
              AddDocReference: "ebwasp1002",

              // details from sign up
              SupplierID: data["supplierID"],
              SupplierPartyName: data['businessName'],
              SupplierContactName: data['contactName'],
              SupplierEmail: data['electronicMail'],
              SupplierStreet: data["street"],
              SupplierCity: data["city"],
              SupplierPost: data["postcode"],
              SupplierCountry: data["country"],
              SupplierRegistration: data["businessName"],

              // details from create form

              // customer details
              CustomerStreet: values.elements["formCustomerStreet"].value,
              CustomerAddStreet: values.elements["formCustomerAddStreet"].value,
              CustomerCity: values.elements["formCustomerCity"].value,
              CustomerPost: values.elements["formCustomerPost"].value,
              CustomerCountry: values.elements["formCustomerCountry"].value,
              CustomerRegistration:
                values.elements["formCustomerRegistration"].value,
              CustomerEmail: values.elements["formCustomerEmail"].value,
              CustomerContactName:
                values.elements["formCustomerContactName"].value,

              // payment details
              DueDate: values.elements["formDueDate"].value,
              PaymentType: values.elements["formPaymentType"].value,
              PaymentID: values.elements["formPaymentID"].value,
              PaymentTerms: values.elements["formPaymentTerms"].value,

              // tax + amount details
              TaxAmount: values.elements["formTaxAmount"].value,
              TaxableAmount: values.elements["formTaxableAmount"].value,
              TaxSubtotalAmount: values.elements["formTaxSubtotalAmount"].value,
              TaxID: values.elements["formTaxID"].value,
              TaxPercent: values.elements["formTaxPercent"].value,
              TaxSchemeID: values.elements["formTaxSchemeID"].value,
              LegalLineExtension:
                values.elements["formTaxExclusiveAmount"].value,
              TaxExclusiveAmount:
                values.elements["formTaxExclusiveAmount"].value,
              TaxInclusiveAmount:
                values.elements["formTaxExclusiveAmount"].value +
              values.elements["formTaxAmount"].value,
              PayableRoundingAmount:
                values.elements["formPayableRoundingAmount"].value,
              PayableAmount: values.elements["formTaxExclusiveAmount"].value +
              values.elements["formTaxAmount"].value +
              values.elements["formPayableRoundingAmount"].value,

              // invoice item details
              InvoiceID: values.elements["formInvoiceID"].value,
              InvoiceQuantity: values.elements["formInvoiceQuantity"].value,
              InvoiceLineExtension:
                values.elements["formInvoiceLineExtension"].value,
              InvoiceName: values.elements["formInvoiceName"].value,
              InvoiceTaxID: values.elements["formInvoiceTaxID"].value,
              InvoiceTaxPercent: values.elements["formInvoiceTaxPercent"].value,
              InvoiceTaxSchemeID:
                values.elements["formInvoiceTaxSchemeID"].value,
              InvoicePriceAmount:
                values.elements["formInvoicePriceAmount"].value,
              InvoiceBaseQuantity:
                values.elements["formInvoiceBaseQuantity"].value,
            }),
          }
        );

        console.log("created");

        console.log(response.status);

        if (response.ok) {
          const data = await response.text();

          setXml(data);

          router.push("/showInvoice");
        } else {
          const data = await response.json();

          console.log(data);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }
    }

    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <body>
      <div className="middle-x">
        <div class="progbar">
            <a href="/createInvoice/customerDetails" class="active">Customer Details</a>
            <a href="/createInvoice/productDetails">Product Details</a>
            <a href="/createInvoice/paymentDetails">Payment Details</a>
        </div>
        <div class="progbar">
            <a href="/createInvoice/productDetails">❯</a>
        </div>
        <h1 className="gradient-text">Customer Details</h1>
        <div>
            <form id="form" onSubmit={() => onSubmit()}>
                <div className="split left gap-left down">
                    <FormInput
                    id="formBuyerReference"
                    name="Buyer reference"
                    type="text"
                    />
                    <FormInput
                    id="formCustomerContactName"
                    name="Customer Name"
                    type="text"
                    />
                    <FormInput
                    id="formCustomerRegistration"
                    name="Registered Business Name"
                    type="text"
                    />
                    <FormInput id="formCustomerEmail" name="Email" type="email" />
                </div>

                <div className="split right gap-right down">
                    <FormInput
                    id="formCustomerStreet"
                    name="Street Address"
                    type="text"
                    />
                    <FormInput
                    id="formCustomerAddStreet"
                    name="Additional Street Address"
                    type="text"
                    />
                    <FormInput id="formCustomerCity" name="City" type="text" />
                    <FormInput id="formCustomerPost" name="Postcode" type="number" />
                    <FormInput id="formCustomerCountry" name="Country" type="text" />
                <button type="submit" className="btn-gradient">
                    Next
                </button>
                </div>
            </form>
        </div>
        </div>
    </body>
  );
}
