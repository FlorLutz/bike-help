import Layout from "../components/Layout/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <main>
        <Image src="/../../public/map.png" width={500} height={500} alt="map" />
      </main>
    </Layout>
  );
}
