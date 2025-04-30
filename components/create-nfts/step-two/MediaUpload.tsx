"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImageIcon, Music, Video } from "lucide-react";

interface MediaUploadProps {
  mediaFile: File | null;
  mediaPreview: string | null;
  mediaType: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export default function MediaUpload({
  mediaFile,
  mediaPreview,
  mediaType,
  onUpload,
  onRemove,
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderMediaPreview = () => {
    if (!mediaPreview || !mediaType) return null;

    if (mediaType.startsWith("image/")) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={mediaPreview || "/placeholder.svg"}
            alt="NFT Preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    } else if (mediaType.startsWith("video/")) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            src={mediaPreview}
            controls
            className="max-w-full max-h-full"
          />
        </div>
      );
    } else if (mediaType.startsWith("audio/")) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <Music className="w-16 h-16 text-purple mb-4" />
          <audio src={mediaPreview} controls className="w-full max-w-xs" />
          <p className="mt-2 text-sm text-gray-400 text-center">
            {mediaFile?.name}
          </p>
        </div>
      );
    }

    return null;
  };

  const getMediaTypeIcon = () => {
    if (mediaType?.startsWith("image/"))
      return <ImageIcon className="w-8 h-8" />;
    if (mediaType?.startsWith("video/")) return <Video className="w-8 h-8" />;
    if (mediaType?.startsWith("audio/")) return <Music className="w-8 h-8" />;
    return <Upload className="w-8 h-8" />;
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg h-64 flex flex-col items-center justify-center p-4 transition-colors ${
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-700"
        } ${mediaPreview ? "border-opacity-0" : "border-opacity-100"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!mediaPreview ? openFileDialog : undefined}
        style={{ cursor: !mediaPreview ? "pointer" : "default" }}
      >
        <AnimatePresence mode="wait">
          {!mediaPreview ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop media</h3>
              <p className="text-gray-400 text-sm mb-4">Browse Files</p>
              <p className="text-gray-500 text-xs">
                PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpeg,.jpg,.png,.mp3,.mp4"
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              {renderMediaPreview()}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <X className="w-5 h-5 text-white hover:text-red" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {mediaFile && (
        <div className="mt-2 flex items-center text-sm text-gray-300">
          <div className="flex items-center">
            {getMediaTypeIcon()}
            <span className="ml-2">{mediaFile.name}</span>
          </div>
          <span className="ml-auto">
            {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>
      )}
    </div>
  );
}
