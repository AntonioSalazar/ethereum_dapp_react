const MyMessage = artifacts.require("MyMessage");

module.exports = function(deployer) {
  deployer.deploy(MyMessage);
};
