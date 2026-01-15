import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, ChevronRight, FileText, ClipboardCheck, FolderTree } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockParts } from '@/data/mockData';

const bomHierarchy = [
  {
    bomNo: '033010011',
    description: 'MMC CONFIGURATION GPNTS MGU TESTBED',
    children: [
      { partNo: '033000002', description: 'MODULAR MASTER CLOCK CHASSIS ASSY' },
      { partNo: '033000003', description: 'MMC MASTER CONTROL MODULE GPNTS' },
      { partNo: '001001525', description: 'PCA MCM OSM FRONT - GPNTS' },
      { partNo: '925000326', description: 'FW, GPNTS-MMC RAYTHEON BUNDLE' },
      { partNo: '003001174', description: 'PANEL REAR OSM BLANK' },
      { partNo: '405001069', description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES' },
      { partNo: '850000130', description: 'INTERFACE CONT DWG - MGU CONFIG C' },
      { partNo: '950000125', description: 'MMC ATP' },
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
  const [activeTab, setActiveTab] = useState<'parts' | 'bom'>('parts');

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
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Part Master</h1>
        <p className="text-muted-foreground">Manage parts inventory and BOM hierarchy</p>
      </motion.div>

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
      </motion.div>

      {activeTab === 'parts' ? (
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
      ) : (
        /* BOM Navigator */
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
    </motion.div>
  );
}
