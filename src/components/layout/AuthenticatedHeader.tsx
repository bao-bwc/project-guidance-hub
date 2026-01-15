import { LogOut, ChevronRight } from 'lucide-react';
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

      {/* Center: User Info */}
      <div className="flex flex-col items-center">
        <span className="font-medium text-foreground">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="text-xs text-muted-foreground">
          {user?.role} • {user?.department}
        </span>
      </div>

      {/* Right: Logout Button */}
      <Button 
        variant="outline"
        onClick={handleLogout}
        className="gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </header>
  );
}
