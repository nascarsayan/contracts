import { route } from "preact-router";

import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export type Props = {

}

const tenants = [
  <TextCard head="Sayantan Bajwa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Sayantan Bajwa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Sayantan Bajwa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />,
  <TextCard active={true} head="Sayantan Bajwa" texts={[
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
    "Lorem Ipsum is simply",
  ]} />
];

export default function Tenant({} : Props) {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    route("/rent/stay");
  };

  return (
    <div class="flex">
      <div class="w-1/2 p-10">
        <h1>Tenant Details</h1>
        <p class="w-96">
        Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.
        </p>
        <form class="">
          <FormElement label="Full Name" value="" type="text" onChange={() => {}} />
          <FormElement label="Street Address" value="" type="text" onChange={() => {}} />
          <FormElement label="City" value="" type="text" onChange={() => {}} />
          <FormElement label="Zip Code" value="" type="number" onChange={() => {}} />
          <br />
          <SubmitButton text="Proceed to Stay" onClick={onSubmit} />
        </form>
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777"}}>
        <h2>Presaved Tenants</h2>
        {tenants}
      </div>
    </div>
  );
}