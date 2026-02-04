import { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, CheckCircle2, ShieldCheck } from 'lucide-react';

const PRODUCT_NAME = "Dhurandar Oil";
const UNIT_PRICE = 999;

const BenefitList = memo(() => (
  <ul className="space-y-3 mb-8">
    {[
      "100% Ayurvedic & Natural",
      "Fast Acting Pain Relief",
      "No Side Effects",
      "Free Shipping across India"
    ].map((item, index) => (
      <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
));

const Buy = memo(function Buy() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const totalPrice = quantity * UNIT_PRICE;

  const handleIncrease = useCallback(() => setQuantity((prev) => prev + 1), []);
  const handleDecrease = useCallback(() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)), []);

  const handleCheckout = useCallback((e) => {
    e.preventDefault();
    navigate('/checkout', {
      state: {
        productName: PRODUCT_NAME,
        quantity,
        totalPrice,
        unitPrice: UNIT_PRICE
      }
    });
  }, [navigate, quantity, totalPrice]);

  return (
    <section id="buy" className="relative py-16 bg-blue-50/50 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-200 blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-indigo-200 blur-3xl opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase bg-blue-100 px-3 py-1 rounded-full">
            Limited Time Offer
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Relief is Just a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Click Away</span>
          </h1>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-blue-100 flex flex-col md:flex-row">
          
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-linear-to-br from-white to-blue-50/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Choose {PRODUCT_NAME}?</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Experience fast, natural relief from joint pain with our premium Ayurvedic formula. 
              Trusted by thousands across India, our blend ensures mobility and comfort within days.
            </p>
            <BenefitList />
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-blue-50 w-fit px-4 py-2 rounded-lg border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Certified Safe & Effective</span>
            </div>
          </div>

          <div className="p-8 md:p-12 md:w-1/2 bg-white border-t md:border-t-0 md:border-l border-blue-100 flex flex-col justify-center">
            <form onSubmit={handleCheckout}>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-slate-500 font-medium mb-1">Total Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900 tabular-nums">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm font-medium">/ ₹{UNIT_PRICE} each</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                  In Stock
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-3">
                  Select Quantity
                </label>
                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <button 
                    type="button" 
                    onClick={handleDecrease}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={20} />
                  </button>
                  <input
                    id="quantity"
                    name="quantity"
                    readOnly
                    value={quantity}
                    className="text-xl font-bold text-slate-800 tabular-nums w-12 text-center bg-transparent focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleIncrease}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <span>Proceed to Checkout</span>
                <ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-400">
              Secure payment via UPI, Card, or COD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Buy;