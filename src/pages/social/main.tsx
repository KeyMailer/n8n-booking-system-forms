import InformationContainer from "./information-container";
import ScrollButton from "@/components/scroll-button";
import BackHome from "@/components/back-home";
import FormContainer from "./form-container";

export default function MainSocialPage() {
  return (
    <div className="px-5 mx-auto 2xl:max-w-7xl">
      {/* BACK TO HOME */}
      <BackHome />

      {/* SUB CONTAINER */}
      <div className="my-5 flex flex-col lg:flex-row gap-5">
        {/* FORM CONTAINER (LEFT) */}
        <FormContainer />

        {/* NOTES CONTAINER (RIGHT) */}
        <InformationContainer />
      </div>

      {/* SCROLL UP OR DOWN */}
      <ScrollButton />
    </div>
  );
}
