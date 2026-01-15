import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Package, CheckCircle, AlertTriangle, Clock, XCircle } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { mockWorkOrders, mockStationActivities, mockAlerts, dashboardStats } from '@/data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PublicDashboard() {
  const onTimeCount = mockWorkOrders.filter(wo => wo.status === 'On-Time').length;
  const lateCount = mockWorkOrders.filter(wo => wo.status === 'Late').length;
  const atRiskCount = mockWorkOrders.filter(wo => wo.status === 'At-Risk').length;

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="p-6">
        <motion.div 
          className="max-w-7xl mx-auto space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Stats Row */}
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* OEE Card */}
            <div className="mes-card">
              <div className="flex items-center justify-between mb-2">
                <span className="mes-stat-label">OEE</span>
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div className="mes-stat-value text-foreground">{dashboardStats.oee}%</div>
              <div className="flex items-center gap-1 mt-1 text-success text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+2.3% from last week</span>
              </div>
            </div>

            {/* Yield Card */}
            <div className="mes-card">
              <div className="flex items-center justify-between mb-2">
                <span className="mes-stat-label">Yield</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="mes-stat-value text-foreground">{dashboardStats.yield}%</div>
              <div className="flex items-center gap-1 mt-1 text-success text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+0.5% from last week</span>
              </div>
            </div>

            {/* Active Stations */}
            <div className="mes-card">
              <div className="flex items-center justify-between mb-2">
                <span className="mes-stat-label">Active Stations</span>
                <Package className="w-5 h-5 text-info" />
              </div>
              <div className="mes-stat-value text-foreground">
                {dashboardStats.activeStations}/{dashboardStats.totalStations}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {dashboardStats.totalStations - dashboardStats.activeStations} idle
              </div>
            </div>

            {/* Work Orders */}
            <div className="mes-card">
              <div className="flex items-center justify-between mb-2">
                <span className="mes-stat-label">Work Orders</span>
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div className="mes-stat-value text-foreground">{dashboardStats.totalOrders}</div>
              <div className="text-muted-foreground text-sm mt-1">
                {lateCount} overdue
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* WO Status Card */}
            <motion.div variants={item} className="mes-card lg:col-span-1">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Work Order Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-foreground">On-Time</span>
                  </div>
                  <span className="text-2xl font-bold text-success">{onTimeCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span className="font-medium text-foreground">At-Risk</span>
                  </div>
                  <span className="text-2xl font-bold text-warning">{atRiskCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="font-medium text-foreground">Late</span>
                  </div>
                  <span className="text-2xl font-bold text-destructive">{lateCount}</span>
                </div>
              </div>
            </motion.div>

            {/* Station Table */}
            <motion.div variants={item} className="mes-card lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Station Activity</h2>
              <div className="overflow-x-auto">
                <table className="mes-table">
                  <thead>
                    <tr>
                      <th>Station</th>
                      <th>Work Order</th>
                      <th>User</th>
                      <th>Process Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStationActivities.map((activity, index) => (
                      <tr key={index}>
                        <td className="font-medium font-mono">{activity.station}</td>
                        <td className="font-mono text-muted-foreground">{activity.workOrder}</td>
                        <td>{activity.user}</td>
                        <td className="font-mono">{activity.processTime}</td>
                        <td>
                          <span className={
                            activity.status === 'Active' ? 'mes-badge-success' :
                            activity.status === 'Idle' ? 'mes-badge-warning' :
                            'mes-badge-destructive'
                          }>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Critical Alerts */}
          <motion.div variants={item} className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Critical Alerts</h2>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.type === 'critical' ? 'bg-destructive/10' :
                    alert.type === 'warning' ? 'bg-warning/10' :
                    'bg-info/10'
                  }`}
                >
                  {alert.type === 'critical' ? (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  ) : (
                    <Activity className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{alert.timestamp}</span>
                      {alert.station && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{alert.station}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
