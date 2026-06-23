router.put("/renew/:id", async (req, res) => {

  try {

    const { plan } = req.body;

    const member =
      await Member.findById(
        req.params.id
      );

    if (!member) {

      return res.status(404)
      .json({
        message:
          "Member not found",
      });
    }

    const today =
      new Date();

    let expiryDate =
      new Date(today);

    if (
      plan === "1 Month"
    ) {

      expiryDate.setMonth(
        expiryDate.getMonth() + 1
      );
    }

    else if (
      plan === "3 Months"
    ) {

      expiryDate.setMonth(
        expiryDate.getMonth() + 3
      );
    }

    else if (
      plan === "6 Months"
    ) {

      expiryDate.setMonth(
        expiryDate.getMonth() + 6
      );
    }

    else if (
      plan === "12 Months"
    ) {

      expiryDate.setFullYear(
        expiryDate.getFullYear() + 1
      );
    }

    member.plan = plan;
    member.expiryDate =
      expiryDate;

    await member.save();

    res.json(member);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});