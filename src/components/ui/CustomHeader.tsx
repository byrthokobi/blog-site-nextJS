"use client"
import React, { useState } from 'react';

type VariantType = 'default' | 'purple' | 'teal' | 'orange' | 'green' | 'rose';
type AlignmentType = 'center' | 'left' | 'right';

interface VariantStyle {
    text: string;
    underline: string;
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    variant?: VariantType;
    icon?: React.ComponentType<{ size?: number }>;
    alignment?: AlignmentType;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    variant = 'default',
    alignment = 'center'
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const variantStyles: Record<VariantType, VariantStyle> = {
        default: {
            text: 'text-gray-800',
            underline: 'bg-blue-600'
        },
        purple: {
            text: 'text-gray-800',
            underline: 'bg-purple-600'
        },
        teal: {
            text: 'text-gray-800',
            underline: 'bg-teal-600'
        },
        orange: {
            text: 'text-gray-800',
            underline: 'bg-orange-500'
        },
        green: {
            text: 'text-gray-800',
            underline: 'bg-green-600'
        },
        rose: {
            text: 'text-gray-800',
            underline: 'bg-rose-500'
        }
    };

    const alignmentStyles: Record<AlignmentType, string> = {
        center: 'text-center items-center',
        left: 'text-left items-start',
        right: 'text-right items-end'
    };

    const currentStyle: VariantStyle = variantStyles[variant];

    const handleMouseEnter = (): void => setIsHovered(true);
    const handleMouseLeave = (): void => setIsHovered(false);

    return (
        <div className={`flex flex-col ${alignmentStyles[alignment]} mb-12 w-full ${alignment === 'center' ? 'mx-auto' : ''}`}>
            {/* Main Header Container */}
            <div
                className="w-full relative group cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Main Title with Decorative Lines */}
                <h2 className="relative flex items-center w-full">
                    {/* Left decorative line */}
                    <div className="flex-1 w-full">
                        <div
                            className={`block w-full h-0.5 ${currentStyle.underline} opacity-30 transition-all duration-500 ${isHovered ? "opacity-60" : ""}`}
                        ></div>
                    </div>

                    {/* Title with underline animation */}
                    <div className="relative mx-4 md:mx-6">
                        <span className={`text-3xl md:text-4xl lg:text-5xl font-bold ${currentStyle.text} transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap`}>
                            {title}
                        </span>

                        {/* Cool Underline Animation */}
                        <div className={`h-1 ${currentStyle.underline} transform origin-center transition-all duration-500 ease-out rounded-full mt-3 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>

                        {/* Subtle second line for extra coolness */}
                        <div className={`h-0.5 ${currentStyle.underline} opacity-40 transform origin-center transition-all duration-700 ease-out rounded-full mt-1 ${isHovered ? 'scale-x-75 delay-200' : 'scale-x-0'}`}></div>
                    </div>

                    {/* Right decorative line */}
                    <div className="flex-1">
                        <div
                            className={`block w-full h-0.5 ${currentStyle.underline} opacity-30 transition-all duration-500 ${isHovered ? "opacity-60" : ""}`}
                        ></div>
                    </div>
                </h2>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-gray-600 text-base md:text-lg mt-6 max-w-2xl leading-relaxed font-medium">
                        {subtitle}
                    </p>
                )}

                {/* Subtle accent dot */}
                <div className={`absolute -top-1 -right-1 w-2 h-2 ${currentStyle.underline} rounded-full opacity-0 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'scale-0'}`}></div>
            </div>
        </div>
    );
};
