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

      <ParallaxLayer offset={0} sticky={{ start: 0, end: 3 }} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "0%",
          marginRight: "50%",
          width: "50%",
        }}>
        <Image src="/logo.png" objectFit="scale-down" layout="fill" alt="Logo"/>
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
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
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
