
const {ethers} = require('hardhat')


async function main() {

    const whiteListContract = await ethers.getContractFactory('Whitelist')

    const deployedContract = await whiteListContract.deploy()

    const contract = await deployedContract.deployed()

    await contract.setWhiteListMax(20)
    
    console.log("whitelist number",contract.maxWhitelist());
    console.log("whitelist contract address", contract.address);
}

main().then(() => process.exit(0)).catch((error) => console.log(error))