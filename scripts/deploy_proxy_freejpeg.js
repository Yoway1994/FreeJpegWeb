const { ethers, upgrades } = require("hardhat");

const main = async () => {
    const FreeJpeg = await ethers.getContractFactory("FreeJpeg");
    const proxyFreeJpeg = await upgrades.deployProxy(FreeJpeg, [], {
        initializer: "initialize",
    });
    console.log("FreeJpeg logic contract:", FreeJpeg.address)
    console.log("FreeJpeg proxy deployed to:", proxyFreeJpeg.address);
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
runMain();