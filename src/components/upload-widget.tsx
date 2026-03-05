import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import type { UploadWidgetProps, UploadWidgetValue } from "@/types";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const isCloudinarySuccessResult = (
  result: CloudinaryUploadWidgetResults
): result is { event: "success"; info: CloudinaryUploadWidgetInfo } => {
  return result.event === "success";
};

const UploadWidget = ({
  value = null,
  onChange,
  disabled = false,
}: UploadWidgetProps) => {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef<UploadWidgetProps["onChange"]>(onChange);

  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;

      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: 5000000,
          clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        },
        (error, result) => {
          if (error || !isCloudinarySuccessResult(result)) return;

          const payload: UploadWidgetValue = {
            url: result.info.secure_url,
            publicId: result.info.public_id,
          };

          setPreview(payload);
          onChangeRef.current?.(payload);
        }
      );

      return true;
    };

    if (initializeWidget()) return;
    const cloudinaryScript = document.querySelector<HTMLScriptElement>(
      'script[src*="upload-widget.cloudinary.com"]'
    );
    if (!cloudinaryScript) return;

    const handleLoad = () => {
      initializeWidget();
    };

    cloudinaryScript.addEventListener("load", handleLoad);

    return () => {
      cloudinaryScript.removeEventListener("load", handleLoad);
    };
  }, []);

  const openWidget = () => {
    if (!disabled) widgetRef.current?.open();
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="upload-preview">
          <img src={preview.url} alt="Uploaded file" />
        </div>
      ) : (
        <div
          className="upload-dropzone"
          role="button"
          tabIndex={0}
          aria-disabled={disabled}
          onClick={openWidget}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openWidget();
            }
          }}
        >
          <div className="upload-prompt">
            <UploadCloud className="icon" />
            <div>
              <p>Click to upload photo</p>
              <p>PNG, JPG up to 5MB </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
