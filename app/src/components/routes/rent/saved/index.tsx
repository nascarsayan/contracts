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
    <div class="md:flex page">
      <div class="p-10 w-3/4">
        <h1>View Contracts</h1>
        <div>
          <button
            class="mr-2 mb-2"
            href="/rent/intro"
            onClick={() => {
              route("/rent/intro");
            }}
            >
            Create New Contract
          </button>

          <button
            class="mr-2 mb-2"
            onClick={() => {
              pdf?.save("contract.pdf");
            }}
          >
            Download PDF
          </button>

          <button
            class="mr-2 mb-2"
            onClick={() => { console.log('TODO: inport data') }}
          >
            Import Data
          </button>

          <button
            class="mr-2 mb-2"
            onClick={async () => {
              const owners = await db.owners.toArray();
              const properties = await db.properties.toArray();
              const tenants = await db.tenants.toArray();
              const contracts = await db.contracts.toArray();
              const data = {
                owners,
                properties,
                tenants,
                contracts,
              };
              const blob = new Blob([JSON.stringify(data)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "contracts-backup.json";
              a.target = "_blank";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export Data
          </button>
        </div>
        <br />
        {pdf && <PDF pdf={pdf} />}
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777" }}>
        <h2>Presaved Contracts</h2>
        {contracts.map((contract, index) => (
          <Card
            key={index}
            contract={contract}
            onClick={() => {
              setActiveIndex(index);
              setPDF(GenerateContractPDF(contract));
            }}
            onDeleteClick={() => {
              db.contracts.delete(contract.id || -1).then(() => {
                setContracts(contracts.filter((c) => c.id !== contract.id));
              });
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
  onDeleteClick: () => void;
}

function Card({ contract, active, onClick, onDeleteClick}: CardProps) {
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
      onDeleteClick={onDeleteClick}
      active={active}
    />
  );
}
