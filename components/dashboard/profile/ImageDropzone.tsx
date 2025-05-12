"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { FileRejection } from "react-dropzone";
import {
  uploadImageToCloudFare,
  updateUserImageInDb,
} from "@/app/lib/actions/profileUpdateAction";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ImageDropzone = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);

  const session = useSession();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const uploadedImage = acceptedFiles[0];
        setImagePreviewUrl(URL.createObjectURL(uploadedImage));
        setUploadImage(uploadedImage);
      }

      if (rejectedFiles && rejectedFiles.length > 0) {
        const errorMessage =
          rejectedFiles[0].errors[0].code === "file-invalid-type"
            ? "File type must be an image."
            : "The image size must be less than 2MB.";
        setUploadError(errorMessage);
        setImagePreviewUrl(null);
        setUploadImage(null);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024, // 2MB
  });

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleImageConfirmation = async () => {
    try {
      if (uploadImage) {
        setIsImageUploading(true);
        setIsImageConfirmed(true);

        const buffer = await uploadImage.arrayBuffer();
        const base64String = Buffer.from(buffer).toString("base64");

        const timestamp = new Date().getTime();
        const userId = session.data?.user?.id;

        const imageData = {
          base64String: `data:${uploadImage.type};base64,${base64String}`,
          filename: `user_${userId}_${timestamp}`,
        };

        const imageUrl = await uploadImageToCloudFare(imageData);
        setIsImageUploaded(true);
        await updateUserImageInDb(userId!, imageUrl);

        await session.update({
          ...session.data,
          user: {
            ...session.data?.user,
            image: imageUrl,
          },
        });

        toast.success("Image uploaded successfully!", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleImageCancel = () => {
    URL.revokeObjectURL(imagePreviewUrl!);
    setImagePreviewUrl(null);
  };

  return (
    <>
      <Link
        href="/dashboard/profile"
        className="mb-6 flex cursor-pointer items-center gap-2 text-sm"
      >
        <FaArrowLeft className="text-gray-500 transition hover:text-gray-700" />
        <p className="transition hover:text-gray-700 ">Back to profile</p>
      </Link>

      {/* Dropzone Area */}
      <div
        {...getRootProps({
          className: `flex flex-col items-center justify-center min-h-60 mb-4 py-5 w-full cursor-pointer rounded-lg border-2 border-dashed 
        border-gray-300 bg-gray-100 transition hover:border-gray-400 hover:bg-gray-200
        ${isDragActive ? "border-black bg-gray-200" : ""}`,
        })}
      >
        <input {...getInputProps()} />

        {/*Preview image */}
        {imagePreviewUrl ? (
          <>
            <div className="relative mb-3 h-40 w-40">
              <Image
                src={imagePreviewUrl}
                alt="Preview"
                fill
                className=" rounded-full object-cover shadow-md"
              />
            </div>

            <p className="mb-2 text-center text-sm text-gray-600">
              Click <span className="hidden xl:inline">or drag</span> to replace
              image
            </p>
          </>
        ) : (
          <>
            <FaCloudUploadAlt className="mb-4 text-5xl text-gray-500" />
            <div className="text-center text-sm text-gray-700">
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <>
                  <p>
                    <span className="hidden xl:inline">
                      Drag & drop an image here, or
                    </span>{" "}
                    click to select
                  </p>
                  <p className="text-sm text-gray-700">
                    You can upload images up to a maximum of 2 MB.{" "}
                  </p>
                </>
              )}
            </div>
          </>
        )}

        {uploadError && !uploadImage && (
          <p className="mt-2 text-sm text-red-500">{uploadError}</p>
        )}
      </div>

      {/* Confirm / Cancel Buttons */}
      {imagePreviewUrl && (
        <div className="flex justify-end gap-4">
          {!isImageConfirmed && (
            <button
              onClick={handleImageCancel}
              className="rounded-md border border-gray-400 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
          {!isImageUploaded && (
            <button
              onClick={handleImageConfirmation}
              className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-900"
            >
              {isImageUploading ? (
                <div className="flex items-center gap-3">
                  Updating image
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ImageDropzone;
