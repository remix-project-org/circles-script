import { Sdk } from '@circles-sdk/sdk'
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers"
import { cidV0ToUint8Array } from '@circles-sdk/utils'
import { ethers } from 'ethers'

import type {CirclesConfig} from "@circles-sdk/sdk";

export const circlesConfig: CirclesConfig = {
    circlesRpcUrl: 'https://static.94.138.251.148.clients.your-server.de/rpc/',
    pathfinderUrl: 'https://pathfinder.aboutcircles.com',
    profileServiceUrl: 'https://static.94.138.251.148.clients.your-server.de/profiles/',
    v1HubAddress: '0x29b9a7fbb8995b2423a71cc17cf9810798f6c543',
    v2HubAddress: '0x3D61f0A272eC69d65F5CFF097212079aaFDe8267',
    nameRegistryAddress: '0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968',
    migrationAddress: '0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90',
    baseGroupMintPolicy: '0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60',
    standardTreasury: '0x3545955Bc3900bda704261e4991f239BBd99ecE5',
    coreMembersGroupDeployer: '0x7aD59c08A065738e34f13Ac94542867528a1D328',
    baseGroupFactory:'0x452C116060cBB484eeDD70F32F08aD4F0685B5D2'
};

const run = async () => {
    // Initialize the SDK
    const adapter = new BrowserProviderContractRunner();
    await adapter.init();
    const sdk = new Sdk(adapter)

    // Define the group profile (symbol is required)
    const groupProfile = {
        name: 'Remix',
        symbol: 'Remix',
        description: 'A group for all the Remixers.',
        imageUrl: '', // optional, can be uploaded via SDK
        previewImageUrl: '', // optional, used for previews
    }

    // Define base group setup options
    const sender = await (new ethers.BrowserProvider(web3Provider)).getSigner()
    const circlesGroupOwner = '0xf7f307601497eAD8217543Fc9B350Ae6DA5fB5eF'
    const groupOwner = circlesGroupOwner
    const serviceAddress = sender.address // Replace with actual service address
    const feeCollection = circlesGroupOwner // Replace with actual treasury address
    const initialConditions = []

    // Step 1: Create the group profile (CID will be returned)
    const profileCID = await sdk.profiles.create(groupProfile)
    if (!profileCID) throw new Error('Failed to create profile CID')

    // Step 2: Create the base group using the factory
    console.log('group owner will be', sender)
    const tx = await sdk.baseGroupFactory.createBaseGroup(
        groupOwner, // Usually wallet address of the sender
        serviceAddress,
        feeCollection,
        initialConditions,
        groupProfile.name,
        groupProfile.symbol,
        cidV0ToUint8Array(profileCID), // Convert CID to bytes
    )

    // Wait for transaction confirmation
    const receipt = await tx.wait()

    console.log('receipt', receipt)

    // Step 3: Extract the group address from emitted events
    const groupAddress = ethers.stripZerosLeft(receipt.logs[9].topics[1])

    // Step 4: Get the avatar for the created group
    const baseGroupAvatar = await sdk.getAvatar(groupAddress.toLowerCase())

    console.log('Base group created at:', groupAddress)
    console.log('Group avatar:', baseGroupAvatar)
}

run().catch(console.error).then(console.log)
