import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";

import { db, IContract } from "../../../../db";
import TextCard from "../../../textcard";
import jsPDF from "jspdf";
import { GenerateContractPDF, PDF } from "../done";

export default function Saved() {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [pdf, setPDF] = useState<jsPDF | null>(null);

  useEffect(() => {
    db.contracts.toArray().then(setContracts);
  }, []);

  return (
    <div class="md:flex">
      <div class="p-10 w-1/2">
        <h1>View Contracts</h1>
        <div>
          <button
            class="mr-2 mb-2"
            href="/rent/intro"
            onClick={() => {
              route("/rent/intro");
            }}
            >
            Download PDF
          </button>

          <button
            onClick={() => {
              pdf?.save("contract.pdf");
            }}
          >
            Create New Contract
          </button>
        </div>
        <br />
        {pdf && <PDF pdf={pdf} />}
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777" }}>
        <h2>Saved Contracts</h2>
        {contracts.map((contract, index) => (
          <Card
            key={index}
            contract={contract}
            onClick={() => {
              setActiveIndex(index);
              setPDF(GenerateContractPDF(contract));
            }}
            active={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  contract: IContract;
  active: boolean;
  onClick: () => void;
}

function Card({ contract, active, onClick }: CardProps) {
  let dates = "";
  try {
    dates =
      contract.startDate.toISOString().split("T")[0] +
      " to " +
      contract.endDate.toISOString().split("T")[0];
  } catch (error) {
    dates = "Unknown Start and End Date";
  }
  return (
    <TextCard
      head={contract.tenant.name}
      texts={[
        contract.property.name,
        dates,
        contract.property.address.street,
        contract.property.address.city + ", " + contract.property.address.state,
      ]}
      onClick={onClick}
      active={active}
    />
  );
}
