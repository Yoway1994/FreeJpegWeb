const main = async () => {
    const [owner, other] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("FreeJpeg");
    const contract = await contractFactory.deploy();
    receipt = await contract.deployed();
    console.log("contract deployed to:", contract.address);

    let Txn;
    Txn = await contract.safeMint(owner.address, "https://files.muzli.space/8e850729f54bea237bf3bdbf245e40cb.jpeg");
    await Txn.wait();
    const m = await contract.tokenURI(0);
    //
    Txn = await contract.connect(other).safeMint(other.address, "https://files.muzli.space/8e850729f54bea237bf3bdbf245e40cb.jpeg");
    await Txn.wait();
    const n = await contract.connect(other).tokenURI(1);
    //

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}
runMain()