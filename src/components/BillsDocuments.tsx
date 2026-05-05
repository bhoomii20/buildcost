import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileText, Image, Calendar, Link as LinkIcon, Search } from 'lucide-react';
import { Document, Project } from '../App';
import { toast } from 'sonner';

type BillsDocumentsProps = {
  documents: Document[];
  projects: Project[];
  onAddDocument: () => void;
};

export function BillsDocuments({ documents, projects, onAddDocument }: BillsDocumentsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const bills = documents.filter((doc) => doc.type === 'bill');
  const docs = documents.filter((doc) => doc.type === 'document');

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  const filteredDocuments = (docs: Document[]) => {
    if (!searchQuery) return docs;
    return docs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getProjectName(doc.projectId).toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleUpload = () => {
    toast.success('Upload feature coming soon!');
  };

  const renderDocumentCard = (doc: Document) => (
    <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-[#E3F2FD] dark:bg-gray-700 rounded-lg flex items-center justify-center">
          {doc.fileType === 'PDF' ? (
            <FileText className="w-6 h-6 text-[#1E88E5]" />
          ) : (
            <Image className="w-6 h-6 text-[#1E88E5]" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 dark:text-gray-200">{doc.title}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {doc.date}
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-3 h-3" />
              {getProjectName(doc.projectId)}
            </div>
          </div>
          <span className="inline-block mt-2 px-2 py-1 bg-[#E3F2FD] dark:bg-gray-700 text-[#1E88E5] dark:text-gray-300 rounded text-xs">
            {doc.fileType}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-800 dark:text-gray-200">Bills & Documents</h2>
        <Button
          size="icon"
          onClick={handleUpload}
          className="bg-[#1E88E5] hover:bg-[#1976D2] rounded-full w-12 h-12 text-white"
        >
          <Upload className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by title or project..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="bills">Bills ({bills.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({docs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-3">
          {filteredDocuments(bills).length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No bills found</p>
            </div>
          ) : (
            filteredDocuments(bills).map(renderDocumentCard)
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-3">
          {filteredDocuments(docs).length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No documents found</p>
            </div>
          ) : (
            filteredDocuments(docs).map(renderDocumentCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
