import React, { useState, useEffect, useImperativeHandle, useRef } from "react";
import { Input } from "./input"; // Sesuaikan path Input shadcn Anda
import { X } from "lucide-react";
import { Button } from "./button";

// Memperluas interface agar mendukung semua atribut bawaan HTML Input asli
interface ImageUploadPreviewProps extends Omit<React.ComponentPropsWithRef<"input">, "onChange" | "value"> {
  onChange: (file: File | null) => void;
  value?: File | null;
  placeholder?: string;
}

export const ImageUploadPreview = React.forwardRef<HTMLInputElement, ImageUploadPreviewProps>(
  ({ onChange, value, placeholder = "Pilih gambar untuk diunggah", className, accept = "image/*", ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const internalRef = useRef<HTMLInputElement>(null);

    // Menghubungkan ref dari luar ke elemen input HTML internal di dalam komponen
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      if (!value) {
        setPreviewUrl(null);
        // Jika value dikosongkan (null) dari luar, reset juga value fisik input file-nya
        if (internalRef.current) internalRef.current.value = "";
        return;
      }

      if (value.type?.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(value);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setPreviewUrl(null);
      }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onChange(file);
    };

    const handleClear = () => {
      onChange(null);
    };

    return (
      <div className="space-y-3">
        {/* Box Preview Gambar */}
        {previewUrl && (
          <div className="relative w-fit border rounded-lg p-1 bg-muted/40 group max-w-[200px]">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 w-auto object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              onClick={handleClear}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Input File - Menerima className, accept, ref, dan props lain dari luar */}
        {!previewUrl && (
          <div className="space-y-1">
            <Input
              type="file"
              ref={internalRef}
              accept={accept}
              onChange={handleFileChange}
              className={className} // Menerapkan "block w-full text-sm" Anda ke elemen input asli
              {...props} // Meneruskan properti ekstra lainnya jika ada
            />
            <p className="text-xs text-muted-foreground">{placeholder}</p>
          </div>
        )}
      </div>
    );
  }
);

ImageUploadPreview.displayName = "ImageUploadPreview";