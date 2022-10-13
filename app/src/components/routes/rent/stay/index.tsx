import { useMemo, useState } from "preact/hooks";
import { route } from "preact-router";

import { db, IProperty, IContract, ITenant, IOwner } from "../../../../db";
import { FormElement, SubmitButton } from "../../../form";

export default function Stay() {
  const [duration, setDuration] = useState<string>("11");
  const [rent, setRent] = useState<string>("");
  const [deposit, setDeposit] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const endDate = useMemo(() => {
    if (startDate == "" || duration == "") {
      return "";
    }
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + parseInt(duration));
    date.setDate(date.getDate() - 1);
    return date.toISOString().split("T")[0];
  }, [startDate, duration]);
  const [signDate, setSignDate] = useState<string>("");
  const [payDate, setPayDate] = useState<string>("");

  const getContract = (): IContract => {
    const owner = JSON.parse(localStorage.getItem("owner") || "{}") as IOwner;
    const property = JSON.parse(
      localStorage.getItem("property") || "{}"
    ) as IProperty;
    const tenant = JSON.parse(
      localStorage.getItem("tenant") || "{}"
    ) as ITenant;

    return {
      owner,
      property,
      tenant,
      duration: parseInt(duration),
      rent: parseFloat(rent),
      deposit: parseFloat(deposit),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      signDate: new Date(signDate),
      paydate: parseInt(payDate),
    };
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const contract = getContract();

    await db.contracts.add(contract);

    localStorage.setItem("contract", JSON.stringify(contract));

    route("/rent/done");
  };

  return (
    <div class="flex">
      <div class="w-1/2 p-10">
        <h1>Stay Details</h1>
        <p class="w-96">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form class="">
          <FormElement
            label="Duration in Months"
            value={duration}
            type="number"
            onChange={(e) => setDuration((e.target as HTMLInputElement).value)}
          />

          <FormElement
            label="Start Date"
            value={startDate}
            type="date"
            onChange={(e) => setStartDate((e.target as HTMLInputElement).value)}
          />

          <FormElement
            label="End Date"
            disabled={true}
            value={endDate}
            type="date"
            onChange={() => {}}
          />

          <FormElement
            label="Rent"
            value={rent}
            type="number"
            onChange={(e) => setRent((e.target as HTMLInputElement).value)}
          />

          <FormElement
            label="Deposit"
            value={deposit}
            type="number"
            onChange={(e) => setDeposit((e.target as HTMLInputElement).value)}
          />

          <FormElement
            label="Due Date of Month"
            value={payDate}
            type="number"
            onChange={(e) => setPayDate((e.target as HTMLInputElement).value)}
          />

          <FormElement
            label="Sign Date"
            value={signDate}
            type="date"
            onChange={(e) => setSignDate((e.target as HTMLInputElement).value)}
          />

          <br />
          <SubmitButton text="Create Contract" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
}
