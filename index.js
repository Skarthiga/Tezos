const Sotez = require('sotez').default;                                                                                   
const { utility, forge, crypto, ledger, Key } = require('sotez');                                                         
const sotez = new Sotez('http://127.0.0.1:18731')                                                                                                                                                                                                   
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())

//balance1                                                                                                                
const B1bal = async () => {                                                                                                   
    await sotez.getBalance('tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx')                                                            
    .then(balance => console.log("Balance of B1",balance));                                                               
}    

//transfer                                                                                                                
const transfer = async () => {                                                                                                
    const sotezKey = new Key({ key: 'edsk4ArLQgBTLWG5FJmnGnT689VKoqhXwmDPBuGx3z4cvwU9MmrPZZ' }); // source address key                             
    await sotezKey.ready;                                                                                                     
    console.log(sotezKey.secretKey())                                                                                           
    var sKey = sotezKey.secretKey();                                                                                          
    await sotez.importKey(sKey);                                                                                              
    const transaction  = await sotez.transfer({                                                                                   
        to: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN',                                                                               
        amount: '1000000',                                                                                                    
    }); 
    
    await sotez.getBaker('tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx')
  .then(({
    balance,
    frozen_balance,
    frozen_balance_by_cycle,
    staking_balance,
    delegated_contracts,
    delegated_balance,
    deactivated,
    grace_period,
  }) => console.log(
    balance,
    frozen_balance,
    frozen_balance_by_cycle,
    staking_balance,
    delegated_contracts,
    delegated_balance,
    deactivated,
    grace_period,
  ));

    console.log("Transfer", transaction)  
    console.log("Hash", {hash})                                                                                                                                                        
}      

//balance2
const B2bal = async () => {                                                                                                   
    await sotez.getBalance('tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN')                                                            
    .then(balance => console.log("Balance of B2",balance));                                                               
}   

//balance3
const B3bal = async () => {                                                                                                   
    await sotez.getBalance('tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU')                                                            
    .then(balance => console.log("Balance of B2",balance));                                                               
}    

//blockdetails
const blockdetails = async () => {
    sotez.query(`/chains/main/blocks/head`)
    .then(head => 
        console.log(head)
    );
}

//view address
const address = async () => {
    const sotezKey = new Key({ key: 'edsk4ArLQgBTLWG5FJmnGnT689VKoqhXwmDPBuGx3z4cvwU9MmrPZZ' });
    await sotezKey.ready;
    console.log(sotezKey.publicKeyHash());
}

B1bal();                                                                                                                  
transfer();                                                                                                               
B2bal(); 
B3bal();
blockdetails();
address();