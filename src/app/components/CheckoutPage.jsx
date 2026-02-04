import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, MapPin, User, Mail, Phone, 
  CheckCircle, ShoppingBag, ArrowRight, 
  ShieldCheck, Loader2, AlertCircle 
} from "lucide-react";
import axios from "axios";
// Helper to load Razorpay Script
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve state passed from Buy.jsx, with fallbacks
  const { 
    productName = "Dhurandar Oil", 
    quantity = 1, 
    unitPrice = 999, 
    totalPrice = 999 
  } = location.state || {};

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "card",
  });

  const [status, setStatus] = useState("idle"); // idle, processing, success, error

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

const handlePayment = async () => {
  const isLoaded = await loadRazorpay();
  if (!isLoaded) return alert("Razorpay SDK failed to load.");

  // 1. Create order on your backend
  const { data: order } = await axios.post("http://localhost:5000/api/razorpay/create-order", {
    amount: totalPrice,
    customerDetails: form, // includes name, email, address
  });

  // 2. Open Razorpay Modal
  const options = {
    key: "rzp_test_xxxxxxx", // Use your Key ID
    amount: order.amount,
    currency: order.currency,
    name: "Dhurandar Oil",
    description: "Premium Quality Oil",
    order_id: order.id,
    handler: async (response) => {
      // 3. Verify payment on backend
      const verifyRes = await axios.post("http://localhost:5000/api/razorpay/verify", response);
      if (verifyRes.data.message === "Payment verified successfully") {
        setStatus("success");
      }
    },
    prefill: {
      name: form.name,
      email: form.email,
      contact: form.phone,
    },
    theme: { color: "#2563eb" },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex justify-center py-12 px-4 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full grid md:grid-cols-3 gap-8 relative z-10"
      >
        {/* Checkout Form / Status Area */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-white/70 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl shadow-blue-900/5 p-8"
        >
          <div className="md:flex justify-between gap-3 mb-8">
            <a href="/" className="absolute top-2 right-5 self-center text-blue-600 font-medium">Home</a>
            <div className="flex gap-3 items-center">
                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Secure Checkout</h2>
                  <p className="text-sm text-slate-500">Complete your purchase securely</p>
                </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                >
                  <CheckCircle size={40} strokeWidth={3} />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-800">Payment Successful!</h3>
                <p className="text-slate-500 max-w-xs">
                  Your order for <strong>{productName}</strong> has been confirmed. A confirmation email has been sent to {form.email}.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-300"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </motion.button>
              </motion.div>
            )}

            {status === "error" && (
               <motion.div
               key="error"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="flex flex-col items-center justify-center py-12 text-center space-y-4"
             >
               <motion.div 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1 }} 
                 transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                 className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600"
               >
                 <AlertCircle size={40} strokeWidth={3} />
               </motion.div>
               <h3 className="text-2xl font-bold text-slate-800">Payment Failed</h3>
               <p className="text-slate-500 max-w-xs">
                 Something went wrong with the transaction. Please try again or use a different payment method.
               </p>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="mt-4 px-6 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-xl font-medium"
                 onClick={() => setStatus("idle")}
               >
                 Try Again
               </motion.button>
             </motion.div>
            )}

            {(status === "idle" || status === "processing") && (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handlePayment} 
                className="space-y-6"
              >
                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Contact Details</h4>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField 
                      icon={<User size={18} />} 
                      name="name" 
                      placeholder="Full Name" 
                      value={form.name} 
                      onChange={handleChange} 
                    />
                    <InputField 
                      icon={<Mail size={18} />} 
                      name="email" 
                      type="email" 
                      placeholder="Email Address" 
                      value={form.email} 
                      onChange={handleChange} 
                    />
                  </div>
                  <InputField 
                    icon={<Phone size={18} />} 
                    name="phone" 
                    placeholder="Phone Number" 
                    value={form.phone} 
                    onChange={handleChange} 
                  />
                </div>

                {/* Shipping Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Shipping Address</h4>
                  
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <textarea
                      name="address"
                      placeholder="Street Address, Apt, Suite"
                      required
                      value={form.address}
                      onChange={handleChange}
                      rows="2"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField 
                      name="city" 
                      placeholder="City" 
                      value={form.city} 
                      onChange={handleChange} 
                    />
                    <InputField 
                      name="pincode" 
                      placeholder="Zip / Postal Code" 
                      value={form.pincode} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                {/* Payment Selector */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Payment Method</h4>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    <select
                      name="payment"
                      value={form.payment}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="upi">UPI / Net Banking</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <ArrowRight size={16} className="text-slate-400 rotate-90" />
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "processing"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2
                    ${status === "processing" 
                      ? "bg-slate-300 cursor-not-allowed text-slate-500" 
                      : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white"
                    }`}
                >
                  {status === "processing" ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{totalPrice.toLocaleString()}</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Order Summary (Dynamic) */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl shadow-blue-900/5 p-8 h-fit top-8 sticky"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <ShoppingBag size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your Order</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex gap-3">
                {/* Product Thumbnail Placeholder */}
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-bold border border-slate-200">
                   IMG
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{productName}</p>
                  <p className="text-xs text-slate-400">Qty: {quantity}</p>
                </div>
              </div>
              <span className="font-medium text-slate-700">₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Tax (18%)</span>
                <span>Included</span>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-slate-200 pt-4 mt-4 flex justify-between items-end">
              <div>
                <span className="text-sm text-slate-400">Total Amount</span>
                <p className="text-2xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
             <p className="text-xs text-blue-600 flex gap-2">
                <ShieldCheck size={16} /> 
                Payments are SSL encrypted and secured.
             </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Reusable Input Component
const InputField = ({ icon, ...props }) => (
  <div className="relative group">
    {icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
    )}
    <input
      required
      {...props}
      className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 ${icon ? 'pl-12' : 'pl-4'} pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm group-hover:shadow-md`}
    />
  </div>
);