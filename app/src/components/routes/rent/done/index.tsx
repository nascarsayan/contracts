import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { IContract } from "../../../../db";

export default function Done() {
  const clear = () => {
    localStorage.removeItem("contract");
    localStorage.removeItem("owner");
    localStorage.removeItem("property");
    localStorage.removeItem("tenant");
  };

  return (
    <div class="page-shrink">
      <h1>
        Congratulations 🎉
      </h1>
      <p class="w-96"> Your property tenant contract is ready.
       Download the PDF now or you can retrive it anytime later.</p>
      <div class="space-x-2">
        <button
        onClick={() => {}}>
          Download PDF
        </button>

        <button href="/contracts"
        onClick={() => {
          clear();
          route("/contracts");
        }}>
          View Contracts
        </button>
        
        <button href="/rent/intro"
        onClick={() => {
          clear();
          route("/rent/intro");
        }}>
          Create New Contract
        </button>
      </div>
      <br />
      <PDF />
    </div>
  )
}

function PDF() {
  const [contract, setContract] = useState<IContract | null>(null);
  const [pdf, setPDF] = useState<jsPDF | null>(null);

  useEffect(() => {
    const contractJSON = localStorage.getItem("contract");
    if (contractJSON) {
      const contract = JSON.parse(contractJSON) as IContract;
      const pdf = GenerateContractPDF(contract);

      setContract(contract);
      setPDF(pdf);
    }

  }, []);

  return (
    <iframe
    class="mb-20"
    style={{ display: pdf ? "block" : "none", width: "100%", height: "100vh" }}
    src={pdf?.output("datauristring")}
    frameBorder="0"></iframe>
  );
}

import { jsPDF } from "jspdf";

function GenerateContractPDF(contract: IContract) {
  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  
  return doc;
}