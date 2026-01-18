import { motion } from 'framer-motion';
import { TrendingUp, Activity, Package, CheckCircle, AlertTriangle, Clock, XCircle, Users } from 'lucide-react';
import { mockWorkOrders, mockStationActivities, mockAlerts, dashboardStats } from '@/data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const onTimeCount = mockWorkOrders.filter(wo => wo.status === 'On-Time').length;
  const lateCount = mockWorkOrders.filter(wo => wo.status === 'Late').length;
  const atRiskCount = mockWorkOrders.filter(wo => wo.status === 'At-Risk').length;

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mes-card">
          <div className="flex items-center justify-between mb-2">
            <span className="mes-stat-label">OEE</span>
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <div className="mes-stat-value text-foreground">{dashboardStats.oee}%</div>
          <div className="flex items-center gap-1 mt-1 text-success text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+2.3%</span>
          </div>
        </div>

        <div className="mes-card">
          <div className="flex items-center justify-between mb-2">
            <span className="mes-stat-label">Yield</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div className="mes-stat-value text-foreground">{dashboardStats.yield}%</div>
          <div className="flex items-center gap-1 mt-1 text-success text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+0.5%</span>
          </div>
        </div>

        <div className="mes-card">
          <div className="flex items-center justify-between mb-2">
            <span className="mes-stat-label">Active Stations</span>
            <Users className="w-5 h-5 text-info" />
          </div>
          <div className="mes-stat-value text-foreground">
            {dashboardStats.activeStations}/{dashboardStats.totalStations}
          </div>
          <div className="text-muted-foreground text-sm mt-1">
            83% utilization
          </div>
        </div>

        <div className="mes-card">
          <div className="flex items-center justify-between mb-2">
            <span className="mes-stat-label">Open WOs</span>
            <Package className="w-5 h-5 text-warning" />
          </div>
          <div className="mes-stat-value text-foreground">{dashboardStats.totalOrders}</div>
          <div className="text-destructive text-sm mt-1">
            {lateCount} overdue
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* WO Status */}
        <motion.div variants={item} className="mes-card">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Work Order Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium text-foreground">On-Time</span>
              </div>
              <span className="text-xl font-bold text-success">{onTimeCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="font-medium text-foreground">At-Risk</span>
              </div>
              <span className="text-xl font-bold text-warning">{atRiskCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="font-medium text-foreground">Late</span>
              </div>
              <span className="text-xl font-bold text-destructive">{lateCount}</span>
            </div>
          </div>
        </motion.div>

        {/* Station Activity */}
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

      {/* Alerts */}
      <motion.div variants={item} className="mes-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Active Alerts</h2>
          <span className="mes-badge-destructive">{mockAlerts.filter(a => a.type === 'critical').length} Critical</span>
        </div>
        <div className="space-y-2">
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
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
  );
}
