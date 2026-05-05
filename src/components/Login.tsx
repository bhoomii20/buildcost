import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { HardHat, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

type LoginProps = {
  onLogin: (email: string) => void;
  onSignup: () => void;
  isDarkMode: boolean;
};

export function Login({ onLogin, onSignup, isDarkMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Welcome back!');
    onLogin(email);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] to-[#1976D2] flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          {/* Logo/Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <HardHat className="w-8 h-8 sm:w-10 sm:h-10 text-[#1E88E5]" />
              </div>
            </div>
            <h2 className="text-white mb-1 sm:mb-2">BuildCost</h2>
            <p className="text-white/80 text-sm sm:text-base">Your Digital Construction Assistant</p>
          </div>

          {/* Login Card */}
          <Card className="p-6 sm:p-8 shadow-2xl">
            <h3 className="text-center mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">Welcome Back</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="engineer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-11 sm:h-12 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="cursor-pointer text-xs sm:text-sm">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-xs sm:text-sm text-[#1E88E5] hover:underline"
                  onClick={() => toast.info('Password reset link sent to your email')}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm sm:text-base"
              >
                Login
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-5 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={onSignup}
                  className="text-[#1E88E5] hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </Card>

          {/* Demo Note */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-white/80 text-xs sm:text-sm">
              Demo: Use any email and password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}