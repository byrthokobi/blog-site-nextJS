import Image from "next/image";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className="main-body">
      {/*Hero Heading Section*/}
      <div className="text-center p-6 md:p-10 h-64 flex justify-center items-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl leading-snug">
          Welcome to{" "}
          <span className="underline font-bold decoration-yellow-400 decoration-4">
            MrKnowItAll!
          </span>
          <br />
          Your ultimate guide to everything worth knowing.
        </h2>
      </div>


    </div>
  );
}