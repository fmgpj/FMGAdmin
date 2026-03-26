export type Mode = "create" | "edit" | "view";

export type FieldType = "text" | "email" | "number" | "dropdown" | "date";

export type BaseFieldConfig = {
    type: FieldType;
    name: string;
    label: string;
    colSpan: 1 | 2 | 3 | 4 | 6 | 12;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
};

export type FieldConfig = BaseFieldConfig & {
    type: "text" | "email" | "number";
    multiline?: boolean;
    rows?: number;
};

export type DropdownFieldConfig = BaseFieldConfig & {
    type: "dropdown";
    options: Array<{ label: string; value: string }>;
};

export type DateFieldConfig = BaseFieldConfig & {
    type: "date";
};

export type FormConfig = FieldConfig | DropdownFieldConfig | DateFieldConfig;
