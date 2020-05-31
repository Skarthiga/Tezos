const Sotez = require('sotez').default;
const { utility, forge, crypto, ledger, Key } = require('sotez');
var sotez = new Sotez('http://127.0.0.1:18731');
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())
app.get('/balance/:addr', (req, res) => {
  balance()
  async function balance() {
    await sotez.getBalance(req.params.addr)
      .then(balance => res.json({ status: true, balance: balance }));
  }
})
// 'edsk4ArLQgBTLWG5FJmnGnT689VKoqhXwmDPBuGx3z4cvwU9MmrPZZ'                                                          
app.get('/transfer/:key/:to/:amnt', (req, res) => {
  transfer()
  async function transfer() {
    const sotezKey = new Key({ key: req.params.key });
    await sotezKey.ready;
    console.log(sotezKey.secretKey())
    var sKey = sotezKey.secretKey();
    await sotez.importKey(sKey);
    const transaction = await sotez.transfer({
      to: req.params.to,
      amount: req.params.amnt,
    });
    console.log("Transfer", transaction)
    res.json({ "Transfer": transaction })
  }
})
app.get('/blockdetails', (req, res) => {
  blockdetails()
  async function blockdetails() {
    sotez.query(`/chains/main/blocks/head`)
      .then(head => res.json({ status: true, head: head }));
  }
})
app.get('/address/:key', (req, res) => {
  address()
  async function address() {
    const sotezKey = new Key({ key: req.params.key });
    await sotezKey.ready;
    console.log(sotezKey.publicKeyHash());
    var publicKeyHash = sotezKey.publicKeyHash()
    res.json({ status: true, keyhash: publicKeyHash })
  }
})
app.set('host', process.env.HOST || '54.159.37.220');
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on ' + app.get('host') + ":" + app.get('port'));
})          
