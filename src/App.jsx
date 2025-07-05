import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Helper components to simulate shadcn/ui structure and styling
// In a real project, these would be imported from your library, e.g., '@/components/ui/button'

const Button = ({ children, className, ...props }) => (
    <button 
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
    >
        {children}
    </button>
);

const Card = ({ children, className, ...props }) => (
    <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>
        {children}
    </motion.div>
);

const CardHeader = ({ children, className, ...props }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ children, className, ...props }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

const CardContent = ({ children, className, ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
    </div>
);

const Accordion = ({ children, className }) => (
    <div className={`space-y-4 ${className}`}>{children}</div>
);

const AccordionItem = ({ value, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-800">
            {React.Children.map(children, child => 
                React.cloneElement(child, { isOpen, setIsOpen })
            )}
        </div>
    );
};

const AccordionTrigger = ({ children, isOpen, setIsOpen }) => (
    <button 
        className="flex flex-1 items-center justify-between py-4 font-bold text-xl w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
    >
        {children}
        <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className={`h-6 w-6 shrink-0`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </motion.svg>
    </button>
);

const AccordionContent = ({ children, isOpen }) => (
    <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
    >
        <div className="pb-4 pt-0 text-gray-400">{children}</div>
    </motion.div>
);

// --- Contact Modal Component ---
const ContactModal = ({ isOpen, setIsOpen }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        description: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlZxWE3Zn_zxHjItMjcaJjiUo6iQq3_1wKf0KCgJWo8XsCNTYCHd9S-7y5sRTQsuj6/exec";

        try {
            // Using `mode: 'no-cors'` is the key to avoiding the "Failed to fetch" error.
            // It tells the browser to send the request but not to expect to read the response,
            // which is blocked by CORS policy on Google's side after a successful submission.
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            // Because we use 'no-cors', we cannot get a success or error response.
            // We optimistically assume the request was sent successfully.
            setSubmissionStatus('success');

        } catch (error) {
            // This catch block would only trigger for network errors before the request is sent.
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
        }
    };
    
    const handleClose = () => {
        setIsOpen(false);
        // Reset form after a short delay to allow for exit animation
        setTimeout(() => {
            setSubmissionStatus('idle');
            setFormData({ name: '', email: '', company: '', description: '' });
        }, 300);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {submissionStatus === 'success' ? (
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
                                <p className="text-gray-400 mb-6">Your message has been sent. We'll get back to you shortly.</p>
                                <Button onClick={handleClose} className="px-6 py-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">Close</Button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-white mb-2">Let's build together</h2>
                                <p className="text-gray-400 mb-6">Tell us about your project.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.name} onChange={handleChange} />
                                    <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.email} onChange={handleChange} />
                                    <input type="text" name="company" placeholder="Company (Optional)" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.company} onChange={handleChange} />
                                    <textarea name="description" placeholder="Tell us about your project..." required rows="5" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.description} onChange={handleChange}></textarea>
                                    
                                    {submissionStatus === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                                    
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button type="button" onClick={handleClose} className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-600">Cancel</Button>
                                        <Button type="submit" className="px-6 py-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 w-36" disabled={submissionStatus === 'submitting'}>
                                            {submissionStatus === 'submitting' ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Submit Inquiry'}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// Main App Component
export default function App() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- SEO Optimization Hook ---
    useEffect(() => {
        document.title = "Cimulink - We Build Digital Products";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = "Cimulink is a digital product agency that partners with businesses to design, develop, and scale world-class software for startups, enterprises, and scale-ups.";
    }, []);

    const RevealUp = ({ children, delay = 0, stagger = 0.1 }) => {
        const controls = useAnimation();
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
        });

        useEffect(() => {
            if (inView) {
                controls.start("visible");
            }
        }, [controls, inView]);

        const variants = {
            hidden: { opacity: 0, y: 75 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    delay: delay,
                    staggerChildren: stagger,
                },
            },
        };

        return (
            <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}>
                {children}
            </motion.div>
        );
    };

    // --- Hero Section ---
    const Hero = () => {
        const scrollingWords = ["Startups", "Enterprises", "Scale-ups", "Marketing sites", "Mobile apps", "E-commerce"];
        return (
            <section className="min-h-screen flex flex-col justify-center items-center text-center p-6">
                <RevealUp>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            We build winning digital products for
                            <div className="h-[clamp(3rem,10vw,5rem)] inline-block align-bottom overflow-hidden">
                                <div className="animate-[scroll-up_10s_infinite]">
                                    {scrollingWords.map(word => (
                                        <span key={word} className="block h-[clamp(3rem,10vw,5rem)] leading-[clamp(3rem,10vw,5rem)] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{word}</span>
                                    ))}
                                </div>
                            </div>
                        </h1>
                    </div>
                    <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Cimulink is a digital product agency that partners with businesses to design, develop, and scale world-class software.
                    </p>
                </RevealUp>
            </section>
        );
    };

    // --- Services Section ---
    const services = [
        { title: "Strategy & Discovery", description: "We work with you to define project goals, understand your users, and create a roadmap for success." },
        { title: "UI/UX Design", description: "Our design team creates intuitive, beautiful, and engaging interfaces that users love." },
        { title: "Web & Mobile Development", description: "Using modern technologies, our developers build robust and high-performance applications." },
        { title: "Scaling & Optimization", description: "We provide ongoing support to scale your product, optimize performance, and add new features." },
    ];

    const Services = () => (
        <section id="services" className="py-20 md:py-32 px-6">
            <div className="container mx-auto">
                <RevealUp>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What we do</h2>
                        <p className="text-lg text-gray-400">From concept to launch, we provide the expertise needed to bring your vision to life.</p>
                    </div>
                </RevealUp>
                <RevealUp>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, i) => (
                             <motion.div key={i} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                                <Card className="bg-gray-900/50 border-gray-800 h-full hover:bg-gray-800/60 hover:border-purple-500/30 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-white">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400">{service.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </RevealUp>
            </div>
        </section>
    );
    

    // --- FAQ Section ---
    const faqs = [
      { q: "How long does a project typically take?", a: "Project timelines vary based on complexity, but a typical MVP is around 3-4 months. We'll provide a detailed timeline after the discovery phase." },
      { q: "What is your pricing model?", a: "We offer flexible models, including fixed-price for well-defined scopes and time-and-materials for more dynamic projects." },
      { q: "How involved will I need to be?", a: "We believe in a collaborative partnership. You'll be involved in key decisions and regular check-ins. Your feedback is crucial." }
    ];

    const FAQ = () => (
      <section id="faq" className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <RevealUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Common questions</h2>
            </div>
          </RevealUp>
          <RevealUp>
            <Accordion>
              {faqs.map((faq, i) => (
                <AccordionItem key={i}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent><p>{faq.a}</p></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealUp>
        </div>
      </section>
    );

    return (
        <div className="bg-black text-gray-100 antialiased">
            <style>{`
                @keyframes scroll-up {
                    0%, 10% { transform: translateY(0%); }
                    15%, 25% { transform: translateY(-16.66%); }
                    30%, 40% { transform: translateY(-33.33%); }
                    45%, 55% { transform: translateY(-50%); }
                    60%, 70% { transform: translateY(-66.66%); }
                    75%, 85% { transform: translateY(-83.33%); }
                    90%, 100% { transform: translateY(0%); }
                }
            `}</style>
            <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
                <nav className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold">Cimulink<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">.</span></a>
                    <Button onClick={() => setIsModalOpen(true)} className="hidden md:inline-block border border-gray-700 hover:border-gray-500 bg-black/50 backdrop-blur-sm px-6 py-3 text-white">Contact Us</Button>
                </nav>
            </header>

            <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

            <main>
                <Hero />
                <Services />
                <FAQ />
            </main>

            <footer className="py-20 md:py-32 px-6">
                <div className="container mx-auto text-center">
                    <RevealUp>
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Have a project in mind?</h2>
                            <button onClick={() => setIsModalOpen(true)} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">Let's talk.</button>
                        </div>
                    </RevealUp>
                    
                </div>
            </footer>
        </div>
    );
}
