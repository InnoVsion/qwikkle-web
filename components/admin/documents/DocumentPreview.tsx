'use client';

import Image from 'next/image';
import { Download, FileIcon } from 'lucide-react';

interface DocumentPreviewProps {
  mimeType: string;
  downloadUrl: string;
  fileName: string;
}

const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

export function DocumentPreview({
  mimeType,
  downloadUrl,
  fileName,
}: DocumentPreviewProps): React.ReactElement {
  if (IMAGE_MIME_TYPES.has(mimeType)) {
    return (
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-[#E4E8EC] bg-[#F5F7F9]">
        <Image
          src={downloadUrl}
          alt={fileName}
          fill
          unoptimized
          className="object-contain"
        />
      </div>
    );
  }

  if (mimeType === 'application/pdf') {
    return (
      <div className="h-[400px] w-full overflow-hidden rounded-xl border border-[#E4E8EC]">
        <iframe src={downloadUrl} title={fileName} className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="flex h-[400px] flex-col items-center justify-center gap-4 rounded-xl border border-[#E4E8EC] bg-[#F5F7F9]">
      <FileIcon size={40} className="text-[#B0BEC5]" />
      <p className="text-sm text-[#9E9E9E]">Preview not available for this file type.</p>
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#E4E8EC] bg-white px-4 py-2 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9]"
      >
        <Download size={13} />
        Download to view
      </a>
    </div>
  );
}
