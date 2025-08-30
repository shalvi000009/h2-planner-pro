import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Zap, Mail, Lock, User, Building, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "", role: "user" as "user" | "admin" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "user" | "admin",
    organization: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({ email: loginData.email, role: loginData.role, name: loginData.email.split("@")[0] });
      toast({ title: "Welcome back!", description: `Logged in as ${loginData.role}` });
      navigate(loginData.role === "admin" ? "/admin" : "/user", { replace: true });
    }, 800);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({ email: signupData.email, role: signupData.role, name: signupData.name });
      toast({ title: "Account created!", description: `Signed up as ${signupData.role}` });
      navigate(signupData.role === "admin" ? "/admin" : "/user", { replace: true });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-amber-400/10 to-slate-900/20" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold">H2 Infrastructure</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Access the hydrogen infrastructure platform</p>
        </div>

        <Card className="p-6 bg-card/90 backdrop-blur-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="login-email" type="email" placeholder="you@example.com" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="login-password" type="password" placeholder="••••••••" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-role">Role</Label>
                  <select id="login-role" value={loginData.role} onChange={(e) => setLoginData({ ...loginData, role: e.target.value as "user" | "admin" })} className="w-full px-3 py-2 rounded-md border border-input bg-background">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button type="submit" variant="energy" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-name" type="text" placeholder="Jane Doe" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="you@example.com" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type="password" placeholder="••••••••" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role">Role</Label>
                  <select id="signup-role" value={signupData.role} onChange={(e) => setSignupData({ ...signupData, role: e.target.value as "user" | "admin" })} className="w-full px-3 py-2 rounded-md border border-input bg-background">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-org">Organization</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-org" type="text" placeholder="Company" value={signupData.organization} onChange={(e) => setSignupData({ ...signupData, organization: e.target.value })} className="pl-10" />
                  </div>
                </div>
                <Button type="submit" variant="energy" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;