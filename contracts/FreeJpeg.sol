// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

contract FreeJpeg is Initializable, 
                     ERC721Upgradeable, 
                     ERC721URIStorageUpgradeable, 
                     OwnableUpgradeable 
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdCounter;
    /// @custom:oz-upgrades-unsafe-allow constructor
    //constructor() {
    //    _disableInitializers();
    //}
    function initialize() initializer public {
        __ERC721_init("FreeJpeg", "FRJP");
        __ERC721URIStorage_init();
        __Ownable_init();
    }
    function safeMint(address to, 
                      string memory uri, 
                      string memory name, 
                      string memory desciption) public 
    {
        uint256 tokenId = _tokenIdCounter.current();
        
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', name, 
                        '","description": "', desciption,
                        '", "image": "', uri,
                        '"}'
                    )
                )
            )
        );
        
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, finalTokenUri);
        _tokenIdCounter.increment();

        console.log("\n--------------------");
        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=",
                    finalTokenUri
                )
            )
        );
    }
    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}