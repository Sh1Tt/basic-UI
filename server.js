const html = `
<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title></title>
		<style type="text/css">
			html, body {
				position: static;
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				overflow: hidden;
    			font-family: sans-serif;
    			-webkit-font-smoothing: antialiased;

			}
			* {
				position: relative;
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				text-decoration: none;
				color: inherit;
			}
			div#__app {
				position: relative;
				width: 100%;
				height: 100%;
				isolation: isolate;
				background: rgba(0, 0, 0, 1.0);
			}
			div#bg {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(37deg, rgba(0,0,0,.99), rgba(200,38,238,.99),rgba(0,0,0,.99));
				z-index: 0;
				background-image: url(https://wallpaperaccess.com/full/322724.jpg);
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
			}
			div#bg:hover {
				mouse: pointer;
			}
			div#hsd {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				z-index: 3;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				color:  white;
				transition: 2s ease-in-out;
			}
			nav#hsd-menu {
				position: absolute;
			    z-index: 1234567890234567890098765434567898765432345678;
			    top: 30%;
			    left: calc((30%) - 16vh);
			    width: 32vh;
			    aspect-ratio: 1;
			    border-radius: 50%;
			    /*border: 0.01rem solid rgba(23,23,23,.25);
			    outline: 0.01rem solid rgba(255,255,255,.75);*/
			    transform-style: preserve-3d;
			    backdrop-filter: blur(3px);
			    transition: .4s ease-in-out;
				background: radial-gradient(rgba(112,112,112,.75), rgba(255,255,255,.125), rgba(255,255,255,.5));
				opacity: 0;
			}
			nav#hsd-menu::before {
				position: absolute;
				z-index: 1234567890234567890098765434567898765432345690;
			    content: '';
			    inset: 30%;
			    width: 40%;
			    aspect-ratio: 1;
			    border-radius: 50%;
			    background: conic-gradient(rgba(248,248,255,.5),rgba(248,248,255,.5),rgba(32,32,36,.75),rgba(32,32,36,.75),rgba(32,32,36,.75),rgba(32,32,36,.75),rgba(32,32,36,.75),rgba(248,248,255,.5));
			    filter: drop-shadow(1px 3px 10px rgba(23,23,27,.5));
			}
			nav#hsd-menu::after {
				position: absolute;
				z-index: 1234567890234567890098765434567898765432345699;
			    content: '';
			    inset: 30%;
			    width: 40%;
			    aspect-ratio: 1;
			    border-radius: 50%;
			    background: radial-gradient( rgba(255,255,255,.75), rgba(255,255,255,.33), rgba(255,255,255,.125));
			    filter: drop-shadow(1px 3px 10px rgba(23,23,27,.5));
			}
			nav#hsd-menu .bg {
				position: absolute;
				inset: 0;
			    width: 100%;
			    aspect-ratio: 1;
			    border-radius: 50%;
		        background: linear-gradient(75deg, rgba(2,4,8,.55), rgba(12,86,108,.55), rgba(12,86,108,.55), rgba(248,246,255,.55));
			    z-index: 1234567890234567890098765434567898765432345698;
			    opacity: 1;
			    filter: drop-shadow(1px 3px 10px rgba(23,23,27,.5));
			}
			nav#hsd-menu #center {
				position: absolute;
				inset: 30%;
			    width: 40%;
			    aspect-ratio: 1;
			    border-radius: 50%;
		        background: linear-gradient(75deg, rgba(2,4,8,.55), rgba(12,86,108,.55), rgba(12,86,108,.55), rgba(248,246,255,.55));
			    z-index: 1234567890234567890098765434567898765432345698;
			    opacity: 1;
			}
			nav#hsd-menu #center::before {
				position: absolute;
				content: '';
				inset: 0;
			    width: 100%;
			    aspect-ratio: 1;
			    border-radius: 50%;
		        background: conic-gradient(rgba(248,246,255,.55), rgba(2,4,8,.55), rgba(12,86,108,.55), rgba(12,86,108,.55), rgba(248,246,255,.55));
			    z-index: 1234567890234567890098765434567898765432345697;
			    opacity: 1;
			    filter: drop-shadow(1px 3px 10px rgba(23,23,27,.5));
			}
			nav#hsd-menu #center::after {
				position: absolute;
				content: '';
				inset: -3.75%;
			    width: 107.5%;
			    aspect-ratio: 1;
			    border-radius: 50%;
		        background: radial-gradient(rgba(12,86,108,.75) 0.01%, rgba(0,0,0,0) 99.99%);
			    z-index: 1;
			    opacity: .7;
			    animation-name: center-loading;
			    animation-duration: 4.20s;
			    animation-direction: backwards;
			    animation-timing-function: linear;
			    animation-iteration-count: 1;
			    animation-delay: .07s;
			}
			nav#hsd-menu .hsdCenterKnob {
				position: absolute;
			    inset: 30%;
			    width: 40%;
			    aspect-ratio: 1;
			    border-radius: 50%;
			    background: linear-gradient(66deg, rgba(2,4,8,1), rgba(2,4,8,.8), rgba(2,4,8,.6), rgba(12,86,108,.375), rgba(12,86,108,.25), rgba(248,246,255,.125));
			    z-index: 1234567890234567890098765434567898765432345698;
			    opacity: 1;
			    filter: drop-shadow(1px 3px 10px rgba(23,23,27,.5));
			}
			nav#hsd-menu .hsdCenterKnob::before {
				position: absolute;
				content: '';
				inset: 0;
			    width: 100%;
			    aspect-ratio: 1;
			    border-radius: 50%;
		        background: conic-gradient(rgba(248,246,255,.55), rgba(2,4,8,.55), rgba(12,86,108,.55), rgba(12,86,108,.55), rgba(248,246,255,.55));
		        background: rgba(182,182,196,.25);
			    z-index: 1234567890234567890098765434567898765432345697;
			    opacity: 1;
			}
			@KEYFRAMES center-loading {
				0% {
					background: conic-gradient(rgba(12,86,108,.75) 0.05%, rgba(0,0,0,0) 99.9%), rgba(12,86,108,.75) 0.05%);
				}
				100% {
					background: conic-gradient(rgba(12,86,108,.75) 99.95%, rgba(0,0,0,0) 0%), rgba(12,86,108,.75) 0.05%);
				}
			}

			nav#hsd-menu:hover {
				opacity: 1;	
			
			}
			nav#hsd-menu .option {
				position: absolute;
				width: 49.95%;
				aspect-ratio: 1;
				z-index: 247564029792540278592;
			    display: flex;
				justify-content: center;
				align-items: center;
				background: radial-gradient(rgba(248,246,255,.5), rgba(2,4,8,.33));
				drop-shadow: 8px 13px rgba(0,0,0,.5);
			}
			nav#hsd-menu .option:hover {
				background: radial-gradient( rgba(255,255,255,.33), rgba(255,255,255,.01));
			}

			nav#hsd-menu .option img {
				position: relative;
				margin: 0;
				padding: 0;
				width: 38px;
				aspect-ratio: 1;
				opacity: .7;
				background: radial-gradient( rgba(255,255,255,.5), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0));
				border-bottom: 1px solid white;
			}
			nav#hsd-menu #top-right.option {
				top: 0;
				left: 50%;
				border-radius: 0 100% 0 0;
			}
			@KEYFRAMES top-left-clockwise {
				0% {
					clip-path: polygon(0 0, 0 100%, 0 0, 0 0);
				}
				50% {
					clip-path: polygon(0 0, 0 100%, 100% 0, 100% 0);
				}
				100% {
					clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
				}
			}
			nav#hsd-menu #bottom-right.option {
				top: 50%;
				left: 50%;
				border-radius: 0 0 100% 0;
			}
			nav#hsd-menu #top-left.option {
				top: 0;
				left: 0;
				border-radius: 100% 0 0 0;
			}
			nav#hsd-menu #bottom-left.option {
				top: 50%;
				left: 0;
				border-radius: 0 0 0 100%;
			}

			nav#hsd-menu .option .sub-menu {
				position: absolute;
				width: 200%;
				height: 200%;
			}
			

			nav#hsd-menu #top-right.option .sub-menu {
				top: -100%;
				left: 0;
				border-radius: 0 100% 0 0;
				visibility: collapse;
			}
			nav#hsd-menu #top-right.option .level-1 {
				position: absolute;
				inset: 0;
				clip-path: polygon(0 0, 100% 0, 0 100% );
				background: linear-gradient(83deg, rgba(248,248,255,.33), white);
				border-radius: 0 100% 0 0;
			}
			nav#hsd-menu #top-right.option:hover .sub-menu {
				animation: .23s top-left-clockwise linear normal 1;
			}
			nav#hsd-menu #top-right.option:hover .level-1 {
				visibility: visible;
			}
			nav#hsd-menu #top-right.option .level-2 {
				position: absolute;
				inset: 0;
				clip-path: polygon(0 100%, 100% 100%, 100% 0);
				background: linear-gradient(83deg, rgba(248,248,255,.33), white);
				border-radius: 0 100% 0 0;
			}
			nav#hsd-menu #top-right.option:hover .level-2 {
				visibility: visible;
			}
			nav#hsd-menu #bottom-right.option .sub-menu {
				top: 0;
				left: 0;
				border-radius: 0 0 100% 0;
				visibility: collapse;
			}
			nav#hsd-menu #bottom-right.option:hover .sub-menu {
				visibility: visible;
			}
			nav#hsd-menu #top-left.option .sub-menu {
				top: -100%;
				left: -100%;
				border-radius: 100% 0 0 0;
				visibility: collapse;
			}
			nav#hsd-menu #top-left.option:hover .sub-menu {
				visibility: visible;
			}
			nav#hsd-menu #bottom-left.option .sub-menu {
				top: 0;
				left: -100%;
				border-radius: 0 0 0 100%;
				visibility: collapse;
			}
			nav#hsd-menu #bottom-left.option:hover .sub-menu {
				visibility: visible;
			}

			div#hsd-wrapper {
				position: absolute;
				bottom: 4.20%;
				left: 0;
				width: 100%;
				height: auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				z-index: 9074728598d598256;
				transform-style: preserve-3d;
				transform: translateZ(500px);
			}
			div#hsd-title {
				position: relative;
				display: flex;
				flex-direction: row;
				align-items: baseline;
				justify-content: space-evenly;
				flex-wrap: wrap;
			}
			
			h1 {
				padding: .1775rem .375rem;
				font-size: 316%;
				opacity: .25;
			}
			div#hsd-title h2 {
				padding: .1775rem .375rem;
				font-size: 280%;
				opacity: .25;
				color: grey;
			}

			div#hsd-info {
				position: relative;
				width: max-content;
				max-width: 800px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-evenly;
				align-items: center;
    			text-shadow: 0 0 1px rgb(0 0 0 / 90%), 1px 1px 2px rgb(0 0 0 / 90%), 2px 2px 4px rgb(0 0 0 / 90%), 4px 4px 8px rgb(0 0 0 / 90%), 8px 8px 12px rgb(0 0 0 / 90%);
    			font-size: x-large;
    			white-space: nowrap;
			}
			@media only screen and ( max-width: 520px ) {
				div#hsd-info {
					font-size: inherit;
				}

			}
			
			div#hsd-info span {
				color: grey;
			}
			
			div#hsd-info .detail {
				position: relative;
				flex: 1 1 0px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: .75em 1.5em
			}
			[data-hsd="synced"] {
				color: lightgreen;
				font-weight: 700;
				text-shadow: 2px 2px 2px black;
			}
			input#hsd-restart-sh {
				padding: .75em 1.5em;
				border-radius: .375rem;
				color: rgba(46,46,54,1);
				font-weight:700;
				background-color: lightgreen;
			}
			[data-hsd="synced"]:hover > input#hsd-restart-sh {
				filter: brightness(1.02);
			}
			input#hsd-restart-sh:active {
			}





			.peer.connected {
				position: absolute;
				height: auto;
				background-color: rgba(0,0,0,.33);
				backdrop-filter: blur(10px);
				border-radius: .625em;
				box-shadow:
					0px 0px 1px rgba(2,2,6,.07),
					1px 1px 2px rgba(2,2,6,.07),
					2px 2px 4px rgba(2,2,6,.07),
					4px 4px 8px rgba(2,2,6,.07)
				;
				padding: .375em .75em;
				outline: .02rem solid rgba(238,238,246,.375);
				font-family: monospace;
				font-size: 95%;
				display: flex;
				flex-direction: column;
				color: rgba(248,248,255,.75);
				transform-style:preserve-3d;
			}
			.peer.connected span,
			.peer.connected span.addr {
				display: none;
			}
			.peer.connected span.peer.ip {
				display: inherit;
			}
			
			.peer.connected:hover {
				transform: translate3d(0px, 0px, -1000px);
				z-index: 99089085467890987654678 !important;
			}
			.peer.connected:hover span,
			.peer.connected:hover span.addr {
				display: inherit;
			}
			.peer.connected .indiator {
				position: relative;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin: auto .375em auto 0;
			}
			.peer.connected .foldup {
				display: inherit;
			}
			.peer.connected:hover .foldup {
				display: none;
			}
			.peer.connected .indiator::before {
				content: '';
				position: absolute;
				top: 0;
				right: 0
				width: 66%;
				height: 66%;
				border-radius: 50%;
				background: white;
			}
			.peer.connected .indiator::after {
				content: '';
				position: absolute;
				top: 0;
				right: 0
				width: 66%;
				height: 66%;
				border-radius: 50%;
				background: radial-gradient(rgba(238,238,244,.75),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0));
				z-index: 823078;
			}

			.peer.connection {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(90deg, red, red, red, blueviolet, transparent, red, red);
				opacity: .7;
			}


			#mempool {
				position: absolute;
			    top: 33%;
			    left: 52%;
			    height: auto;
			    width: 46%;
			    font-size: xx-small;
			    color: skyblue;
			    display: flex;
			    flex-direction: row;
			    justify-content: center;
			    align-items: center;

			    transform: translateX(32.5vw) scale(1.4);
    			transform-origin: 35vw 0;
			}
			.nextblock {
				position: absolute;
				inset: 0;
				width: 80%;
				height: max-content;
			    display: grid;
			    grid-template-columns: repeat(3, 1fr);
			    grid-auto-rows: auto;
			    overflow: hidden;
			    backdrop-filter: blur(4px);
			}
			#frontside {
				transform-style: preserve-3d;
			    transform-origin: 0vh 10vh;
			    transform: perspective(288px) rotateY(-216deg) scaleX(-1) translateX(-100%);
			}
			#leftside {
				transform-style: preserve-3d;
			    transform-origin: 0vh 10vh;
			    transform: perspective(288px) rotateY(36deg) scaleX(1);
			}
			#mempool .tx.hash {
				overflow-x: hidden;
				width: 95%;
				transform-style: preserve-3d;
				animation-direction: normal;
				animation-timing-function: ease-in-out;
				animation-iteration-count: 1;
				animation-fill-mode: backwards;
				cursor: pointer;
				transition: .11s;
				animation-duration: .07s;
			}
			#frontside .tx.hash:hover {
				text-shadow: 1px 1px 5px rgba(248,248,255,.02);
				font-weight: 600;
				transform: scale(1.05)  !important;
				text-shadow: 1px 1px 20px rgba(0,0,0,.75);
				drop-shadow: 2px 6px black;
			}
			#frontside .tx.hash.new {
				animation-name: i-am-new;	
			}
			@KEYFRAMES i-am-new {
				0% {
					transform: translateX(-50%) ;
					opacity: 0;
				}
				100% {
					transform: translateX(0) ;
					opacity: 100%;
				}
			}
			#leftside .tx.hash:hover {
				text-shadow: 1px 1px 5px rgba(248,248,255,.02);
				font-weight: 600;
				transform: scale(1.05)  !important;
				text-shadow: 1px 1px 20px rgba(0,0,0,.75);
				drop-shadow: 2px 6px black;
			}
			#leftside .tx.hash.new {
				animation-name: i-am-new-mirror;
			}
			@KEYFRAMES i-am-new-mirror {
				0% {
					transform: translateX(-50%) ;
					opacity: 0;
				}
				100% {
					transform: translateX(0) ;
					opacity: 100%;
				}
			}

			.tx.hash.mined {
				animation-name: i-got-mined;
				animation-duration: 7s;
			}
			@KEYFRAMES i-got-mined {
				0% {
					transform: scaleX(1) translateX(0) translate3d(0,0,0);
					opacity: 1;
				}
				100% {
					transform: scaleX(0) translateX(-50%) translate3d(-30%,-10%,-5%);
					opacity: 0;
					text-shadow: 
						0px 0px 1px rgba(255,255,255,.13),
						1px 1px 2px rgba(255,255,255,.13),
						2px 2px 4px rgba(255,255,255,.13),
						4px 4px 8px rgba(255,255,255,.13),
						8px 8px 16px rgba(255,255,255,.13)
					;
					filter: brightness(2);
					box-shadow:
						0px 0px 1px rgba(248,247,255,.11),
						1px 1px 2px rgba(248,247,255,.11),
						2px 2px 4px rgba(248,247,255,.11),
						4px 4px 8px rgba(248,247,255,.11),
						8px 8px 16px rgba(248,247,255,.11)
					;
				}
			}

			#report-url {
				position: fixed;
			    top: 23%;
			    right: 4.25vw;
			    z-index: 76542947294247820754627849247;
			    color: white;
			    padding: 1vw;
			    background: linear-gradient(-14deg, red, blue);
			    border-radius: 0.25em;
			    text-shadow: 1px 2px 5px black;
			    box-shadow: 0 0 1px rgb(238 238 244 / 9%), 1px 1px 2px rgb(238 238 244 / 9%), 2px 2px 4px rgb(238 238 244 / 9%), 4px 4px 8px rgb(238 238 244 / 9%);
			    text-shadow: 4px -1px 8px rgb(0 0 0 / 70%), 1px 1px 2px rgb(0 0 0 / 70%), 2px 2px 4px rgb(0 0 0 / 70%), 4px 4px 8px rgb(0 0 0 / 70%);
			    font-weight: 700;
			    filter: drop-shadow(0px 2px 5px rgba(0,0,0,.33));
				    position: fixed;
				    top: 23%;
				    right: 2.5%;
				    z-index: 76542947294247820754627849247;
				    color: white;
				    padding: 1vw;
				    background: linear-gradient(-14deg, rgba(248,248,252,.25), rgba(183,234,255,.2));
				    border-radius: 0.25em;
				    text-shadow: 1px 2px 5px black;
				    box-shadow: 0 0 1px rgb(238 238 244 / 9%), 1px 1px 2px rgb(238 238 244 / 9%), 2px 2px 4px rgb(238 238 244 / 9%);
				    text-shadow: 4px -1px 8px rgb(0 0 0 / 60%), 1px 1px 2px rgb(0 0 0 / 60%), 2px 2px 4px rgb(0 0 0 / 60%);
				    font-weight: 700;
				    filter: drop-shadow(0px 3px 6px rgba(0,0,0,.75));
				    outline: 0.02rem solid rgba(25,55,25,0.93);
				    border-top: 0.02rem solid rgba(153,5,255,.9);
				    border-right: 0.02em solid rgba(153,5,255,.9);
					transition: .07s ease-in-out;
			}
			#report-url:hover {
				transform: scale(1.01);
				background: linear-gradient(-14deg, rgba(248,248,252,.25), rgba(183,234,255,.5));
			}
			#settings {
				position: absolute;
			    z-index: 190497949279472864270470972569027;
			    bottom: 94.5%;
    			right: 2.5%;
			    background-image: url(https://www.clipartmax.com/png/full/339-3394813_setting-clipart-control-system-system-configuration-icon.png);
			    width: 32px;
			    background-size: contain;
			    background-repeat: no-repeat;
			    background-blend-mode: luminosity;
			    filter: drop-shadow(0px 2px 5px rgba(0,0,0,.33)) brightness(4) hue-rotate(577deg);
			    aspect-ratio: 1;
			    background-position: center left;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    color: white;
			    font-weight:700;
			}
			path { fill: rgba(0,0,0,0); width: 100%; height: 100%; }
			text { fill: rgba( 248,248,255,.75); width: 100%; height: 100%; font-size: .5em}

		</style>
		<script type="text/javascript">var testMining, logLevel;</script>
	</head>
	<body>
		<div id="__app">
			<div id="hsd">
				<nav id="hsd-menu">
					<span class="bg"></span>
					<span id="center"></span>
					<div class="option" id="top-right">
						<img src="https://img.icons8.com/external-line-lima-studio/64/ffffff/external-money-digital-asset-line-lima-studio.png"/>
					</div>
					<div class="option" id="bottom-right">
						<img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-settings-coding-kiranshastry-lineal-kiranshastry.png"/>
					</div>
					<div class="option" id="top-left">
						<img src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/ffffff/external-interface-uxui-icongeek26-outline-icongeek26.png"/>
					</div>
					<div class="option" id="bottom-left">
						<img src="https://img.icons8.com/wired/64/ffffff/minecraft-grass-cube.png"/>
					</div>
					<span id="center2" class="hsdCenterKnob">

					</span>
				</nav>
				<!-- sync gears <img src="https://img.icons8.com/ios/100/ffffff/sync-settings.png"/> -->
				<div id="bg"></div>
				<div id="mempool">
					<span id="frontside" class="nextblock"></span>
					<span id="leftside" class="nextblock"></span>
				</div>
				<div id="hsd-wrapper">
					<div id="hsd-title" data-hsd="version">
						<!-- hsd title -->
					</div>
					<div id="hsd-info">
					<!--<h3 data-hsd="version" class="title"></h3>
					<div class="detail">
						<h4>
							Network
						</h4>
						<span data-hsd="network">-</span>
					</div>-->
					<div class="detail">
						<h4>
							peers
						</h4>
						<span data-hsd="peers">-</span>
					</div>
					<div class="detail">
						<h4>
							inbound
						</h4>
						<span data-hsd="inbound">-</span>
					</div>
					<div class="detail">
						<h4>
							avg ping
						</h4>
						<span data-hsd="avgping">-</span>
					</div>
					<div class="detail">
						<h4>
							height
						</h4>
						<span data-hsd="height">-</span>
					</div>
				</div>
				<span data-hsd="synced"></span>
				</div>
			</div>
			<a id="report-url" target="_blanc">IP REPORT</a>
		</div>
		<script type="module">
		// (() => {

			const storeID = {
				xApiKey: 'cool-xa-key',
				cacheReport: 'cool-inbound-report'
			};

			const connection = {};

			connection.pollingInterval = 12_000;

			const cache = {};
			
			const html = {};
			
			let logLevel = 'info';

			html.hsd = document.body.querySelector("#hsd");
			html.nextblock = { 
				front: document.body.querySelector("#frontside"), 
				left: document.body.querySelector("#leftside")
			};

			function coord(min) {
				function Rnd(max) {
					return Math.floor((Math.random() + 0 ) * (max - 120)); 
				};

				const x = Rnd(window.innerWidth);
				const y = Rnd(window.innerHeight);

				return ( x >= min && y >= min ? coord() : { x: x, y: y } ); 

			};

			function avg(arr) {
				return arr.reduce((a, b) => a + b, 0) / arr.length;
			}
			
			function addConnected(id,target,pos) {
				const peer = document.createElement("div");
				peer.setAttribute("data-peer", id);
				peer.classList = "peer connected";
				peer.style.top = pos.y+"px";
				peer.style.left = pos.x+"px";
				peer.style.zIndex = id+99;

				const conn = document.createElement("span");
				conn.setAttribute("data-connection", id);
				conn.classList = "peer connection";
				conn.style.animationDuration = ((id * 100) / 25)+'s';
				conn.style.clipPath = "polygon(30% 45%, 30.1% 45.1%, "+(pos.x+2)+"px "+(pos.y+2)+"px, "+(pos.x+3)+"px "+(pos.y+3)+"px)";
				
				target.appendChild(peer)
				target.appendChild(conn);
			};
			function removeConnected(id) {
				const peer = document.querySelector('[data-peer="'+id+'"]');
				peer.classList.remove('connected');
				const conn = document.querySelector('[data-connection="'+id+'"]');
				setTimeout(() => {
					hsd.removeChild(peer);
					hsd.removeChild(conn);
				}, 2500);
			}

			function peerGeo(peer,cb) {
				const whois = 'https://ipwho.is/'+peer.addr.split(":")[0];
				console.log(whois);
				fetch(whois,{
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
					}
				})
				.then(res => res.json())
				.then(data => {
					cb(data);
				})
				.catch(err => {
					console.log(err);
				});
			};

			function peerInfo(peer,target) {
				const ip = document.createElement("span");
				ip.classList = "peer ip";
				ip.innerHTML = '<span class="indiator foldup" style="background:'+(peer.inbound ? 'radial-gradient(rgba(55,253,54,.99),rgba(55,238,44,.75),rgba(38,38,44,.5))' : 'radial-gradient(rgba(255,63,54,.99),rgba(255,38,44,.75),rgba(38,38,44,.5))')+';"></span>' + ( connection.showIp ? '<span class="addr">'+peer.addr+'</span>' : '' )+' '+peer.subver;

				const inbound =document.createElement("span");
				inbound.classList = "peer inbound";
				inbound.innerHTML = '<span class="indiator folddown" style="background:'+(peer.inbound ? 'radial-gradient(rgba(55,253,54,.99),rgba(55,238,44,.75),rgba(38,38,44,.5))' : 'radial-gradient(rgba(255,63,54,.99),rgba(255,38,44,.75),rgba(38,38,44,.5))')+';"></span> inbound';

				const name = document.createElement("span");
				name.classList = "peer name";
				name.innerText = "name: "+peer.name||"";

				const ping = document.createElement("span");
				ping.classList = "peer name";
				ping.innerText = "pingtime: "+peer.pingtime+"ms";

				const startingheight = document.createElement("span");
				startingheight.classList = "peer startingheight";
				startingheight.innerText = "startingheight: "+peer.startingheight;

				const whitelisted = document.createElement("span");
				whitelisted.classList = "peer whitelisted";
				whitelisted.innerText = "whitelisted: "+peer.whitelisted;

				if ( window.innerWidth <= 560 ) target.style.whiteSpace = 'word-break';

				target.appendChild(ip);
				target.appendChild(inbound);
				if(peer.name!=='') target.appendChild(name);
				target.appendChild(startingheight);
				target.appendChild(ping);
				target.appendChild(whitelisted);
				const printGeo = data => {
					console.log(data);
					const geotag = document.createElement("div");
					geotag.classList = "peer geo-location";
					geotag.innerHTML = data.city+", "+data.country_code;
					target.appendChild(geotag);
				};
				// peerGeo(peer,printGeo);
			};

			function addTxHash(hash,index) {
				const tx = document.createElement("span");
				const t = ((index * 50) / 1_000);
				tx.setAttribute("data-tx", hash);
				tx.classList = "tx hash new";
				tx.style.animationDuration = t+'s';
				tx.innerHTML = hash;
				setTimeout(() => {
					tx.classList.remove("new");
					tx.style.animationDuration = 4.2+'s';//(index/10+300)+'s';
				}, (index * 50) + 750 );
				index % 2 === 0 ? html.nextblock.front.appendChild(tx) : html.nextblock.left.appendChild(tx);
			};
			function removeTxHash(hash) {
				const tx = document.body.querySelector('[data-tx="'+hash+'"]');
				if (tx) {
					tx.classList.add('mined');
					setTimeout(() => {
						tx.parentNode.removeChild(tx);
					}, rmvAnimateTime(300,4300));
				} else {
					console.log('Tx not found, txid: '+hash);
				};
			};
			function rmvAnimateTime(min,max) {
				return Math.floor((Math.random()*max)+min);
			};

			function clickHandler() {
				const isTagged = localStorage.getItem("hsd-syncing") || null;
				if (isTagged) localStorage.removeItem("hsd-syncing");
				fetch("/restart-service",{
					method: "GET",
					headers: {
						"x-api-key": connection.pk
					}
				})
				.catch(err => {
					console.log(err);
				});
			};
			
			function ipReport() {
				// const a = document.body.querySelector("#report-url");
				
				// cache.raw = window.localStorage.getItem(storeID.cacheReport) || null;
				
				// if (cache.raw) cache.report = JSON.parse(cache.raw);

				// if (cache.report) {
				// 	if ( Date.now() < cache.report.ts + 60 * 60 * 24 * 1000 ) {
				// 		a.href = cache.report.url;
				// 		return;
				// 	};
				// };

				getInboundReport();

			};

			function getBundledUpdate() {
				fetch("/update/bundled",{
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
						"x-api-key": connection.pk
					}
				})
				.then(res => res.json())
				.then(update => {
					handleInfo(update.info);
					handlePeerinfo(update.peers);
					handleMempool(update.mempool);
				})
				.catch(err => {
					console.log(err);
				});
			};

			function getInfo() {
				fetch("/info",{
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
						"x-api-key": connection.pk
					}
				})
				.then(res => res.json())
				.then(hsd => {
					handleIndo(hsd);
				})
				.catch(err => {
					console.log(err);
				});
			};

			function handleInfo(hsd) {
				const Cap = v => v.charAt(0).toUpperCase()+v.slice(1);
				const name = Cap(location.href.slice(8, location.href.indexOf(".")));
				document.querySelector('title').innerText = name+" v"+hsd.version;
				if (hsd.chain.height > connection.blockHeight) {
					// block got mined..
				}
				document.body.querySelector('[data-hsd="version"]').innerHTML = '<h1>HSD '+hsd.version+'</h1><h2>uptime '+parseInt(hsd.time.uptime / (60*60*24))+'days</h2>';//'hsd/'+hsd.version+'<span data-hsd="uptime"> uptime: '+parseInt(hsd.time.uptime / (60*60*24))+'days</span>';
				document.body.querySelector('[data-hsd="height"]').innerHTML = hsd.chain.height;
				const isSynced = hsd.chain.progress >= 1;
				if (!isSynced) {
					localStorage.setItem("hsd-syncing", true);
					document.body.querySelector('[data-hsd="synced"]').innerHTML = "SYNCING..."+parseInt(hsd.chain.progress*10_000)/100+"%";
				}
				else if(localStorage.getItem("hsd-syncing")&&isSynced) {
					document.body.querySelector('[data-hsd="synced"]').innerHTML = '<input id="hsd-restart-sh" type="button" value="RESTART HSD" />';
				};
				connection.blockHeight = hsd.chain.height;
			};

			function getInboundReport() {
				fetch("/generate-inbound-report",{
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
						"x-api-key": connection.pk
					}
				})
				.then(res => res.json())
				.then(data => {
					document.body.querySelector("#report-url").href = data.url;
				})
				.catch(err => {
					console.log(err);
				});
			}

			function getPeerinfo() {
				fetch("/info/peers",{
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
						"x-api-key": connection.pk
					}
				})
				.then(res => res.json())
				.then(peers => {
					handlePeerinfo(peers);
				})
				.catch(err => {
					console.log(err);
				});

			};

			function handlePeerinfo(peers) {
				connection.peers.new = peers.map(p => p.id).filter(n => !connection.peers.connected.includes(n));
				connection.peers.disconnected = connection.peers.connected.filter(n => !peers.map(p => p.id).includes(n));
				connection.peers.connected = peers.map(p => p.id);
				connection.peers.count = peers.length;
				connection.peers.inbound = peers.filter(p => p.inbound).length;
				connection.peers.pingtime = peers.filter(p => p.pingtime > 0).map(p => p.pingtime);
				
				document.body.querySelector('[data-hsd="peers"]').innerHTML = connection.peers.count;
				document.body.querySelector('[data-hsd="inbound"]').innerHTML = connection.peers.inbound;
				document.body.querySelector('[data-hsd="avgping"]').innerHTML = parseInt(avg(connection.peers.pingtime)*100)/100+'ms';

				connection.peers.disconnected.forEach((id,index) => {
					const peer = document.querySelector('[data-peer="'+id+'"]');
					peer.classList.remove('connected');
					const conn = document.querySelector('[data-connection="'+id+'"]');
					setTimeout(() => {
						hsd.removeChild(peer);
						hsd.removeChild(conn);
					}, 2500);
				});

				connection.peers.new.forEach((id,index) => {
					addConnected(id,html.hsd,coord(125));
				});

				peers.forEach(peer => {
					const x = document.querySelector('[data-peer="'+peer.id+'"]');
					x.innerHTML = "";
					peerInfo(peer, x);
				});
			};

			function getMempoolTx() {
				fetch("/mempool/tx/hashes",{
					method: "GET",
					headers: {
						"Content-Type" : "application/json",
						"x-api-key": connection.pk
					}
				})
				.then(res => res.json())
				.then(txHashes => {
					handleMempool(txHashes);
				})
				.catch(err => {
					console.log(err);
				});

			};

			function handleMempool(txHashes) {
				connection.mempool.NewTxHashes = txHashes.filter(tx => !connection.mempool.TxHashes.includes(tx));
				connection.mempool.MinedTxHashes = testMining?txHashes:connection.mempool.TxHashes.filter(tx => !txHashes.includes(tx));
				connection.mempool.TxHashes = testMining?[]:txHashes;
				if (testMining) testMining = false;
				console.log(logLevel!=='debug'?connection:'polling.. '+Date.now());

				connection.mempool.MinedTxHashes.forEach(tx => {
					removeTxHash(tx);
				});
				connection.mempool.NewTxHashes.forEach((tx,i) => {
					addTxHash(tx,i);
				});
			};

			document.addEventListener("DOMContentLoaded", async e => {
				document.querySelector("#hsd-menu").addEventListener("click", e => {
					const sound = new Audio("https://mauricestolk.nl/api/ui-sci-fi-sound.wav");
					sound.play();
				}, false);


				connection.log = {};
				connection.peers = {};
				connection.peers.connected = [];
				connection.mempool = {};
				connection.mempool.TxHashes = [];
				
				let k = window.localStorage.getItem(storeID.xApiKey) || null;

				const params = window.location.search.replace("?","").split("&");

				params.forEach(p => {
					const param = p.split("=");
					if ( param[0] === "x-api-key" ) {
						k = param[1];	
					}
				});

				function update() {
					getBundledUpdate();
				}

				if (k) {
					connection.pk = k;

					ipReport();

					update();
					
					connection.intRefId = setInterval(() => {
						update();
						// clearInterval(connection.intRefId);
					}, connection.pollingInterval );

					connection.intRefId;

				} else {
					let newApiKey = window.prompt("Please enter the api key", "");
					window.localStorage.setItem(storeID.xApiKey, newApiKey);
					location.location.reload();
				};

				document.querySelector('[data-hsd="synced"]').addEventListener("click", clickHandler, true);

			}, false );

		// })();
		</script>
	</body>
	</html>
`;

const fs = require('fs');

require('dotenv').config();

// Auth

const apiKey = process.env.UI_API_KEY;

const allowedOrigin = process.env.UI_WHITE_LISTED;

// App

const PORT = 443;

const fastify = require("fastify")({ 
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

// Plugins

fastify.register(require('fastify-favicon'));

// fastify.register(require("fastify-cors"), {
// 	origin: "*",
// 	methods: ["GET"]
// });

// fastify.register(require("fastify-compress"), {
// 	global: true,
// 	removeContentLengthHeader: false
// });

// Routes

fastify.register(require("./routes/v1"));

// App

fastify.get('/', (req, reply) => {
	reply.type('text/html');

	reply.send(html);

});

fastify.addHook('onRequest', async (req, reply) => {
	if (req.url!=="/favicon.ico") {
		const key = req.headers['x-api-key'] || req.query['x-api-key']
		if ( key !== apiKey ) reply.status( 400 ).send({
			statusCode: 400,
			error: "AUTH",
			message: 'No valid api key was provided',
			count: 0,
			timestamp: new Date(),
		});
	};
});

const init = async () => {
	try {
		await fastify.listen( PORT, '0.0.0.0');
	} 
	catch(err) {
		fastify.log.error(err);
		process.exit(1);
	};
};

init();