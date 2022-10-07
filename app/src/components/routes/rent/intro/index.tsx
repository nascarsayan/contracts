import { route } from "preact-router";

export type Props = {

}

export default function Intro({} : Props) {
  return (
    <div class="page-shrink">
      <h1>Property Rents Contracts</h1>
      <br />
      <p class="w-96">
      Lorem Ipsum is simply dummy text of
      the printing and typesetting industry.
      Lorem Ipsum has been the industry's 
      standard dummy text ever since the 1500s,
      when an unknown printer took a galley
      of type and scrambled it to make a
      type specimen book. It has survived
      not only five centuries.
      </p>
      <br />
      <button href="/rent/owner"
      onClick={() => {
        route("/rent/owner");
      }}>
        Create Contract
      </button>
    </div>
  );
}