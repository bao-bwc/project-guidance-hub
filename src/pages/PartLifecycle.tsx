import { useState } from 'react';
import { motion } from 'framer-motion';
import { Recycle, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Clock, XCircle, Skull, Hourglass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PartLifecycleRow {
  partNumber: string;
  description: string;
  manufacturer: string;
  mfgPartNumber: string;
  brandywineOverall: string;
  digikeyStatus: string;
  digikeyLifecycle: string;
  digikeyQty: number;
  mouserStatus: string;
  mouserLifecycle: string;
  mouserQty: number;
  bomStatus: string;
  bomYTEOL: string;
  bomQty: number;
}

const mockData: PartLifecycleRow[] = [
  {
    partNumber: '001001525',
    description: 'PCA MCM OSM FRONT - GPNTS',
    manufacturer: 'Texas Instruments',
    mfgPartNumber: 'TMS320F28335PGFA',
    brandywineOverall: 'NRND',
    digikeyStatus: 'Active',
    digikeyLifecycle: 'NRND',
    digikeyQty: 1240,
    mouserStatus: 'Active',
    mouserLifecycle: 'NRND',
    mouserQty: 890,
    bomStatus: 'At Risk',
    bomYTEOL: '2.5',
    bomQty: 24,
  },
  {
    partNumber: '003001174',
    description: 'PANEL REAR OSM BLANK',
    manufacturer: 'Yageo',
    mfgPartNumber: 'RC0805FR-0710KL',
    brandywineOverall: 'Active',
    digikeyStatus: 'Active',
    digikeyLifecycle: 'Active',
    digikeyQty: 485000,
    mouserStatus: 'Active',
    mouserLifecycle: 'Active',
    mouserQty: 320000,
    bomStatus: 'Healthy',
    bomYTEOL: '10+',
    bomQty: 150,
  },
  {
    partNumber: '033000004',
    description: 'MMC TIMING MODULE NDDS',
    manufacturer: 'Analog Devices',
    mfgPartNumber: 'LT3045EMSE#PBF',
    brandywineOverall: 'EOL Announced',
    digikeyStatus: 'Last Buy',
    digikeyLifecycle: 'EOL',
    digikeyQty: 56,
    mouserStatus: 'Discontinued',
    mouserLifecycle: 'Obsolete',
    mouserQty: 0,
    bomStatus: 'Critical',
    bomYTEOL: '0.3',
    bomQty: 8,
  },
  {
    partNumber: '405001069',
    description: 'SCREW MACH 4-40x1/2 FHPD 100 CRES',
    manufacturer: 'Microchip',
    mfgPartNumber: 'ATSAMD21G18A-MUT',
    brandywineOverall: 'Active',
    digikeyStatus: 'Active',
    digikeyLifecycle: 'Active',
    digikeyQty: 12500,
    mouserStatus: 'Active',
    mouserLifecycle: 'Active',
    mouserQty: 9800,
    bomStatus: 'Healthy',
    bomYTEOL: '8+',
    bomQty: 60,
  },
];

const statusDefinitions = [
  {
    label: 'Active / Production',
    color: 'bg-success text-success-foreground',
    icon: CheckCircle2,
    description: 'The part is healthy and actively manufactured. Plentiful stock across authorized distributors.',
  },
  {
    label: 'NRND - Not Recommended for New Designs',
    color: 'bg-warning text-warning-foreground',
    icon: AlertTriangle,
    description: 'The manufacturer is still making it, but they are transitioning focus to a newer generation. Safe to keep using for existing legacy products, but do not design into new boards.',
  },
  {
    label: 'EOL Announced - End of Life',
    color: 'bg-[hsl(25,95%,53%)] text-primary-foreground',
    icon: Clock,
    description: 'The manufacturer officially announces they will stop making this part. A formal PCN is issued. Decide whether to trigger a Last Time Buy or begin redesigning.',
  },
  {
    label: 'LTB - Last Time Buy',
    color: 'bg-[hsl(25,95%,53%)] text-primary-foreground',
    icon: Hourglass,
    description: 'The absolute final date your purchasing team can place a direct factory order.',
  },
  {
    label: 'LTS - Last Time Ship / Discontinued',
    color: 'bg-destructive text-destructive-foreground',
    icon: XCircle,
    description: 'The manufacturer builds the final batch and ships it out. Production lines are officially shut down. Authorized distributors only have their remaining shelf stock.',
  },
  {
    label: 'Obsolete',
    color: 'bg-foreground text-background',
    icon: Skull,
    description: 'The part is completely dead. Shelf stock is completely gone at authorized distributors. You are forced into the gray market or must redesign the hardware/firmware.',
  },
];

function getOverallBadge(status: string) {
  switch (status) {
    case 'Active': return <Badge className="bg-success text-success-foreground border-0">{status}</Badge>;
    case 'NRND': return <Badge className="bg-warning text-warning-foreground border-0">{status}</Badge>;
    case 'EOL Announced': return <Badge className="bg-[hsl(25,95%,53%)] text-primary-foreground border-0">{status}</Badge>;
    case 'Last Buy': return <Badge className="bg-[hsl(25,95%,53%)] text-primary-foreground border-0">{status}</Badge>;
    case 'Discontinued': return <Badge className="bg-destructive text-destructive-foreground border-0">{status}</Badge>;
    case 'Obsolete': return <Badge className="bg-foreground text-background border-0">{status}</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
}

function getBomStatusBadge(status: string) {
  switch (status) {
    case 'Healthy': return <Badge className="bg-success text-success-foreground border-0">{status}</Badge>;
    case 'At Risk': return <Badge className="bg-warning text-warning-foreground border-0">{status}</Badge>;
    case 'Critical': return <Badge className="bg-destructive text-destructive-foreground border-0">{status}</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
}

const PartLifecycle = () => {
  const [legendOpen, setLegendOpen] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="p-2 rounded-lg bg-accent/10">
          <Recycle className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Part Lifecycle</h1>
          <p className="text-sm text-muted-foreground">Obsolescence Overview</p>
        </div>
      </motion.div>

      {/* Lifecycle Timeline Legend */}
      <Collapsible open={legendOpen} onOpenChange={setLegendOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Lifecycle Timeline — Status Definitions</CardTitle>
                <Button variant="ghost" size="icon">
                  {legendOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-0">
              {statusDefinitions.map((def) => {
                const Icon = def.icon;
                return (
                  <div key={def.label} className="flex gap-3 p-3 rounded-lg border bg-card">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${def.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{def.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{def.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                {/* First Header Row — Groupings */}
                <tr className="border-b bg-muted/50">
                  <th colSpan={4} className="px-3 py-2 text-left font-semibold text-foreground border-r">
                    Component Information
                  </th>
                  <th colSpan={1} className="px-3 py-2 text-center font-semibold text-foreground border-r">
                    Brandywine
                  </th>
                  <th colSpan={3} className="px-3 py-2 text-center font-semibold text-foreground border-r">
                    DigiKey
                  </th>
                  <th colSpan={3} className="px-3 py-2 text-center font-semibold text-foreground border-r">
                    Mouser
                  </th>
                  <th colSpan={3} className="px-3 py-2 text-center font-semibold text-foreground">
                    BOM Intelligence
                  </th>
                </tr>
                {/* Second Header Row — Column Names */}
                <tr className="border-b bg-muted/30">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Part Number</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Description</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Manufacturer</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground border-r">Mfg Part Number</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground border-r">Overall</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Lifecycle</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground border-r">Qty</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Lifecycle</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground border-r">Qty</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">YTEOL</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Qty</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((row) => (
                  <tr key={row.partNumber} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2.5 font-mono text-xs text-foreground">{row.partNumber}</td>
                    <td className="px-3 py-2.5 text-foreground max-w-[200px] truncate">{row.description}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{row.manufacturer}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground border-r">{row.mfgPartNumber}</td>
                    <td className="px-3 py-2.5 text-center border-r">{getOverallBadge(row.brandywineOverall)}</td>
                    <td className="px-3 py-2.5 text-center">{getOverallBadge(row.digikeyStatus)}</td>
                    <td className="px-3 py-2.5 text-center">{getOverallBadge(row.digikeyLifecycle)}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-xs border-r">{row.digikeyQty.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-center">{getOverallBadge(row.mouserStatus)}</td>
                    <td className="px-3 py-2.5 text-center">{getOverallBadge(row.mouserLifecycle)}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-xs border-r">{row.mouserQty.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-center">{getBomStatusBadge(row.bomStatus)}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-xs">{row.bomYTEOL}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-xs">{row.bomQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartLifecycle;
