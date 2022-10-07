import { route } from "preact-router";

import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export type Props = {

}

const owners = [
  <TextCard head="Debdut Karmakar" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Debdut Karmakar" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Debdut Karmakar" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Debdut Karmakar" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />
];

export default function Owner({} : Props) {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    route("/rent/property");
  };

  return (
    <div class="flex">
      <div class="w-1/2 p-10">
        <h1>Owner Details</h1>
        <p class="w-96">
        Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.
        </p>
        <form class="">
          <FormElement label="Full Name" value="" type="text" onChange={() => {}} />
          <FormElement label="Parent Name" value="" type="text" onChange={() => {}} />
          <FormElement label="Street Address" value="" type="text" onChange={() => {}} />
          <FormElement label="City" value="" type="text" onChange={() => {}} />
          <FormElement label="Zip Code" value="" type="number" onChange={() => {}} />
          <br />
          <SubmitButton text="Proceed to Property" onClick={onSubmit} />
        </form>
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777"}}>
        <h2>Presaved Owners</h2>
        {owners}
      </div>
    </div>
  );
}