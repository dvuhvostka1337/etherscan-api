export interface IAccessList {
    address: string;
    storageKeys: string[];
}

export interface ITransaction {
    blockHash: string;
    blockNumber: string;
    from: string;
    gas: string;
    gasPrice: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    hash: string;
    input: string;
    nonce: string;
    to: string;
    transactionIndex: string;
    value: string;
    type: string;
    accessList: IAccessList;
    chainId: string;
    v: string;
    r: string;
    s: string;
}
