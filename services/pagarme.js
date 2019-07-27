const pagarme = require("pagarme");

class ServicePagarme {
  constructor() {
    (this.apiKey = process.env.PAGARME_API_KEY),
      (this.encKey = process.env.PAGARME_ENC_KEY);
  }

  async connect() {
    let client = await pagarme.client.connect({ api_key: this.apiKey });
    return client;
  }

  async createCardHash(card) {
    let client = await pagarme.client.connect({ encryption_key: this.encKey });
    let hash = await client.security.encrypt(card);
    return hash;
    // .then(client => {
    //   return client.security.encrypt(card);
    // }).catch(error => console.error(error))
    // // .then(card_hash => console.log(card_hash));
  }

  createTransaction(payload) {
    this.connect()
      .then(client =>
        client.transactions
          .create(payload)
          .then(transaction => console.log(transaction))
          .catch(error => console.error(error.response.errors))
      )
      .catch(error => console.error(error));
  }
}

module.exports = ServicePagarme;
