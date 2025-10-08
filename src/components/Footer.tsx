import Link from 'next/link';
import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Github,
    Mail,
    ArrowUp
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 rounded-t-4xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Content Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Content</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/blog" className="hover:text-white transition-colors">
                                    All Posts
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-white transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/tags" className="hover:text-white transition-colors">
                                    Tags
                                </Link>
                            </li>
                            <li>
                                <Link href="/archive" className="hover:text-white transition-colors">
                                    Archive
                                </Link>
                            </li>
                            <li>
                                <Link href="/featured" className="hover:text-white transition-colors">
                                    Featured Posts
                                </Link>
                            </li>
                            <li>
                                <Link href="/newsletter" className="hover:text-white transition-colors">
                                    Newsletter
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/write-for-us" className="hover:text-white transition-colors">
                                    Write for Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="hover:text-white transition-colors">
                                    Useful Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="hover:text-white transition-colors">
                                    Recommended Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/reading-list" className="hover:text-white transition-colors">
                                    Reading List
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Community</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/discord" className="hover:text-white transition-colors">
                                    Discord Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/forums" className="hover:text-white transition-colors">
                                    Forums
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-white transition-colors">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/contributors" className="hover:text-white transition-colors">
                                    Contributors
                                </Link>
                            </li>
                            <li>
                                <Link href="/mentorship" className="hover:text-white transition-colors">
                                    Mentorship Program
                                </Link>
                            </li>
                            <li>
                                <Link href="/job-board" className="hover:text-white transition-colors">
                                    Job Board
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/report-issue" className="hover:text-white transition-colors">
                                    Report an Issue
                                </Link>
                            </li>
                            <li>
                                <Link href="/feedback" className="hover:text-white transition-colors">
                                    Feedback
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessibility" className="hover:text-white transition-colors">
                                    Accessibility
                                </Link>
                            </li>
                            <li>
                                <Link href="/sitemap" className="hover:text-white transition-colors">
                                    Sitemap
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


                {/* Social Links and Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
                    {/* Social Media Links */}
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <Link
                            href="https://twitter.com/yourblog"
                            className="hover:text-white transition-colors"
                            aria-label="Follow us on Twitter"
                        >
                            <Twitter size={20} />
                        </Link>
                        <Link
                            href="https://facebook.com/yourblog"
                            className="hover:text-white transition-colors"
                            aria-label="Follow us on Facebook"
                        >
                            <Facebook size={20} />
                        </Link>
                        <Link
                            href="https://instagram.com/yourblog"
                            className="hover:text-white transition-colors"
                            aria-label="Follow us on Instagram"
                        >
                            <Instagram size={20} />
                        </Link>
                        <Link
                            href="https://linkedin.com/company/yourblog"
                            className="hover:text-white transition-colors"
                            aria-label="Follow us on LinkedIn"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <Link
                            href="https://youtube.com/yourblog"
                            className="hover:text-white transition-colors"
                            aria-label="Subscribe to our YouTube channel"
                        >
                            <Youtube size={20} />
                        </Link>
                        <Link
                            href="https://github.com/yourblog"
                            className="hover:text-white transition-colors"
                            aria-label="Check out our GitHub"
                        >
                            <Github size={20} />
                        </Link>
                        <Link
                            href="mailto:hello@yourblog.com"
                            className="hover:text-white transition-colors"
                            aria-label="Send us an email"
                        >
                            <Mail size={20} />
                        </Link>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center space-x-6 text-sm">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-8 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                        © 2025 MrKnowItAll. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;