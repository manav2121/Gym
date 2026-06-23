import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateReceipt = (payment) => {

  const doc = new jsPDF();

  doc.setFillColor(24, 24, 27);
  doc.rect(0, 0, 210, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("RAMESHT FITNESS ZONE", 20, 25);

  doc.setFontSize(12);
  doc.setTextColor(220, 220, 220);
  doc.text(
    "Professional Gym Management Receipt",
    20,
    35
  );

  doc.setTextColor(24, 24, 27);
  doc.setFontSize(20);
  doc.text("PAYMENT RECEIPT", 20, 65);

  const receiptId =
    Math.floor(
      100000 +
      Math.random() * 900000
    );

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);

  doc.text(
    `Receipt ID: #${receiptId}`,
    20,
    75
  );

  doc.text(
    `Date: ${new Date().toDateString()}`,
    140,
    75
  );

  autoTable(doc, {

    startY: 90,

    head: [
      ["Field", "Details"]
    ],

    body: [

      [
        "Member Name",
        payment.memberName
      ],

      [
        "Membership Plan",
        payment.plan
      ],

      [
        "Amount Paid",
        `₹${payment.amount}`
      ],

      [
        "Payment Status",
        payment.paymentStatus
      ],

      [
        "Payment Date",
        new Date(
          payment.paymentDate ||
          new Date()
        ).toDateString()
      ],

    ],

    theme: "grid",

    headStyles: {
      fillColor: [24, 24, 27],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },

    styles: {
      fontSize: 12,
      cellPadding: 5,
    },

  });

  doc.line(
    20,
    250,
    190,
    250
  );

  doc.setFontSize(11);

  doc.setTextColor(
    120,
    120,
    120
  );

  doc.text(
    "Thank you for choosing Ramesht Fitness Zone.",
    20,
    260
  );

  doc.text(
    "Stay fit. Stay strong.",
    20,
    268
  );

  doc.save(
    `${payment.memberName}_Receipt.pdf`
  );
};

export default generateReceipt;