const { ethers, run, network } = require("hardhat");
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying Contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deploy Address : ${simpleStorage.address}`);
    console.log(network.config);
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value : ${currentValue}`);

    //update current value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value : ${updatedValue}`);
}
async function verify(contractAddress, args) {
    console.log("Verifying Contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (err) {
        if (err.message.toLowerCase().includes("already verified"))
            console.log("Already Verified...");
        else console.error(err.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
