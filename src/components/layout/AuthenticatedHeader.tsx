import { useState, useEffect } from 'react';
import { LogOut, ChevronRight, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  'part-master': 'Part Master',
  'work-order': 'Work Order',
  assembly: 'Assembly',
  testing: 'Testing',
  troubleshooting: 'Troubleshooting',
  'quality-control': 'Quality Control',
  shipping: 'Shipping',
  administration: 'Administration',
};

export function AuthenticatedHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: routeLabels[path] || path,
      isLast: index === paths.length - 1,
    }));
  };

  const breadcrumbs = getBreadcrumbs();

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
    <header className="mes-header flex items-center justify-between px-6 border-l border-border">
      {/* Left: Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            <span className={crumb.isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Center: Clock & User Info */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-2xl font-semibold tracking-wider text-foreground">
            {formatTime(currentTime)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{formatDate(currentTime)}</span>
      </div>

      {/* Right: User & Logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="font-medium text-foreground text-sm">
            {user?.firstName} {user?.lastName}
          </span>
          <p className="text-xs text-muted-foreground">
            {user?.role} • {user?.department}
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
