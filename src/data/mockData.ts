// Mock data for the MES system

export interface WorkOrder {
  id: string;
  woNo: string;
  partNo: string;
  description: string;
  qty: number;
  reqShipDate: string;
  status: 'On-Time' | 'Late' | 'At-Risk';
  progress: number;
}

export interface StationActivity {
  station: string;
  workOrder: string;
  user: string;
  processTime: string;
  status: 'Active' | 'Idle' | 'Complete';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  station?: string;
}

export interface Part {
  partNo: string;
  rev: string;
  type: 'A' | 'P';
  description: string;
  model: string;
  mfg: string;
  onHand: number;
  location: string;
}

export const mockWorkOrders: WorkOrder[] = [
  { id: '1', woNo: 'WO-282537', partNo: '033010019', description: '1U MMC- NDDS TIME DIST UNIT', qty: 5, reqShipDate: '2026-01-30', status: 'On-Time', progress: 60 },
  { id: '2', woNo: 'WO-282529', partNo: '033010023', description: '2U MMC NG SPERRY MARINE OPC', qty: 3, reqShipDate: '2025-11-30', status: 'Late', progress: 45 },
  { id: '3', woNo: 'WO-282690', partNo: '033010024', description: '2U MMC CONFIGURATION TFDS MMC MGU', qty: 1, reqShipDate: '2026-03-31', status: 'On-Time', progress: 20 },
  { id: '4', woNo: 'WO-282652', partNo: '033010043', description: '2U MMC CONFIGURATION L3HARRIS', qty: 1, reqShipDate: '2026-02-09', status: 'At-Risk', progress: 35 },
  { id: '5', woNo: 'WO-282511', partNo: '033010051', description: '2U MODULAR MASTER CLOCK MGU A4-PTP', qty: 13, reqShipDate: '2025-12-31', status: 'On-Time', progress: 75 },
  { id: '6', woNo: 'WO-282424', partNo: '033010052', description: '2U MMC SAIC SATCOM CONFIG', qty: 8, reqShipDate: '2025-12-15', status: 'At-Risk', progress: 55 },
];

export const mockStationActivities: StationActivity[] = [
  { station: 'ASM-01', workOrder: 'WO-282537', user: 'J. Smith', processTime: '02:45:30', status: 'Active' },
  { station: 'ASM-02', workOrder: 'WO-282529', user: 'M. Johnson', processTime: '01:20:15', status: 'Active' },
  { station: 'TST-01', workOrder: 'WO-282511', user: 'R. Williams', processTime: '00:45:00', status: 'Active' },
  { station: 'TST-02', workOrder: '-', user: '-', processTime: '-', status: 'Idle' },
  { station: 'QC-01', workOrder: 'WO-282424', user: 'K. Brown', processTime: '00:30:22', status: 'Active' },
  { station: 'PKG-01', workOrder: 'WO-282690', user: 'L. Davis', processTime: '00:15:45', status: 'Complete' },
];

export const mockAlerts: Alert[] = [
  { id: '1', type: 'critical', message: 'WO-282529 overdue by 46 days', timestamp: '2026-01-15 08:30:00', station: 'ASM-02' },
  { id: '2', type: 'warning', message: 'Low inventory: Part 003001174 (5 remaining)', timestamp: '2026-01-15 07:45:00' },
  { id: '3', type: 'warning', message: 'WO-282652 at risk - requires expedite', timestamp: '2026-01-15 06:00:00', station: 'ASM-01' },
  { id: '4', type: 'info', message: 'ATP #950000125 updated - re-sync required', timestamp: '2026-01-14 16:30:00' },
];

export const mockParts: Part[] = [
  { partNo: '033010003', rev: 'B2', type: 'A', description: 'MMC CONFIGURATION GPNTS MGU A', model: 'ITAR', mfg: '', onHand: 0, location: 'A-01' },
  { partNo: '033010004', rev: 'C1', type: 'A', description: 'MMC CONFIGURATION GPNTS MGU B', model: '', mfg: '', onHand: 0, location: 'A-02' },
  { partNo: '033010005', rev: 'C2', type: 'A', description: 'MMC CONFIGURATION GPNTS MGU C', model: 'ITAR', mfg: '', onHand: 0, location: 'A-03' },
  { partNo: '033010006', rev: 'D1', type: 'A', description: 'MMC CONFIGURATION GPNTS SDU BASE', model: 'ITAR', mfg: '', onHand: 0, location: 'B-01' },
  { partNo: '033010007', rev: 'B2', type: 'A', description: 'MMC CONFIGURATION GPNTS SDU INTERN', model: '', mfg: '', onHand: 0, location: 'B-02' },
  { partNo: '033010008', rev: 'C2', type: 'A', description: 'MMC CONFIGURATION GPNTS MGU A1', model: 'ITAR', mfg: '', onHand: 0, location: 'B-03' },
  { partNo: '033000002', rev: 'A', type: 'P', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', model: 'MMC 2U', mfg: 'BRANDYWINE', onHand: 12, location: 'C-01' },
  { partNo: '033000003', rev: 'A', type: 'P', description: 'MMC MASTER CONTROL MODULE GPNTS', model: '', mfg: 'BRANDYWINE', onHand: 8, location: 'C-02' },
];

export const dashboardStats = {
  oee: 87.5,
  yield: 98.2,
  activeStations: 5,
  totalStations: 6,
  onTimeOrders: 12,
  lateOrders: 2,
  atRiskOrders: 3,
  totalOrders: 17,
};
