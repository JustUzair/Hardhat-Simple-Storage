const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        console.log(`Current Value : ${currentValue}`);

        const expectedValue = 0;
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should updated when we call store", async function () {
        const expectedValue = 7;
        const transactionResponse = await simpleStorage.store(7);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
});
