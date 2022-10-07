import { route } from "preact-router";

import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export type Props = {

}

export default function Owner({} : Props) {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    route("/rent/done");
  };

  return (
    <div class="flex">
      <div class="w-1/2 p-10">
        <h1>Stay Details</h1>
        <p class="w-96">
        Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.
        </p>
        <form class="">
          <FormElement label="Stay Duration" value="" type="number" onChange={() => {}} />
          <FormElement label="Number of People" value="" type="number" onChange={() => {}} />
          <br />
          <SubmitButton text="Create Contract" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
}