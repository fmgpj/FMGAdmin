import { TextareaProps } from "@/src/types/textarea";
import { getFieldStateClasses, getFieldStyles } from "../field/helpers";

const Textarea = ({
    bgColor,
    variant,
    isRounded,
    color,
    disabled,
    rows = 4,
    ...props
}: TextareaProps) => {
    const fieldStyles = getFieldStyles({
        bgColor,
        variant,
        isRounded,
        color,
    });

    const fieldClasses = getFieldStateClasses(disabled);

    return (
        <textarea
            style={{
                ...fieldStyles,
                resize: "vertical",
                fontFamily: "inherit",
            }}
            className={fieldClasses}
            disabled={disabled}
            rows={rows}
            {...props}
        />
    );
};

export default Textarea;
