type CardProps = {
    className?: string;
    children?: React.ReactNode;
};

const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={`flex flex-col w-full rounded-lg shadow-xl overflow-hidden ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
