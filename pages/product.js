import { useContext, useState, useEffect } from "react";

import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";
import jsCookie from "js-cookie";
import ProgBar from "../components/Progbar";
import { useRouter } from "next/router";

export default function Product() {
  const { email } = useContext(UserContext);

  return email ? <ProductCreate /> : <LoginButton />;
}

/*
TODO
- Add saving when done
*/

function ProductCreate() {
  const router = useRouter()
  const { token, setProduct } = useContext(UserContext);

  const [pastProducts, setPastProducts] = useState([]);

  const onSubmit = async () => {
    event.preventDefault();

    const values = document.getElementById("form");

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

        router.push("/showInvoice")
      } else {
        const data = await response.json();

        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fudge-backend.herokuapp.com/history/product",
          {
            method: "GET",
            headers: new Headers({
              token: token,
            }),
          }
        );

        if (response.status == 200) {
          const data = await response.json();
          console.log(data);

          setPastProducts(data["products"]);

          // router.push("/user");
        } else if (response.status == 204) {
          setHasData(false);
        } else {
          const data = await response.json();

          toast.error(data["message"]);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error);
      }

      //To move to next page
    }
    fetchData();
  }, [token]);

  return (
    <main>
      <div className="split-25 left gradient">
        {pastProducts.length == 0 ? (
          <div className="centered">
            <Loader />
          </div>
        ) : (
          <div>
            <DisplayProducts products={pastProducts} />
          </div>
        )}
      </div>
      <div className="split-75 right gap-left gap-bottom">
        <ProgBar index={2} />
        <form id="form" onSubmit={() => onSubmit()}>
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
      </div>
    </main>
  );
}

function DisplayProducts({ products }) {
  return (
    <div className="gap-left gap-bottom">
      <h1 className="white">Previous products</h1>
      {products.map((e) => (
        <ProductForm product={e} key={e["invoiceName"]} />
      ))}
    </div>
  );
}

function ProductForm({ product }) {
  const { setProduct } = useContext(UserContext);
  const router = useRouter()

  const onSelect = () => {
    setProduct(product);

    jsCookie.set("product", product, { expires: 1 / 24 });
    router.push("/showInvoice")
  };

  return (
    <div
      className="pointer"
      onClick={() => {
        onSelect();
      }}
    >
      <h3 className="white">{product["invoiceName"]}</h3>
    </div>
  );
}
