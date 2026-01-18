import { useState, useEffect } from 'react';
import { LogOut, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const routeInfo: Record<string, { label: string; description: string }> = {
  dashboard: { label: 'Dashboard', description: 'Real-time manufacturing overview' },
  'part-master': { label: 'Part Master', description: 'Manage parts inventory and BOM hierarchy' },
  'work-order': { label: 'Work Orders', description: 'Manage and track production work orders' },
  stockroom: { label: 'Stockroom', description: 'Inventory management, picking, and receiving operations' },
  assembly: { label: 'Assembly Station', description: 'Integrated assembly and work instructions interface' },
  testing: { label: 'Testing Station', description: 'ATP execution and ATR generation' },
  troubleshooting: { label: 'Troubleshooting', description: 'Track and resolve production defects' },
  'quality-control': { label: 'Quality Control', description: 'ATR review and approval workflow' },
  shipping: { label: 'Shipping', description: 'Manage shipments and track deliveries' },
  administration: { label: 'Administration', description: 'User management and system audit logs' },
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

  const getCurrentRoute = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const currentPath = paths[paths.length - 1] || 'dashboard';
    return routeInfo[currentPath] || { label: currentPath, description: '' };
  };

  const currentRoute = getCurrentRoute();

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
      {/* Left: Module Name & Description */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-foreground">{currentRoute.label}</h1>
        {currentRoute.description && (
          <p className="text-sm text-muted-foreground">{currentRoute.description}</p>
        )}
      </div>

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
