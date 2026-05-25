import React, { useId } from "react";
import Select, { Props as SelectProps, GroupBase } from "react-select";

// Membuat interface props agar fleksibel menerima semua props bawaan react-select
interface CustomSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends SelectProps<Option, IsMulti, Group> {
  label?: string;
  error?: string;
}

export const CustomSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  error,
  styles,
  ...props
}: CustomSelectProps<Option, IsMulti, Group>) => {
  const instanceId = useId();

  return (
    <div className="w-full space-y-1.5 text-left">
      {/* Label Opsional */}
      {label && (
        <label htmlFor={instanceId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <Select
        isClearable
        instanceId={instanceId}
        {...props}
        // Gabungkan styles bawaan dengan kustomisasi bebas-biru milik kita
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "38px",
            minHeight: "38px",
            borderRadius: "0.375rem", // rounded-md
            // Kondisi border: Error (Merah) -> Focus (Sesuai Input) -> Idle
            borderColor: error 
              ? "rgb(239, 68, 68)" 
              : state.isFocused 
                ? "var(--muted-foreground, #a3a3a3)" // Ganti dengan warna border focus pilihanmu
                : "rgba(163, 163, 163, 0.3)", 
            boxShadow: "none", // Menghilangkan ring biru menyala
            backgroundColor: "white",
            "&:hover": {
              borderColor: error 
                ? "rgb(239, 68, 68)" 
                : state.isFocused 
                  ? "var(--muted-foreground, #a3a3a3)" 
                  : "rgba(163, 163, 163, 0.5)",
            },
          }),
          // Menyamakan ukuran font dengan input biasa
          valueContainer: (base) => ({
            ...base,
            fontSize: "0.875rem", // text-sm
            padding: "0px 12px",
          }),
          placeholder: (base) => ({
            ...base,
            color: "rgba(163, 163, 163, 0.6)",
          }),
          ...styles, // Tetap izinkan override styles dari luar jika dibutuhkan
        }}
      />

      {/* Pesan Error Opsional */}
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};