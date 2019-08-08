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

  }

  async createTransaction(payload) {
    let transaction = await this.connect().then(client => client.transactions.create(payload));
    return transaction
  }
}

module.exports = ServicePagarme;
