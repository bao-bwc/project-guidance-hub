import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Wrench,
  TestTube,
  AlertTriangle,
  CheckCircle,
  Warehouse,
  Truck,
  Settings,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import brandywineLogo from '@/assets/brandywine-logo.png';

const productionItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/part-master', label: 'Part Master', icon: Package },
  { path: '/work-order', label: 'Work Order', icon: ClipboardList },
  { path: '/stockroom', label: 'Stockroom', icon: Warehouse },
  { path: '/assembly', label: 'Assembly', icon: Wrench },
  { path: '/testing', label: 'Testing', icon: TestTube },
  { path: '/troubleshooting', label: 'Troubleshooting', icon: AlertTriangle },
  { path: '/quality-control', label: 'Quality Control', icon: CheckCircle },
  { path: '/shipping', label: 'Shipping', icon: Truck },
];

const adminItems = [
  { path: '/administration', label: 'Administration', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="mes-sidebar h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex flex-col gap-1">
          <img 
            src={brandywineLogo} 
            alt="Brandywine Communications Logo" 
            className="h-10 w-auto object-contain"
          />
          <span className="text-[10px] text-destructive font-medium tracking-tight">
            pc/Link Real-Time Production Extension
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {productionItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative block"
              >
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </div>

        <Separator className="my-4 mx-4 w-auto bg-sidebar-foreground/80" />

        <div className="space-y-1">
          {adminItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative block"
              >
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </div>
      </nav>

    </aside>
  );
}
