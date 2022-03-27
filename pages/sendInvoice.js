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
        "http://einvoicecupcakes.herokuapp.com/data/read/v1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            InvoiceTypeCode: 0,
            AllowanceCharge: {
                ChargeIndicator: formChargeIndicator,
                AllowanceChargeReason: formAllowanceChargeReason,
                Amount: 0,
                TaxCategory: {
                    ID: formTaxCategoryID,
                    Percent: 0,
                    TaxScheme: {
                        ID: formTaxSchemeID,
                    }
                }
            },
            LegalMonetaryTotal: {
                LineExtensionAmount: 0,
                TaxExclusiveAmount: 0,
                TaxInclusiveAmount: 0,
                ChargedTotalAmount: 0,
                PayableAmount: 0
            },
            InvoiceLine: [
                {}
            ]
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
            name="chargeIndicator"
            placeholder="Charge Indicator"
            value={formChargeIndicator}
            className={styles.input}
          />
        </div>

        <div>
          <input
            name="allowanceChargeReason"
            placeholder="Allowance Charge Reason"
            value={formAllowanceChargeReason}
            className={styles.input}
          />
        </div>

        <div>
          <input
            name="taxCategoryID"
            placeholder="Tax Category ID"
            value={formTaxCategoryID}
            className={styles.input}
          />
        </div>

        <div>
          <input
            name="taxSchemeID"
            placeholder="Tax Scheme ID"
            value={formTaxSchemeID}
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={"btn-gradient large"}
        //   disabled={
        //     !formEmail || !formPassword || !isValidEmail || !isValidPassword
        //   }
        >
          Create Invoice
        </button>
      </form>
    </section>
  );
}