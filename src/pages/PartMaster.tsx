import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, ChevronRight, FileText, ClipboardCheck, FolderTree, GitCompare, Plus, Minus, Equal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockParts } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parts' | 'bom' | 'compare'>('parts');
  const [compareBom1, setCompareBom1] = useState<string>('');
  const [compareBom2, setCompareBom2] = useState<string>('');

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

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-2">
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
      </motion.div>

      {activeTab === 'parts' && (
        <>
          {/* Search */}
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

          {/* Parts Table */}
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

          {/* Drawing & ATP Preview */}
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

      {activeTab === 'compare' && (
        <motion.div variants={item} className="space-y-6">
          {/* BOM Selection */}
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

          {/* Comparison Results */}
          {compareBom1 && compareBom2 && (
            <>
              {(() => {
                const comparison = getBomComparison();
                return (
                  <>
                    {/* Summary Cards */}
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

                    {/* Detailed Comparison */}
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
    </motion.div>
  );
}
