import Image from "next/image";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className="main-body">
      <div className="body-section max-w-9/10 m-auto">
        <Navbar />
      </div>
    </div>
  );
}
