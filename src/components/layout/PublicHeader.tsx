import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">M</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">MES</h1>
          <p className="text-xs text-muted-foreground">Manufacturing Execution System</p>
        </div>
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
