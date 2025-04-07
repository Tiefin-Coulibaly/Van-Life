"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageDropzone = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImagePreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  // Cleanup memory on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div
      {...getRootProps({
        className: `flex flex-col items-center justify-center h-60 w-full cursor-pointer rounded-lg border-2 border-dashed 
        border-gray-300 bg-gray-100 transition hover:border-gray-400 hover:bg-gray-200
        ${isDragActive ? "border-black bg-gray-200" : ""}`,
      })}
    >
      <input {...getInputProps()} />

      {imagePreviewUrl ? (
        <>
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="mb-3 h-40 w-40 rounded-full object-cover shadow-md"
          />
          <p className="mb-2 text-center text-sm text-gray-600">
            Click or drag to replace image
          </p>

          {/* Confirm / Cancel Buttons */}
          <div className="flex gap-4">
            <button className="rounded-md border border-gray-400 px-4 py-2 text-gray-700 transition hover:bg-gray-200">
              Cancel
            </button>
            <button className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-900">
              Confirm
            </button>
          </div>
        </>
      ) : (
        <>
          <FaCloudUploadAlt className="mb-4 text-5xl text-gray-500" />
          <p className="text-center text-sm text-gray-700">
            {isDragActive
              ? "Drop the image here ..."
              : "Drag & drop an image here, or click to select"}
          </p>
        </>
      )}
    </div>
  );
};

export default ImageDropzone;
