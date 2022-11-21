const HDWalleProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface,  bytecode } = require('./compile');

const mnemonic = 'draft write fan congress autumn timber dignity insane width because chief luggage';

const provider = new HDWalleProvider( mnemonic,
    'https://rinkeby.infura.io/v3/ff59756300994d9da272fc83194838f8'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const inbox = new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', inbox.options.address);

    provider.engine.stop();
};

deploy();