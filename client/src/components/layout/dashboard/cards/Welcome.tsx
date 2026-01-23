import Card from "@/src/components/ui/cards";

const WelcomeCard = () => {
    return (
        <Card className="bg-[#f9fafd] p-4">
            <div className=" flex flex-col">
                <p className="text-sm text-[#29377E]">Welcome!</p>
                <p className="text-lg font-bold text-[#29377E]">
                    <span className="text-[#BE9F44] font-extrabold">Judan</span>
                    , <span>Paul John</span>
                </p>
            </div>
        </Card>
    );
};

export default WelcomeCard;
