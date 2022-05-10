import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";
import LoginButton from "../components/LoginButton";
import { useRouter } from "next/router";
import CustomerHistory from "../components/customer/CustomerHistory";
import CustomerForm from "../components/customer/CustomerForm";
import ProgBar from "../components/Progbar";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentHistory from "../components/payment/PaymentHistory";
import ProductHistory from "../components/product/ProductHistory";
import ProductForm from "../components/product/ProductForm";
import ShowInvoice from "../components/ShowInvoice";

export default function Create() {
  const { email } = useContext(UserContext);

  return email ? <CreateInvoice /> : <LoginButton />;
}

function CreateInvoice() {
  const [screenIndex, setScreenIndex] = useState(0);

  return (
    <main>
      <PastInputs index={screenIndex} setIndex={setScreenIndex} />
      <InputForm index={screenIndex} setIndex={setScreenIndex} />
    </main>
  );
}

function PastInputs({ index, setIndex }) {
  let pastInputOptions = <></>;

  if (index == 0) {
    pastInputOptions = <CustomerHistory setIndex={setIndex} />;
  } else if (index == 1) {
    pastInputOptions = <PaymentHistory setIndex={setIndex} />;
  } else if (index == 2) {
    pastInputOptions = <ProductHistory setIndex={setIndex} />;
  }

  return <div className="split-25 left gradient">{pastInputOptions}</div>;
}

function InputForm({ index, setIndex }) {
  return (
    <div className="split-75 right">
      <ProgBar index={index} setIndex={setIndex} />
      <div>
        <FormOffset
          index={index}
          indexOffset={0}
          prop={<CustomerForm setIndex={setIndex} />}
        />
        <FormOffset
          index={index}
          indexOffset={1}
          prop={<PaymentForm setIndex={setIndex} />}
        />
        <FormOffset
          index={index}
          indexOffset={2}
          prop={<ProductForm setIndex={setIndex} />}
        />
        <FormOffset index={index} indexOffset={3} prop={<ShowInvoice />} />
      </div>
    </div>
  );
}

function FormOffset({ index, indexOffset, prop }) {
  const currStyle = {
    left: `${-index * 100 + indexOffset * 100}%`,
    width: "100%",
  };

  return (
    <div className="absolute animation gap-left gap-bottom" style={currStyle}>
      {prop}
    </div>
  );
}
