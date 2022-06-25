'use strict';

const {spawn} = require('node:child_process');

const {NodeClient} = require("hs-client");

const {Network} = require("hsd");

const network = Network.get("main");

const devEscape = m => m.replace(/[\n \"]/g,"").replace(/["[]/g,"[").replace(/[\]"]/g,"]");

const nodeClient = new NodeClient({
	port: network.rpcPort,
	apiKey: process.env.HSD_API_KEY
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
	
	done();
};