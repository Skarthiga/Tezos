TEZOS

TEZOS ?
Tezos -> Self-amending blockchain network
consensus -> PoS
Token -> tez (or) tezzies (or) XTZ
Langugae -> OCaml, michelson, python
Use a library to integrate Tezos with your application -> Conseiljs, eztz, sotez
Mainnet = Main chain with real funds
Carthagenet = Testnet running a stable version of the current protocol
Zeronet = Testnet that runs a version as close as possible to the master branch of the repository, could be bumpy
Sandbox = Local test network
Babylon = The old protocol before Carthage
Alphanet = Deprecated, use Carthagenet
PROTOCOL CHANGES :
Protocol 003_PsddFKi3
1. Add RPCs for voting
2. Fees and cost model (for newly creating account -> buring 0.257)
3. fees >= (minimal_fees + minimal_nanotez_per_byte * size + minimal_nanotez_per_gas_unit * gas)
Protocol 004_Pt24m4xi Athens
1. Increase gas limit
2. Reduces roll size (from 10,000XTZ to 8,000XTZ)
3. Increase of gas limits per operation and per block
4.fees >= minimal_fees +
        minimal_nanotez_per_byte * size +
        minimal_nanotez_per_gas_unit * gas (the required fees have changed)
Protocol 005_PsBabyM1 Babylon
1. Implemets michelson smart contract language
2. Protocol 004 implements a consensus algorithm nick-named Emmy. 
   Protocol 005 introduces several improvements to this algorithm, regrouped under the name Emmy+
3. Replace KT1 accounts with manager.tz script
Protocol 006_PsCARTHA Carthage
1. Improvements to the Michelson smart contract language.
2. Changes in RPCs
INSTALLATION GUIDES :
https://tezos.gitlab.io/introduction/howtoget.html    (Build from source)
RUN SANDBOX NODE :
1st Tab :
1)  ./tezos-node run --rpc-addr 127.0.0.1   ------> 8732 port
Note – This port runs for carthagenet
2) ubuntu@ip-172-31-35-209:~/Sandbox/tezos$ DATA_DIR=/home/ubuntu/tezos_node ./src/bin_node/tezos-sandboxed-node.sh 1

3)  ubuntu@ip-172-31-35-209:~/sandbox-client/bin$ ./tezos-baker-006-PsCARTHA -P 18731 run with local node "/home/ubuntu/tezos-node" "bootstrap1"

2nd Tab :
1)  ./tezos-client rpc get /network/version -> to check network
2) ./src/bin_node/tezos-sandboxed-node.sh 1 --connections 1
Note – This port runs for sandbox
3rd Tab :
1) eval `./src/bin_client/tezos-init-sandboxed-client.sh 1`
2) tezos-client rpc get /chains/main/blocks/head/metadata
3) tezos-activate-alpha
4) tezos-autocomplete
5) tezos-client rpc get /chains/main/blocks/head/metadata
6) tezos-client list known addresses
7) tezos-client transfer 2 from bootstrap2 to bootstrap3 &
8) tezos-client bake for bootstrap1
9) tezos-client get balance for bootstrap1
10) tezos-client activate account alice with \commitments/tz1igsLuw9MTJps8atVkvod2GmioLTNaAAEb.json 
	(or)
11) tezos-client import secret key user unencrypted:edsk31vznjHSSpGExDMHYASz45VZqXN4DPxvsa4hAyY8dHM28cZzp6
	10.1) tezos-client transfer 42 from bootstrap1 to alice --burn-cap 0.257 &
	10.2) tezos-client bake for bootstrap1
	10.3) tezos-client get balance for alice
12) tezos-client show address alice
Generate keys
 tezos-client gen keys <name>
To view secret key
 tezos-client show address <name> -S
To import account
 tezos-client import secret key <name> unencrypted:edsk42zyYmVRmZEcexL2Ej1VQvASg3W547PJH437Jhzx2RQ3ursZuW

CREDENTIALS  :
23/05/2020
ssh Tezos@45.76.11.112 -p 22518
pwd - YDNSbsnsbs
ssh -i tezos_wfh.pem ubuntu@54.159.37.220 
27/05/2020
ssh Tezosmain@45.76.11.112 –p 22651
TdnAosmdnswte
ssh -i tezos_mainnet.pem ubuntu@54.209.116.93
ssh -i tezos_miner.pem ubuntu@54.227.128.241
FULL NODE :
./tezos-node run --rpc-addr 127.0.0.1
./tezos-client bootstrapped
./tezos-client get timestamp
./tezos-client rpc get /chains/main/blocks/head/ | jq -r '.header.level, .header.timestamp';date --iso-8601=seconds     to check the level and timestamp of the block
./tezos-client rpc get /chains/main/checkpoint
ROLLING NODE :
./tezos-node run --rpc-addr 127.0.0.1  --history-mode experimental-rolling
RPC CALL :
0) tezos-client -A localhost -P 187321 bootstrapped
1) tezos-client rpc get http://127.0.0.1:18731/chains/main/blocks/head/hash 
	"BLBK6bgTjFjmmQanPEFj25kyEqgyK5Y3Jkz6tXjWnZs16EC4e59" 
2) tezos-client rpc get http://127.0.0.1:18731/chains/main/chain_id  
	"NetXjD3HPJJjmcd" 
3) tezos-client rpc get http://127.0.0.1:18731/chains/NetXjD3HPJJjmcd/blocks/BLBK6bgTjFjmmQanPEFj25kyEqgyK5Y3Jkz6tXjWnZs16EC4e59/context/delegates/tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv/delegated_balance
	0
4) tezos-client rpc get http://127.0.0.1:18731/chains/main/blocks/head/context/contracts/tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx/manager_key
	"edpkuBknW28nW72KG6RoHtYW7p12T6GKc7nAbwYX5m8Wd9sDVC9yav" 
5) tezos-client rpc get http://127.0.0.1:18731/chains/main/blocks/head/context/contracts/tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx/counter
	0
6) tezos-client --addr 127.0.0.1 --port 18731 -l transfer 100 from bootstrap1 to bootstrap2	
REFERENCE LINKS :
0) https://tezos.gitlab.io/introduction/howtouse.html
1) https://www.dailambda.jp/blog/2019-09-03-tezos-handson-kit/
2) http://www.ocamlpro.com/2018/11/15/an-introduction-to-tezos-rpcs-a-basic-wallet/
3) https://medium.com/@Tezzigator/permanent-tezos-sandboxing-509368945c4a
4) https://blog.nomadic-labs.com/how-to-write-a-tezos-protocol.html
5) https://medium.com/cryptium/deploying-a-custom-protocol-in-tezos-9eded624e91f
6) https://cryptonomic.github.io/ConseilJS/#/?id=api-key
7) https://medium.com/@tezbaker.io/home-baking-installing-and-setting-up-a-tezos-node-3a04c78528ac
8) https://stephenandrews.github.io/eztz/      [for key generation online]
9) https://tezos.stackexchange.com/questions/2024/how-to-convert-ed25519-bytes-to-tezos-public-key
10) https://tezos.stackexchange.com/questions/183/base58-encoding-decoding-of-addresses-in-micheline
11) https://askubuntu.com/questions/344506/permission-denied-when-running-make-install

Git	
1.	mkdir coin
2.	cd coin
3.	git init
4.	git remote add origin “<git url>”
5.	git remote -v
6.	git pull origin <branchname>
7.	git status
8.	git add .
9.	git status
10.	git commit –m “<Message>”
11.	git push origin <branchname>
12.	git checkout -b <branchname>
13.	git push -u origin <branchname>
Symbol change:
1.	Src/proto_005_babylon/lib_client/client_proto_args.ml  -> tez_sym(line number 126)
2.	Src/proto_006_cartha/lib_client/client_proto_args.ml -> tez_sym(line number 126)













