import { SelectedFile } from './selected-file'
import type { SelectedFileType } from './selected-file'

export const SelectedFiles = ({
  selectedFiles,
  removeFile,
}: {
  selectedFiles: SelectedFileType[]
  removeFile: (name: string) => void
}) => {
  return (
    <div className="space-y-4">
      {selectedFiles.map((selectedFile) => (
        <SelectedFile
          key={selectedFile.name}
          selectedFile={selectedFile}
          removeFile={removeFile}
        />
      ))}
    </div>
  )
}
