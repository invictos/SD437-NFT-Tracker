
export type Transaction = {
    blockNumber: string;
    timeStamp: number;
    hash: string;
    from: string;
    to: string;
    tokenId: number;
    tokenName: string;
    contractAddress: string;
}

export class EtherscanService {
    private readonly apiKey: string;

    constructor(){
        if(!process.env.ETHERSCAN_API_KEY){
            throw new Error('Missing ETHERSCAN_API_KEY');
        }
        this.apiKey = process.env.ETHERSCAN_API_KEY;
    }

    async getTransactions(address: string): Promise<Transaction[]>{
        const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&page=1&offset=100&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${this.apiKey}`;
        const response = await fetch(url);
        const json = await response.json();
        if(json.status !== '1'){
            throw new Error(json.message);
        }
        return json.result.map((tx: {[key: string]: string}) => ({
            blockNumber: tx.blockNumber,
            timeStamp: parseInt(tx.timeStamp),
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            tokenId: tx.tokenID,
            tokenName: tx.tokenName,
            contractAddress: tx.contractAddress,
        }));
    }
}