import { CardProps } from "@/src/types/card";
import { CardSize, CardVariant, getCardClasses } from "./helpers";

interface ExtendedCardProps extends CardProps {
    variant?: CardVariant;
    size?: CardSize;
    rounded?: boolean;
    hoverable?: boolean;
}

const Card = ({
    children,
    className,
    variant = "default",
    size,
    rounded = true,
    hoverable = false,
}: ExtendedCardProps) => {
    const cardClasses = getCardClasses(
        variant,
        size,
        rounded,
        hoverable,
        className
    );

    return <div className={cardClasses}>{children}</div>;
};

export default Card;
