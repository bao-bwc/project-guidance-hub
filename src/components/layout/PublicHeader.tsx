import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import brandywineLogo from '@/assets/brandywine-logo.png';

export function PublicHeader() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <header className="mes-header flex items-center justify-between px-6">
      {/* Left: Logo & Branding */}
      <div className="flex flex-col gap-1">
        <img 
          src={brandywineLogo} 
          alt="Brandywine Communications Logo" 
          className="h-10 w-auto object-contain"
        />
        <span className="text-[10px] text-muted-foreground font-medium tracking-tight">
          pc/Link Real-Time Production Extension
        </span>
      </div>

      {/* Center: Digital Clock */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-2xl font-semibold tracking-wider text-foreground">
            {formatTime(currentTime)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{formatDate(currentTime)}</span>
      </div>

      {/* Right: Login Button */}
      <Button 
        onClick={() => navigate('/login')}
        className="gap-2"
      >
        <LogIn className="w-4 h-4" />
        Login
      </Button>
    </header>
  );
}
