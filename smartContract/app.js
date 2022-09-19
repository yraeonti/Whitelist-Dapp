const {ethers} = require("hardhat")

const contractAdress = "0x025c7bA023c5cfe2E0384472d9Dacf51dF4773a6"

async function checkContract() {

    const contract = await ethers.getContractAt("Whitelist", contractAdress)

    console.log("address", contract.address);
    console.log("whitelist", (await contract.maxWhitelist()));

    console.log("whitelist", (await contract.numwhitelistaddresses()));

    const address = 0x769CD1E51b5DE66F24D8da0cd05359C029D36634

    console.log("whitelist approval:", (await contract.whitelistaddresses(address)));
}

checkContract()