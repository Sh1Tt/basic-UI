(() => {
	const { port } = conf = {
		proto: "http",
		port: 3000,
	};
	const io = require("socket.io")(port, {
		cors: {
			origin: ["*"]
		},
	});
	io.on("connection", socket => {
		console.log(socket.id);

		io.on("disconnected", () => {
			console.log(`Disconnected: ${socket.id}`);
		})
	});
})();