import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../lib/context";
import Loader from "../Loader";
import jsCookie from "js-cookie";

export default function ProductHistory({ setIndex }) {
  const { token } = useContext(UserContext);
  const [pastProducts, setPastProducts] = useState([]);

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

  if(pastProducts.length == 0){
    return <div className="centered">
    <Loader />
  </div> 
  } else {
    return <DisplayProducts products={pastProducts} setIndex={setIndex}/> 
  }
}

function DisplayProducts({ products, setIndex }) {
  return (
    <div className="gap-left gap-bottom">
      <h1 className="white">Previous products</h1>
      {products.map((e) => (
        <ProductForm product={e} setIndex={setIndex} key={e["invoiceName"]} />
      ))}
    </div>
  );
}

function ProductForm({ product, setIndex }) {
  const { setProduct } = useContext(UserContext);

  const onSelect = () => {
    setProduct(product);

    jsCookie.set("product", product, { expires: 1 / 24 });

    setIndex((currIndex) => currIndex + 1);
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
