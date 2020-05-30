const Sotez = require('sotez').default;                                                                                 
const { utility, forge, crypto, ledger , Key} = require('sotez');                                                       
var sotez = new Sotez('http://127.0.0.1:18731');                                                                        
var express = require('express');                                                                                       
var app = express();                                                                                                    
var cors = require('cors');                                                                                             
app.use(cors())   

app.get('/balance',(req,res)=> {                                                                                          
   balance()   
   async function balance(){                                                                                                   
    await sotez.getBalance('tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx')                                                            
    .then(balance => res.json({status:true,balance:balance}));                                                                                                                                       
    
  }                                                                                                                                                          
})   

app.get('/transfer',(req,res)=> {
  transfer()
  async function transfer(){                                                                                               
    const sotezKey = new Key({ key: 'edsk4ArLQgBTLWG5FJmnGnT689VKoqhXwmDPBuGx3z4cvwU9MmrPZZ' });                             
    await sotezKey.ready;                                                                                                     
    console.log(sotezKey.secretKey())                                                                                           
    var sKey = sotezKey.secretKey();                                                                                          
    await sotez.importKey(sKey);                                                                                              
    const transaction  = await sotez.transfer({                                                                                   
        to: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN',                                                                               
        amount: '1000000',                                                                                                    
    });                                                                                                                       
    console.log("Transfer", transaction) 
    res.json({"Transfer": transaction})                                                                                                                                                 
  }      
})

app.get('/blockdetails',(req,res)=> {                                                                                          
  blockdetails()                                                                                                                  
  async function blockdetails()
  {    sotez.query(`/chains/main/blocks/head`)
    .then(head => res.json({status:true,head:head}));
  }                                                                                                               
})   

app.get('/address',(req,res)=> {   
  address()   
  async function address()
  {
    const sotezKey = new Key({ key: 'edsk4ArLQgBTLWG5FJmnGnT689VKoqhXwmDPBuGx3z4cvwU9MmrPZZ' });
    await sotezKey.ready;
    console.log(sotezKey.publicKeyHash());
    var publicKeyHash = sotezKey.publicKeyHash()
    res.json({status:true,keyhash:publicKeyHash})
  }                                                                                                                                                      
})   

//Public access from instance
app.set('host', process.env.HOST || '54.159.37.220' );

app.set('port', process.env.PORT || 3000 );

app.listen(app.get('port'), function(){

  console.log('Express server listening on ' +app.get('host')+ ":"+app.get('port'));

})   