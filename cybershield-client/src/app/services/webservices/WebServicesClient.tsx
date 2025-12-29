"use client";
import React from 'react';
import { Code, Smartphone, ShoppingCart, Briefcase, Globe, Wrench, Zap, Shield, TrendingUp, Users, Server, Layers } from 'lucide-react';
import { useRouter } from "next/navigation";

const WebDevelopmentServices: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex flex-col items-center max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Web Development Services</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl text-center">
            End-to-end solutions for your digital presence. From initial design to ongoing maintenance, we've got you covered.
          </p>
        </div>
      </header>

      {/* Section 1: Website Development */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16">Website Development</h2>
          
          {/* Corporate Websites */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Briefcase className="w-12 h-12 text-blue-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Corporate Websites</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Establish your brand's digital presence with a professional corporate website. We create sophisticated, user-friendly websites that communicate your company's values, showcase your services, and build credibility with your target audience.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our corporate websites feature intuitive navigation, compelling content presentation, integrated contact forms, and seamless CMS integration for easy content management. Every site is optimized for search engines and built with responsive design to ensure perfect display across all devices.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
              <img src="https://images.pexels.com/photos/39559/ipad-mockup-apple-business-39559.jpeg" alt=""  className='h-xl'/>
            </div>
          </div>

          {/* E-Commerce Solutions */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-orange-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg" alt=""  className='h-xl'/>
            </div>
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <ShoppingCart className="w-12 h-12 text-green-600" />
                  <h3 className="text-3xl font-bold text-slate-900">E-Commerce Solutions</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Launch your online store with a powerful e-commerce platform designed to drive sales and provide exceptional shopping experiences. We build scalable online stores with secure payment gateways, advanced product management, and comprehensive order tracking systems.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Features include multi-vendor support, inventory management, customer account portals, wishlist functionality, discount codes, shipping integration, and detailed analytics. Our e-commerce solutions are optimized for conversions and built to handle high-volume transactions with robust security measures.
                </p>
              </div>
            </div>
          </div>

          {/* Landing Pages */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Globe className="w-12 h-12 text-purple-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Landing Pages</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Drive conversions with high-performing landing pages designed to capture leads and maximize ROI. Our landing pages are strategically crafted with compelling copy, clear calls-to-action, and conversion-optimized layouts that turn visitors into customers.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We implement A/B testing frameworks, integrate with marketing automation tools, optimize loading speeds, and ensure mobile responsiveness. Every element is designed with one goal in mind: converting your traffic into valuable leads or sales.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-green-100 to-blue-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwcGFnZXxlbnwwfHwwfHx8MA%3D%3D" alt=""  className='h-xxl'/>
            </div>
          </div>

          {/* Portfolio Websites */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blueindigo-100 to-blue-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://cdn.dribbble.com/userupload/34116204/file/original-0baa435d739a15b1ecc612fd4eb332f4.png?format=webp&resize=640x480&vertical=center" alt="portfolio_website"  className='h-xl'/>
            </div>
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-12 h-12 text-orange-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Portfolio Websites</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Showcase your work with a stunning portfolio website that makes a lasting impression. Perfect for creatives, agencies, and professionals who want to highlight their projects and attract new clients with visual storytelling.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our portfolio sites feature beautiful galleries, project case studies, client testimonials, integrated contact forms, and smooth animations that engage visitors. We ensure your work takes center stage with clean, modern designs that let your portfolio shine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Web Applications */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16">Web Applications</h2>
          
          {/* Custom Web Applications */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Code className="w-12 h-12 text-indigo-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Custom Web Applications</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Transform your business processes with custom web applications tailored to your specific needs. We develop powerful, scalable applications that streamline operations, improve efficiency, and solve complex business challenges with elegant solutions.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  From database design and API development to third-party integrations and real-time features, we build applications with robust architectures that grow with your business. Our solutions are secure, maintainable, and designed for peak performance.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-pink-100 to-blue-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://cdn.dribbble.com/userupload/45609766/file/d589e96fec6ece2fc1caa739dc61dec2.png?format=webp&resize=400x300&vertical=center" alt=""  className='h-xl'/>
            </div>
          </div>

          {/* Progressive Web Apps */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-red-100 to-indigo-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://cdn.dribbble.com/userupload/44643907/file/still-4515158079438a3201eae289d0fc9063.png?format=webp&resize=400x300&vertical=center" alt=""  className='h-xxl w-full'/>
            </div>
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Smartphone className="w-12 h-12 text-cyan-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Progressive Web Apps</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Bridge the gap between web and mobile with Progressive Web Apps that deliver app-like experiences across all devices. PWAs combine the reach of the web with the functionality of native apps, offering offline capabilities, push notifications, and lightning-fast performance.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Users can install your PWA directly from their browser, receive updates automatically, and enjoy seamless experiences even with poor connectivity. Our PWAs are built with modern web technologies for maximum compatibility and performance.
                </p>
              </div>
            </div>
          </div>

          {/* SaaS Platforms */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Layers className="w-12 h-12 text-pink-600" />
                  <h3 className="text-3xl font-bold text-slate-900">SaaS Platforms</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Launch your Software-as-a-Service business with a robust, multi-tenant platform built for scale. We develop complete SaaS solutions with user management, subscription billing, admin dashboards, and all the features needed to run a successful software business.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our SaaS platforms include automated billing systems, tiered subscription plans, user analytics, team collaboration features, and API access for integrations. Built with security and scalability at the core, supporting thousands of users and growing with your success.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-100 to-red-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://cdn.dribbble.com/userupload/42660695/file/original-efbd9f0d61492bd6cbf70d2cbc48728c.jpg?format=webp&resize=400x300&vertical=center" alt=""  className='h-xl'/>
            </div>
          </div>

          {/* Enterprise Solutions */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-orange-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg" alt=""  className='h-xl'/>
            </div>
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Server className="w-12 h-12 text-red-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Enterprise Solutions</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Power large-scale operations with enterprise-grade web applications designed for mission-critical performance. We build sophisticated systems that handle complex workflows, massive data volumes, and stringent security requirements while maintaining exceptional user experiences.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our enterprise solutions feature microservices architecture, load balancing, advanced authentication, role-based access control, comprehensive audit logs, and disaster recovery systems. Built to enterprise standards with 99.9% uptime guarantees and dedicated support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Maintenance & Support */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16">Maintenance & Support</h2>
          
          {/* Regular Updates */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Wrench className="w-12 h-12 text-blue-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Regular Updates</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Keep your website running smoothly with comprehensive maintenance services. We handle all technical updates including security patches, plugin updates, content modifications, and feature enhancements so you can focus on your business while we keep your site current and secure.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our maintenance plans include scheduled updates, compatibility testing, backup verification, and performance optimization. We proactively monitor for issues and ensure your website stays ahead of potential problems before they impact your users.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-green-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://imgs.search.brave.com/sKvnYr3QQ00V8wjt1cMFmIWQTaC6RhO4fSDPhgHuca4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/ODYwOTYzMC92ZWN0/b3Ivd2Vic2l0ZS1t/YWludGVuYW5jZS1j/b25jZXB0LXZlY3Rv/ci1pbGx1c3RyYXRp/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTNCNThoNkZV/ZDVITjdIckZMZGc1/WV9HNmV0cl9NbEE1/YXBSMFEydUZEZVU9" alt=""  className='h-xl'/>
            </div>
          </div>

          {/* Security Monitoring */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://imgs.search.brave.com/tqL8zTJWjJX9jTJPFNpTG-kKxE_sC068_VxHZ_EmxL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg3/NTM2NzU4My92ZWN0/b3IvY291cGxlLXBs/YWNpbmctc2hpZWxk/LW92ZXItcGFkbG9j/a2VkLWRpZ2l0YWwt/ZmlsZS1mb2xkZXIu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTRiNV9YVkIwZjFE/NTR5NjFSYVh5NVp6/ZjBGNHdDaFBLSHJO/TXNBaGg5aVU9" alt=""  className='h-xl'/>
            </div>
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-12 h-12 text-emerald-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Security Monitoring</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Protect your digital assets with 24/7 security monitoring and proactive threat detection. Our comprehensive security services safeguard your website against malware, hacking attempts, DDoS attacks, and vulnerabilities with constant vigilance and rapid response protocols.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We implement firewall management, malware scanning, intrusion detection, SSL certificate management, and automated backup systems. Regular security audits and penetration testing ensure your site remains fortified against evolving threats.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Optimization */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch mb-24">
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Zap className="w-12 h-12 text-yellow-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Performance Optimization</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Maximize your website's speed and efficiency with continuous performance optimization. We fine-tune every aspect of your site to ensure lightning-fast loading times, smooth interactions, and optimal resource usage that keeps visitors engaged and search engines happy.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our optimization services include image compression, code minification, database query optimization, CDN configuration, browser caching, and server-side improvements. We monitor performance metrics continuously and make adjustments to maintain peak performance as your site grows.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-emarald-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://imgs.search.brave.com/d2ta0F8GPhJXG4pd3L1_P9cbNvdY3XHsW1oBg3n8WDA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2Lzg2Lzk5LzMx/LzM2MF9GXzE2ODY5/OTMxNjVfckxZNHVS/RmxBRXNmYXk1Qmo1/THh4SXZzNDFUbWtr/dEkuanBn" alt=""  className='h-xl'/>
            </div>
          </div>

          {/* Technical Support */}
          <div className="flex flex-col md:flex-row gap-0 items-stretch">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-red-100 to-cyan-50 flex items-center justify-center p-6 min-h-[400px] rounded-lg ">
               <img src="https://static.vecteezy.com/system/resources/thumbnails/007/637/047/small_2x/person-with-customer-dealing-vector.jpg" alt=""  className='h-xl'/>
            </div>
            <div className="w-full md:w-1/2 flex items-center px-8 md:px-12 py-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <TrendingUp className="w-12 h-12 text-violet-600" />
                  <h3 className="text-3xl font-bold text-slate-900">Technical Support</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Get expert help whenever you need it with our dedicated technical support team. We provide priority assistance for troubleshooting, bug fixes, feature questions, and technical guidance to ensure your website operates flawlessly and your team can work without interruption.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our support includes rapid response times, detailed documentation, training sessions, and technical consulting. Whether you need emergency fixes or strategic guidance, our experienced team is here to help you succeed with personalized attention and expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Let's discuss how we can bring your vision to life with our comprehensive web development services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors"
            onClick={() => router.push("/#contact")}
            >
              Contact Us
            </button>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentServices;