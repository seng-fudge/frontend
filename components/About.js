import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <Parallax pages={3} style={{ top: "0", left: "0" }}>
      <ParallaxLayer offset={0} speed={2} className="gradient" />

      <ParallaxLayer
        offset={0}
        speed={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "50%",
          marginRight: "0%",
          width: "50%",
        }}
      >
        <h1 className="white-title">FUDGE Invoice Creation</h1>
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        sticky={{ start: 0, end: 3 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "0%",
          marginRight: "50%",
          width: "50%",
        }}
      >
        <Image
          src="/logo.png"
          objectFit="scale-down"
          layout="fill"
          alt="Logo"
        />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          marginLeft: "50%",
          marginRight: "0%",
          width: "40%",
        }}
      >
        <p>
          Fudge is an invoice creation platform which aims to streamline
          invoicing and support businesses. We are a customer-centric team that
          aims to help lower the costs of invoicing and lower the stress of
          business owners and employees. As a new and rising company ourselves,
          we understand and empathise with small businesses, and we sustain
          close connections with our customers in order to bring a useful and
          lovable product for e-invoicing. Fudge takes you through the process of 
          creating your invoice with very easy steps to follow.
        </p>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
        speed={3}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "50%",
          marginRight: "0%",
          width: "40%",
        }}
      >
        <Link href="/signup" passHref>
          <button className="btn-gradient large centered">Signup</button>
        </Link>
      </ParallaxLayer>
    </Parallax>
  );
}
