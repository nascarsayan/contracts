import { useEffect, useMemo, useState } from "preact/hooks";
import { route } from "preact-router";

import { db, IProperty } from "../../../../db";
import { FormElement, SubmitButton } from "../../../form";
import TextCard from "../../../textcard";

export default function Property() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    db.properties.count().then(cnt => {
      let offset = 0;
      if (cnt > 30) {
        offset = cnt - 30;
      }
      db.properties.offset(offset).limit(30).toArray()
        .then(properties => properties.sort((a, b) => a.name.localeCompare(b.name)))
        .then(setProperties);
    });
    db.properties.limit(10).toArray().then(setProperties);
  }, []);

  const onSubmit = (_: Event) => {
    route("/contracts/rent/tenant");
  };

  const onClick = (property: IProperty, index: number) => {
    setActiveIndex(index);
    const event = new CustomEvent("property-update", { detail: property });
    document.dispatchEvent(event);
  };

  return (
    <div class="md:flex">
      <div class="md:w-1/2 p-10">
        <h1>Property Details</h1>
        <p class="lg:w-96">
          Enter the details of the property you want to rent out.
        </p>
        <Form onSubmit={onSubmit} />
      </div>
      <div class="space-y-4 pl-10" style={{ borderLeft: "1px solid #777" }}>
        <h2>Presaved Properties</h2>
        {properties.map((property, index) => (
          <Card
            key={index}
            property={property}
            onClick={() => onClick(property, index)}
            active={index === activeIndex}
            onDeleteClick={() => {
              db.properties.delete(property.id || -1).then(() => {
                setProperties(properties.filter((p) => p.id !== property.id));
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
  const [description, setDescription] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("West Bengal");
  const [country, setCountry] = useState<string>("India");
  const [zip, setZip] = useState<string>("");

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const requiredFields = [
    name,
    municipality,
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
      const property = e.detail as IProperty;
      setName(property.name);
      setDescription(property.description);
      setMunicipality(property.municipality);
      setStreet(property.address.street);
      setCity(property.address.city);
      setState(property.address.state);
      setCountry(property.address.country);
      setZip(property.address.zip);

      setIsSaved(true);
    };
    // @ts-ignore
    document.addEventListener("property-update", listener);

    return () => {
      // @ts-ignore
      document.removeEventListener("property-update", listener);
    };
  }, []);

  const onClick = async (e: Event) => {
    e.preventDefault();
    if (!isVaild) {
      alert("Please fill all the fields");
      return;
    }

    const property: IProperty = {
      name,
      description,
      municipality,
      address: {
        street,
        city,
        state,
        country,
        zip,
      },
    };
    if (!isSaved) {
      await db.properties.add(property);
    }

    localStorage.setItem("property", JSON.stringify(property));

    onSubmit(e);
  };

  return (
    <form class="">
      <FormElement
        label="Property Name"
        value={name}
        type="text"
        onChange={(e) => {
          setName((e.target as HTMLInputElement).value);
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

      <FormElement
        label="Municipality"
        value={municipality}
        type="text"
        onChange={(e) => {
          setMunicipality((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <FormElement
        label="Description"
        value={description}
        type="text"
        onChange={(e) => {
          setDescription((e.target as HTMLInputElement).value);
          setIsSaved(false);
        }}
      />

      <br />
      <SubmitButton text="Proceed to Tenant" onClick={onClick} />
    </form>
  );
}

interface CardProps {
  property: IProperty;
  active: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
}

function Card({ property, active, onClick, onDeleteClick }: CardProps) {
  return (
    <TextCard
      head={property.name}
      texts={[
        property.description,
        property.municipality,
        property.address.street,
        property.address.city + ", " + property.address.state,
        property.address.country + " - " + property.address.zip,
      ]}
      onClick={onClick}
      onDeleteClick={onDeleteClick}
      active={active}
    />
  );
}
