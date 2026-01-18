import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Package,
  MapPin,
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Warehouse,
  ScanLine,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// Mock stockroom-specific data
const stockroomStats = {
  totalParts: 1247,
  lowStock: 23,
  outOfStock: 8,
  pendingReceiving: 12,
  pendingPicks: 7,
  binUtilization: 78,
};

const inventoryItems = [
  { partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', location: 'C-01', onHand: 12, allocated: 5, available: 7, minQty: 5, maxQty: 20, status: 'ok' },
  { partNo: '033000003', description: 'MMC MASTER CONTROL MODULE GPNTS', location: 'C-02', onHand: 8, allocated: 3, available: 5, minQty: 3, maxQty: 15, status: 'ok' },
  { partNo: '003001174', description: 'CAPACITOR 100UF 25V CERAMIC', location: 'E-15', onHand: 5, allocated: 0, available: 5, minQty: 50, maxQty: 200, status: 'low' },
  { partNo: '003002891', description: 'RESISTOR 10K OHM 1/4W', location: 'E-22', onHand: 0, allocated: 0, available: 0, minQty: 100, maxQty: 500, status: 'out' },
  { partNo: '033010019', description: '1U MMC- NDDS TIME DIST UNIT', location: 'A-05', onHand: 3, allocated: 2, available: 1, minQty: 2, maxQty: 10, status: 'ok' },
  { partNo: '033010023', description: '2U MMC NG SPERRY MARINE OPC', location: 'A-08', onHand: 2, allocated: 2, available: 0, minQty: 2, maxQty: 8, status: 'low' },
  { partNo: '004005123', description: 'POWER SUPPLY 24V 5A', location: 'D-03', onHand: 15, allocated: 4, available: 11, minQty: 5, maxQty: 25, status: 'ok' },
  { partNo: '004005789', description: 'CABLE ASSY USB-C 2M', location: 'F-11', onHand: 45, allocated: 10, available: 35, minQty: 20, maxQty: 100, status: 'ok' },
];

const pickLists = [
  { id: 'PL-001', workOrder: 'WO-282537', partNo: '033010019', description: '1U MMC- NDDS TIME DIST UNIT', qty: 2, location: 'A-05', priority: 'high', status: 'pending', requestedBy: 'J. Smith', requestedAt: '08:30' },
  { id: 'PL-002', workOrder: 'WO-282529', partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', qty: 1, location: 'C-01', priority: 'medium', status: 'pending', requestedBy: 'M. Johnson', requestedAt: '09:15' },
  { id: 'PL-003', workOrder: 'WO-282511', partNo: '004005123', description: 'POWER SUPPLY 24V 5A', qty: 3, location: 'D-03', priority: 'low', status: 'in-progress', requestedBy: 'R. Williams', requestedAt: '10:00' },
  { id: 'PL-004', workOrder: 'WO-282652', partNo: '033000003', description: 'MMC MASTER CONTROL MODULE GPNTS', qty: 1, location: 'C-02', priority: 'high', status: 'pending', requestedBy: 'K. Brown', requestedAt: '10:30' },
  { id: 'PL-005', workOrder: 'WO-282424', partNo: '004005789', description: 'CABLE ASSY USB-C 2M', qty: 5, location: 'F-11', priority: 'medium', status: 'completed', requestedBy: 'L. Davis', requestedAt: '07:45' },
];

const receivingItems = [
  { id: 'RCV-001', poNo: 'PO-45231', partNo: '003001174', description: 'CAPACITOR 100UF 25V CERAMIC', qtyExpected: 500, qtyReceived: 0, vendor: 'DigiKey', expectedDate: '2026-01-17', status: 'pending' },
  { id: 'RCV-002', poNo: 'PO-45198', partNo: '003002891', description: 'RESISTOR 10K OHM 1/4W', qtyExpected: 1000, qtyReceived: 0, vendor: 'Mouser', expectedDate: '2026-01-18', status: 'pending' },
  { id: 'RCV-003', poNo: 'PO-45220', partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', qtyExpected: 10, qtyReceived: 10, vendor: 'Internal', expectedDate: '2026-01-15', status: 'complete' },
  { id: 'RCV-004', poNo: 'PO-45245', partNo: '004005123', description: 'POWER SUPPLY 24V 5A', qtyExpected: 20, qtyReceived: 15, vendor: 'Mean Well', expectedDate: '2026-01-16', status: 'partial' },
];

const recentTransactions = [
  { id: 'TXN-001', type: 'issue', partNo: '033000002', qty: 2, location: 'C-01', workOrder: 'WO-282537', user: 'T. Anderson', timestamp: '2026-01-16 14:30' },
  { id: 'TXN-002', type: 'receive', partNo: '004005789', qty: 50, location: 'F-11', reference: 'PO-45200', user: 'S. Martinez', timestamp: '2026-01-16 13:15' },
  { id: 'TXN-003', type: 'transfer', partNo: '003001174', qty: 25, location: 'E-15 → E-16', reference: 'BIN-MOVE', user: 'T. Anderson', timestamp: '2026-01-16 11:45' },
  { id: 'TXN-004', type: 'adjust', partNo: '033010023', qty: -1, location: 'A-08', reference: 'CYCLE-COUNT', user: 'M. Chen', timestamp: '2026-01-16 10:00' },
  { id: 'TXN-005', type: 'issue', partNo: '004005123', qty: 3, location: 'D-03', workOrder: 'WO-282511', user: 'T. Anderson', timestamp: '2026-01-16 09:30' },
];

const binLocations = [
  { zone: 'A', description: 'Finished Assemblies', bins: 20, utilized: 15, capacity: 75 },
  { zone: 'B', description: 'Sub-Assemblies', bins: 15, utilized: 12, capacity: 80 },
  { zone: 'C', description: 'Chassis & Enclosures', bins: 10, utilized: 8, capacity: 80 },
  { zone: 'D', description: 'Power Supplies', bins: 12, utilized: 9, capacity: 75 },
  { zone: 'E', description: 'Electronic Components', bins: 50, utilized: 42, capacity: 84 },
  { zone: 'F', description: 'Cables & Connectors', bins: 25, utilized: 18, capacity: 72 },
];

export default function Stockroom() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');

  const filteredInventory = inventoryItems.filter(
    (item) =>
      item.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return <span className="mes-badge-success">In Stock</span>;
      case 'low':
        return <span className="mes-badge-warning">Low Stock</span>;
      case 'out':
        return <span className="mes-badge-danger">Out of Stock</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const getPickStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="mes-badge-warning">Pending</span>;
      case 'in-progress':
        return <span className="mes-badge-info">In Progress</span>;
      case 'completed':
        return <span className="mes-badge-success">Completed</span>;
      default:
        return null;
    }
  };

  const getReceivingStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="mes-badge-warning">Pending</span>;
      case 'partial':
        return <span className="mes-badge-info">Partial</span>;
      case 'complete':
        return <span className="mes-badge-success">Complete</span>;
      default:
        return null;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'issue':
        return <ArrowUpFromLine className="w-4 h-4 text-destructive" />;
      case 'receive':
        return <ArrowDownToLine className="w-4 h-4 text-emerald-600" />;
      case 'transfer':
        return <RefreshCw className="w-4 h-4 text-accent" />;
      case 'adjust':
        return <BarChart3 className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Stats Cards */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="mes-card text-center">
          <Package className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold text-foreground">{stockroomStats.totalParts.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Parts</div>
        </div>
        <div className="mes-card text-center">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-amber-500" />
          <div className="text-2xl font-bold text-amber-600">{stockroomStats.lowStock}</div>
          <div className="text-xs text-muted-foreground">Low Stock</div>
        </div>
        <div className="mes-card text-center">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-destructive" />
          <div className="text-2xl font-bold text-destructive">{stockroomStats.outOfStock}</div>
          <div className="text-xs text-muted-foreground">Out of Stock</div>
        </div>
        <div className="mes-card text-center">
          <ArrowDownToLine className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold text-foreground">{stockroomStats.pendingReceiving}</div>
          <div className="text-xs text-muted-foreground">Pending Receiving</div>
        </div>
        <div className="mes-card text-center">
          <ClipboardList className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold text-foreground">{stockroomStats.pendingPicks}</div>
          <div className="text-xs text-muted-foreground">Pending Picks</div>
        </div>
        <div className="mes-card text-center">
          <Warehouse className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold text-foreground">{stockroomStats.binUtilization}%</div>
          <div className="text-xs text-muted-foreground">Bin Utilization</div>
        </div>
      </motion.div>

      {/* Main Content with Tabs */}
      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="inventory" className="gap-2">
                <Package className="w-4 h-4" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="picking" className="gap-2">
                <ClipboardList className="w-4 h-4" />
                Pick Lists
              </TabsTrigger>
              <TabsTrigger value="receiving" className="gap-2">
                <ArrowDownToLine className="w-4 h-4" />
                Receiving
              </TabsTrigger>
              <TabsTrigger value="locations" className="gap-2">
                <MapPin className="w-4 h-4" />
                Bin Locations
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <ScanLine className="w-4 h-4" />
                Scan
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Transaction
              </Button>
            </div>
          </div>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="mes-card">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by part number, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="mes-table">
                  <thead>
                    <tr>
                      <th>Part Number</th>
                      <th>Description</th>
                      <th>Location</th>
                      <th>On-Hand</th>
                      <th>Allocated</th>
                      <th>Available</th>
                      <th>Min/Max</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.partNo} className="cursor-pointer">
                        <td className="font-mono font-medium">{item.partNo}</td>
                        <td className="max-w-xs truncate">{item.description}</td>
                        <td className="font-mono text-accent">{item.location}</td>
                        <td className={item.onHand === 0 ? 'text-destructive font-medium' : ''}>
                          {item.onHand}
                        </td>
                        <td className="text-muted-foreground">{item.allocated}</td>
                        <td className={item.available === 0 ? 'text-destructive font-medium' : 'font-medium'}>
                          {item.available}
                        </td>
                        <td className="text-sm text-muted-foreground">
                          {item.minQty} / {item.maxQty}
                        </td>
                        <td>{getStatusBadge(item.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Pick Lists Tab */}
          <TabsContent value="picking" className="space-y-4">
            <div className="mes-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Active Pick Lists</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {pickLists.filter(p => p.status === 'pending').length} Pending
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <RefreshCw className="w-3 h-3" />
                    {pickLists.filter(p => p.status === 'in-progress').length} In Progress
                  </Badge>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="mes-table">
                  <thead>
                    <tr>
                      <th>Pick ID</th>
                      <th>Work Order</th>
                      <th>Part Number</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Location</th>
                      <th>Priority</th>
                      <th>Requested By</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickLists.map((pick) => (
                      <tr key={pick.id}>
                        <td className="font-mono font-medium">{pick.id}</td>
                        <td className="font-mono text-accent">{pick.workOrder}</td>
                        <td className="font-mono">{pick.partNo}</td>
                        <td className="max-w-xs truncate">{pick.description}</td>
                        <td className="font-medium">{pick.qty}</td>
                        <td className="font-mono text-accent">{pick.location}</td>
                        <td>{getPriorityBadge(pick.priority)}</td>
                        <td className="text-muted-foreground">
                          {pick.requestedBy} @ {pick.requestedAt}
                        </td>
                        <td>{getPickStatusBadge(pick.status)}</td>
                        <td>
                          {pick.status !== 'completed' && (
                            <Button variant="outline" size="sm">
                              {pick.status === 'pending' ? 'Start' : 'Complete'}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Receiving Tab */}
          <TabsContent value="receiving" className="space-y-4">
            <div className="mes-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Pending Receipts</h2>
                <Button size="sm" className="gap-2">
                  <ArrowDownToLine className="w-4 h-4" />
                  Receive Shipment
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="mes-table">
                  <thead>
                    <tr>
                      <th>Receipt ID</th>
                      <th>PO Number</th>
                      <th>Part Number</th>
                      <th>Description</th>
                      <th>Expected Qty</th>
                      <th>Received</th>
                      <th>Vendor</th>
                      <th>Expected Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receivingItems.map((item) => (
                      <tr key={item.id}>
                        <td className="font-mono font-medium">{item.id}</td>
                        <td className="font-mono text-accent">{item.poNo}</td>
                        <td className="font-mono">{item.partNo}</td>
                        <td className="max-w-xs truncate">{item.description}</td>
                        <td>{item.qtyExpected}</td>
                        <td className={item.qtyReceived < item.qtyExpected ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                          {item.qtyReceived}
                        </td>
                        <td className="text-muted-foreground">{item.vendor}</td>
                        <td className="text-muted-foreground">{item.expectedDate}</td>
                        <td>{getReceivingStatusBadge(item.status)}</td>
                        <td>
                          {item.status !== 'complete' && (
                            <Button variant="outline" size="sm">Receive</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Bin Locations Tab */}
          <TabsContent value="locations" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="mes-card">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Storage Zones</h2>
                <div className="space-y-4">
                  {binLocations.map((zone) => (
                    <div key={zone.zone} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <span className="font-bold text-accent">{zone.zone}</span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{zone.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {zone.utilized} / {zone.bins} bins utilized
                            </div>
                          </div>
                        </div>
                        <span className={`text-lg font-bold ${zone.capacity > 80 ? 'text-amber-600' : 'text-foreground'}`}>
                          {zone.capacity}%
                        </span>
                      </div>
                      <Progress value={zone.capacity} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mes-card">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Transactions</h2>
                <div className="space-y-3">
                  {recentTransactions.map((txn) => (
                    <div key={txn.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <div className="mt-1">{getTransactionIcon(txn.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium">{txn.partNo}</span>
                          <span className={`text-sm font-medium ${txn.qty < 0 ? 'text-destructive' : txn.type === 'issue' ? 'text-destructive' : 'text-emerald-600'}`}>
                            {txn.type === 'issue' ? '-' : txn.qty < 0 ? '' : '+'}{Math.abs(txn.qty)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {txn.location} • {txn.workOrder || txn.reference}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {txn.user} • {txn.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
