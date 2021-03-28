var MyMessage = artifacts.require('MyMessage');

let instance;
let accounts;
let owner;

contract('MyMessage', async (accs) =>{
    accounts = accs;
    owner = accounts[0];
})

it('Can set a message', async() => {
    let instance = await MyMessage.deployed();
    await instance.setMessage('Message created!');
    assert.equal(await instance.getMessage.call(), 'Message created!')
})
