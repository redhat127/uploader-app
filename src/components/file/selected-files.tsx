import type { SelectedFileType } from './selected-file'
import { SelectedFile } from './selected-file'

export const SelectedFiles = ({
  selectedFiles,
  removeFile,
  markFileUploadCompleted,
}: {
  selectedFiles: SelectedFileType[]
  removeFile: (name: string) => void
  markFileUploadCompleted: (fileName: string) => void
}) => {
  return (
    <div className="space-y-4">
      {selectedFiles.map((selectedFile) => (
        <SelectedFile
          key={selectedFile.name}
          selectedFile={selectedFile}
          removeFile={removeFile}
          markFileUploadCompleted={markFileUploadCompleted}
        />
      ))}
    </div>
  )
}
