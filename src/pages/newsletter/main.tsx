import InformationContainer from "./information-container";
import FormContainer from "./form-container";

export default function MainNewsletterPage() {
  return (
    <div className="px-5 mx-auto 2xl:max-w-7xl">
      {/*sub_container */}
      <div className="mt-5 mb-10 flex flex-col lg:flex-row gap-5">
        {/*form_container */}
        <FormContainer />

        {/*notes_container */}
        <InformationContainer />
      </div>
    </div>
  );
}
