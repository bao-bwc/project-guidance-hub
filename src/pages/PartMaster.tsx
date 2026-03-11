import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, ChevronRight, FileText, ClipboardCheck, FolderTree, GitCompare, Plus, Minus, Equal, AlertTriangle, Activity, Clock, XCircle, CheckCircle2, TrendingDown, Recycle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockParts } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const bomHierarchy = [
  {
    bomNo: '033010011',
    description: 'MMC CONFIGURATION GPNTS MGU TESTBED',
    children: [
      { partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', qty: 1 },
      { partNo: '033000003', description: 'MMC MASTER CONTROL MODULE GPNTS', qty: 1 },
      { partNo: '001001525', description: 'PCA MCM OSM FRONT - GPNTS', qty: 2 },
      { partNo: '925000326', description: 'FW, GPNTS-MMC RAYTHEON BUNDLE', qty: 1 },
      { partNo: '003001174', description: 'PANEL REAR OSM BLANK', qty: 4 },
      { partNo: '405001069', description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES', qty: 12 },
      { partNo: '850000130', description: 'INTERFACE CONT DWG - MGU CONFIG C', qty: 1 },
      { partNo: '950000125', description: 'MMC ATP', qty: 1 },
    ],
  },
  {
    bomNo: '033010019',
    description: '1U MMC- NDDS TIME DIST UNIT',
    children: [
      { partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', qty: 1 },
      { partNo: '033000004', description: 'MMC TIMING MODULE NDDS', qty: 2 },
      { partNo: '001001530', description: 'PCA TIMING FRONT PANEL', qty: 1 },
      { partNo: '003001174', description: 'PANEL REAR OSM BLANK', qty: 2 },
      { partNo: '405001069', description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES', qty: 8 },
      { partNo: '950000130', description: 'NDDS ATP', qty: 1 },
    ],
  },
  {
    bomNo: '033010023',
    description: '2U MMC NG SPERRY MARINE OPC',
    children: [
      { partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', qty: 1 },
      { partNo: '033000003', description: 'MMC MASTER CONTROL MODULE GPNTS', qty: 1 },
      { partNo: '033000005', description: 'MMC SPERRY MARINE MODULE', qty: 1 },
      { partNo: '001001525', description: 'PCA MCM OSM FRONT - GPNTS', qty: 2 },
      { partNo: '003001180', description: 'PANEL REAR SPERRY CONFIG', qty: 2 },
      { partNo: '405001069', description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES', qty: 16 },
      { partNo: '950000135', description: 'SPERRY MARINE ATP', qty: 1 },
    ],
  },
];

type ObsolescenceStatus = 'Active' | 'NRND' | 'Last Buy' | 'Obsolete';
type LifecyclePhase = 'Introduction' | 'Growth' | 'Mature' | 'Decline' | 'EOL';

interface ObsolescencePart {
  partNo: string;
  description: string;
  manufacturer: string;
  status: ObsolescenceStatus;
  alternatePartNo: string;
  lastBuyDate: string;
  affectedBOMs: string[];
}

interface LifecyclePart {
  partNo: string;
  description: string;
  phase: LifecyclePhase;
  introduced: string;
  estimatedEOL: string;
  remainingLife: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  notes: string;
}

const obsolescenceData: ObsolescencePart[] = [
  { partNo: '001001525', description: 'PCA MCM OSM FRONT - GPNTS', manufacturer: 'Texas Instruments', status: 'NRND', alternatePartNo: '001001525-B', lastBuyDate: '2026-09-30', affectedBOMs: ['033010011', '033010023'] },
  { partNo: '925000326', description: 'FW, GPNTS-MMC RAYTHEON BUNDLE', manufacturer: 'Raytheon', status: 'Active', alternatePartNo: '-', lastBuyDate: '-', affectedBOMs: ['033010011'] },
  { partNo: '033000004', description: 'MMC TIMING MODULE NDDS', manufacturer: 'Brandywine', status: 'Last Buy', alternatePartNo: '033000004-R2', lastBuyDate: '2026-06-15', affectedBOMs: ['033010019'] },
  { partNo: '003001174', description: 'PANEL REAR OSM BLANK', manufacturer: 'Brandywine', status: 'Active', alternatePartNo: '-', lastBuyDate: '-', affectedBOMs: ['033010011', '033010019'] },
  { partNo: '405001069', description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES', manufacturer: 'McMaster-Carr', status: 'Active', alternatePartNo: '-', lastBuyDate: '-', affectedBOMs: ['033010011', '033010019', '033010023'] },
  { partNo: '033000005', description: 'MMC SPERRY MARINE MODULE', manufacturer: 'Sperry Marine', status: 'Obsolete', alternatePartNo: '033000005-V2', lastBuyDate: '2025-03-01', affectedBOMs: ['033010023'] },
  { partNo: '001001530', description: 'PCA TIMING FRONT PANEL', manufacturer: 'Flex Ltd', status: 'NRND', alternatePartNo: '001001530-C', lastBuyDate: '2026-12-31', affectedBOMs: ['033010019'] },
  { partNo: '003001180', description: 'PANEL REAR SPERRY CONFIG', manufacturer: 'Brandywine', status: 'Last Buy', alternatePartNo: '003001180-R1', lastBuyDate: '2026-08-01', affectedBOMs: ['033010023'] },
];

const lifecycleData: LifecyclePart[] = [
  { partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY', phase: 'Mature', introduced: '2019-03-15', estimatedEOL: '2031-12-31', remainingLife: 72, riskLevel: 'Low', notes: 'Stable platform, no redesign planned' },
  { partNo: '033000003', description: 'MMC MASTER CONTROL MODULE GPNTS', phase: 'Growth', introduced: '2022-06-01', estimatedEOL: '2034-06-30', remainingLife: 88, riskLevel: 'Low', notes: 'Active development, new features planned' },
  { partNo: '001001525', description: 'PCA MCM OSM FRONT - GPNTS', phase: 'Decline', introduced: '2017-01-10', estimatedEOL: '2027-03-31', remainingLife: 18, riskLevel: 'High', notes: 'Key IC going NRND, redesign required' },
  { partNo: '033000004', description: 'MMC TIMING MODULE NDDS', phase: 'Decline', introduced: '2018-09-20', estimatedEOL: '2026-12-31', remainingLife: 12, riskLevel: 'Critical', notes: 'Last buy deadline approaching' },
  { partNo: '033000005', description: 'MMC SPERRY MARINE MODULE', phase: 'EOL', introduced: '2016-04-01', estimatedEOL: '2025-12-31', remainingLife: 0, riskLevel: 'Critical', notes: 'Obsolete, replacement V2 in qualification' },
  { partNo: '925000326', description: 'FW, GPNTS-MMC RAYTHEON BUNDLE', phase: 'Mature', introduced: '2020-11-15', estimatedEOL: '2032-06-30', remainingLife: 65, riskLevel: 'Low', notes: 'Software bundle, regular updates' },
  { partNo: '003001174', description: 'PANEL REAR OSM BLANK', phase: 'Mature', introduced: '2018-05-01', estimatedEOL: '2030-12-31', remainingLife: 58, riskLevel: 'Low', notes: 'Simple mechanical part, long life' },
  { partNo: '405001069', description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES', phase: 'Mature', introduced: '2015-01-01', estimatedEOL: '2040-12-31', remainingLife: 95, riskLevel: 'Low', notes: 'Standard COTS hardware' },
];

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

export default function PartMaster() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parts' | 'bom' | 'compare' | 'obsolescence' | 'lifecycle'>('parts');
  const [compareBom1, setCompareBom1] = useState<string>('');
  const [compareBom2, setCompareBom2] = useState<string>('');
  const [selectedObsBom, setSelectedObsBom] = useState<string>('');
  const [selectedLifecycleBom, setSelectedLifecycleBom] = useState<string>('');

  const getObsolescenceStatusColor = (status: ObsolescenceStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400';
      case 'NRND': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400';
      case 'Last Buy': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400';
      case 'Obsolete': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400';
    }
  };

  const getLifecyclePhaseColor = (phase: LifecyclePhase) => {
    switch (phase) {
      case 'Introduction': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400';
      case 'Growth': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400';
      case 'Mature': return 'bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-400';
      case 'Decline': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400';
      case 'EOL': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-emerald-600 dark:text-emerald-400';
      case 'Medium': return 'text-amber-600 dark:text-amber-400';
      case 'High': return 'text-orange-600 dark:text-orange-400';
      case 'Critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const getRemainingLifeColor = (pct: number) => {
    if (pct >= 60) return 'bg-emerald-500';
    if (pct >= 30) return 'bg-amber-500';
    if (pct > 0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredObsolescence = selectedObsBom
    ? obsolescenceData.filter(p => p.affectedBOMs.includes(selectedObsBom))
    : obsolescenceData;

  const filteredLifecycle = selectedLifecycleBom
    ? lifecycleData.filter(p => {
        const bom = bomHierarchy.find(b => b.bomNo === selectedLifecycleBom);
        return bom?.children.some(c => c.partNo === p.partNo);
      })
    : lifecycleData;

  const getBomComparison = () => {
    const bom1 = bomHierarchy.find(b => b.bomNo === compareBom1);
    const bom2 = bomHierarchy.find(b => b.bomNo === compareBom2);
    if (!bom1 || !bom2) return { added: [], removed: [], changed: [], unchanged: [] };

    const bom1Parts = new Map(bom1.children.map(c => [c.partNo, c]));
    const bom2Parts = new Map(bom2.children.map(c => [c.partNo, c]));

    const added: typeof bom2.children = [];
    const removed: typeof bom1.children = [];
    const changed: { partNo: string; description: string; qty1: number; qty2: number }[] = [];
    const unchanged: typeof bom1.children = [];

    bom1.children.forEach(part => {
      const bom2Part = bom2Parts.get(part.partNo);
      if (!bom2Part) {
        removed.push(part);
      } else if (bom2Part.qty !== part.qty) {
        changed.push({ partNo: part.partNo, description: part.description, qty1: part.qty, qty2: bom2Part.qty });
      } else {
        unchanged.push(part);
      }
    });

    bom2.children.forEach(part => {
      if (!bom1Parts.has(part.partNo)) {
        added.push(part);
      }
    });

    return { added, removed, changed, unchanged };
  };

  const filteredParts = mockParts.filter(part =>
    part.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const obsStats = {
    active: obsolescenceData.filter(p => p.status === 'Active').length,
    nrnd: obsolescenceData.filter(p => p.status === 'NRND').length,
    lastBuy: obsolescenceData.filter(p => p.status === 'Last Buy').length,
    obsolete: obsolescenceData.filter(p => p.status === 'Obsolete').length,
  };

  const lifecycleStats = {
    low: lifecycleData.filter(p => p.riskLevel === 'Low').length,
    medium: lifecycleData.filter(p => p.riskLevel === 'Medium').length,
    high: lifecycleData.filter(p => p.riskLevel === 'High').length,
    critical: lifecycleData.filter(p => p.riskLevel === 'Critical').length,
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-2 flex-wrap">
        <Button
          variant={activeTab === 'parts' ? 'default' : 'outline'}
          onClick={() => setActiveTab('parts')}
          className="gap-2"
        >
          <Package className="w-4 h-4" />
          Parts Inventory
        </Button>
        <Button
          variant={activeTab === 'bom' ? 'default' : 'outline'}
          onClick={() => setActiveTab('bom')}
          className="gap-2"
        >
          <FolderTree className="w-4 h-4" />
          BOM Navigator
        </Button>
        <Button
          variant={activeTab === 'compare' ? 'default' : 'outline'}
          onClick={() => setActiveTab('compare')}
          className="gap-2"
        >
          <GitCompare className="w-4 h-4" />
          BOM Comparison
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/part-lifecycle')}
          className="gap-2"
        >
          <Recycle className="w-4 h-4" />
          Part Lifecycle
        </Button>
        <Button
          variant={activeTab === 'obsolescence' ? 'default' : 'outline'}
          onClick={() => setActiveTab('obsolescence')}
          className="gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          BOM Obsolescence
        </Button>
        <Button
          variant={activeTab === 'lifecycle' ? 'default' : 'outline'}
          onClick={() => setActiveTab('lifecycle')}
          className="gap-2"
        >
          <Activity className="w-4 h-4" />
          Lifecycle Analysis
        </Button>
      </motion.div>

      {/* Parts Inventory Tab */}
      {activeTab === 'parts' && (
        <>
          <motion.div variants={item} className="mes-card">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by part number or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filters</Button>
            </div>
          </motion.div>

          <motion.div variants={item} className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Inventory ({filteredParts.length} parts)</h2>
            <div className="overflow-x-auto">
              <table className="mes-table">
                <thead>
                  <tr>
                    <th>Part Number</th>
                    <th>Rev</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>On-Hand</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((part) => (
                    <tr
                      key={part.partNo}
                      className="cursor-pointer"
                      onClick={() => setSelectedPart(part.partNo)}
                    >
                      <td className="font-mono font-medium">{part.partNo}</td>
                      <td className="font-mono">{part.rev}</td>
                      <td>
                        <span className={part.type === 'A' ? 'mes-badge-success' : 'mes-badge-warning'}>
                          {part.type === 'A' ? 'Assembly' : 'Part'}
                        </span>
                      </td>
                      <td className="max-w-xs truncate">{part.description}</td>
                      <td className="text-muted-foreground">{part.model || '-'}</td>
                      <td className="text-muted-foreground">{part.mfg || '-'}</td>
                      <td className={part.onHand === 0 ? 'text-destructive font-medium' : ''}>
                        {part.onHand}
                      </td>
                      <td className="font-mono text-muted-foreground">{part.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {/* BOM Navigator Tab */}
      {activeTab === 'bom' && (
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-6">
          <div className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">BOM Hierarchy</h2>
            <div className="space-y-2">
              {bomHierarchy.map((bom) => (
                <div key={bom.bomNo} className="border border-border rounded-lg">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-t-lg">
                    <FolderTree className="w-5 h-5 text-accent" />
                    <div className="flex-1">
                      <span className="font-mono font-medium">{bom.bomNo}</span>
                      <p className="text-sm text-muted-foreground">{bom.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="p-2">
                    {bom.children.map((child, index) => (
                      <div
                        key={child.partNo}
                        className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-lg cursor-pointer"
                        onClick={() => setSelectedPart(child.partNo)}
                      >
                        <div className="w-6 text-center text-xs text-muted-foreground">{index + 1}</div>
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <span className="font-mono text-sm">{child.partNo}</span>
                          <p className="text-xs text-muted-foreground truncate">{child.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="mes-card">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">Assembly Drawing</h2>
              </div>
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a BOM to view drawing</p>
                </div>
              </div>
            </div>

            <div className="mes-card">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardCheck className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">ATP Checklist</h2>
              </div>
              <div className="bg-muted rounded-lg p-4 border border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No ATP linked to selection</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* BOM Comparison Tab */}
      {activeTab === 'compare' && (
        <motion.div variants={item} className="space-y-6">
          <div className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Select BOMs to Compare</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Base BOM (Reference)</label>
                <Select value={compareBom1} onValueChange={setCompareBom1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select base BOM" />
                  </SelectTrigger>
                  <SelectContent>
                    {bomHierarchy.map((bom) => (
                      <SelectItem key={bom.bomNo} value={bom.bomNo}>
                        {bom.bomNo} - {bom.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Compare BOM</label>
                <Select value={compareBom2} onValueChange={setCompareBom2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select comparison BOM" />
                  </SelectTrigger>
                  <SelectContent>
                    {bomHierarchy.map((bom) => (
                      <SelectItem key={bom.bomNo} value={bom.bomNo}>
                        {bom.bomNo} - {bom.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {compareBom1 && compareBom2 && (
            <>
              {(() => {
                const comparison = getBomComparison();
                return (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="mes-card bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                            <Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{comparison.added.length}</p>
                            <p className="text-sm text-emerald-600 dark:text-emerald-500">Added</p>
                          </div>
                        </div>
                      </div>
                      <div className="mes-card bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                            <Minus className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-red-700 dark:text-red-400">{comparison.removed.length}</p>
                            <p className="text-sm text-red-600 dark:text-red-500">Removed</p>
                          </div>
                        </div>
                      </div>
                      <div className="mes-card bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                            <GitCompare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{comparison.changed.length}</p>
                            <p className="text-sm text-amber-600 dark:text-amber-500">Changed</p>
                          </div>
                        </div>
                      </div>
                      <div className="mes-card bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/50">
                            <Equal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-slate-700 dark:text-slate-400">{comparison.unchanged.length}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-500">Unchanged</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mes-card">
                      <h2 className="text-lg font-semibold mb-4 text-foreground">Comparison Details</h2>
                      <div className="space-y-4">
                        {comparison.added.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                              <Plus className="w-4 h-4" /> Added Parts
                            </h3>
                            <div className="space-y-1">
                              {comparison.added.map((part) => (
                                <div key={part.partNo} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
                                  <span className="font-mono text-sm font-medium">{part.partNo}</span>
                                  <span className="text-sm text-muted-foreground flex-1">{part.description}</span>
                                  <span className="text-sm font-medium">Qty: {part.qty}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {comparison.removed.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                              <Minus className="w-4 h-4" /> Removed Parts
                            </h3>
                            <div className="space-y-1">
                              {comparison.removed.map((part) => (
                                <div key={part.partNo} className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                                  <span className="font-mono text-sm font-medium">{part.partNo}</span>
                                  <span className="text-sm text-muted-foreground flex-1">{part.description}</span>
                                  <span className="text-sm font-medium">Qty: {part.qty}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {comparison.changed.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                              <GitCompare className="w-4 h-4" /> Quantity Changes
                            </h3>
                            <div className="space-y-1">
                              {comparison.changed.map((part) => (
                                <div key={part.partNo} className="flex items-center gap-3 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                                  <span className="font-mono text-sm font-medium">{part.partNo}</span>
                                  <span className="text-sm text-muted-foreground flex-1">{part.description}</span>
                                  <span className="text-sm">
                                    <span className="text-red-600 dark:text-red-400 line-through">{part.qty1}</span>
                                    <span className="mx-2">→</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{part.qty2}</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {comparison.unchanged.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                              <Equal className="w-4 h-4" /> Unchanged Parts ({comparison.unchanged.length})
                            </h3>
                            <div className="space-y-1">
                              {comparison.unchanged.map((part) => (
                                <div key={part.partNo} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg border border-border">
                                  <span className="font-mono text-sm">{part.partNo}</span>
                                  <span className="text-sm text-muted-foreground flex-1">{part.description}</span>
                                  <span className="text-sm text-muted-foreground">Qty: {part.qty}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          )}

          {(!compareBom1 || !compareBom2) && (
            <div className="mes-card">
              <div className="text-center py-12 text-muted-foreground">
                <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select two BOMs above to see the comparison results</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* BOM Obsolescence Tab */}
      {activeTab === 'obsolescence' && (
        <motion.div variants={item} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="mes-card bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{obsStats.active}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500">Active</p>
                </div>
              </div>
            </div>
            <div className="mes-card bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{obsStats.nrnd}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-500">NRND</p>
                </div>
              </div>
            </div>
            <div className="mes-card bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{obsStats.lastBuy}</p>
                  <p className="text-sm text-orange-600 dark:text-orange-500">Last Buy</p>
                </div>
              </div>
            </div>
            <div className="mes-card bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">{obsStats.obsolete}</p>
                  <p className="text-sm text-red-600 dark:text-red-500">Obsolete</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOM Filter */}
          <div className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Filter by BOM</h2>
            <div className="max-w-md">
              <Select value={selectedObsBom} onValueChange={setSelectedObsBom}>
                <SelectTrigger>
                  <SelectValue placeholder="All BOMs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All BOMs</SelectItem>
                  {bomHierarchy.map((bom) => (
                    <SelectItem key={bom.bomNo} value={bom.bomNo}>
                      {bom.bomNo} - {bom.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Obsolescence Table */}
          <div className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Obsolescence Details</h2>
            <div className="overflow-x-auto">
              <table className="mes-table">
                <thead>
                  <tr>
                    <th>Part Number</th>
                    <th>Description</th>
                    <th>Manufacturer</th>
                    <th>Status</th>
                    <th>Alternate Part</th>
                    <th>Last Buy Date</th>
                    <th>Affected BOMs</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredObsolescence.map((part) => (
                    <tr key={part.partNo}>
                      <td className="font-mono font-medium">{part.partNo}</td>
                      <td className="max-w-xs truncate">{part.description}</td>
                      <td className="text-muted-foreground">{part.manufacturer}</td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getObsolescenceStatusColor(part.status)}`}>
                          {part.status}
                        </span>
                      </td>
                      <td className="font-mono text-sm">{part.alternatePartNo}</td>
                      <td className="text-muted-foreground">{part.lastBuyDate}</td>
                      <td>
                        <div className="flex gap-1 flex-wrap">
                          {part.affectedBOMs.map(bom => (
                            <span key={bom} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-muted text-muted-foreground">
                              {bom}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lifecycle Analysis Tab */}
      {activeTab === 'lifecycle' && (
        <motion.div variants={item} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="mes-card bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{lifecycleStats.low}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-500">Low Risk</p>
                </div>
              </div>
            </div>
            <div className="mes-card bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{lifecycleStats.medium}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-500">Medium Risk</p>
                </div>
              </div>
            </div>
            <div className="mes-card bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{lifecycleStats.high}</p>
                  <p className="text-sm text-orange-600 dark:text-orange-500">High Risk</p>
                </div>
              </div>
            </div>
            <div className="mes-card bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">{lifecycleStats.critical}</p>
                  <p className="text-sm text-red-600 dark:text-red-500">Critical Risk</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOM Filter */}
          <div className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Filter by BOM</h2>
            <div className="max-w-md">
              <Select value={selectedLifecycleBom} onValueChange={setSelectedLifecycleBom}>
                <SelectTrigger>
                  <SelectValue placeholder="All Parts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Parts</SelectItem>
                  {bomHierarchy.map((bom) => (
                    <SelectItem key={bom.bomNo} value={bom.bomNo}>
                      {bom.bomNo} - {bom.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lifecycle Table */}
          <div className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Lifecycle Details</h2>
            <div className="overflow-x-auto">
              <table className="mes-table">
                <thead>
                  <tr>
                    <th>Part Number</th>
                    <th>Description</th>
                    <th>Phase</th>
                    <th>Introduced</th>
                    <th>Est. EOL</th>
                    <th>Remaining Life</th>
                    <th>Risk Level</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLifecycle.map((part) => (
                    <tr key={part.partNo}>
                      <td className="font-mono font-medium">{part.partNo}</td>
                      <td className="max-w-xs truncate">{part.description}</td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLifecyclePhaseColor(part.phase)}`}>
                          {part.phase}
                        </span>
                      </td>
                      <td className="text-muted-foreground">{part.introduced}</td>
                      <td className="text-muted-foreground">{part.estimatedEOL}</td>
                      <td>
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getRemainingLifeColor(part.remainingLife)}`}
                              style={{ width: `${part.remainingLife}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground w-8">{part.remainingLife}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`text-sm font-medium ${getRiskColor(part.riskLevel)}`}>
                          {part.riskLevel}
                        </span>
                      </td>
                      <td className="text-sm text-muted-foreground max-w-[200px] truncate">{part.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}