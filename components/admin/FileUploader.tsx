'use client';

import { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface FileUploaderProps {
  label: string;
  accept?: string;
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  folder?: string;
}

export function FileUploader({
  label,
  accept = 'image/*',
  currentUrl = '',
  onUploadComplete,
  folder = 'portfolio-assets',
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      if (isSupabaseConfigured() && supabase) {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('assets').upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

        if (error) {
          throw error;
        }

        const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(fileName);
        const url = publicUrlData.publicUrl;
        setPreview(url);
        onUploadComplete(url);
      } else {
        // Local base64 reader fallback
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreview(result);
          onUploadComplete(result);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('File upload failed:', err);
      // Local reader fallback
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onUploadComplete(result);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 p-2 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {accept.includes('image') ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            )}
            <span className="text-xs text-slate-300 truncate max-w-[200px]">
              {preview.startsWith('data:') ? 'Local Upload' : preview}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setPreview('');
              onUploadComplete('');
            }}
            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl cursor-pointer bg-slate-900/50 transition-all text-center">
          {uploading ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading File...</span>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-300">Click to upload file</p>
              <p className="text-[10px] text-slate-500 mt-0.5">PNG, JPG, WEBP, or PDF</p>
            </>
          )}
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  );
}
