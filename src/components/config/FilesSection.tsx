import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-medium text-foreground">Files</h3>
        <Button size="icon" variant="ghost">
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-40">
        <div className="p-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="p-3 bg-secondary rounded-md flex items-center gap-3 group"
            >
              <Checkbox
                checked={file.selected}
                onCheckedChange={() => handleToggle(file.id)}
              />
              <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="flex-1 text-sm text-secondary-foreground truncate">
                {file.name}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(file.id)}
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
