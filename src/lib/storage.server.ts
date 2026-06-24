import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export const validStorageName = ['local', 's3'] as const

export const ensureUploadsDirExists = async () => {
  const uploadDir = resolve(process.cwd(), 'uploads')

  await mkdir(uploadDir, { recursive: true })

  return { uploadDir }
}

export async function saveFile(name: string, buffer: Buffer) {
  // when adding s3: branch on a `storage` param here
  const { uploadDir } = await ensureUploadsDirExists()
  await writeFile(resolve(uploadDir, name), buffer)
}

export async function readStoredFile(name: string): Promise<Buffer | null> {
  try {
    const { uploadDir } = await ensureUploadsDirExists()
    return await readFile(resolve(uploadDir, name))
  } catch {
    return null
  }
}

export async function deleteStoredFile(name: string): Promise<void> {
  const { uploadDir } = await ensureUploadsDirExists()

  await rm(resolve(uploadDir, name), { force: true, recursive: true })
}
