import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Card, CardBody } from "./Card";
import { useAuth } from "../context/AuthContext";

// --- START: LoginModal Component ---
export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  // Enhanced close handler
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full bg-black/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
              <CardBody className="p-8 relative">
                {/* Close Button - Fixed positioning and z-index */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-white/90 text-sm drop-shadow-md">
                    Sign in to continue your journey
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70" />
                      ) : (
                        <Eye className="h-5 w-5 text-white/50 hover:text-white/70" />
                      )}
                    </button>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg p-2">
                      {error}
                    </div>
                  )}

                  {/* Forgot Password */}
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200 drop-shadow-md"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/70 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                {/* Switch to Register */}
                <div className="mt-6 text-center">
                  <p className="text-white/90 text-sm drop-shadow-md">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToRegister}
                      className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-200 drop-shadow-md"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
// --- END: LoginModal Component ---

// --- START: RegisterModal Component ---
export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // State to handle the password mismatch error
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the error message when the user starts typing
    if (passwordMatchError) {
      setPasswordMatchError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    // In a real application, you would handle registration logic here.
    // For this demo, we'll just log the data.
    console.log("Registration attempt:", formData);
    onClose(); // Close the modal after submission for demo purposes
  };

  // Enhanced close handler
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full bg-black/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
              <CardBody className="p-8 relative">
                {/* Close Button - Fixed positioning and z-index */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                    Join Mantra
                  </h2>
                  <p className="text-white/90 text-sm drop-shadow-md">
                    Start your mental wellness journey today
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70" />
                      ) : (
                        <Eye className="h-5 w-5 text-white/50 hover:text-white/70" />
                      )}
                    </button>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70" />
                      ) : (
                        <Eye className="h-5 w-5 text-white/50 hover:text-white/70" />
                      )}
                    </button>
                  </div>
                  {/* Password Mismatch Error Message */}
                  <AnimatePresence>
                    {passwordMatchError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm text-center font-medium overflow-hidden"
                      >
                        Passwords do not match!
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-4 w-4 text-purple-500 focus:ring-purple-500 border-white/20 rounded bg-white/10"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-white/90 drop-shadow-md">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-purple-300 hover:text-purple-200 drop-shadow-md"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-purple-300 hover:text-purple-200 drop-shadow-md"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/70 shadow-lg"
                  >
                    Create Account
                  </button>
                </form>

                {/* Switch to Login */}
                <div className="mt-6 text-center">
                  <p className="text-white/90 text-sm drop-shadow-md">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-200 drop-shadow-md"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
// --- END: RegisterModal Component ---

// --- START: Main App Component to orchestrate modals ---
export default function App() {
  const [modalType, setModalType] = useState(null); // 'login', 'register', or null

  const handleOpenLogin = () => setModalType("login");
  const handleOpenRegister = () => setModalType("register");
  const handleClose = () => setModalType(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome to Mantra
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Your path to mental wellness.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleOpenLogin}
            className="px-8 py-4 text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign In
          </button>
          <button
            onClick={handleOpenRegister}
            className="px-8 py-4 text-purple-400 font-semibold rounded-full border border-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Account
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={modalType === "login"}
        onClose={handleClose}
        onSwitchToRegister={handleOpenRegister}
      />

      <RegisterModal
        isOpen={modalType === "register"}
        onClose={handleClose}
        onSwitchToLogin={handleOpenLogin}
      />
    </div>
  );
}
// --- END: Main App Component ---
