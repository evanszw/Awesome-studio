import { useState, useEffect, FormEvent } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Code, Globe, ShoppingCart, Network, Cloud, Database, 
  ShieldCheck, Search, Layout, Video, Palette, 
  BarChart, MousePointer2, Settings, MessageSquare, 
  FileText, UserCog, BookOpen, MapPin, Mail, Phone, 
  ChevronUp, Menu, X, Headset, AtSign, Linkedin, Twitter
} from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

import ServiceCard from "./components/ServiceCard";
import FAQAccordion from "./components/FAQAccordion";
import CookieConsent from "./components/CookieConsent";

const SERVICES = [
  { 
    title: "Web Development (Frontend/Backend)", 
    icon: Code, 
    description: "Custom performant web applications built with modern frameworks and robust backend architectures.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
  },
  { 
    title: "WordPress/CMS Management", 
    icon: Globe, 
    description: "Scalable content management solutions, custom themes, and professional maintenance for your digital footprint.",
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "E-commerce Setup (Shopify/WooCommerce)", 
    icon: ShoppingCart, 
    description: "Complete online store configuration, payment integration, and inventory management optimization.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Network Management", 
    icon: Network, 
    description: "Full-service network design, security implementation, and performance monitoring for local businesses.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Cloud Infrastructure (AWS/Azure)", 
    icon: Cloud, 
    description: "Secure and scalable cloud hosting, serverless architecture, and devops automation solutions.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
  { 
    title: "Database Management & Optimization", 
    icon: Database, 
    description: "Efficient data structures, query optimization, and secure storage for complex application data.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010958384e?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Software Testing", 
    icon: ShieldCheck, 
    description: "Comprehensive manual and automated testing to ensure your software is bug-free and reliable.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop"
  },
  { 
    title: "Software QA", 
    icon: ShieldCheck, 
    description: "Rigorous quality assurance processes to maintain high standards throughout the development lifecycle.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Web Scraping & Data Extraction", 
    icon: Search, 
    description: "Automated data harvesting from web sources for market research and business intelligence.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Web Design (UI/UX)", 
    icon: Layout, 
    description: "Intuitive and aesthetically pleasing user interfaces focused on conversion and user satisfaction.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Video Editing & Motion Graphics", 
    icon: Video, 
    description: "Professional post-production, animated storytelling, and high-impact visual content creation.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Graphic Design & Logo Creation", 
    icon: Palette, 
    description: "Distinctive brand identities, professional logos, and visual assets that represent your studio.",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop"
  },
  { 
    title: "SEO (Technical & Content)", 
    icon: BarChart, 
    description: "Data-driven search engine optimization to increase visibility to site drive organic traffic. Zimbabwe-focused branding and business positioning.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  { 
    title: "IT Support & Troubleshooting", 
    icon: MousePointer2, 
    description: "Rapid technical assistance and hardware/software problem solving for your business operations.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Social Media Management", 
    icon: MessageSquare, 
    description: "Strategic content planning and engagement to build your brand presence across social platforms.",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2148&auto=format&fit=crop"
  },
  { 
    title: "Technical Writing", 
    icon: FileText, 
    description: "Clear documentation, user manuals, and technical guides developed for complex systems.",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2146&auto=format&fit=crop"
  },
  { 
    title: "Virtual Technical Assistant", 
    icon: UserCog, 
    description: "Dedicated remote technical support and administrative assistance for tech-focused operations.",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop"
  },
  { 
    title: "Digital Literacy Tutoring", 
    icon: BookOpen, 
    description: "Empowering individuals and teams with the digital skills needed for the modern technical landscape.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  },
];

const FAQS = [
  {
    question: "Do you provide physical networking services?",
    answer: "Yes, we offer comprehensive Network Management and IT troubleshooting for businesses in both Harare and Bulawayo."
  },
  {
    question: "Can you help scale my small business online?",
    answer: "Absolutely. We specialize in E-commerce setup (Shopify/WooCommerce) and SEO to ensure your side hustle reaches its full potential."
  },
  {
    question: "Do you offer remote support?",
    answer: "Yes, many of our services like Cloud Infrastructure, Virtual Assistance, and Web Development are handled remotely for clients nationwide."
  },
  {
    question: "How long does a typical web development project take?",
    answer: "Timelines vary depending on complexity. A standard landing page may take 1-2 weeks, while a full-stack custom application can take 4-8 weeks or more."
  },
  {
    question: "Do you offer any maintenance packages?",
    answer: "Yes, we provide ongoing maintenance and security update packages for WordPress, custom web apps, and network infrastructure."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept local bank transfers (RTGS/USD), EcoCash, and major credit cards via secure online payment gateways."
  },
  {
    question: "Are your services available for international clients?",
    answer: "Yes, we have worked with clients across the globe. Our technical team is well-versed in remote collaboration and international digital standards."
  },
  {
    question: "Do you provide training for the systems you develop?",
    answer: "Absolutely. We offer Digital Literacy Tutoring and system walkthroughs to ensure your team is confident using the tools we build for you."
  }
];

const BLOG_POSTS = [
  {
    title: "Securing Modern Cloud Infrastructure in Zimbabwe",
    excerpt: "Exploring the nuances of AWS and Azure deployments within the local technical landscape and why security is non-negotiable.",
    date: "MAY 10, 2026",
    readTime: "5 MIN READ",
    category: "CLOUD // SECURITY",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010958384e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Why WordPress is Still King for Harare's Entrepreneurs",
    excerpt: "Analyzing why CMS platforms remain the most cost-effective and scalable solution for rapid digital footprint expansion.",
    date: "MAY 05, 2026",
    readTime: "4 MIN READ",
    category: "WEB // CMS",
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "The Rise of Data Extraction in Market Research",
    excerpt: "How web scraping is empowering local businesses with competitive intelligence and real-time market data analysis.",
    date: "APR 28, 2026",
    readTime: "6 MIN READ",
    category: "DATA // RESEARCH",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({ name: "", email: "", service: "", details: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleService = (title: string) => {
    setSelectedServices(prev => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const handleGetQuote = () => {
    const servicesList = Array.from(selectedServices).join(", ");
    setFormData(prev => ({
      ...prev,
      // If servicesList is already in details, we might duplicate it, but let's assume a fresh addition
      details: servicesList ? `I AM INTERESTED IN THE FOLLOWING MODULES: ${servicesList}. \n\n${prev.details}` : prev.details
    }));
    scrollToSection("contact");
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "IDENTIFICATION REQUIRED";
    if (!formData.email.trim()) newErrors.email = "CORE EMAIL REQUIRED";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "INVALID EMAIL PROTOCOL";
    if (!formData.service) newErrors.service = "MODULE SELECTION REQUIRED";
    if (!formData.details.trim()) newErrors.details = "REQUIREMENT DETAILS REQUIRED";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert("ASSESSMENT REQUEST INITIALIZED. OUR TEAM WILL CONTACT YOU SHORTLY.");
        setFormData({ name: "", email: "", service: "", details: "" });
        setErrors({});
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const Logo = ({ className = "w-10 h-10" }) => (
    <div className={`relative ${className} group`}>
      <img 
        src="/1.png" 
        alt="Awesome Studio" 
        className="w-full h-full object-contain group-hover:scale-110 transition-transform absolute inset-0 z-10" 
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
        referrerPolicy="no-referrer"
      />
      <div className="w-full h-full bg-brand-blue flex items-center justify-center font-mono font-bold text-white rounded-lg shadow-lg shadow-brand-blue/20">
        AS
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-blue selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-brand-black/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo className="w-10 h-10" />
            <span className="font-mono font-bold text-lg tracking-tighter">
              AWESOME<span className="text-brand-blue">STUDIO</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/70">
            {["services", "about", "blog", "faqs", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="hover:text-brand-blue transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("contact")}
              className="bg-brand-blue text-white px-4 py-2 hover:bg-brand-blue-light transition-colors rounded-lg"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-[200]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-brand-black z-[150] flex flex-col items-center justify-center p-6 md:hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-blue rounded-full blur-[100px]" />
              </div>

              <div className="flex flex-col items-center gap-6 w-full max-w-xs relative z-10">
                {["services", "about", "blog", "faqs", "contact"].map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item)}
                    className="text-3xl font-bold uppercase tracking-tighter hover:text-brand-blue transition-colors w-full text-center py-2"
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.button 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => scrollToSection("contact")}
                  className="btn-primary w-full mt-8"
                >
                  Get Quote
                </motion.button>
              </div>

              {/* Mobile Menu Footer Info */}
              <div className="absolute bottom-12 left-0 w-full px-6 flex flex-col items-center gap-6 text-white/30 font-mono text-[10px] uppercase tracking-widest relative z-10 mt-12">
                <div className="flex gap-8">
                  <Linkedin className="w-5 h-5 hover:text-brand-blue transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-brand-blue transition-colors" />
                  <AtSign className="w-5 h-5 hover:text-brand-blue transition-colors" />
                </div>
                <span className="opacity-50">Harare // Zimbabwe // Built for Growth</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-tight">
              Next-Gen Tech Solutions for Your <span className="text-brand-blue">Side Hustle</span> and Beyond.
            </h1>
            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
              Professional Web Development, Network Management, and Digital Strategy based in Harare & Bulawayo. Elevating modern businesses through high-tech precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection("contact")}
                className="btn-primary"
              >
                Get a Quote
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="btn-outline"
              >
                View Services
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] bg-brand-charcoal overflow-hidden command-border rounded-3xl glow-blue">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                alt="Command Center Code Terminal"
                className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
              
              {/* Overlay elements */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-brand-blue/50" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-blue">System State: Active</span>
                </div>
              </div>
            </div>
            
            {/* Command-center accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-blue opacity-20 hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-blue opacity-20 hidden md:block" />
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="font-mono text-brand-blue text-xs tracking-widest uppercase mb-4 block">01 // Modules</span>
              <h2 className="text-4xl md:text-5xl">Our Core Services</h2>
            </div>
            <p className="text-white/50 font-mono text-xs max-w-xs leading-relaxed border-l border-brand-blue/30 pl-6">
              WE PROVIDE END-TO-END TECH INFRASTRUCTURE FOR THE MODERN ZIMBABWEAN ENTREPRENEUR. HARARE 
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                title={service.title} 
                description={service.description}
                imageUrl={service.imageUrl}
                icon={service.icon} 
                index={index} 
                isSelected={selectedServices.has(service.title)}
                onToggle={() => toggleService(service.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-brand-blue text-xs tracking-widest uppercase mb-4 block">02 // Origin</span>
              <h2 className="text-4xl md:text-5xl mb-8">Beyond the Code</h2>
              <div className="space-y-6 text-white/60 leading-relaxed font-sans text-lg">
                <p>
                  Awesome Studio Tech is a multifaceted digital agency dedicated to bridging the gap between innovative ideas and technical execution. Our mission is to empower entrepreneurs and businesses with high-precision technical tools, creative strategy, and robust infrastructure.
                </p>
                <p>
                  Founded on the principles of efficiency and craftsmanship, we operate from the heart of Zimbabwe, delivering local service with international standards. We believe that every "side hustle" deserves the infrastructure of a global enterprise.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-brand-charcoal command-border rounded-2xl">
                  <h4 className="text-brand-blue font-bold text-2xl mb-1">100+</h4>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Projects Implemented</p>
                </div>
                <div className="p-6 bg-brand-charcoal command-border rounded-2xl">
                  <h4 className="text-brand-blue font-bold text-2xl mb-1">24/7</h4>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Technical Oversight</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video lg:aspect-square bg-brand-charcoal rounded-3xl overflow-hidden command-border glow-blue">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Our collaborative workspace"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/80 via-transparent to-transparent" />
              </div>
              {/* Accents */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-brand-blue/30" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-brand-blue/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="font-mono text-brand-blue text-xs tracking-widest uppercase mb-4 block">03 // Intel</span>
              <h2 className="text-4xl md:text-5xl">Technical Logs</h2>
            </div>

            <div className="flex gap-4">
              <button className="p-3 border border-white/10 rounded-xl hover:border-brand-blue transition-colors group">
                <BarChart className="w-5 h-5 text-white/30 group-hover:text-brand-blue" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <motion.article 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video mb-6 overflow-hidden rounded-2xl command-border">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 py-1 px-3 bg-brand-black/80 backdrop-blur-md rounded-lg font-mono text-[10px] text-brand-blue border border-brand-blue/30">
                    {post.category}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-brand-blue rounded-full" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl group-hover:text-brand-blue transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 font-mono text-[10px] text-brand-blue uppercase tracking-widest group/btn">
                    <span>READ LOG</span>
                    <Code className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-24 bg-brand-black border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-brand-blue text-xs tracking-widest uppercase mb-4 block">04 // Protocols</span>
            <h2 className="text-4xl">Common Inquiries</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-mono text-brand-blue text-xs tracking-widest uppercase mb-4 block">05 // Communication</span>
              <h2 className="text-4xl md:text-5xl mb-8">Ready to Start ?</h2>

              
              <div className="space-y-8 mt-12 font-mono">
                <div className="flex items-start gap-5 sm:gap-6 group">
                  <div className="p-3 bg-brand-blue/10 group-hover:bg-brand-blue transition-colors rounded-xl shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue mb-1 text-xs sm:text-sm uppercase font-bold">Base of Operations</h4>
                    <p className="text-white/70 text-sm sm:text-base">Harare & Bulawayo, Zimbabwe</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 sm:gap-6 group">
                  <div className="p-3 bg-brand-blue/10 group-hover:bg-brand-blue transition-colors rounded-xl shrink-0">
                    <AtSign className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue mb-1 text-xs sm:text-sm uppercase font-bold">Secure Channels</h4>
                    <p className="text-white/70 text-xs sm:text-sm break-all">awesomestudio@gmail.com</p>
                    <p className="text-white/70 text-xs sm:text-sm break-all">takudzwaesanyanga@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 sm:gap-6 group">
                  <div className="p-3 bg-brand-blue/10 group-hover:bg-brand-blue transition-colors rounded-xl shrink-0">
                    <Headset className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue mb-1 text-xs sm:text-sm uppercase font-bold">Direct Support</h4>
                    <p className="text-white/70 text-sm sm:text-base">0780145076</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-charcoal p-8 md:p-12 command-border glow-blue relative">
              <h3 className="text-2xl mb-8">Request Initial Assessment</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/50">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-brand-black border ${errors.name ? 'border-red-500' : 'border-white/10'} p-4 focus:border-brand-blue outline-none transition-colors text-sm rounded-xl`} 
                    placeholder="Enter identification..."
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/50">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-brand-black border ${errors.email ? 'border-red-500' : 'border-white/10'} p-4 focus:border-brand-blue outline-none transition-colors text-sm rounded-xl`} 
                    placeholder="name@provider.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-[10px] uppercase tracking-widest text-white/50">Service Type</label>
                  <select 
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full bg-brand-black border ${errors.service ? 'border-red-500' : 'border-white/10'} p-4 focus:border-brand-blue outline-none transition-colors text-sm appearance-none cursor-pointer rounded-xl`}
                  >
                    <option value="">Select Module...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                  {errors.service && <p className="text-[10px] text-red-500 mt-1">{errors.service}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="details" className="text-[10px] uppercase tracking-widest text-white/50">Details</label>
                  <textarea 
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className={`w-full bg-brand-black border ${errors.details ? 'border-red-500' : 'border-white/10'} p-4 focus:border-brand-blue outline-none transition-colors text-sm min-h-[120px] rounded-xl`} 
                    placeholder="Explain your technical requirements..."
                  />
                  {errors.details && <p className="text-[10px] text-red-500 mt-1">{errors.details}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "PROCESSING..." : "Send  QUOTE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 font-mono font-bold">
              <Logo className="w-8 h-8" />
              <span className="text-white tracking-tighter">AWESOME<span className="text-brand-blue">STUDIO</span></span>
            </div>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]"> © 2026</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-12 font-mono text-[10px] uppercase tracking-widest text-white/50">
            <a href="#" className="hover:text-brand-blue transition-colors">awesomestudio.co.zw</a>
            <span>Harare // Zimbabwe</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://linkedin.com/company/awesomestudiotech" 
              className="text-white/30 hover:text-brand-blue transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/awesomestudiotz" 
              className="text-white/30 hover:text-brand-blue transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/263780145076?text=Hi%20Awesome%20Studio%20Tech,%20I'm%20interested%20in%20your%20services." 

              className="text-white/50 hover:text-brand-blue transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="mailto:awesomestudio@gmail.com" className="text-white/50 hover:text-brand-blue transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
        <AnimatePresence>
          {selectedServices.size > 0 && (
            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              onClick={handleGetQuote}
              className="bg-brand-blue text-white px-6 py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(0,112,255,0.4)] flex items-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ShoppingCart className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Get Quote ({selectedServices.size})</span>
            </motion.button>
          )}
        </AnimatePresence>

        {isScrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-brand-charcoal command-border flex items-center justify-center text-white hover:bg-brand-blue hover:text-white transition-all shadow-xl rounded-xl"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
        
        <a 
          href="https://wa.me/263780145076?text=Hi%20Awesome%20Studio%20Tech,%20I'm%20interested%20in%20your%20services." 
          className="w-14 h-14 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,112,255,0.4)] hover:scale-110 active:scale-95 transition-all animate-bounce"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquare className="w-7 h-7" />
        </a>
      </div>

      <CookieConsent />
    </div>
  );
}
