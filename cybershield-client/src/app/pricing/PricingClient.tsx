"use client";

import { useRef, useState } from "react";
import { TimelineContent } from "../components/ui/timeline-animations";
import VerticalCutReveal from "../components/ui/vertical-cut-reveal";
import { motion, AnimatePresence } from "motion/react";
import {
    Globe,
    Database,
    Building2,
    ShoppingCart,
    Layers,
    ChevronDown,
    Sparkles,
    ArrowRight
} from "lucide-react";


// Pricing data structure
const pricingCategories = [
    {
        id: "static",
        letter: "A",
        title: "Static / Informational Websites",
        useCase: "Company profile, brochure site",
        icon: Globe,
        color: "from-blue-500 to-cyan-400",
        shadowColor: "shadow-blue-500/30",
        borderColor: "border-blue-500/30",
        yourPricing: "₹18k–₹35k",
        tiers: [
            {
                complexity: "Very Basic",
                pages: "3–5",
                features: "Template, no backend",
                marketPrice: "₹8,000 – ₹15,000",
            },
            {
                complexity: "Basic",
                pages: "5–8",
                features: "Custom UI, contact form",
                marketPrice: "₹15,000 – ₹30,000",
                popular: true,
            },
            {
                complexity: "Polished",
                pages: "8–12",
                features: "SEO-ready, animations",
                marketPrice: "₹30,000 – ₹60,000",
            },
        ],
    },
    {
        id: "dynamic",
        letter: "B",
        title: "Dynamic / CMS-Based Websites",
        useCase: "Blogs, admin panel, content updates",
        icon: Database,
        color: "from-purple-500 to-pink-400",
        shadowColor: "shadow-purple-500/30",
        borderColor: "border-purple-500/30",
        yourPricing: "₹35k–₹75k",
        tiers: [
            {
                complexity: "Basic CMS",
                features: "WordPress, basic admin",
                marketPrice: "₹25,000 – ₹45,000",
            },
            {
                complexity: "Custom CMS",
                features: "Roles, dashboards",
                marketPrice: "₹45,000 – ₹90,000",
                popular: true,
            },
            {
                complexity: "Advanced",
                features: "Multi-admin, APIs",
                marketPrice: "₹90,000 – ₹1,50,000",
            },
        ],
    },
    {
        id: "corporate",
        letter: "C",
        title: "Business / Corporate Websites",
        useCase: "SMEs, funded startups",
        icon: Building2,
        color: "from-emerald-500 to-teal-400",
        shadowColor: "shadow-emerald-500/30",
        borderColor: "border-emerald-500/30",
        yourPricing: "₹50k–₹2.5L",
        tiers: [
            {
                complexity: "Standard",
                features: "CMS + forms + SEO",
                marketPrice: "₹50,000 – ₹1,00,000",
            },
            {
                complexity: "Premium",
                features: "Custom UX, speed, security",
                marketPrice: "₹1,00,000 – ₹2,50,000",
                popular: true,
            },
        ],
    },
    {
        id: "ecommerce",
        letter: "D",
        title: "E-Commerce Websites",
        useCase: "Online stores, product catalogs",
        icon: ShoppingCart,
        color: "from-orange-500 to-amber-400",
        shadowColor: "shadow-orange-500/30",
        borderColor: "border-orange-500/30",
        yourPricing: "₹40k–₹4L+",
        note: "Price jumps sharply due to risk and support",
        tiers: [
            {
                complexity: "Basic",
                features: "WooCommerce, <50 products",
                marketPrice: "₹40,000 – ₹80,000",
            },
            {
                complexity: "Mid",
                features: "Payment, inventory, GST",
                marketPrice: "₹80,000 – ₹1,50,000",
                popular: true,
            },
            {
                complexity: "Advanced",
                features: "Custom flows, scale",
                marketPrice: "₹1,50,000 – ₹4,00,000",
            },
        ],
    },
    {
        id: "webapp",
        letter: "E",
        title: "Web Applications / Portals",
        useCase: "SaaS, internal tools, dashboards",
        icon: Layers,
        color: "from-rose-500 to-red-400",
        shadowColor: "shadow-rose-500/30",
        borderColor: "border-rose-500/30",
        yourPricing: "₹1L–₹12L+",
        tiers: [
            {
                complexity: "Simple",
                features: "Login + CRUD",
                examples: "Login + CRUD",
                marketPrice: "₹1,00,000 – ₹2,00,000",
            },
            {
                complexity: "Medium",
                features: "APIs, roles, workflows",
                examples: "APIs, roles, workflows",
                marketPrice: "₹2,00,000 – ₹5,00,000",
                popular: true,
            },
            {
                complexity: "Complex",
                features: "Scale, integrations",
                examples: "Scale, integrations",
                marketPrice: "₹5,00,000 – ₹12,00,000+",
            },
        ],
    },
];

// Animation variants
const revealVariants = {
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
    hidden: {
        filter: "blur(10px)",
        y: 30,
        opacity: 0,
    },
};

const scaleVariants = {
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
    hidden: {
        filter: "blur(10px)",
        scale: 0.9,
        opacity: 0,
    },
};

// Accordion Card Component
function PricingAccordion({
    category,
    isOpen,
    onToggle,
    index,
    sectionRef,
}: {
    category: typeof pricingCategories[0];
    isOpen: boolean;
    onToggle: () => void;
    index: number;
    sectionRef: React.RefObject<HTMLElement | null>;
}) {
    const Icon = category.icon;

    return (
        <TimelineContent
            animationNum={index + 2}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            className="w-full"
        >
            <motion.div
                className={`
          rounded-2xl overflow-hidden backdrop-blur-xl
          bg-gradient-to-br from-white/10 to-white/5
          border ${category.borderColor}
          transition-all duration-500
          ${isOpen ? `shadow-2xl ${category.shadowColor}` : 'shadow-lg shadow-black/20'}
        `}
                layout
            >
                {/* Header */}
                <motion.button
                    onClick={onToggle}
                    className="w-full p-6 flex items-center justify-between gap-4 group"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center gap-4">
                        <div className={`
              w-14 h-14 rounded-xl bg-gradient-to-br ${category.color}-200
              flex items-center justify-center shadow-lg ${category.shadowColor}
              group-hover:scale-110 transition-transform duration-300
            `}>
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-left">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                    {category.title}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm">{category.useCase}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Your Entry Pricing</p>
                            <p className={`text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                                {category.yourPricing}
                            </p>
                        </div>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`
                w-10 h-10 rounded-full flex items-center justify-center
                bg-gradient-to-br ${category.color}-200 shadow-lg ${category.shadowColor}
              `}
                        >
                            <ChevronDown className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </motion.button>

                {/* Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                            className="overflow-hidden m-3"
                        >
                            <div className="p-6 pt-0 m-6">
                                {category.note && (
                                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                        <p className="text-amber-400 text-sm flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            {category.note}
                                        </p>
                                    </div>
                                )}

                                {/* Pricing Tiers Grid */}
                                <div className={`grid gap-4 ${category.tiers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                                    {category.tiers.map((tier, tierIndex) => (
                                        <motion.div
                                            key={tierIndex}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: tierIndex * 0.1, duration: 0.4 }}
                                            className={`
                        relative p-6 rounded-xl
                        ${tier.popular
                                                    ? `bg-gradient-to-br ${category.color}-300 shadow-xl ${category.shadowColor}`
                                                    : 'bg-white/5 border border-white/10 hover:border-white/20'}
                        transition-all duration-300 hover:scale-105
                        group
                      `}
                                        >
                                            {tier.popular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-gray-900 text-xs font-bold rounded-full shadow-lg">
                                                    RECOMMENDED
                                                </div>
                                            )}
                                            <h4 className={`text-lg font-bold mb-3 ${tier.popular ? 'text-white' : 'text-white'}`}>
                                                {tier.complexity}
                                            </h4>
                                            {'pages' in tier && (
                                                <p className={`text-sm mb-2 ${tier.popular ? 'text-white/80' : 'text-gray-400'}`}>
                                                    <span className="font-medium">Pages:</span> {tier.pages}
                                                </p>
                                            )}
                                            <p className={`text-sm mb-4 ${tier.popular ? 'text-white/80' : 'text-gray-400'}`}>
                                                <span className="font-medium">Features:</span> {tier.features}
                                            </p>
                                            <div className={`
                        pt-4 border-t ${tier.popular ? 'border-white/20' : 'border-white/10'}
                      `}>
                                                <p className={`text-xs uppercase tracking-wider mb-1 ${tier.popular ? 'text-white/60' : 'text-gray-500'}`}>
                                                    Market Price
                                                </p>
                                                <p className={`text-xl font-bold ${tier.popular ? 'text-white' : 'text-white'}`}>
                                                    {tier.marketPrice}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </TimelineContent>
    );
}

// Main Pricing Page
export default function PricingPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const [openCategory, setOpenCategory] = useState<string | null>("static");

    return (
        <main className="min-h-screen bg-[#000212] text-white overflow-x-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative py-20 lg:py-32">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <TimelineContent
                        animationNum={1}
                        timelineRef={heroRef}
                        customVariants={revealVariants}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-300">Transparent Pricing</span>
                        </div>
                    </TimelineContent>

                    <TimelineContent
                        animationNum={2}
                        timelineRef={heroRef}
                        customVariants={scaleVariants}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-center">
                            <VerticalCutReveal
                                splitBy="words"
                                staggerDuration={0.1}
                                staggerFrom="first"
                                reverse={true}
                                containerClassName="justify-center"
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 40,
                                }}
                            >
                                Choose Your Perfect
                            </VerticalCutReveal>
                            <span className="block mt-2">
                                <VerticalCutReveal
                                    splitBy="words"
                                    staggerDuration={0.1}
                                    staggerFrom="first"
                                    reverse={true}
                                    containerClassName="justify-center"
                                    elementLevelClassName="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 40,
                                        delay: 0.3,
                                    }}
                                >
                                    Web Solution
                                </VerticalCutReveal>
                            </span>
                        </h1>
                    </TimelineContent>

                    <TimelineContent
                        animationNum={3}
                        timelineRef={heroRef}
                        customVariants={revealVariants}
                        className="text-center"
                    >
                        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                            From simple static sites to complex web applications, we offer competitive
                            market-rate pricing with exceptional quality and support.
                        </p>
                    </TimelineContent>

                    <TimelineContent
                        animationNum={4}
                        timelineRef={heroRef}
                        customVariants={scaleVariants}
                        className="flex justify-center gap-4 flex-wrap"
                    >
                        <a
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                        >
                            <Sparkles className="w-5 h-5" />
                            Get Custom Quote
                        </a>
                        <a
                            href="/services"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300"
                        >
                            View Services
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </TimelineContent>
                </div>
            </section>

            {/* Pricing Categories Section */}
            <section ref={pricingRef} className="relative py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <TimelineContent
                        animationNum={1}
                        timelineRef={pricingRef}
                        customVariants={revealVariants}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Pricing by{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Project Type
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Click on each category to explore detailed pricing tiers and find the perfect solution for your needs.
                        </p>
                    </TimelineContent>

                    {/* Accordion List */}
                    <div className="space-y-4">
                        {pricingCategories.map((category, index) => (
                            <PricingAccordion
                                key={category.id}
                                category={category}
                                isOpen={openCategory === category.id}
                                onToggle={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                                index={index}
                                sectionRef={pricingRef}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Why Choose{" "}
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                Our Services?
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Affordable Pricing",
                                description: "Market-rate pricing with no hidden costs. Get the best value for your investment.",
                            },
                            {
                                title: "Premium Quality",
                                description: "Clean, scalable code with modern technologies. Built to last and grow with your business.",
                            },
                            {
                                title: "Dedicated Support",
                                description: "24/7 support and maintenance. We're here to help you succeed at every step.",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-6  rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
                            >

                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-80" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                        <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                                Ready to Start Your Project?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                                Get in touch with us today for a free consultation and custom quote
                                tailored to your specific requirements.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/#contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Contact Us Now
                                </a>
                                <a
                                    href="/services"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    View All Services
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
