import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Upload,
  Download,
  Database,
  Edit,
  Trash2,
  Shield,
  FileJson,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Mock data for demonstration
  const assets = [
    {
      id: 1,
      name: "Rotterdam H2 Plant",
      type: "Production",
      status: "Operational",
      capacity: "500 MW",
      lastUpdated: "2024-03-15"
    },
    {
      id: 2,
      name: "Hamburg Storage Facility",
      type: "Storage",
      status: "Under Construction",
      capacity: "10,000 tons",
      lastUpdated: "2024-03-14"
    },
    {
      id: 3,
      name: "Rhine Pipeline",
      type: "Pipeline",
      status: "Planned",
      capacity: "1,000 km",
      lastUpdated: "2024-03-13"
    },
    {
      id: 4,
      name: "Berlin Distribution Hub",
      type: "Distribution",
      status: "Operational",
      capacity: "200 trucks/day",
      lastUpdated: "2024-03-12"
    }
  ];

  const uploadHistory = [
    {
      id: 1,
      filename: "renewable_zones_2024.csv",
      type: "CSV",
      records: 1250,
      uploadedBy: "admin@h2infra.com",
      date: "2024-03-15 14:32",
      status: "success"
    },
    {
      id: 2,
      filename: "demand_centers.geojson",
      type: "GeoJSON",
      records: 450,
      uploadedBy: "admin@h2infra.com",
      date: "2024-03-14 10:15",
      status: "success"
    },
    {
      id: 3,
      filename: "pipeline_network.csv",
      type: "CSV",
      records: 0,
      uploadedBy: "admin@h2infra.com",
      date: "2024-03-13 16:45",
      status: "failed"
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFile(null);
      toast({
        title: "Upload Successful",
        description: `${selectedFile.name} has been uploaded successfully.`,
      });
    }, 2000);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Asset Deleted",
      description: "The asset has been removed from the database.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case "operational":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>;
      case "under construction":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Under Construction</Badge>;
      case "planned":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Planned</Badge>;
      case "success":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Success</Badge>;
      case "failed":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Admin Header with Auth Notice */}
        <Card className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">
                Manage infrastructure data and system configurations
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Data Upload</TabsTrigger>
            <TabsTrigger value="manage">Manage Assets</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>

          {/* Upload Section */}
          <TabsContent value="upload" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Infrastructure Data
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Select File</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.json,.geojson"
                      onChange={handleFileSelect}
                      className="flex-1"
                    />
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        CSV
                      </Badge>
                      <Badge variant="outline">
                        <FileJson className="h-3 w-3 mr-1" />
                        GeoJSON
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedFile && (
                  <Card className="p-4 bg-card/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        variant="energy"
                        onClick={handleUpload}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                )}

                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-semibold mb-2">Upload Guidelines:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      CSV files should include headers: name, type, lat, lng, capacity, status
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      GeoJSON files must follow standard format with properties
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                      Maximum file size: 10MB
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                      Coordinate system: WGS84 (EPSG:4326)
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download CSV Template
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileJson className="h-4 w-4 mr-2" />
                  Download GeoJSON Template
                </Button>
                <Button variant="outline" className="justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Export Current Data
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Manage Assets */}
          <TabsContent value="manage" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Infrastructure Assets
                </h3>
                <Button variant="energy" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell>{asset.capacity}</TableCell>
                      <TableCell>{asset.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(asset.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Upload History */}
          <TabsContent value="history" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Upload History
              </h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadHistory.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="font-medium">{upload.filename}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {upload.type === "CSV" ? (
                            <FileText className="h-3 w-3 mr-1" />
                          ) : (
                            <FileJson className="h-3 w-3 mr-1" />
                          )}
                          {upload.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{upload.records > 0 ? upload.records : "-"}</TableCell>
                      <TableCell>{upload.uploadedBy}</TableCell>
                      <TableCell>{upload.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(upload.status)}
                          {upload.status === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;