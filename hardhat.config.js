require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

module.exports = {
	solidity: "0.8.10",
	networks: {
		rinkeby: {
			url: process.env.RINKEBY_URL,
			accounts: [process.env.WALLET_PRIVATE_KEY]
		}
	},
	etherscan: {
		apiKey: {
			rinkeby: process.env.ETHERSCAN_API,
		}
	}	
}