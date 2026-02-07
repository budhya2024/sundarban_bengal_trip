"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lock,
  Leaf,
  Mail,
  Loader2,
  UserPlus,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import {
  authAction,
  checkAdminExists,
  requestOtpAction,
  resetPasswordAction,
} from "@/app/actions/auth.actions";
import { useToast } from "@/hooks/use-toast";

type AuthView = "auth" | "forgot_request" | "forgot_reset";

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [view, setView] = useState<AuthView>("auth");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const checkStatus = async () => {
      const exists = await checkAdminExists();
      setIsSetupMode(!exists);
    };
    checkStatus();
  }, []);

  const handleMainAction = async (formData: FormData) => {
    setError("");
    startTransition(async () => {
      if (view === "auth") {
        const result = await authAction(formData);
        if (result?.success === false)
          setError(result.message || "Auth failed");
      } else if (view === "forgot_request") {
        const email = formData.get("email") as string;
        const result = await requestOtpAction(email);
        if (result.success) {
          setResetEmail(email);
          setView("forgot_reset");
          toast({
            title: "OTP Sent",
            description: "Check your email for the 6-digit code.",
          });
        } else {
          setError(result.message);
        }
      } else if (view === "forgot_reset") {
        const result = await resetPasswordAction(formData);
        if (result.success) {
          toast({ title: "Success", description: result.message });
          setView("auth");
        } else {
          setError(result.message);
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a2e23] p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-emerald-900/20 rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="text-center space-y-2 pb-2">
          {view !== "auth" && (
            <button
              onClick={() => {
                setView("auth");
                setError("");
              }}
              className="absolute left-6 top-8 text-slate-400 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <div
            className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all duration-500 
            ${isSetupMode || view !== "auth" ? "bg-amber-100" : "bg-emerald-100"}`}
          >
            {isSetupMode ? (
              <UserPlus className="w-8 h-8 text-amber-700" />
            ) : view !== "auth" ? (
              <KeyRound className="w-8 h-8 text-amber-700" />
            ) : (
              <Leaf className="w-8 h-8 text-emerald-700" />
            )}
          </div>

          <CardTitle className="font-display text-3xl text-slate-800 italic">
            {isSetupMode
              ? "Setup Admin"
              : view === "auth"
                ? "Sundarban CMS"
                : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {isSetupMode
              ? "Create the primary administrator account"
              : view === "forgot_request"
                ? "Enter your email to receive a reset code"
                : view === "forgot_reset"
                  ? "Enter the code and your new password"
                  : "Enter credentials to access the panel"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form action={handleMainAction} className="space-y-5">
            {/* EMAIL FIELD (Hidden in Reset Phase to prevent email mismatch) */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  name="email"
                  type="email"
                  defaultValue={view === "forgot_reset" ? resetEmail : ""}
                  readOnly={view === "forgot_reset"}
                  placeholder="admin@sundarban.com"
                  className="pl-10 h-12 rounded-xl border-slate-200"
                  required
                />
              </div>
            </div>

            {/* OTP FIELD (Only in Reset Phase) */}
            {view === "forgot_reset" && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                  6-Digit Code
                </Label>
                <Input
                  name="otp"
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  className="h-12 rounded-xl text-center tracking-[1em] font-bold border-emerald-200"
                  required
                />
              </div>
            )}

            {/* PASSWORD FIELD (Hidden in Request Phase) */}
            {view !== "forgot_request" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                    {view === "forgot_reset" ? "New Password" : "Password"}
                  </Label>
                  {view === "auth" && !isSetupMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setView("forgot_request");
                        setError("");
                      }}
                      className="text-[10px] font-bold text-emerald-700 uppercase hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl border-slate-200"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className={`w-full h-12 rounded-xl text-lg font-bold shadow-lg transition-all active:scale-[0.98] ${
                isSetupMode || view !== "auth"
                  ? "bg-[#C58940] hover:bg-[#B37A36]"
                  : "bg-[#2D4A39] hover:bg-[#1f3327]"
              }`}
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isSetupMode ? (
                "Create Account"
              ) : view === "forgot_request" ? (
                "Send Reset Code"
              ) : view === "forgot_reset" ? (
                "Update Password"
              ) : (
                "Login to Dashboard"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
