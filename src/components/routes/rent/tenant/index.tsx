import { useEffect, useMemo, useState } from "preact/hooks";
import { route } from "preact-router";

import { db, Gender, ITenant } from "../../../../db";
import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export default function Tenant() {
  const [tenants, setTenants] = useState<ITenant[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    db.tenants.limit(10).toArray().then(setTenants);
  }, []);

  const onSubmit = (_: Event) => {
    route("/contracts/rent/stay");
  };

  const onClick = (tenant: ITenant, index: number) => {
    setActiveIndex(index);
    const event = new CustomEvent("tenant-update", { detail: tenant });
    document.dispatchEvent(event);
  };

  return (
    <div class="md:flex">
      <div class="md:w-1/2 p-10">
        <h1>Tenant Details</h1>
        <p class="lg:w-96">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <Form onSubmit={onSubmit} />
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777" }}>
        <h2>Presaved Tenants</h2>
        {tenants.map((tenant, index) => (
          <Card
            key={index}
            tenant={tenant}
            onClick={() => onClick(tenant, index)}
            active={index === activeIndex}
            onDeleteClick={() => {
              db.tenants.delete(tenant.id || -1).then(() => {
                setTenants(tenants.filter((t) => t.id !== tenant.id));
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface FormProps {
  onSubmit: (e: Event) => void;
}

function Form({ onSubmit }: FormProps) {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [isMarried, setIsMarried] = useState<boolean>(true);
  const [guardian, setGuardian] = useState<string>("");
  const [relationToGuardian, setRelationToGuardian] = useState<string>("");
  const [faith, setFaith] = useState<string>("");
  const [nationality, setNationality] = useState<string>("Indian");
  const [occupation, setOccupation] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("West Bengal");
  const [country, setCountry] = useState<string>("India");
  const [zip, setZip] = useState<string>("");

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const requiredFields = [
    name,
    guardian,
    relationToGuardian,
    faith,
    nationality,
    occupation,
    street,
    city,
    state,
    country,
    zip,
  ];

  const isVaild = useMemo(() => {
    return requiredFields.filter((field) => field === "").length === 0;
  }, requiredFields);

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      const tenant = e.detail as ITenant;
      setName(tenant.name);
      setGender(tenant.gender);
      setIsMarried(tenant.isMarried);
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

      setIsSaved(true);
    };
    // @ts-ignore
    document.addEventListener("tenant-update", listener);

    return () => {
      // @ts-ignore
      document.removeEventListener("tenant-update", listener);
    };
  }, []);

  const onClick = async (e: Event) => {
    e.preventDefault();
    if (!isVaild) {
      alert("Please fill all the fields");
      return;
    }

    const tenant: ITenant = {
      name,
      gender,
      isMarried,
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

    if (!isSaved) {
      await db.tenants.add(tenant);
    }

    localStorage.setItem("tenant", JSON.stringify(tenant));

    onSubmit(e);
  };

  return (
    <form class="">
      <FormElement
        label="Full Name"
        value={name}
        type="text"
        onChange={(e) => {
          setName((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <div class="flex items-center gap-x-3 pt-4 pb-2 pl-2">
        <label for="gender" class="block">
          Gender:{" "}
        </label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={(e) => {
            setGender((e.target as HTMLSelectElement).value as Gender);
            setIsSaved(false);
          }}
        >
          <option value={Gender.Male}>{Gender.Male}</option>
          <option value={Gender.Female}>{Gender.Female}</option>
        </select>
      </div>

      <div class="flex items-center gap-x-3 pt-4 pb-2 pl-2">
        <label for="isMarried" class="block">
          Married:{" "}
        </label>
        <input
          type="checkbox"
          defaultChecked={isMarried}
          onChange={(_) => {
            setIsMarried(!isMarried);
            setIsSaved(false);
          }}
        />
      </div>

      <FormElement
        label="Guardian Name"
        value={guardian}
        type="text"
        onChange={(e) => {
          setGuardian((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Relation to Guardian"
        value={relationToGuardian}
        type="text"
        onChange={(e) => {
          setRelationToGuardian((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Faith"
        value={faith}
        type="text"
        onChange={(e) => {
          setFaith((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Nationality"
        value={nationality}
        type="text"
        onChange={(e) => {
          setNationality((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Occupation"
        value={occupation}
        type="text"
        onChange={(e) => {
          setOccupation((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Street Address"
        value={street}
        type="text"
        onChange={(e) => {
          setStreet((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="City"
        value={city}
        type="text"
        onChange={(e) => {
          setCity((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="State"
        value={state}
        type="text"
        onChange={(e) => {
          setState((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Country"
        value={country}
        type="text"
        onChange={(e) => {
          setCountry((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Pin Code"
        value={zip}
        type="number"
        onChange={(e) => {
          setZip((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <br />
      <SubmitButton text="Proceed to Stay" onClick={onClick} />
    </form>
  );
}

interface CardProps {
  tenant: ITenant;
  active: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
}

function Card({ tenant, active, onClick, onDeleteClick }: CardProps) {
  return (
    <TextCard
      head={tenant.name}
      texts={[
        tenant.relationToGuardian + " of " + tenant.guardian,
        tenant.occupation,
        tenant.address.street,
        tenant.address.city + ", " + tenant.address.state,
        tenant.address.country + " - " + tenant.address.zip,
      ]}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      active={active}
    />
  );
}
