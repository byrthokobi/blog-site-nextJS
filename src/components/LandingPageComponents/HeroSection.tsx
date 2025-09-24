export default function HeroSection() {
    return (
        <div className="text-center p-6 md:p-10 h-96 flex justify-center items-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug">
                Welcome to{" "}
                <span className="underline font-bold decoration-yellow-400 decoration-4">
                    MrKnowItAll!
                </span>
                <br />
                Your ultimate guide to everything worth knowing.
            </h2>
        </div>
    );
}