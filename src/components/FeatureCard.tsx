import React from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

interface FeatureCardProps {
    imageSrc: string;
    title: string;
    link: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, title, link }) => {
    return (
        <Card className="flex flex-col items-center text-center p-4 transition-all duration-300 transform hover:shadow-[0_10px_25px_-5px_rgba(255,0,150,0.4),0_5px_10px_-5px_rgba(0,0,255,0.3)]">
            {/* Image */}
            <div className="overflow-hidden rounded-md w-full relative h-40 sm:h-48 md:h-62 lg:h-78">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            </div>

            {/* Title */}
            <Link href={link} passHref>
                <CardContent className="mt-4 px-2">
                    <CardTitle className="text-base sm:text-lg md:text-xl hover:underline font-semibold">
                        {title}
                    </CardTitle>
                </CardContent>

                {/* Learn More Button */}
                <Button className="mt-4 px-4 sm:px-6 py-2 transition-colors duration-300">
                    Learn More!
                </Button>
            </Link>
        </Card>
    );
};