'use strict';

const { spawn } = require('node:child_process');

const { NodeClient, WalletClient } = require("hs-client");

const { Network } = require("hsd");

const network = Network.get("main");

const { Level } = require("level");

const devEscape = m => m.replace(/[\n \"]/g,"").replace(/["[]/g,"[").replace(/[\]"]/g,"]");

const nodeClient = new NodeClient({
	port: network.rpcPort,
	apiKey: process.env.HSD_API_KEY
});

const walletClient = new WalletClient({
	network: network.type,
	port: network.walletPort,
	apiKey: process.env.HSW_API_KEY
});

module.exports = function v1Routes(fastify, options, done)
{
	fastify.get( "/info", async (req, reply) =>
	{
		await nodeClient.getInfo()
		.then(info => {
			reply.send(info);
		})
		.catch(err => {
			reply.send(err);
		});
	});
	
	fastify.get( "/info/peers", async (req, reply) =>
	{
		await nodeClient.execute("getpeerinfo")
		.then(peers => {
			reply.send(peers);
		})
		.catch(err => {
			reply.send(err);
		});
	});

	fastify.get( "/info/peers/subver", async (req, reply) =>
	{
		let hsd_version = [];
		await nodeClient.execute("getpeerinfo")
		.then(peers => {
			peers.forEach((p,i) => {
				const sub = p.subver.replace(/[/]/g,"").replace(/[:]/g,"");
				if(!hsd_version.includes(sub)) {
					hsd_version.push(sub,1);
				}
				else {
					hsd_version[hsd_version.indexOf(sub) + 1] += 1;
				};
			});

			reply.send(hsd_version);
		})
		.catch(err => {
			reply.send(err);
		});

	} );
	
	fastify.get( "/info/peers/inbound", async (req, reply) =>
	{
		await nodeClient.execute("getpeerinfo")
		.then(info => {
			const filter = info.filter(peer => peer.inbound).map(peer => peer.addr.split(":")[0]);
			reply.send(filter);
		})
		.catch(err => {
			reply.send(err);
		});
	});

	fastify.get( "/mempool/tx/hashes", async (req, reply) =>
	{
		await nodeClient.execute("getrawmempool", [1])
		.then(info => {
			const txHashes = Object.keys(info);
			reply.send(txHashes);
		})
		.catch(err => {
			reply.send(err);
		});
	});

	fastify.get( "/update/bundled", async (req, reply) =>
	{
		const update = {};
		await nodeClient.getInfo()
		.then(info => {
			update.info = info;
		})
		.catch(err => {
			update.info = err;
		});
		await nodeClient.execute("getpeerinfo")
		.then(peers => {
			update.peers = peers;
		})
		.catch(err => {
			update.peers = err;
		});
		await nodeClient.execute("getrawmempool", [1])
		.then(info => {
			const txHashes = Object.keys(info);
			update.mempool = txHashes;
		})
		.catch(err => {
			update.mempool = err;
		});
		reply.send(update);
	});


	fastify.get( "/generate/api-key", async (req, reply) =>
	{
		// await new Promise(resolve => {
			const conf = {
				l: 32,
				d: 4,
				charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123567890"
			};
			let _key = "";
			for (var i = conf.l - 1; i >= 0; i--) {
				const r = Math.floor(Math.random() * conf.charset.length) + 0;
				if (i===7||i===15||i===23) _key += "-";
				_key += conf.charset.slice(r,r+1);
			};
			reply.send({
				length: conf.l,
				dec: conf.d,
				dev: conf.l / conf.d,
				key: _key
			});
	});
	
	fastify.get( "/generate/rand-53", async (req, reply) =>
	{
		// await new Promise(resolve => {
			const conf = {
				l: 53,
				charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123567890"
			};
			let _key = "";
			for (var i = conf.l - 1; i >= 0; i--) {
				const r = Math.floor(Math.random() * conf.charset.length) + 0;
				_key += conf.charset.slice(r,r+1);
			};
			reply.send({
				length: conf.l,
				key: _key
			});
	});
	

	fastify.get( "/generate-inbound-report", async (req, reply) =>
	{
		await new Promise(resolve => {
			const c = spawn(`bash`, [ `/var/www/hsd-inbound-report` ]);
			let stream = {};
			c.stdout.on('data', (data) => {
				const decoded = data.toString("utf-8");
				stream.url = decoded;
			});
			c.stderr.on('data', (data) => {
				const decoded = data.toString("utf-8");
				stream.err = decoded;
			});
			c.on('close', (code) => {
				stream.close = {spawn: `child process exited with code ${code}`};
				resolve(stream);
				return reply.send(stream);
			});
		});
	});
	

	fastify.get( "/restart-service", async (req, reply) =>
	{
		console.log("attempting to restart hsd.service..");
		
		const std = {};
		const c = spawn(`bash`, [ "/var/www/hsd-service-restart"]);
		c.stdout.on('data', (data) => {
			std.out = { data: data.toString("utf-8") };
		});
		c.stderr.on('data', (data) => {
			std.err = { err: data.toString("utf-8") };
		});
		c.on('close', (code) => {;
			std.close = { spawn: `child process exited with code ${code}`};
			console.log(std.close);
			reply.send(std);
		});

	});

	fastify.get( "/dev/dig/:domain/:type", async (req, reply) =>
	{	
		const { domain, type } = req.params;
		const c = spawn(`dig`, [...[ `@127.0.0.1`, '-p', 5350 ], domain, type || '' ] );
		let res;
		c.stdout.on('data', (data) => {
			const decoded = data.toString("utf-8");
			const startLine = ';; ANSWER SECTION:';
			const endLine = ';; SIG0';
			const dropHead = decoded.substr(decoded.indexOf(startLine) + startLine.length + 1);
			const dropFoot = dropHead.substr(0, dropHead.indexOf(endLine) - 1);
			const raw = dropFoot.split(domain);
			const records = raw.filter(line => line !== '')
			.map(line => {
				const s = line.indexOf('"');
				return line.substr(s).replace(/\\t/g," ").replace(/[\\"]/g,"").replace(/[\n]/g,"");
			});
			res = JSON.stringify(records);
		});

		c.stderr.on('data', (data) => {
			const error = data.toString("utf-8");
			res = { error };
		});

		c.on('close', (code) => {
			reply.send(res.error ? { 
				res, 
				exit: `child process exited with code ${code}`
			} : res);
		});

	});

	// API DOCS	
	const docs = `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Api doc</title>
			</head>
			<body>
				<table>
					<thead>
						<th>TYPE</th>
						<th>ENDPOINT</th>
					</thead>
					<tbody>
						<tr>
							<td>GET</td>
							<td>/info</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/info/peers</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/info/peers/subver</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/info/peers/inbound</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/mempool/tx/hashes</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/update/bundled</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/generate/api-key</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/generate/rand-53</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/generate-inbound-report</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/restart-service</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>/dev/dig/:domain/:type</td>
						</tr>
					</tbody>
				</table>
			</body>
	</html>`;
	
	fastify.get( "/docs", async (req, reply) =>
	{	
		reply.type('text/html');
		reply.send(docs);
	});

	
	// HSW
	fastify.get( "/index/:walletid", async (req, reply) =>
	{	
		try {
			let addressIndex = new Level("./addr_index");
			let txIndex = new Level("tx_index");

			if (txIndex.status!=="open") {
				await txIndex.open();
			};
			if (addressIndex.status!=="open") {
				await addressIndex.open();
			};
			
			const wallet = walletClient.wallet(req.params.walletid);

			return reply.send({
				addressIndex: addressIndex.status,
				txIndex: txIndex.status,
				wallet: walletClient
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		};
	});

	fastify.get( "/wallet/list", async (req, reply) =>
	{	
		try {
			const details = await walletClient.getWallets();

			return reply.send({
				details: details
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		};
	});

	fastify.get( "/wallet/:id", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const details = await wallet.getInfo();

			return reply.send({
				details: details
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		};
	});

	fastify.get( "/wallet/:id/master-hd", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const master = await wallet.getMaster();
			
			return reply.send({
				master: master
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}
	});

	fastify.post( "/wallet/:id/passphrase/:newphrase", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const passphrase = await wallet.setPassphrase(req.params.newphrase);
			
			return reply.send({
				passphrase: passphrase
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}
	});

	fastify.get( "/wallet/:id/account/list", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const list = await wallet.getAccounts();
			
			return reply.send({
				accounts: list
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}

	});

	fastify.get( "/wallet/:id/account/:account", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const account = await wallet.getAccount(req.params.account);
			
			return reply.send({
				account: account
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}
	});

	fastify.get( "/wallet/:id/account/:account/history", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const history = await wallet.getHistory(req.params.account);
			
			return reply.send({
				history: history
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}
	});

	fastify.get( "/wallet/:id/account/:account/receive", async (req, reply) =>
	{	
		try {
			const wallet = walletClient.wallet(req.params.id);

			const receiveAddress = await wallet.createAddress(req.params.account);
			
			return reply.send({
				receiveAddress: receiveAddress
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}
	});

	fastify.get( "/wallet/:id/account/:account/history/test", async (req, reply) =>
	{	
		try {
			let txIndex = new Level("tx_index");
			
			const wallet = walletClient.wallet(req.params.id);

			const history = await wallet.getHistory(req.params.account);
			
			const transactions = [], 
			shadow = [];

			history.forEach(async tx => {
				shadow.push(tx);
				try {
					const hash = tx.hash.toUpperCase();
					let _cursor;
					if (txIndex.status !== "open") {
						await txIndex.open();
					};
					if (txIndex.status !== "open") {
						_cursor = await txIndex.get(hash);
						transactions.push(await _cursor);
					};
				}
				catch(err) {
					tx.outputs.forEach(async output => {
						transactions.push(output);
					});

					// details.outputs.forEach(async (output) => {
					// 	let address = output.address;
					// 	let amount = output.value;
					// 	let hash = details.hash.toUpperCase();
					// 	let junoAddress;
						
					// 	try {
					// 		junoAddress = await addressIndex.get(address);
					// 	}
					// 	catch(err) {
					// 		await txIndex.put(
					// 			hash.toUpperCase(),
					// 			`No assigned address`
					// 		);
					// 		return null;
					// 	}
				
					// 	if (junoAddress) {
					// 		console.log(`${junoAddress} (${address}) received ${amount} dollarydoos`);
					// 		try {
					// 			let tx = await junoClient.execute(
					// 				junoWallet.address,
					// 				chnsContract,
					// 				{
					// 					transfer: {
					// 						recipient: junoAddress.toString(),
					// 						amount: amount.toString(),
					// 					},
					// 				},
					// 				fee,
					// 				`HNS deposit. HNS Tx ID: ${hash}. Powered by Another.Software`
					// 			);

					// 			await txIndex.put(
					// 				hash.toUpperCase(),
					// 				`juno:${tx.transactionHash}`
					// 			);
					// 		} 
					// 		catch(err) {
					// 			console.error(err);
					// 			await txIndex.put(hash.toUpperCase(), `ERROR`);
					// 			return null;
					// 		}
					// 	};
					// });
					// return null;
				};
			});

			return reply.send({
				transactions: transactions,
				shadowlog: shadow
			});
		}
		catch(err) {
			return reply.send({
				error:err
			});
		}


		// await walletClient.open();
		
		// await walletClient.join("*");

		// if (txIndex.status==="open") {
		// 	const h = await wallet.getHistory("default");
		// 	const w = await wallet.getInfo();
		// 	return reply.send({
		// 		wallet: w,
		// 		history: h,
		// 	});
		// }
		// else {
		// 	return reply.send({
		// 		status: txIndex.status
		// 	});
		// };
	});


	done();
};