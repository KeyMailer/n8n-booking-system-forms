import InformationContainer from "./information-container";
import FormContainer from "./form-container";
import { Button } from "../../components/ui/button";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MainNewsletterPage() {
  const navigate = useNavigate();
  return (
    <div className="px-5 mx-auto 2xl:max-w-7xl">
      {/* back to home */}
      <Button
        variant={"ghost"}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 w-fit mt-5"
      >
        <MoveLeft />
        <span>Back Home</span>
      </Button>

      {/*sub_container */}
      <div className="my-5 flex flex-col lg:flex-row gap-5">
        {/*form_container */}
        <FormContainer />

        {/*notes_container */}
        <InformationContainer />
      </div>
    </div>
  );
}
