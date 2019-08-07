const ServicePagarme = require("../services/pagarme");
const express = require("express"),
  router = express.Router(),
  Order = require("../models/orderModel"),
  User = require("../models/userModel"),
  service = new ServicePagarme();

router.post("/order-placed", (req, res) => {
  const card = {
    card_number: req.body.cardNumber,
    card_holder_name: req.body.cardName,
    card_expiration_date: req.body.expiry,
    card_cvv: req.body.cvc
  };
  const fullName = `${req.body.userLoged.name} ${req.body.userLoged.lastName}`
  new Order({
    userId: req.body.userLoged._id,
    userName: fullName,
    status: "processing",
    totalPrice: req.body.totalPrice,
    idTransaction: 0,
    installments: req.body.installments
  })
    .save()
    .then(newOrder => {
      User.findOneAndUpdate(
        { _id: newOrder.userId },
        { $push: { orders: newOrder._id } },
        { returnNewDocument: true }
      )
        .then(() => {
          service
            .createCardHash(card)
            .then(hash => {
              console.log(hash);
              const payload = {
                amount: (parseInt(req.body.totalPrice) * 100).toFixed(0),
                payment_method: "credit_card",
                card_hash: hash,
                // postback_url: "",
                // COLOCAR OS INSTALMMENTS
                customer: {
                  name: req.body.userLoged.name,
                  email: req.body.userLoged.email,
                  document_number: "18152564000105",
                  address: {
                    street: req.body.userLoged.address.street,
                    street_number: req.body.userLoged.address.number,
                    neighborhood: req.body.userLoged.address.neighborhood,
                    zipcode: req.body.userLoged.address.zip
                  },
                  phone: {
                    ddi: "55",
                    ddd: "11",
                    number: "99999999"
                  }
                },
                metadata: {
                  idProduto: newOrder._id
                }
              };
              service
                .createTransaction(payload)
                .then(response => {
                  // console.log(response)
                  console.log("STATUS: " + response.status);
                  Order.findOneAndUpdate(
                    { _id: response.metadata.idProduto },
                    { status: response.status, idTransaction: response.id },
                    { new: true }
                  ).then(response => {
                    switch (response.status) {
                      case "processing":
                        res.json({ orderStatus: "processing" });
                        break;
                      case "paid":
                        res.json({ orderStatus: "paid" });
                        break;
                      case "refused":
                        res.json({ orderStatus: "refused" });
                        break;
                    }
                    // console.log(response);
                  });
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
      // res.status(200).send("salvo");
    });
});

module.exports = router;
