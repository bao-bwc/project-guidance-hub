import { motion } from 'framer-motion';
import { Truck, Search, Package, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

const readyToShip = [
  {
    workOrder: 'WO-282690',
    partNo: '033010024',
    serialNo: 'SN-2026-022',
    description: '2U MMC CONFIGURATION TFDS MMC MGU',
    customer: 'TFDS Program',
    shipDate: '2026-01-16',
    status: 'Ready',
  },
  {
    workOrder: 'WO-282511',
    partNo: '033010051',
    serialNo: 'SN-2026-015',
    description: '2U MODULAR MASTER CLOCK MGU A4-PTP',
    customer: 'GPNTS Contract',
    shipDate: '2026-01-17',
    status: 'Ready',
  },
];

const recentShipments = [
  {
    workOrder: 'WO-282260',
    serialNo: 'SN-2025-098',
    description: '2U MMC - BOEING E-7 LAB CONFIG',
    shippedAt: '2026-01-14',
    carrier: 'FedEx',
    tracking: '789456123',
  },
  {
    workOrder: 'WO-282529',
    serialNo: 'SN-2025-089',
    description: '2U MMC NG SPERRY MARINE OPC',
    shippedAt: '2026-01-13',
    carrier: 'UPS',
    tracking: '456789012',
  },
];

export default function Shipping() {
  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Shipping</h1>
        <p className="text-muted-foreground">Manage outbound shipments and tracking</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Ready to Ship</p>
          <p className="text-2xl font-bold text-success">2</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Shipped Today</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">This Week</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">On-Time Rate</p>
          <p className="text-2xl font-bold text-success">94%</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="mes-card">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by WO#, serial, or tracking..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">Date Range</Button>
        </div>
      </motion.div>

      {/* Ready to Ship */}
      <motion.div variants={item} className="mes-card">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-success" />
          <h2 className="text-lg font-semibold text-foreground">Ready to Ship</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="mes-table">
            <thead>
              <tr>
                <th>Work Order</th>
                <th>Serial</th>
                <th>Description</th>
                <th>Customer</th>
                <th>Ship Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {readyToShip.map((item) => (
                <tr key={item.serialNo}>
                  <td className="font-mono font-medium">{item.workOrder}</td>
                  <td className="font-mono">{item.serialNo}</td>
                  <td className="max-w-xs truncate">{item.description}</td>
                  <td>{item.customer}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {item.shipDate}
                    </div>
                  </td>
                  <td>
                    <span className="mes-badge-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <Button size="sm" className="gap-1">
                      <Truck className="w-3 h-3" />
                      Ship
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Shipments */}
      <motion.div variants={item} className="mes-card">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Recent Shipments</h2>
        </div>
        <div className="space-y-3">
          {recentShipments.map((shipment) => (
            <div key={shipment.serialNo} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{shipment.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-mono">{shipment.workOrder}</span>
                  <span className="font-mono">{shipment.serialNo}</span>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="text-muted-foreground">Shipped {shipment.shippedAt}</p>
                <p className="font-mono">{shipment.carrier}: {shipment.tracking}</p>
              </div>
              <Button variant="outline" size="sm">Track</Button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
