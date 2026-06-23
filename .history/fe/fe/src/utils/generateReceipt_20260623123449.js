import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateReceipt = (payment) => {

  const doc = new jsPDF();

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(
    "RAMESHT FITNESS ZONE",
    105,
    30,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(120);

  

  // Divider
  doc.setDrawColor(220);
  doc.line(20, 50, 190, 50);

  // Title
  doc.setTextColor(0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");

  doc.text(
    "PAYMENT RECEIPT",
    105,
    65,
    { align: "center" }
  );

  // Receipt Info Box
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(
    20,
    75,
    170,
    20,
    3,
    3,
    "F"
  );

  const receiptId =
    Math.floor(
      100000 +
      Math.random() * 900000
    );

  doc.setFontSize(11);

  doc.text(
    `Receipt ID: #${receiptId}`,
    30,
    88
  );

  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    120,
    88
  );

  // Details Table
  autoTable(doc, {
    startY: 110,

    theme: "plain",

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
        `${payment.amount}`
      ],

      [
        "Payment Status",
        payment.paymentStatus
      ],

      [
        "Payment Date",
        new Date(
          payment.paymentDate
        ).toDateString()
      ],

    ],

    styles: {
      fontSize: 12,
      cellPadding: 6,
      textColor: [30, 30, 30],
    },

    columnStyles: {
      0: {
        fontStyle: "bold",
        cellWidth: 60,
      },
      1: {
        cellWidth: 100,
      },
    },

    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },

  });

  const endY =
    doc.lastAutoTable.finalY;

  // Footer Divider
  doc.line(
    20,
    endY + 20,
    190,
    endY + 20
  );

  doc.setFontSize(14);
  doc.setTextColor(40);

  doc.text(
    "Thank you for choosing Ramesht Fitness Zone",
    105,
    endY + 35,
    { align: "center" }
  );

  doc.setFontSize(11);
  doc.setTextColor(130);

  doc.text(
    "Stay fit. Stay strong.",
    105,
    endY + 45,
    { align: "center" }
  );

  // Signature
  doc.setFontSize(18);
  doc.setFont("times", "italic");

  doc.text(
    "Ramesht",
    105,
    endY + 65,
    { align: "center" }
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    "AUTHORISED SIGNATURE",
    105,
    endY + 73,
    { align: "center" }
  );

  doc.save(
    `${payment.memberName}_Receipt.pdf`
  );
};

export default generateReceipt;