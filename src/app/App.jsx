import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Lazy load components for code splitting
const HomePage = lazy(() => import("./components/HomePage"));
const CheckoutPage = lazy(() => import("./components/CheckoutPage"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-blue-50">
    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;