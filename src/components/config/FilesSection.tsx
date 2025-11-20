import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import "./ConfigSection.css";

interface FileItem {
  id: string;
  name: string;
  selected: boolean;
}

const FilesSection = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "training_data.pdf", selected: true },
    { id: "2", name: "context_info.txt", selected: false },
  ]);

  const handleToggle = (id: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const handleRemove = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="config-section">
      <div className="config-section-header">
        <h3 className="config-section-title">Files</h3>
        <Button size="icon" variant="ghost">
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="config-section-content">
        <div className="config-section-inner">
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <Checkbox
                checked={file.selected}
                onCheckedChange={() => handleToggle(file.id)}
              />
              <File className="file-item-icon" />
              <span className="file-item-name">{file.name}</span>
              <Button
                size="icon"
                variant="ghost"
                className="file-item-remove"
                onClick={() => handleRemove(file.id)}
                style={{ height: '1.5rem', width: '1.5rem' }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FilesSection;
