'use client';

import { useState } from 'react';
import { Upload, X, FileText, Crop, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { ProfilePhotoCropperModal } from './ProfilePhotoCropperModal';

interface FileUploaderProps {
  label: string;
  accept?: string;
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  folder?: string;
  enableCrop?: boolean;
  educationText?: string;
  skillsText?: string;
  locationText?: string;
}

export function FileUploader({
  label,
  accept = 'image/*',
  currentUrl = '',
  onUploadComplete,
  folder = 'portfolio-assets',
  enableCrop = true,
  educationText,
  skillsText,
  locationText,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);

  // Crop Modal state
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset target value so re-selecting same file triggers onChange
    e.target.value = '';

    const isImage = file.type.startsWith('image/') || accept.includes('image');

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;

      if (enableCrop && isImage) {
        // Open Crop Modal with selected image
        setTempImageSrc(result);
        setIsCropperOpen(true);
      } else {
        // Process directly if not cropping
        uploadFinalUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadFinalUrl = async (dataUrl: string) => {
    setUploading(true);
    try {
      if (isSupabaseConfigured() && supabase && dataUrl.startsWith('data:')) {
        // Convert base64 data URL to Blob for Supabase upload
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const fileExt = blob.type.split('/')[1] || 'jpg';
        const fileName = `${folder}/${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage.from('assets').upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true,
        });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(fileName);
        const url = publicUrlData.publicUrl;
        setPreview(url);
        onUploadComplete(url);
      } else {
        setPreview(dataUrl);
        onUploadComplete(dataUrl);
      }
    } catch (err) {
      console.error('File upload/storage failed:', err);
      // Fallback to local Data URL
      setPreview(dataUrl);
      onUploadComplete(dataUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenCropperForExisting = () => {
    if (preview) {
      setTempImageSrc(preview);
      setIsCropperOpen(true);
    }
  };

  const handleCropperSave = async (croppedDataUrl: string) => {
    await uploadFinalUrl(croppedDataUrl);
  };

  const isImageFile = accept.includes('image');

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            {isImageFile ? (
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                <img src={preview} alt="Preview" className="w-full h-full object-cover object-top" />
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {preview.startsWith('data:') ? 'Cropped & Ready' : 'Uploaded File'}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                {preview.startsWith('data:') ? 'Base64 Encoded Image' : preview}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {enableCrop && isImageFile && (
              <button
                type="button"
                onClick={handleOpenCropperForExisting}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 text-xs font-bold transition-all"
                title="Crop & Adjust Photo"
              >
                <Crop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Crop / Adjust</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setPreview('');
                onUploadComplete('');
              }}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-2xl cursor-pointer bg-slate-950/50 hover:bg-slate-900/50 transition-all text-center group">
          {uploading ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Upload...</span>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-full bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-300">Click to upload photo</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {enableCrop && isImageFile ? 'Uploads with interactive crop & zoom editor' : 'PNG, JPG, WEBP, or PDF'}
              </p>
            </>
          )}
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
        </label>
      )}

      {/* Crop Modal */}
      {enableCrop && isCropperOpen && (
        <ProfilePhotoCropperModal
          isOpen={isCropperOpen}
          imageSrc={tempImageSrc}
          onClose={() => setIsCropperOpen(false)}
          onSave={handleCropperSave}
          educationText={educationText}
          skillsText={skillsText}
          locationText={locationText}
        />
      )}
    </div>
  );
}
