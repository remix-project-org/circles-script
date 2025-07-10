import { ethers } from 'ethers'
import { Sdk } from '@circles-sdk/sdk'
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers"

const run = async () => {
    // Initialize the SDK
    const adapter = new BrowserProviderContractRunner();
    await adapter.init();
    const sdk = new Sdk(adapter)

    const owner = '0x78CddD795A3ed0EFF3eFFfFc2651A0B22c1B877e'

    // 0x2dfcbcbbbd5a763e0f66c77e9749b197f4337a2992e04b131c1bff6942783a88
    // worked: 0x43d5d435b1aae39551951e07b5e6618a1657f5a89117d45710e3d74b76ac23a6
    const provider = new ethers.BrowserProvider(web3Provider)
    const receipt = await provider.getTransactionReceipt('0x43d5d435b1aae39551951e07b5e6618a1657f5a89117d45710e3d74b76ac23a6')
    const groupAddress = ethers.stripZerosLeft(receipt.logs[15].topics[1])

    console.log('group address', groupAddress)
    const baseGroupAvatar = await sdk.getAvatar(groupAddress.toLowerCase())
    
    console.log('group avatar', baseGroupAvatar)
    console.log('owner is', await baseGroupAvatar.owner())
    console.log(await baseGroupAvatar.setOwner(owner))
}

run().then(console.log).catch(console.error)