import { route } from "preact-router";

import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export type Props = {

}

const properties = [
  <TextCard head="Sarada Villa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Sarada Villa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Sarada Villa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Sarada Villa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />
];

export default function Property({} : Props) {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    route("/rent/tenant");
  };

  return (
    <div class="flex">
      <div class="w-1/2 p-10">
        <h1>Property Details</h1>
        <p class="w-96">
        Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.
        </p>
        <form class="">
          <FormElement label="Property Name" value="" type="text" onChange={() => {}} />
          <FormElement label="Bedrooms" value="" type="number" onChange={() => {}} />
          <FormElement label="Street Address" value="" type="text" onChange={() => {}} />
          <FormElement label="City" value="" type="text" onChange={() => {}} />
          <FormElement label="Zip Code" value="" type="number" onChange={() => {}} />
          <br />
          <SubmitButton text="Proceed to Tenant" onClick={onSubmit} />
        </form>
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777"}}>
        <h2>Presaved Properties</h2>
        {properties}
      </div>
    </div>
  );
}