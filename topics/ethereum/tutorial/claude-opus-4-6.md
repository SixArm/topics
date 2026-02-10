# Ethereum

Ethereum is a decentralized, open-source blockchain platform that enables developers to build and deploy decentralized applications (DApps) and smart contracts on top of its distributed ledger. Created by Vitalik Buterin in 2013 and launched on July 30, 2015, Ethereum extends the concept of blockchain beyond simple value transfer into a general-purpose programmable computing environment. It has its own native cryptocurrency, Ether (ETH), which serves as the fuel for transactions and computational operations on the network. Ethereum is the second-largest blockchain platform by market capitalization and has become the foundational infrastructure for decentralized finance (DeFi), non-fungible tokens (NFTs), and a broad ecosystem of Web3 applications.

## Core Architecture

Ethereum operates as a distributed state machine. Every node in the network maintains a copy of the Ethereum Virtual Machine (EVM), which processes and validates all state transitions. The global state includes all account balances, contract storage, and contract code. When a user submits a transaction, it propagates through the network, is validated by nodes, and is included in a block that updates the global state.

Ethereum distinguishes between two types of accounts. Externally Owned Accounts (EOAs) are controlled by private keys held by users. Contract Accounts are controlled by their deployed smart contract code and are activated only when called by an EOA or another contract. This dual-account model is fundamental to how Ethereum enables programmable money and programmable logic on-chain.

## Ethereum Versus Bitcoin

| Aspect | Ethereum | Bitcoin |
|---|---|---|
| Primary purpose | General-purpose programmable blockchain | Digital currency and store of value |
| Consensus mechanism | Proof of Stake (PoS) | Proof of Work (PoW) |
| Block time | ~12 seconds | ~10 minutes |
| Scripting language | Turing-complete (Solidity, Vyper) | Limited scripting (Bitcoin Script) |
| Supply cap | No fixed cap (issuance controlled by protocol) | 21 million BTC hard cap |
| Smart contracts | Full-featured, arbitrary logic | Very limited |
| Transaction throughput | ~15-30 TPS (Layer 1) | ~7 TPS |
| Energy consumption | Low (post-Merge) | High |

## Smart Contracts

Smart contracts are self-executing programs deployed on the Ethereum blockchain. Once deployed, their code is immutable and executes deterministically whenever invoked by a transaction. Smart contracts are written primarily in Solidity or Vyper, compiled to EVM bytecode, and deployed to a specific address on the network.

Key characteristics of smart contracts include:

- **Deterministic execution**: Given the same input and state, a smart contract always produces the same output across all nodes.
- **Immutability**: Once deployed, the contract code cannot be changed, though upgrade patterns (such as proxy contracts) can be used to work around this.
- **Composability**: Contracts can call other contracts, enabling complex multi-contract interactions often referred to as "money legos" in DeFi.
- **Trustlessness**: Execution is enforced by the network consensus, removing the need for trusted intermediaries.
- **Gas costs**: Every operation in a smart contract consumes gas, which must be paid in ETH. This prevents infinite loops and ensures computational resources are compensated.

Smart contracts power a wide range of use cases, from token issuance (ERC-20 and ERC-721 standards) and decentralized exchanges to lending protocols, insurance, and governance systems.

## Proof of Stake and The Merge

Ethereum originally used Proof of Work (PoW) for consensus, similar to Bitcoin. On September 15, 2022, Ethereum completed "The Merge," transitioning to Proof of Stake (PoS). This was one of the most significant upgrades in blockchain history, reducing Ethereum's energy consumption by approximately 99.95%.

Under PoS, validators replace miners. To become a validator, a participant must stake a minimum of 32 ETH. Validators are pseudo-randomly selected to propose new blocks and attest to the validity of blocks proposed by others. Validators who behave honestly earn rewards in the form of newly issued ETH and transaction fees. Validators who act maliciously or go offline risk having a portion of their staked ETH "slashed" as a penalty.

Benefits of PoS over PoW include:

- **Energy efficiency**: No need for specialized mining hardware or massive electricity consumption.
- **Lower barrier to entry**: Staking pools allow participants with less than 32 ETH to participate.
- **Economic security**: Attackers must acquire and risk a large amount of ETH, making attacks economically irrational.
- **Finality**: PoS provides stronger guarantees about transaction finality compared to probabilistic finality under PoW.

## Gas and Transaction Fees

Every computation on Ethereum requires gas, a unit that measures the computational effort needed to execute an operation. Users specify a gas limit (maximum gas they are willing to consume) and a gas price (how much ETH they are willing to pay per unit of gas). The total transaction fee equals gas used multiplied by the gas price.

EIP-1559, implemented in August 2021, reformed Ethereum's fee model by introducing a base fee that is algorithmically adjusted based on network demand and burned (destroyed), plus an optional priority fee (tip) paid directly to validators. This mechanism makes fees more predictable and introduces a deflationary pressure on ETH supply, since a portion of every transaction fee is permanently removed from circulation.

## Layer 2 Scaling Solutions

Ethereum's base layer (Layer 1) is limited in throughput. Layer 2 (L2) solutions process transactions off the main chain while inheriting its security guarantees. The primary L2 approaches include:

- **Optimistic Rollups**: Execute transactions off-chain and post compressed transaction data to Ethereum. They assume transactions are valid by default and use a challenge period during which fraud proofs can be submitted. Examples include Optimism and Arbitrum.
- **Zero-Knowledge (ZK) Rollups**: Execute transactions off-chain and post validity proofs (zk-SNARKs or zk-STARKs) to Ethereum, providing cryptographic certainty of correctness without a challenge period. Examples include zkSync and StarkNet.
- **Sidechains**: Independent blockchains with their own consensus mechanisms that bridge to Ethereum. They offer high throughput but do not inherit Ethereum's full security model. Polygon PoS is a prominent example.

Layer 2 solutions can achieve hundreds to thousands of transactions per second while settling to Ethereum's secure base layer, significantly reducing costs for end users.

## The Ethereum Ecosystem

The Ethereum ecosystem spans several major application domains:

- **Decentralized Finance (DeFi)**: Protocols for lending, borrowing, trading, and yield farming without intermediaries. Major protocols include Uniswap, Aave, MakerDAO, and Compound.
- **Non-Fungible Tokens (NFTs)**: Unique digital assets representing art, collectibles, gaming items, and real-world assets, standardized primarily through ERC-721 and ERC-1155.
- **Decentralized Autonomous Organizations (DAOs)**: On-chain governance structures where token holders vote on proposals and treasury management.
- **Identity and Attestation**: Decentralized identity systems, verifiable credentials, and soulbound tokens for reputation.
- **Enterprise Applications**: Supply chain tracking, trade finance, and data provenance solutions built on Ethereum or its enterprise variants.

## Key Token Standards

| Standard | Purpose | Fungibility | Notable Use |
|---|---|---|---|
| ERC-20 | Fungible tokens | Fungible | Stablecoins (USDC, DAI), governance tokens |
| ERC-721 | Non-fungible tokens | Non-fungible | Digital art, collectibles, domain names |
| ERC-1155 | Multi-token standard | Both | Gaming assets, batch transfers |
| ERC-4626 | Tokenized vaults | Fungible | Yield-bearing vault shares in DeFi |

These standards define common interfaces that enable interoperability across wallets, exchanges, and DApps, forming the backbone of Ethereum's composable application layer.

## Ethereum Roadmap

Ethereum's ongoing development follows a phased roadmap focused on scalability, security, and decentralization. Key phases and upgrades include:

- **The Surge**: Focused on scaling through rollups and data availability improvements, including Proto-Danksharding (EIP-4844) which introduces "blob" transactions to reduce L2 data costs.
- **The Scourge**: Addresses risks from centralization in block building, including Proposer-Builder Separation (PBS) and mitigations against Maximal Extractable Value (MEV).
- **The Verge**: Introduces Verkle trees to replace Merkle Patricia trees, enabling stateless clients that can verify blocks without storing the full state.
- **The Purge**: Aims to reduce protocol complexity and historical data storage requirements, lowering the burden on node operators.
- **The Splurge**: Encompasses miscellaneous improvements including account abstraction (ERC-4337) and other quality-of-life enhancements.

## Security Considerations

Ethereum's programmability introduces security challenges that technology professionals must understand:

- **Smart contract vulnerabilities**: Reentrancy attacks, integer overflow/underflow, front-running, and oracle manipulation are common attack vectors. The 2016 DAO hack exploited a reentrancy vulnerability, resulting in the loss of 3.6 million ETH and ultimately a contentious hard fork.
- **Key management**: Loss of private keys means permanent loss of funds. There is no password reset or account recovery mechanism at the protocol level.
- **MEV risks**: Miners and validators can reorder, insert, or censor transactions within a block to extract value, affecting transaction fairness.
- **Bridge vulnerabilities**: Cross-chain bridges have been frequent targets, with billions of dollars lost in bridge exploits.
- **Audit culture**: The ecosystem has developed a strong culture of third-party smart contract auditing, formal verification, and bug bounties, though these do not eliminate risk entirely.

## Related

Technology professionals exploring Ethereum should also study blockchain fundamentals and distributed systems to understand the underlying infrastructure. Related topics include smart contract development with Solidity, decentralized finance protocols and their economic models, cryptography and hash functions that underpin blockchain security, consensus algorithms such as Proof of Work and Practical Byzantine Fault Tolerance, distributed ledger technology beyond Ethereum, and Layer 2 scaling approaches including zero-knowledge proofs. Understanding digital wallets, key management, and token standards is essential for building production applications on the platform.

## Summary

Ethereum is the leading programmable blockchain platform, providing a decentralized computing environment where smart contracts and decentralized applications operate without intermediaries. Its transition to Proof of Stake dramatically reduced energy consumption while maintaining security. The platform's Turing-complete virtual machine, robust token standards, and composable DeFi ecosystem have established it as the primary infrastructure for Web3 development. While challenges remain around scalability, transaction costs, and smart contract security, the active roadmap addressing these through Layer 2 rollups, data availability improvements, and protocol simplification positions Ethereum as a foundational technology for decentralized systems in the years ahead.

## References

- Buterin, V. (2013). "Ethereum Whitepaper: A Next-Generation Smart Contract and Decentralized Application Platform." https://ethereum.org/en/whitepaper/
- Wood, G. (2014). "Ethereum: A Secure Decentralised Generalised Transaction Ledger (Yellow Paper)." https://ethereum.github.io/yellowpaper/paper.pdf
- Ethereum Foundation. "Ethereum Development Documentation." https://ethereum.org/en/developers/docs/
- Ethereum Foundation. "The Merge." https://ethereum.org/en/roadmap/merge/
- EIP-1559: Fee market change for ETH 1.0 chain. https://eips.ethereum.org/EIPS/eip-1559
- EIP-4844: Shard Blob Transactions (Proto-Danksharding). https://eips.ethereum.org/EIPS/eip-4844
- Ethereum Foundation. "Ethereum Roadmap." https://ethereum.org/en/roadmap/
- Antonopoulos, A. M. and Wood, G. (2018). *Mastering Ethereum: Building Smart Contracts and DApps*. O'Reilly Media.
