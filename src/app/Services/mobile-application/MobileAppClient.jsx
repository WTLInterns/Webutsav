"use client";

import { useState ,useRef,useEffect} from "react";
import Image from "next/image";
import {
  FaPlus,
  FaMinus,
  FaGlobe,
  FaShoppingCart,
  FaCogs,
  FaGoogle,
  FaSearch,
  FaMapMarkerAlt,
  FaShareAlt,
  FaMobileAlt 
} from "react-icons/fa";
import { motion ,useInView,useAnimation} from "framer-motion";
import { Globe, LineChart, Laptop, Lock, Rocket, Code, Wrench,CheckCircle } from "lucide-react"
import Link from "next/link";
// import Head from "next/head";

const faqs = [
  {
    question: "1. What is Mobile Application Development?",
    answer:"Mobile Application Development is the process of creating software applications that run on mobile devices like smartphones and tablets. This involves designing, coding, testing, and deploying the app to meet the needs of the target audience.",
  },
  {
    question: "2. Why Should My Business Invest in a Mobile App?",
    answer:"Investing in a mobile app allows your business to reach customers directly, improve engagement, streamline operations, and boost sales. It provides your customers with a more personalized, convenient and efficient way to interact with your business.",
  },
  {
    question: "3. What Types of Mobile Apps Can You Develop?",
    answer:"We specialize in developing native mobile apps for iOS and Android, as well as cross-platform mobile apps that work seamlessly on both platforms. We also offer enterprise mobile application development for businesses seeking to optimize their internal operations.",
  },
  {
    question: "4. How Long Does It Take to Develop a Mobile App?",
    answer:"The development timeline for a mobile app depends on its complexity, features, and functionality. On average, it can take anywhere from a few weeks to several months to develop and launch a fully functional mobile app",
  },
  {
    question: "5. How Much Does Mobile Application Development Cost?",
    answer:"The cost of developing a mobile app varies based on factors such as the app's complexity, design requirements, and platform choice. We provide cost-effective solutions tailored to your budget and business needs.",
  },
];

const features = [
  {
    title: "Certified Google Ads Experts",
    description: "We have a team of certified AdWords specialists who optimize your campaigns for success.",
    icon: Globe,
  },
  {
    title: "Data-Driven Strategies",
    description: "We use in-depth analytics to enhance ad performance and maximize ROI.",
    icon: LineChart,
  },
  {
    title: "Conversion-Focused Campaigns",
    description: "Every ad is designed to attract leads, increase sales, and boost business growth.",
    icon: Laptop,
  },
  {
    title: "Multi-Industry Experience ",
    description: "We work with eCommerce, healthcare, education, real estate, finance, and more.",
    icon: Lock,
  },
  {
    title: "Transparent Reporting",
    description: "Get detailed insights into your ad spend, clicks, conversions, and ROI.",
    icon: Rocket,
  },
  {
    title: "Budget-Friendly Solutions",
    description: "We optimize your PPC budget to ensure high-quality traffic without overspending.",
    icon: Code,
  },
]

const services = [
  {
    title: "1. Enhanced Customer Engagement",
    description: "Mobile apps enable direct and personalized communication with customers. With features like push notifications, in-app messaging, and real-time updates, you can stay connected with your audience, driving better engagement and customer loyalty.",
  },
  {
    title: "2. Brand Recognition",
    description: "Having your mobile app makes your brand more accessible and visible to customers. When users download and regularly use your app, your brand stays top-of-mind, leading to increased brand awareness and recognition.",
  },
  {
    title: "3. Increased Sales and Conversions",
    description: "Mobile apps can streamline the purchasing process, making it easier for customers to buy your products or services. With features like in-app payments, shopping carts, and seamless checkout processes, you can boost sales and conversions.",
  },
  {
    title: "4. Better User Experience",
    description: "Unlike mobile websites, apps are designed to provide a smoother and more user-friendly experience. With optimized performance, faster load times, and offline functionality, your customers will enjoy an enhanced experience that encourages them to return.",
  },
  {
    title: "5. Competitive Advantage",
    description: "Incorporating a mobile app into your business model gives you a competitive edge. With more customers turning to apps for convenience and functionality, offering an app positions you ahead of competitors who may not have one",
  },
]

const expertiseItems = [
  { title: "1. Native Mobile Apps:Native mobile applications are developed for specific platforms like iOS or Android. These apps offer superior performance, better security, and a more seamless user experience. Our team of experts develops apps that make the most of each platform's features."},
  { title: "2. Cross-Platform Mobile Apps:Cross-platform apps are built using frameworks like React Native and Flutter, enabling businesses to target both iOS and Android users with a single codebase. These apps are cost-effective and deliver a consistent experience across devices."},
  { title: "3. Enterprise Mobile Apps:For large organizations, we offer enterprise mobile application development services that focus on enhancing business efficiency, improving employee collaboration, and integrating business processes. Our enterprise apps are secure, scalable, and tailored to meet the specific needs of your organization."},
]

const technologies = [
  {
    category: "Frontend Technologies",
    items: [
      { name: "HTML5", logo: "/Technologies/html5.webp" },
      { name: "CSS3", logo: "/Technologies/CSS3.webp" },
      { name: "JavaScript", logo: "/Technologies/javascript.webp" },
      { name: "React.js", logo: "/Technologies/React_js.webp" },
      { name: "Angular", logo: "/Technologies/angularjs.webp" },
      { name: "Vue.js", logo: "/Technologies/Vue.webp" },
    ],
  },
  {
    category: "Backend Technologies",
    items: [
      { name: "PHP", logo: "/Technologies/PHP.webp" },
      { name: "Node.js", logo: "/Technologies/Node.webp" },
      { name: "Python", logo: "/Technologies/Python.webp" },
      { name: "Java", logo: "/Technologies/java.webp" },
      { name: "Laravel", logo: "/Technologies/Laravel.webp" },
      { name: "Django", logo: "/Technologies/django.webp" },
      { name: "Express.js", logo: "/Technologies/express.jpg" },
    ],
  },
  {
    category: "eCommerce Platforms",
    items: [
      { name: "Shopify", logo: "/Technologies/Shopify.webp" },
      { name: "WooCommerce", logo: "/Technologies/woocommerce.webp" },
      { name: "Magento", logo: "/Technologies/Magento.webp" },
    ],
  },
  {
    category: "CMS Solutions",
    items: [
      { name: "WordPress", logo: "/Technologies/WordPress.webp" },
      { name: "Joomla", logo: "/Technologies/Joomla.webp" },
      { name: "Drupal", logo: "/Technologies/drupal.webp" },
    ],
  },
]

const TechItem = ({ item }) => (
  <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <img src={item.logo || "/placeholder.svg"} alt={`${item.name} logo`} className="w-6 h-6" />
    <span className="text-xs font-medium text-gray-800">{item.name}</span>
  </motion.div>
)

const FadeInSection = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default function MobileApplication() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [openIndex, setOpenIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
     
    
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <motion.div
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/aboutus.jpg"
            alt="Google AdWords"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-6 md:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-yellow-400 font-bold text-xl sm:text-2xl md:text-3xl mb-4"
            >
              — Our Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight"
            >
              Mobile Application Development
            </motion.h1>
          </div>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex flex-wrap p-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/5 bg-gradient-to-b from-white to-gray-100 p-6 shadow-lg rounded-lg mb-6 md:mb-0">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              All Services
            </h3>
            <ul className="space-y-4">
              {[
                {
                  name: "Web Designing & Development",
                  icon: <FaGlobe />,
                  href: "/Services/web-designing-development",
                },
                {
                  name: "Ecommerce Website Designing",
                  icon: <FaShoppingCart />,
                  href: "/Services//ecommerce-website-designing",
                },
                {
                  name: "Google Adwords",
                  icon: <FaGoogle />,
                  href: "/Services/google-adwords",
                },
                {
                  name: "Search Engine Optimisation",
                  icon: <FaSearch />,
                  href: "/Services/search-engine-optimisation",
                },
                {
                  name: "Local SEO",
                  icon: <FaMapMarkerAlt />,
                  href: "/Services/local-seo",
                },
                {
                  name: "Social Media Marketing",
                  icon: <FaShareAlt />,
                  href: "/Services/social-media-marketing",
                },
                {
                  name: "Mobile Application Development",
                  icon: <FaMobileAlt/>,
                  href: "/Services/mobile-application",
                },
              ].map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link
                    href={service.href}
                    className="group flex items-center space-x-3 p-3 rounded-md transition-all duration-200 hover:bg-white hover:shadow-md cursor-pointer"
                  >
                    <span className="text-red-500 group-hover:text-red-600 transition-colors duration-200">
                      {service.icon}
                    </span>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-200">
                      {service.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="w-full md:w-3/5 max-w-8xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-800">
            Mobile Application Development Services by Webutsav
            </h1>
            <p className="text-gray-600 mt-6 text-2xl" >
            In today's mobile-first world, having a mobile application for your business is more essential than ever. Whether you're looking to enhance customer engagement, streamline operations, or boost sales, a custom mobile app can offer unparalleled benefits. At Webutsav, we specialize in Mobile Application Development services tailored to your unique business needs. As a leading mobile application development company in Pune, we are committed to helping businesses of all sizes create high-quality mobile apps that drive growth and improve user experiences.
            </p>
            <p className="text-gray-600 mt-6 text-2xl" >
            From conceptualization to launch, our team of skilled developers ensures your mobile app is designed and developed to meet the highest standards. Whether you're looking for enterprise mobile application development or need a custom app for your local business, Webutsav is here to bring your vision to life.
            </p>
          </div>
        </div>

        <section className="w-full py-10 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Choose Mobile Application Development for Your Business?</h2>
            <p className="text-center text-blue-200 mb-8 max-w-2xl mx-auto">
            In today's digital era, mobile applications play a crucial role in business growth. Whether you run a small startup or a large enterprise, investing in mobile application development can offer several advantages:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="group">
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl font-bold text-blue-400 mr-2 group-hover:text-blue-300 transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h4 className="text-lg font-semibold group-hover:text-blue-300 transition-colors">{service.title}</h4>
                  </div>
                  <p className="text-sm text-blue-100 ml-8 border-l border-blue-700 pl-3 py-1 group-hover:border-blue-500 transition-colors">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <h4 className="text-2xl font-semibold mb-12 text-center">Our Expertise in Mobile Application Development</h4>
            </FadeInSection>
            <p className="text-sm md:text-base mb-6 text-center max-w-3xl mx-auto text">
            At Webutsav, we have extensive expertise in creating custom mobile applications for a variety of industries. Our team has experience working with businesses across various sectors, including retail, healthcare, finance, education, and entertainment.
            We specialize in building both native mobile applications (iOS and Android) and cross-platform apps that work seamlessly across multiple devices. Additionally, we offer solutions like enterprise mobile application development to help large organizations streamline their operations, improve productivity, and enhance customer service
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseItems.map((item, index) => (
                <FadeInSection key={index}>
                  <div className="border-l-4 border-blue-500 pl-6 py-4 h-full">
                    <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="container mx-auto py-2 px-4 md:px-6 lg:px-8">
          <div className="p-6 mt-12">
            <h4 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Frequently Asked Questions (FAQs) About Mobile Application Development
            </h4>
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800 p-4 bg-white shadow rounded-lg"
                  >
                    {faq.question}
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </button>
                  {openIndex === index && (
                    <p className="p-4 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16 px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold text-white tracking-wide mb-8"
          >
            Webutsav – The Best Mobile Application Development Company in Pune, Maharashtra
          </motion.h2>
          <p className="text-sm md:text-base mb-6 text-center max-w-3xl mx-auto text">
          Webutsav is a trusted Mobile Application Development company Pune, Maharashtra, offering expert solutions to boost your website rankings. Our team ensures top-notch SEO strategies tailored to your business needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none"
          >
            🚀 Want to Grow Your Business with Mobile Application Development ? 🚀
          </motion.button>
        </div>
      </div>
    </>
  );
}     