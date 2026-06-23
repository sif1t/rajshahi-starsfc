"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

/* ─── Animation helpers ──────────────────────────── */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

/* ─── Input Component ─────────────────────────────── */
function InputField({
  id, label, type = "text", value, onChange, placeholder, icon: Icon, extra,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ElementType;
  extra?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
          {label}
        </label>
        {extra}
      </div>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 bg-[#060D1B] border border-white/5 rounded-xl px-4 pr-12 text-base text-[#5A7B97] placeholder:text-[#5A7B97]/65 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] focus:text-white outline-none transition-all duration-300"
          required
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A7B97] hover:text-[#FF5A00] transition-colors duration-200"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Google Icon SVG ─────────────────────────────── */
function GoogleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/* ─── Orange Checkbox ─────────────────────────────── */
function OrangeCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer ${
        checked ? "bg-[#FF5A00] border-[#FF5A00]" : "bg-transparent border-white/20"
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </div>
  );
}

/* ─── Submit Button ───────────────────────────────── */
function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={!loading ? { y: -1, boxShadow: "0 12px 30px rgba(255,90,0,0.35)" } : {}}
      whileTap={!loading ? { scale: 0.98 } : {}}
      className="h-12 w-full rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base tracking-wider uppercase shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Processing…
        </>
      ) : label}
    </motion.button>
  );
}

/* ─── Page Component ─────────────────────────────── */
export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Sign In state
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ── Sign In Handler ─────────────────────────────── */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email: siEmail,
      password: siPassword,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError(result.error === "CredentialsSignin" ? "Invalid email or password." : result.error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  /* ── Sign Up Handler ─────────────────────────────── */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (suPassword !== suConfirm) { setError("Passwords do not match."); return; }
    if (suPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (!agreedToTerms) { setError("You must agree to the Terms & Privacy Policy."); return; }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: suName, email: suEmail, password: suPassword }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Registration failed. Please try again.");
    } else {
      setSuccess("Account created! Signing you in…");
      await signIn("credentials", { email: suEmail, password: suPassword, redirect: false });
      router.push("/");
      router.refresh();
    }
  };

  /* ── Google Handler ───────────────────────────────── */
  const handleGoogle = () => signIn("google", { callbackUrl: "/" });

  const switchTab = (t: "signin" | "signup") => {
    setTab(t);
    setError("");
    setSuccess("");
  };

  return (
    <>
      <Navbar />

      {/* ── MASTER WRAPPER: Full-viewport dead-center flex ─────────────── */}
      <div className="bg-[#070D1B] min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 mt-16 sm:mt-20 relative overflow-hidden">

        {/* Ambient orange glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,90,0,0.07)_0%,transparent_70%)]" />

        {/* ── Auth Card ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative z-10 w-full max-w-lg"
        >
          {/* Brand Header */}
          <div className="text-center mb-8">
            <p className="flex items-center justify-center gap-3 text-[#FF5A00] text-xs font-bold tracking-[0.25em] uppercase mb-3">
              <span className="inline-block w-8 h-px bg-[#FF5A00]" />
              Members Area
              <span className="inline-block w-8 h-px bg-[#FF5A00]" />
            </p>
            <h1 className="text-white uppercase leading-none" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              RAJSHAHI <span className="text-[#FF5A00]">STARS FC</span>
            </h1>
          </div>

          {/* Card */}
          <div className="bg-[#0C1527] border border-white/10 rounded-2xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">

            {/* Tab Switcher */}
            <div className="relative flex bg-[#060D1B] rounded-xl p-1 mb-8">
              <motion.div
                layoutId="authTab"
                className="absolute inset-y-1 rounded-lg bg-[#FF5A00]"
                style={{ width: "calc(50% - 4px)", left: tab === "signin" ? "4px" : "calc(50%)" }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
              {(["signin", "signup"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 rounded-lg ${
                    tab === t ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {t === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Alert Messages */}
            <AnimatePresence>
              {error && (
                <motion.div key="error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}
              {success && (
                <motion.div key="success" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {success}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forms */}
            <AnimatePresence mode="wait">

              {/* ── Sign In Form ──────────────────────── */}
              {tab === "signin" && (
                <motion.form key="signin" variants={fadeSlide} initial="hidden" animate="show" exit="exit" onSubmit={handleSignIn} noValidate>
                  <div className="space-y-5">
                    <InputField id="si-email" label="Email Address" type="email" value={siEmail} onChange={setSiEmail} placeholder="you@example.com" icon={Mail} />
                    <InputField
                      id="si-password" label="Password" type="password" value={siPassword} onChange={setSiPassword}
                      placeholder="Enter your password" icon={Lock}
                      extra={<a href="#" className="text-xs text-[#FF5A00] hover:text-orange-400 transition-colors font-semibold">Forgot Password?</a>}
                    />
                    {/* Remember Me */}
                    <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                      <OrangeCheckbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                      <span className="text-sm text-white/60">Remember me on this device</span>
                    </label>
                  </div>
                  <div className="mt-7">
                    <SubmitButton loading={loading} label="SIGN IN" />
                  </div>
                </motion.form>
              )}

              {/* ── Sign Up Form ──────────────────────── */}
              {tab === "signup" && (
                <motion.form key="signup" variants={fadeSlide} initial="hidden" animate="show" exit="exit" onSubmit={handleSignUp} noValidate>
                  <div className="space-y-5">
                    <InputField id="su-name" label="Full Name" value={suName} onChange={setSuName} placeholder="John Doe" icon={User} />
                    <InputField id="su-email" label="Email Address" type="email" value={suEmail} onChange={setSuEmail} placeholder="you@example.com" icon={Mail} />
                    <InputField id="su-password" label="Password" type="password" value={suPassword} onChange={setSuPassword} placeholder="Min. 8 characters" icon={Lock} />
                    <InputField id="su-confirm" label="Confirm Password" type="password" value={suConfirm} onChange={setSuConfirm} placeholder="Repeat your password" icon={Lock} />
                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
                      <OrangeCheckbox checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
                      <span className="text-sm text-white/60 leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-[#FF5A00] hover:underline font-semibold">Club Terms</a>
                        {" & "}
                        <a href="#" className="text-[#FF5A00] hover:underline font-semibold">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                  <div className="mt-7">
                    <SubmitButton loading={loading} label="CREATE ACCOUNT" />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* ── Divider ───────────────────────────── */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-grow h-px bg-white/10" />
              <span className="text-white/30 text-xs font-semibold tracking-widest uppercase whitespace-nowrap">Or continue with</span>
              <div className="flex-grow h-px bg-white/10" />
            </div>

            {/* ── Google Button ─────────────────────── */}
            <motion.button
              type="button"
              onClick={handleGoogle}
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="h-12 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-3 text-sm font-semibold text-white tracking-wide transition-all duration-300"
            >
              <GoogleIcon />
              Sign in with Google
            </motion.button>
          </div>

          {/* Bottom switch prompt */}
          <p className="text-center text-sm text-white/40 mt-6">
            {tab === "signin" ? "Don't have an account? " : "Already a member? "}
            <button onClick={() => switchTab(tab === "signin" ? "signup" : "signin")} className="text-[#FF5A00] hover:text-orange-400 font-bold transition-colors">
              {tab === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
