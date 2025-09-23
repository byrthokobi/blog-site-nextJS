import { SectionHeader } from "@/components/CustomHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="main-body h-full">
      {/*Hero Heading Section*/}
      <div className="text-center p-6 md:p-10 h-96 flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug">
          Welcome to{" "}
          <span className="underline font-bold decoration-yellow-400 decoration-4">
            MrKnowItAll!
          </span>
          <br />
          Your ultimate guide to everything worth knowing.
        </h2>
      </div>

      <div className="bg-transparent">
        <SectionHeader
          variant="purple"
          title="Featured Blogs!"
        />
        <div className="w-fullflex justify-center">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 p-8 mx-auto gap-8">
            <FeatureCard
              imageSrc="/blog-image1.jpg"
              title="Enabling customers to deliver production-ready AI agents at scale"
              link="#"
            />
            <FeatureCard
              imageSrc="/blog-image1.jpg"
              title="Enabling customers to deliver production-ready AI agents at scale"
              link="#"
            />
            <FeatureCard
              imageSrc="/blog-image1.jpg"
              title="Enabling customers to deliver production-ready AI agents at scale"
              link="#"
            />
            <FeatureCard
              imageSrc="/blog-image1.jpg"
              title="Enabling customers to deliver production-ready AI agents at scale"
              link="#"
            />
          </div>
        </div>

      </div>

    </div>
  );
}