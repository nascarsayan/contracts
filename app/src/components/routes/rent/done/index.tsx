import { route } from "preact-router";

export default function Done() {
  return (
    <div class="page-shrink">
      <h1>
        Congratulations 🎉
      </h1>
      <p class="w-96"> Lorem Ipsum is the dummy text of the 
        printing and typesetting industry.</p>
      <button href="/rent/intro"
      onClick={() => {
        route("/rent/intro");
      }}>
        Create Contract
      </button>
    </div>
  )
}