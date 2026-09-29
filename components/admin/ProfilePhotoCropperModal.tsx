'use client';

import { useState, useCallback, useEffect } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg, PixelCrop } from '@/lib/cropImage';
import { X, ZoomIn, ZoomOut, RotateCcw, Check, GraduationCap, Code2, MapPin, Loader2 } from 'lucide-react';

interface ProfilePhotoCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onSave: (croppedDataUrl: string) => void;
  educationText?: string;
  skillsText?: string;
  locationText?: string;
}

export function ProfilePhotoCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onSave,
  educationText = 'PJLCE (AI) & IIT Madras (Data Science)',
  skillsText = 'Python, React, ML, NLP, Node.js, SQL',
  locationText = 'Nagpur, Maharashtra, India',
}: ProfilePhotoCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
  const [livePreviewUrl, setLivePreviewUrl] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Called when crop changes
  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Update live preview when croppedAreaPixels changes
  useEffect(() => {
    if (!imageSrc || !croppedAreaPixels) return;

    let isMounted = true;
    const timer = setTimeout(async () => {
      try {
        const url = await getCroppedImg(imageSrc, croppedAreaPixels, 0.7);
        if (isMounted) {
          setLivePreviewUrl(url);
        }
      } catch (err) {
        console.error('Failed to generate live preview:', err);
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [imageSrc, croppedAreaPixels]);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setSaving(true);
    try {
      const croppedUrl = await getCroppedImg(imageSrc, croppedAreaPixels, 0.92);
      onSave(croppedUrl);
      onClose();
    } catch (err) {
      console.error('Failed to crop image:', err);
      alert('Failed to process cropped image. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/50">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Edit Profile Photo</span>
            </h2>
            <p className="text-xs text-slate-400">
              Pan, zoom, and position your photo to look best inside your landing page profile card.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Side-by-Side Editor & Card Preview */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Crop Editor Area (Col 1-7) */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                classes={{
                  containerClassName: 'rounded-2xl',
                  cropAreaClassName: 'border-2 border-blue-500 rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]',
                }}
              />
            </div>

            {/* Zoom & Adjust Controls */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                  <span>Zoom Level</span>
                </span>
                <span className="text-blue-400 font-mono">{zoom.toFixed(1)}x</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Profile Card Preview (Col 8-12) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Profile Card Preview
            </span>

            {/* Styled Landing Page Card Replica */}
            <div className="relative w-full max-w-[270px] sm:max-w-[290px] rounded-3xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl group">
              <div className="relative w-full h-[340px] sm:h-[370px] overflow-hidden bg-slate-950">
                <img
                  src={livePreviewUrl || imageSrc}
                  alt="Cropped Preview"
                  className="w-full h-full object-cover object-top"
                />

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

                {/* Compact Glass Overlay */}
                <div className="absolute bottom-9 left-2.5 right-2.5 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/15 text-white space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-blue-500/20 text-blue-400 shrink-0">
                      <GraduationCap className="w-3 h-3" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-200 truncate">{educationText}</p>
                  </div>

                  <div className="h-[1px] bg-white/10 w-full" />

                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-purple-500/20 text-purple-400 shrink-0">
                      <Code2 className="w-3 h-3" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-200 truncate">{skillsText}</p>
                  </div>

                  <div className="h-[1px] bg-white/10 w-full" />

                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0">
                      <MapPin className="w-3 h-3" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-200 truncate">{locationText}</p>
                  </div>
                </div>

                {/* Status bar */}
                <div className="absolute inset-x-0 bottom-0 px-3 py-1.5 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[10px] font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available for Hire</span>
                  </span>
                  <span className="text-blue-400">Let&apos;s talk &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Crop</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Cropped Photo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
