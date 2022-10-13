import { route } from "preact-router";

export type Props = {

}

export default function Intro({} : Props) {
  return (
    <div class="page-shrink">
      <h1>Property Rents Contracts</h1>
      <br />
      <p class="md:w-96">
        Create a property rent contract for your tenants.
        In the next steps you will be asked to enter the details
        of the owner, property, and tenant.
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