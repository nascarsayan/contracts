import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";

import { db, IContract, IOwner, IProperty, ITenant } from "../../../../db";
import TextCard from "../../../textcard";
import jsPDF from "jspdf";
import { GenerateContractPDF, PDF } from "../done";
import { FormElement } from "../../../form";

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
            disabled={activeIndex === -1}
            onClick={() => {
              const contract = contracts[activeIndex];
              const tenantName = contract.tenant.name.replace(/\s+/g, "_");
              const date = contract.startDate.toISOString().split("T")[0];
              pdf?.save(`contract-${tenantName}-${date}.pdf`);
            }}
          >
            Download PDF
          </button>

          <br />

          {/* @ts-ignore */}
          <hr color="#777" />

          <label class="block pt-2 pb-1 pl-2">Import Data</label>

          <input
            class="block"
            type="file"
            accept=".json"
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              const file = target?.files?.[0];
              if (file && file.type === "application/json") {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const json = event.target?.result as string;
                  const data = JSON.parse(json) as {
                    contracts: IContract[];
                    owners: IOwner[];
                    properties: IProperty[];
                    tenants: ITenant[];
                  };

                  if (data && typeof data === "object") {
                    const { contracts, owners, properties, tenants } = data;
                    if (contracts && contracts.length > 0) {
                      db.contracts.bulkAdd(
                        contracts.map((contract) => {
                          delete contract.id;
                          return contract;
                        })
                      );
                      db.owners.bulkAdd(
                        owners.map((owner) => {
                          delete owner.id;
                          return owner;
                        })
                      );
                      db.properties.bulkAdd(
                        properties.map((property) => {
                          delete property.id;
                          return property;
                        })
                      );
                      db.tenants.bulkAdd(
                        tenants.map((tenant) => {
                          delete tenant.id;
                          return tenant;
                        })
                      );
                    }
                  }

                  console.log("[Contracts] Data Imported Succesfully");
                };
                reader.readAsText(file);
              }
            }}
          />

          <label class="block pt-2 pb-1 pl-2">Export Data</label>
          <button
            class="block"
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
              const date = new Date().toISOString().split("T")[0];
              a.href = url;
              a.download = `contracts-backup-${date}.json`;
              a.target = "_blank";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export Data
          </button>

          <label class="block pt-2 pb-1 pl-2">Clear Data</label>
          <button
            class="block"
            onClick={async () => {
              db.owners.clear();
              db.properties.clear();
              db.tenants.clear();
              db.contracts.clear();
              localStorage.clear();

              console.log("[Contracts] Data Cleared Succesfully");
            }}
          >
            Clear Data
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

function Card({ contract, active, onClick, onDeleteClick }: CardProps) {
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
