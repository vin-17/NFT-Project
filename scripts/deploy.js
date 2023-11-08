const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs"); 

async function main() {
  const [deployer] = await ethers.getSigners(); //address that signs upon that transaction
  const balance = await deployer.getBalance();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();
  console.log("Contract Deployed to Address:", marketplace.address);
  await marketplace.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the marketplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
