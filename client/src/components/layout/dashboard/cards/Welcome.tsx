import Card from "@/src/components/ui/cards";
import { useAuth } from "@/src/store/hooks";

const WelcomeCard = () => {
    const { user } = useAuth();
    return (
        <Card className="bg-[#f9fafd] p-4">
            <div className=" flex flex-col">
                <p className="text-sm text-[#29377E]">Welcome!</p>
                <p className="text-lg text-[#BE9F44] font-extrabold">
                    {user?.name || "Guest User"}
                </p>
            </div>
        </Card>
    );
};

export default WelcomeCard;
