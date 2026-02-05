import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, ShoppingBag, ArrowRight, 
  ShieldCheck, Loader2, CheckCircle, AlertCircle, ChevronDown 
} from "lucide-react";
import axios from "axios";

// --- Static Data ---
const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
  "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// --- Reusable Polymorphic Field Component with Error Handling ---
const Field = ({ 
  label, 
  icon: Icon, 
  as: Component = "input", 
  error, 
  className = "", 
  children,
  ...props 
}) => (
  <div className={`relative group ${className}`}>
    <div className="relative">
      {Icon && (
        <Icon 
          size={18} 
          className={`absolute left-4 top-4 transition-colors duration-200 
            ${error ? "text-red-400" : "text-slate-400 group-focus-within:text-indigo-600"}`} 
        />
      )}
      <Component
        {...props}
        className={`w-full bg-white/70 backdrop-blur-md border rounded-xl px-4 pt-5 pb-2 text-slate-700 outline-none transition-all duration-200 font-medium
        ${Icon ? "pl-11" : "pl-4"} 
        ${Component === 'textarea' ? 'min-h-20 resize-none' : 'h-14'}
        ${error 
          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
          : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        }`}
        placeholder=" " // Required for floating label trick
      >
        {children}
      </Component>
      
      {/* Floating Label */}
      <label className={`absolute left-0 pointer-events-none transition-all duration-200 origin-left
        ${Icon ? "translate-x-11" : "translate-x-4"}
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:text-slate-500
        scale-75 -translate-y-2 text-indigo-500 font-semibold top-3
        ${error ? "text-red-500" : ""}`}
      >
        {label}
      </label>

      {/* Select Chevron Override */}
      {Component === "select" && (
        <ChevronDown className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={16} />
      )}
    </div>
    
    {/* Error Message Animation */}
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -5 }}
          className="absolute -bottom-5 left-1 flex items-center gap-1 text-[11px] font-semibold text-red-500 mt-1"
        >
          <AlertCircle size={10} /> {error}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { productName = "Dhurandar Oil", quantity = 1, totalPrice = 999 } = useLocation().state || {};
  
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", state: "", city: "", pincode: "", payment: "cod" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // Validation Logic
  const validate = (name, value) => {
    switch (name) {
      case "email": 
        return !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email address" : "";
      case "phone": 
        return !/^[6-9]\d{9}$/.test(value) ? "Must be a valid 10-digit number" : "";
      case "pincode": 
        return !/^[1-9][0-9]{5}$/.test(value) ? "Must be a valid 6-digit pincode" : "";
      case "name":
        return value.length < 3 ? "Name must be at least 3 characters" : "";
      case "address":
        return value.length < 10 ? "Address is too short" : "";
      default: return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error immediately on change, or validate on the fly if you prefer strictness
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validate(name, value);
    if (errorMsg) setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submitting
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validate(key, form[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0 || !form.state || !form.city) {
      setErrors(newErrors);
      // Basic shake animation trigger could go here
      return;
    }

    setStatus("loading");
    try {
      await axios.post("http://dhurandar-oil-backend-production.up.railway.app/api/orders/create", {
        fullName: form.name, email: form.email, phoneNumber: form.phone,
        shippingAddress: { street: form.address, city: form.city, state: form.state, pincode: form.pincode },
        productDetails: { name: productName, quantity, price: totalPrice }, totalAmount: totalPrice, paymentType: form.payment
      });
      setStatus("success");
    } catch { 
      setStatus("error"); 
      setTimeout(() => setStatus("idle"), 3000); // Reset error state after 3s
    }
  };

  if (status === "success") return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-3xl shadow-2xl shadow-green-900/10 text-center relative z-10 max-w-md w-full mx-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
          <CheckCircle size={48} strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Order Placed!</h2>
        <p className="text-slate-500 mb-8">We've sent a confirmation email to {form.email}.</p>
        <button onClick={() => navigate('/')} className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Return Home</button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-soft-light pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl w-full grid lg:grid-cols-12 gap-8 relative z-10"
      >
        
        {/* Left: Checkout Form */}
        <div className="lg:col-span-8 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                Checkout
              </h2>
              <p className="text-sm text-slate-500 mt-1">Complete your order safely</p>
            </div>
            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Section */}
            <section className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-6 h-px bg-slate-300"></span> Contact <span className="w-full h-px bg-slate-100"></span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Full Name" icon={User} name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} />
                <Field label="Email Address" icon={Mail} name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />
              </div>
              <Field label="Phone Number" icon={Phone} name="phone" maxLength={10} value={form.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} />
            </section>

            {/* Shipping Section */}
            <section className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                 <span className="w-6 h-px bg-slate-300"></span> Shipping <span className="w-full h-px bg-slate-100"></span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="State" as="select" name="state" value={form.state} onChange={handleChange} className="appearance-none cursor-pointer">
                  <option value="" disabled hidden></option> {/* Needed for floating label to work with select */}
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </Field>
                <Field label="City" name="city" value={form.city} onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                   <Field label="Street Address" as="textarea" icon={MapPin} name="address" value={form.address} onChange={handleChange} onBlur={handleBlur} error={errors.address} rows={1} />
                </div>
                <Field label="Pincode" name="pincode" maxLength={6} value={form.pincode} onChange={handleChange} onBlur={handleBlur} error={errors.pincode} />
              </div>
            </section>

            <button 
              disabled={status === "loading"} 
              className={`w-full py-4 mt-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-3
              ${status === "loading" ? "bg-slate-100 text-slate-400" : "bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"}`}
            >
              {status === "loading" ? <Loader2 className="animate-spin" /> : <>Pay ₹{totalPrice} <ArrowRight size={20} /></>}
            </button>
            
            {status === "error" && (
              <p className="text-center text-red-500 text-sm font-medium animate-pulse">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 lg:sticky lg:top-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 text-lg">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><ShoppingBag size={18} /></div> 
              Order Summary
            </h3>
            
            <div className="flex gap-4 pb-6 border-b border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden">
                 {/* Placeholder Image - Replace with actual img tag if needed */}
                 <span className="text-xs font-bold text-slate-300">PRODUCT</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate">{productName}</p>
                <p className="text-xs font-medium text-slate-400 mt-1">Qty: {quantity}</p>
                <p className="font-bold text-indigo-600 mt-2">₹{totalPrice}</p>
              </div>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span> <span>₹{totalPrice}</span></div>
              <div className="flex justify-between text-sm text-slate-500"><span>Shipping</span> <span className="text-green-600 font-medium">Free</span></div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex justify-between items-end">
              <span className="text-sm font-bold text-slate-400">Total Due</span>
              <span className="text-3xl font-bold text-slate-800 tracking-tight">₹{totalPrice}</span>
            </div>
            
             <div className="mt-6 bg-slate-50 rounded-xl p-4 flex gap-3 border border-slate-100">
              <ShieldCheck size={20} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                We use industry-standard encryption to protect your details. Your data is safe with us.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}