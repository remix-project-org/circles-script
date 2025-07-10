import { Sdk } from '@circles-sdk/sdk';
import { CirclesRpc, CirclesData } from '@circles-sdk/data';
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers"

(window as any).ethereum = web3Provider

const chainConfig: ChainConfig = {
  pathfinderUrl: 'https://pathfinder.aboutcircles.com',
  circlesRpcUrl: 'https://rpc.aboutcircles.com',
  v1HubAddress: '0xdbf22d4e8962db3b2f1d9ff55be728a887e47710',
  v2HubAddress: '0x2066CDA98F98397185483aaB26A89445addD6740',
  migrationAddress: '0x2A545B54bb456A0189EbC53ed7090BfFc4a6Af94'
};

const run = async () => {
    try {
        const adapter = new BrowserProviderContractRunner();
        await adapter.init();

        // profile: '0xf7f307601497eAD8217543Fc9B350Ae6DA5fB5eF'
        const address = '0xd97e35b2a5e047ed0a37edfd53daad30f28195d8'
        const sdk = new Sdk (adapter); 
        
        const circlesRpc = new CirclesRpc("https://rpc.aboutcircles.com/");
        const data = new CirclesData(circlesRpc, chainConfig);

        // const signerAddress = await signer.getAddress()
        const avatar = await sdk.getAvatar(address)
        console.log(await avatar.getMintableAmount())

        const avatarInfo = await data.getAvatarInfo(address);
        console.log(avatarInfo)
    } catch (e) {
        console.error(e)
    }    
}

run().catch(console.error).then(console.log)