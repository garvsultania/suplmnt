import React from 'react';
import { Lock, Shield } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

interface SecureAreaProps {
  children: React.ReactNode;
  showLockIcon?: boolean;
  showShieldIcon?: boolean;
  showHttpsBadge?: boolean;
  className?: string;
}

export function SecureArea({
  children,
  showLockIcon = true,
  showShieldIcon = true,
  showHttpsBadge = true,
  className = '',
}: SecureAreaProps) {
  return (
    <div
      className={`relative border border-green-200 rounded-lg bg-green-50/30 ${className}`}
    >
      {/* Security Indicators */}
      <div className="absolute -top-3 right-4 flex items-center space-x-2">
        {showLockIcon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-1 bg-white rounded-full shadow-sm">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>This area is secure and encrypted</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {showShieldIcon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-1 bg-white rounded-full shadow-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your data is protected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {showHttpsBadge && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-2 py-1 bg-white rounded-full shadow-sm text-xs font-medium text-green-600">
                  HTTPS
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Secure connection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  );
} 