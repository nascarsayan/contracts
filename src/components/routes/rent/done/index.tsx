import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { IContract, Gender, Address } from "../../../../db";

export default function Done() {
  const [pdf, setPDF] = useState<jsPDF | null>(null);
  const [contract, setContract] = useState<IContract | null>(null);

  useEffect(() => {
    const contractJSON = localStorage.getItem("contract");
    if (contractJSON) {
      const contract = JSON.parse(contractJSON) as IContract;
      const pdf = GenerateContractPDF(contract);

      setContract(contract);
      setPDF(pdf);
    }
  }, []);

  const clear = () => {
    localStorage.removeItem("contract");
    localStorage.removeItem("owner");
    localStorage.removeItem("property");
    localStorage.removeItem("tenant");
  };

  return (
    <div class="page-shrink">
      <h1>Congratulations 🎉</h1>
      <p class="w-96">
        {" "}
        Your property tenant contract is ready. Download the PDF now or you can
        retrive it anytime later.
      </p>
      <div class="space-x-2">
        <button
          onClick={() => {
            const tenantName = contract?.tenant.name.replace(/\s+/g, "_");
            const date = contract?.startDate.toISOString().split("T")[0];
            pdf?.save(`contract-${tenantName}-${date}.pdf`);
          }}
        >
          Download PDF
        </button>

        <button
          href="/rent/saved"
          onClick={() => {
            clear();
            route("/rent/saved");
          }}
        >
          View Contracts
        </button>

        <button
          href="/rent/intro"
          onClick={() => {
            clear();
            route("/rent/intro");
          }}
        >
          Create New Contract
        </button>
      </div>
      <br />
      {pdf && <PDF pdf={pdf} />}
    </div>
  );
}

interface PDFProps {
  pdf: jsPDF;
}

export function PDF({ pdf }: PDFProps) {
  return (
    <iframe
      class="mb-20"
      style={{
        display: pdf ? "block" : "none",
        width: "100%",
        height: "100vh",
        borderRadius: "4px",
      }}
      src={pdf?.output("datauristring")}
      frameBorder="0"
    ></iframe>
  );
}

import { jsPDF } from "jspdf";

const [Width, Height] = [595.28, 841.89];

export function GenerateContractPDF(contract: IContract) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const withOrdinal = (num: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const captilalize = (str: string) => str[0].toUpperCase() + str.slice(1);
  const toDateString = (date: Date | string, includeDay: boolean = false) => {
    const _date = new Date(date);
    const day = withOrdinal(_date.getDate());
    const month = captilalize(
      _date.toLocaleString("default", { month: "long" })
    );
    const year = _date.getFullYear();
    return `${day}${includeDay ? " Day" : ""} of ${month}, ${year}`;
  };
  interface IName {
    name: string;
    gender: Gender;
    isMarried: boolean;
  }
  const toNameString = ({ name, gender, isMarried }: IName): string => {
    const gender2Prefix = {
      Male: (isMarried: boolean) => isMarried ? "Sri.": "Kumar",
      Female: (isMarried: boolean) => isMarried ? "Smt.": "Kumari",
    };
    return `${gender2Prefix[gender](isMarried)} ${name}`.toUpperCase();
  };
  const toAddressString = ({ street, city, state, zip }: Address) => {
    return `${street}, ${city}, ${state}, ${zip}`;
  };

  const toNumberString = (val: number) => {
    const ones = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const chunks = ["Crore", "Lakh", "Thousand", "Hundred", ""];
    const num = val.toString();
    if (num.length > 9) return "overflow";
    const n = num
      .padStart(9, "0")
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)
      ?.slice(1)
      .map((v) => parseInt(v, 10))
      .reduce((acc: string, v, i) => {
        if (v == 0) return acc;
        if (i == chunks.length - 1 && acc.length > 0) acc += "and ";
        if (v < 20) {
          acc += ones[v];
        } else {
          acc += `${tens[Math.floor(v / 10)]} ${ones[v % 10]}`;
        }
        acc += chunks[i] + " ";
        return acc;
      }, "")
      .trim();
    return n;
  };

  // const totalRentMoney = contract.rent * contract.duration;

  let marginX = 40;
  let marginY = 60;
  let currentY = (Height * 2) / 3;
  let currentX = Width / 2;
  let fontWeight = "bold";
  let fontSize = 30;
  let lineGap = 20;

  doc.setFontSize(fontSize);
  doc.setFont("times", "normal", fontWeight);
  doc.text("LICENSE AGREEMENT", currentX, currentY, { align: "center" });

  currentY += fontSize + lineGap;
  currentX = marginX;
  fontSize = 16;
  fontWeight = "normal";

  doc.setFontSize(fontSize);
  doc.setFont("times", "normal", fontWeight);

  const text = `This License Agreement was made on the ${toDateString(
    contract.signDate
  )}

BETWEEN

${toNameString(contract.owner)}, \
${captilalize(contract.owner.relationToGuardian)} of \
${contract.owner.guardian}, \
by faith ${contract.owner.faith}, by Nationality Indian, \
by Occupation ${contract.owner.occupation}, \
residing at ${toAddressString(contract.owner.address)}, \
hereinafter called the "LICENSOR" (which terms or expression \
shall unless otherwise excluded by or repugnant to the context \
deemed to mean and include his legal heirs, executors, \
representatives and assigns) of the ONE PART.

AND

${toNameString(contract.tenant)}, \
${captilalize(contract.tenant.relationToGuardian)} of \
${contract.tenant.guardian}, \
by faith ${contract.tenant.faith}, by Nationality Indian, \
by Occupation ${contract.tenant.occupation}, \
residing at ${toAddressString(contract.tenant.address)}, \
hereinafter called the "LICENSEE" of the SECOND PART.

WHEREAS the Licensor is the absolute Owner of \
${toAddressString(contract.owner.address)}.

AND WHEREAS the Licensee has approached the licensor for permission of using \
${contract.property.description} \
on said Premises under \
${contract.property.municipality}, \
for temporary acaomodation for a period of \
${contract.duration} \
(${toNumberString(contract.duration)}) \
months only from the date of \
${toDateString(contract.startDate, true)} \
to \
${toDateString(contract.endDate, true)}.

NOW IT IS HEREBY AGREED AND DECLARED BY AND PARTIES as follows:

1. That the licensee shall in consideration of such accomodation as hereunder \
provided pay the owner \
only for such temporary occupation for the periods of \
${contract.duration} \
(${toNumberString(contract.duration)}) \
months which sum will be paid \
Rs. ${contract.rent.toLocaleString("en-IN")}/- \
(Rupees ${toNumberString(contract.rent)}) \
only per month on the \
${withOrdinal(contract.paydate)} \
day of every English current month as license fee.

2. That the licensee shall use the said room only with his family \
which consists of licensee for residential purpose. He shall not use \
the same with any other person or use the same for any other business go down purposes.

3. That the Licensee shall not do anything which will cause any nuisance \
or disturbances to the other occupiers & of the said building or to the neighborhood \
nor shall do or allow to be done any illegal immoral or any unlawful acts, in the Said room.

4. That the licensee shall not transfer or sublet of the said room \
or any portion or any part thereof to anybody else.

5. That the licensee shall keep the said room in neat and shall not damage \
the said rooms and common staircase and common passage.

6. That the licensee shall not make any addition, alienation or any type of \
construction there to in the said rooms.

7. That if any damage is done in the said rooms and common staircase by the \
Licensee or his men, the Licensee shall be liable to make good os the damage.

8. That the licensee will deposit a sum of Rs. \
${contract.deposit.toLocaleString("en-IN")}/- \
(Rupees ${toNumberString(contract.deposit)}) \
only as security money to the licensee. This amount will be adjusted to the last month \
againt any outstanding Licensee fee or any demurrage charges, if any, at the time to \
vacate the room by the Licensee, or if there is no such outstanding damage then \
the said amount will be refunded by the Licensee without any interest.

9. That the licensee shall use the water of the said building from overhead tank as common. \
Also, Licensor will not be liable for failure of water supply due to Electric supply or \
any other reaso which is beyond the control of the licensor.

10. The eletric charge will be paid as per consumption of the unit for the said rooms for \
the electricity that should be supplied by the Municipality.

11. Water facility does not provide water supply from any other source.

12. Licensee should inform the licensor three months before if he wants to cancel the \
agreement before completion of the agreement.

13. If the licensee fails to vacate the said flat within the stipulated period of \
the licence, the licensee shall be evicted by the licensor without recourse to a \
Court of Law and the licensee shall be treated as a TRESPASSER. In such a case, \
if the licensee fails to remove the articles and things belonging to him and \
if they are found tying in the said premises, the licensor shall without being \
liable to any liability in any manner for any damage or loss that maybe caused, \
remove the same from the premises.

14. IN WITNESS WHEREOF of the Parties hereto set and subscribed their respective \
hands on the day, month and year mentioned hereinabove.

SIGNED, SEALED AND DELIVERED BY
THE WITHIN NAMED LICENSOR/LICENSEE

IN THE PRESENCE OF:
`;

  const lines = doc.splitTextToSize(text, Width - marginX * 2) as string[];

  let pageLines = lines.slice(0, 10);
  doc.text(pageLines, currentX, currentY);

  let lineIndex = 10;
  const linesPerPage = Math.trunc((Height - marginY * 2) / (1.15 * fontSize));
  while (lineIndex < lines.length) {
    currentY = marginY;
    currentX = marginX;
    pageLines = lines.slice(lineIndex, lineIndex + linesPerPage);
    lineIndex += linesPerPage;

    doc.addPage();
    doc.text(pageLines, currentX, currentY);
  }

  currentY += fontSize * 1.15 * pageLines.length + lineGap;
  if (currentY > Height / 2) {
    currentY = marginY;
    doc.addPage();
  }
  currentY += 20;
  doc.text("1.", currentX, currentY);

  currentX = (Width * 2) / 3;
  currentY += 20;
  doc.text("Signature of Licensor", currentX, currentY);

  currentX -= 20;
  currentY -= 20;
  doc.line(currentX, currentY, currentX + (Width * 1) / 3 - marginX, currentY);

  currentX = marginX;
  currentY += 60 + fontSize;
  doc.text("2.", currentX, currentY);

  currentX = (Width * 2) / 3;
  currentY += 20;
  doc.text("Signature of Licensee", currentX, currentY);

  currentX -= 20;
  currentY -= 20;
  doc.line(currentX, currentY, currentX + (Width * 1) / 3 - marginX, currentY);

  return doc;
}
