const main = async() => {
    
    const contractFactory = await hre.ethers.getContractFactory("FreeJpeg");
    const contract = await contractFactory.deploy();
    receipt = await contract.deployed();
    console.log("contract deployed to:", contract.address);

    contract.safeMint()
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();