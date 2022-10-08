import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";

import { db, ITenant } from "../../../../db";
import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export default function Tenant() {
  const [tenants, setTenants] = useState<ITenant[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1); 
  
  useEffect(() => {
    db.tenants
      .limit(10)
      .toArray()
      .then(setTenants);
  }, []);

  const onSubmit = (e: Event) => {
    route("/rent/stay");
  };

  const onClick = (tenant: ITenant, index: number) => {
    setActiveIndex(index);
    const event = new CustomEvent('tenant-update', { detail: tenant });
    document.dispatchEvent(event);
  }

  return (
    <div class="flex">
      <div class="w-1/2 p-10">
        <h1>Tenant Details</h1>
        <p class="w-96">
        Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.
        </p>
        <Form onSubmit={onSubmit}/>    
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777"}}>
        <h2>Presaved Tenants</h2>
        {
          tenants
            .map((tenant, index) => <Card 
            key={index} 
            tenant={tenant}
            onClick={() => onClick(tenant, index)}
            active={index === activeIndex} />)
        }
      </div>
    </div>
  );
}

interface FormProps {
  onSubmit: (e: Event) => void,
}

function Form({ onSubmit }: FormProps) {
  const [name, setName] = useState<string>("");
  const [guardian, setGuardian] = useState<string>("");
  const [relationToGuardian, setRelationToGuardian] = useState<string>("");
  const [faith, setFaith] = useState<string>("");
  const [nationality, setNationality] = useState<string>("Indian");
  const [occupation, setOccupation] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      const tenant = e.detail as ITenant;
      setName(tenant.name);
      setGuardian(tenant.guardian);
      setRelationToGuardian(tenant.relationToGuardian);
      setFaith(tenant.faith);
      setNationality(tenant.nationality);
      setOccupation(tenant.occupation);
      setStreet(tenant.address.street);
      setCity(tenant.address.city);
      setState(tenant.address.state);
      setCountry(tenant.address.country);
      setZip(tenant.address.zip);
    };
    // @ts-ignore
    document.addEventListener("tenant-update", listener);

    return () => {
      // @ts-ignore
      document.removeEventListener("tenant-update", listener);
    }
  }, []);

  const onClick = async (e: Event) => {
    e.preventDefault();

    const tenant: ITenant = {
      name,
      guardian,
      relationToGuardian,
      faith,
      nationality,
      occupation,
      address: {
        street,
        city,
        state,
        country,
        zip,
      },
    };

    await (db.tenants
      .add(tenant));
    
    localStorage.setItem("tenant", JSON.stringify(tenant));

    onSubmit(e);
  }

  return (
    <form class="">
      <FormElement 
      label="Full Name" 
      value={name} 
      type="text" 
      onChange={(e) => setName((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Guardian Name" 
      value={guardian} 
      type="text" 
      onChange={(e) => setGuardian((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Relation to Guardian" 
      value={relationToGuardian} 
      type="text" 
      onChange={(e) => setRelationToGuardian((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Faith" 
      value={faith} 
      type="text" 
      onChange={(e) => setFaith((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Nationality" 
      value={nationality}
      type="text" 
      onChange={(e) => setNationality((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Occupation" 
      value={occupation}
      type="text" 
      onChange={(e) => setOccupation((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Street Address" 
      value={street}
      type="text" 
      onChange={(e) => setStreet((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="City" 
      value={city}
      type="text" 
      onChange={(e) => setCity((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="State" 
      value={state}
      type="text" 
      onChange={(e) => setState((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Country" 
      value={country}
      type="text" 
      onChange={(e) => setCountry((e.target as HTMLInputElement).value)} />

      <FormElement 
      label="Pin Code" 
      value={zip}
      type="number" 
      onChange={(e) => setZip((e.target as HTMLInputElement).value)} />

      <br />
      <SubmitButton text="Proceed to Property" onClick={onClick} />
    </form>
  );
}

interface CardProps {
  tenant: ITenant;
  active: boolean;
  onClick: () => void;
}

function Card({ tenant, active, onClick }: CardProps) {
  return (
    <TextCard head={tenant.name} texts={[
      tenant.relationToGuardian +  " of " + tenant.guardian,
      tenant.occupation,
      tenant.address.street,
      tenant.address.city + ", " + tenant.address.state,
      tenant.address.country + " - " + tenant.address.zip,
    ]}
    onClick={onClick}
    active={active} />
  );
}