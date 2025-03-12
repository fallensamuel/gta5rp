exports = (menu) => {
	const { requestAnimDict } = require("talrasha/talrasha_module/talrasha_helper/talrasha_anim_helper.js");
	const instructionButtonsDrawler = require("talrasha/talrasha_module/talrasha_helper/talrasha_instruction_button_drawler.js");
	const timerBarPool = require("talrasha/talrasha_module/talrasha_timebar/index.js");
	const TextTimerBar = require("talrasha/talrasha_module/talrasha_timebar/classes/TextTimerBar");


	class Casino {
		constructor(){ 
			
			mp.game.audio.requestScriptAudioBank("DLC_VINEWOOD/CASINO_GENERAL",false);
			//mp.game.audio.requestScriptAudioBank("DLC_VINEWOOD/CASINO_SLOT_MACHINES_01",false);
			//mp.game.audio.requestScriptAudioBank("DLC_VINEWOOD/CASINO_SLOT_MACHINES_02",false);
			//mp.game.audio.requestScriptAudioBank("DLC_VINEWOOD/CASINO_SLOT_MACHINES_03",false);
			
			
			this.lpCasinoTable = null;
			this.casinoTableToJoin = null;
			this.casinoSeatToJoin = null;
			this.interactingWithTable = null;
			this.rouletteCamera = null;
			this.canDoBets = false;
			this.betObject = null;
			this.closestChipSpot = null;
			this.localPlayer = mp.players.local;
			
			mp.tablesPos = {};

			mp.game.streaming.requestIpl("vw_casino_main");

			this.pedModelVariations =
			{
				'S_M_Y_Casino_01': [
					[ 0, 2, 2, 0],
					[ 1, 1, 0, 0],
					[ 2, 4, 0, 0],
					[ 3, 0, 3, 0],
					[ 4, 0, 0, 0],
					[ 6, 1, 0, 0],
					[ 7, 2, 0, 0],
					[ 8, 1, 0, 0],
					[ 10, 1, 0, 0],
					[ 11, 1, 0, 0]
				],
				'S_F_Y_Casino_01': [
					[ 0, 2, 0, 0],
					[ 1, 0, 0, 0],
					[ 2, 2, 0, 0],
					[ 3, 2, 3, 0],
					[ 4, 0, 0, 0],
					[ 6, 0, 0, 0],
					[ 7, 0, 0, 0],
					[ 8, 2, 0, 0],
					[ 10, 0, 0, 0],
					[ 11, 0, 0, 0]
				],
				'U_F_M_CasinoCash_01': [
					[ 0, 2, 0, 0],
					[ 1, 0, 0, 0],
					[ 2, 2, 0, 0],
					[ 3, 2, 3, 0],
					[ 4, 0, 0, 0],
					[ 6, 0, 0, 0],
					[ 7, 0, 0, 0],
					[ 8, 2, 0, 0],
					[ 10, 0, 0, 0],
					[ 11, 0, 0, 0]
				],
				'U_F_M_CasinoShop_01': [
					[ 0, 2, 0, 0],
					[ 1, 0, 0, 0],
					[ 2, 2, 0, 0],
					[ 3, 2, 3, 0],
					[ 4, 0, 0, 0],
					[ 6, 0, 0, 0],
					[ 7, 0, 0, 0],
					[ 8, 2, 0, 0],
					[ 10, 0, 0, 0],
					[ 11, 0, 0, 0]
				]
			}
			
			this.rouletteData = {};
			this.animInfo = null;
			
			this.tableMarkers = [];
			this.tableMarkersOffsets =
			{
				"0": [-0.137451171875, -0.146942138671875, 0.9449996948242188],
				"00": [-0.1387939453125, 0.10546875, 0.9449996948242188],
				"1": [-0.0560302734375, -0.1898193359375, 0.9449996948242188],
				"2": [-0.0567626953125, -0.024017333984375, 0.9449996948242188],
				"3": [-0.056884765625, 0.141632080078125, 0.9449996948242188],
				"4": [0.02392578125, -0.187347412109375, 0.9449996948242188],
				"5": [0.0240478515625, -0.02471923828125, 0.9449996948242188],
				"6": [0.02392578125, 0.1422119140625, 0.9449996948242188],
				"7": [0.1038818359375, -0.18902587890625, 0.9449996948242188],
				"8": [0.1044921875, -0.023834228515625, 0.9449996948242188],
				"9": [0.10546875, 0.1419677734375, 0.9449996948242188],
				"10": [0.18701171875, -0.188385009765625, 0.9449996948242188],
				"11": [0.18603515625, -0.0238037109375, 0.9449996948242188],
				"12": [0.1851806640625, 0.143157958984375, 0.9449996948242188],
				"13": [0.2677001953125, -0.18780517578125, 0.9449996948242188],
				"14": [0.26806640625, -0.02301025390625, 0.9449996948242188],
				"15": [0.26611328125, 0.143310546875, 0.9449996948242188],
				"16": [0.3497314453125, -0.18829345703125, 0.9449996948242188],
				"17": [0.349609375, -0.023101806640625, 0.9449996948242188],
				"18": [0.3497314453125, 0.142242431640625, 0.9449996948242188],
				"19": [0.4307861328125, -0.18829345703125, 0.9449996948242188],
				"20": [0.4312744140625, -0.02392578125, 0.9449996948242188],
				"21": [0.431884765625, 0.1416015625, 0.9449996948242188],
				"22": [0.51220703125, -0.188873291015625, 0.9449996948242188],
				"23": [0.5123291015625, -0.023773193359375, 0.9449996948242188],
				"24": [0.511962890625, 0.14215087890625, 0.9449996948242188],
				"25": [0.5931396484375, -0.18890380859375, 0.9449996948242188],
				"26": [0.59375, -0.023651123046875, 0.9449996948242188],
				"27": [0.59375, 0.14080810546875, 0.9449996948242188],
				"28": [0.67529296875, -0.189849853515625, 0.9449996948242188],
				"29": [0.6751708984375, -0.02337646484375, 0.9449996948242188],
				"30": [0.674560546875, 0.141845703125, 0.9449996948242188],
				"31": [0.756591796875, -0.18798828125, 0.9449996948242188],
				"32": [0.7547607421875, -0.0234375, 0.9449996948242188],
				"33": [0.7554931640625, 0.14263916015625, 0.9449996948242188],
				"34": [0.836669921875, -0.188323974609375, 0.9449996948242188],
				"35": [0.8365478515625, -0.0244140625, 0.9449996948242188],
				"36": [0.8359375, 0.14276123046875, 0.9449996948242188]
			};

			this.tableChipsOffsets =
			[
				[-0.154541015625, -0.150604248046875, 0.9449996948242188, ["0"]],
				[-0.1561279296875, 0.11505126953125, 0.9449996948242188, ["00"]],
				[-0.059326171875, -0.18701171875, 0.9449996948242188, ["1"]],
				[-0.058349609375, -0.019378662109375, 0.9449996948242188, ["2"]],
				[-0.0587158203125, 0.142059326171875, 0.9449996948242188, ["3"]],
				[0.02294921875, -0.1920166015625, 0.9449996948242188, ["4"]],
				[0.023193359375, -0.01947021484375, 0.9449996948242188, ["5"]],
				[0.024658203125, 0.147369384765625, 0.9449996948242188, ["6"]],
				[0.105224609375, -0.1876220703125, 0.9449996948242188, ["7"]],
				[0.1055908203125, -0.028472900390625, 0.9449996948242188, ["8"]],
				[0.10400390625, 0.147430419921875, 0.9449996948242188, ["9"]],
				[0.187744140625, -0.191802978515625, 0.9449996948242188, ["10"]],
				[0.1866455078125, -0.02667236328125, 0.9449996948242188, ["11"]],
				[0.1842041015625, 0.145965576171875, 0.9449996948242188, ["12"]],
				[0.2696533203125, -0.182464599609375, 0.9449996948242188, ["13"]],
				[0.265869140625, -0.027862548828125, 0.9449996948242188, ["14"]],
				[0.2667236328125, 0.138946533203125, 0.9449996948242188, ["15"]],
				[0.35009765625, -0.186126708984375, 0.9449996948242188, ["16"]],
				[0.348876953125, -0.027740478515625, 0.9449996948242188, ["17"]],
				[0.3497314453125, 0.14715576171875, 0.9449996948242188, ["18"]],
				[0.43212890625, -0.17864990234375, 0.9449996948242188, ["19"]],
				[0.4337158203125, -0.02508544921875, 0.9449996948242188, ["20"]],
				[0.430419921875, 0.138336181640625, 0.9449996948242188, ["21"]],
				[0.51416015625, -0.18603515625, 0.9449996948242188, ["22"]],
				[0.5135498046875, -0.02301025390625, 0.9449996948242188, ["23"]],
				[0.5146484375, 0.14239501953125, 0.9449996948242188, ["24"]],
				[0.59130859375, -0.192413330078125, 0.9449996948242188, ["25"]],
				[0.596923828125, -0.022216796875, 0.9449996948242188, ["26"]],
				[0.5924072265625, 0.14385986328125, 0.9449996948242188, ["27"]],
				[0.6749267578125, -0.187286376953125, 0.9449996948242188, ["28"]],
				[0.67431640625, -0.0262451171875, 0.9449996948242188, ["29"]],
				[0.6756591796875, 0.140594482421875, 0.9449996948242188, ["30"]],
				[0.7542724609375, -0.19415283203125, 0.9449996948242188, ["31"]],
				[0.7542724609375, -0.01898193359375, 0.9449996948242188, ["32"]],
				[0.75439453125, 0.1448974609375, 0.9449996948242188, ["33"]],
				[0.8392333984375, -0.18951416015625, 0.9449996948242188, ["34"]],
				[0.837646484375, -0.023468017578125, 0.9449996948242188, ["35"]],
				[0.8380126953125, 0.14227294921875, 0.9449996948242188, ["36"]],
				/*[-0.1368408203125, -0.02099609375, 0.9449996948242188, ["0","00"]],
				[-0.055419921875, -0.105804443359375, 0.9449996948242188, ["1","2"]],
				[-0.0567626953125, 0.058624267578125, 0.9449996948242188, ["2","3"]],
				[0.02587890625, -0.10498046875, 0.9449996948242188, ["4","5"]],
				[0.0244140625, 0.058837890625, 0.9449996948242188, ["5","6"]],
				[0.100341796875, -0.10382080078125, 0.9449996948242188, ["7","8"]],
				[0.1064453125, 0.06011962890625, 0.9449996948242188, ["8","9"]],
				[0.19189453125, -0.1060791015625, 0.9449996948242188, ["10","11"]],
				[0.1856689453125, 0.05438232421875, 0.9449996948242188, ["11","12"]],
				[0.27099609375, -0.10870361328125, 0.9449996948242188, ["13","14"]],
				[0.2667236328125, 0.058502197265625, 0.9449996948242188, ["14","15"]],
				[0.3463134765625, -0.107696533203125, 0.9449996948242188, ["16","17"]],
				[0.34814453125, 0.0556640625, 0.9449996948242188, ["17","18"]],
				[0.42822265625, -0.109130859375, 0.9449996948242188, ["19","20"]],
				[0.4302978515625, 0.0550537109375, 0.9449996948242188, ["20","21"]],
				[0.511474609375, -0.107421875, 0.9449996948242188, ["22","23"]],
				[0.512451171875, 0.0614013671875, 0.9449996948242188, ["23","24"]],
				[0.5980224609375, -0.107147216796875, 0.9449996948242188, ["25","26"]],
				[0.596435546875, 0.0574951171875, 0.9449996948242188, ["26","27"]],
				[0.673828125, -0.106903076171875, 0.9449996948242188, ["28","29"]],
				[0.6751708984375, 0.058685302734375, 0.9449996948242188, ["29","30"]],
				[0.7532958984375, -0.1102294921875, 0.9449996948242188, ["31","32"]],
				[0.750244140625, 0.06103515625, 0.9449996948242188, ["32","33"]],
				[0.834716796875, -0.108978271484375, 0.9449996948242188, ["34","35"]],
				[0.836181640625, 0.05828857421875, 0.9449996948242188, ["35","36"]],
				[-0.0167236328125, -0.187042236328125, 0.9449996948242188, ["1","4"]],
				[-0.0167236328125, -0.02154541015625, 0.9449996948242188, ["2","5"]],
				[-0.0164794921875, 0.140350341796875, 0.9449996948242188, ["3","6"]],
				[0.064453125, -0.1865234375, 0.9449996948242188, ["4","7"]],
				[0.06494140625, -0.01727294921875, 0.9449996948242188, ["5","8"]],
				[0.068603515625, 0.13873291015625, 0.9449996948242188, ["6","9"]],
				[0.144287109375, -0.184173583984375, 0.9449996948242188, ["7","10"]],
				[0.14501953125, -0.024139404296875, 0.9449996948242188, ["8","11"]],
				[0.14501953125, 0.136993408203125, 0.9449996948242188, ["9","12"]],
				[0.2291259765625, -0.18670654296875, 0.9449996948242188, ["10","13"]],
				[0.227783203125, -0.0242919921875, 0.9449996948242188, ["11","14"]],
				[0.2286376953125, 0.14398193359375, 0.9449996948242188, ["12","15"]],
				[0.308349609375, -0.18792724609375, 0.9449996948242188, ["13","16"]],
				[0.308837890625, -0.02374267578125, 0.9449996948242188, ["14","17"]],
				[0.3099365234375, 0.14410400390625, 0.9449996948242188, ["15","18"]],
				[0.39111328125, -0.192230224609375, 0.9449996948242188, ["16","19"]],
				[0.390869140625, -0.0189208984375, 0.9449996948242188, ["17","20"]],
				[0.39111328125, 0.146514892578125, 0.9449996948242188, ["18","21"]],
				[0.470947265625, -0.188690185546875, 0.9449996948242188, ["19","22"]],
				[0.4705810546875, -0.0205078125, 0.9449996948242188, ["20","23"]],
				[0.4725341796875, 0.140167236328125, 0.9449996948242188, ["21","24"]],
				[0.5491943359375, -0.189666748046875, 0.9449996948242188, ["22","25"]],
				[0.548095703125, -0.022552490234375, 0.9449996948242188, ["23","26"]],
				[0.553955078125, 0.1446533203125, 0.9449996948242188, ["24","27"]],
				[0.6324462890625, -0.191131591796875, 0.9449996948242188, ["25","28"]],
				[0.635498046875, -0.0224609375, 0.9449996948242188, ["26","29"]],
				[0.6392822265625, 0.139190673828125, 0.9449996948242188, ["27","30"]],
				[0.71533203125, -0.187042236328125, 0.9449996948242188, ["28","31"]],
				[0.7181396484375, -0.02447509765625, 0.9449996948242188, ["29","32"]],
				[0.7152099609375, 0.138153076171875, 0.9449996948242188, ["30","33"]],
				[0.7969970703125, -0.1904296875, 0.9449996948242188, ["31","34"]],
				[0.7955322265625, -0.024871826171875, 0.9449996948242188, ["32","35"]],
				[0.7960205078125, 0.137664794921875, 0.9449996948242188, ["33","36"]],
				[-0.0560302734375, -0.271240234375, 0.9449996948242188, ["1","2","3"]],
				[0.024658203125, -0.271392822265625, 0.9449996948242188, ["4","5","6"]],
				[0.1051025390625, -0.272125244140625, 0.9449996948242188, ["7","8","9"]],
				[0.1898193359375, -0.27001953125, 0.9449996948242188, ["10","11","12"]],
				[0.2696533203125, -0.271697998046875, 0.9449996948242188, ["13","14","15"]],
				[0.351318359375, -0.268096923828125, 0.9449996948242188, ["16","17","18"]],
				[0.4287109375, -0.269561767578125, 0.9449996948242188, ["19","20","21"]],
				[0.5098876953125, -0.2716064453125, 0.9449996948242188, ["22","23","24"]],
				[0.5960693359375, -0.271148681640625, 0.9449996948242188, ["25","26","27"]],
				[0.67724609375, -0.268524169921875, 0.9449996948242188, ["28","29","30"]],
				[0.7523193359375, -0.27227783203125, 0.9449996948242188, ["31","32","33"]],
				[0.8382568359375, -0.272125244140625, 0.9449996948242188, ["34","35","36"]],
				[-0.017333984375, -0.106170654296875, 0.9449996948242188, ["1","2","4","5"]],
				[-0.0162353515625, 0.060882568359375, 0.9449996948242188, ["2","3","5","6"]],
				[0.06591796875, -0.110107421875, 0.9449996948242188, ["4","5","7","8"]],
				[0.0653076171875, 0.060028076171875, 0.9449996948242188, ["5","6","8","9"]],
				[0.146484375, -0.10888671875, 0.9449996948242188, ["7","8","10","11"]],
				[0.1451416015625, 0.057159423828125, 0.9449996948242188, ["8","9","11","12"]],
				[0.22705078125, -0.1092529296875, 0.9449996948242188, ["10","11","13","14"]],
				[0.22802734375, 0.059356689453125, 0.9449996948242188, ["11","12","14","15"]],
				[0.307373046875, -0.1043701171875, 0.9449996948242188, ["13","14","16","17"]],
				[0.309814453125, 0.05584716796875, 0.9449996948242188, ["14","15","17","18"]],
				[0.3919677734375, -0.111083984375, 0.9449996948242188, ["16","17","19","20"]],
				[0.3924560546875, 0.0596923828125, 0.9449996948242188, ["17","18","20","21"]],
				[0.471923828125, -0.1044921875, 0.9449996948242188, ["19","20","22","23"]],
				[0.4698486328125, 0.060028076171875, 0.9449996948242188, ["20","21","23","24"]],
				[0.5531005859375, -0.106170654296875, 0.9449996948242188, ["22","23","25","26"]],
				[0.5546875, 0.059417724609375, 0.9449996948242188, ["23","24","26","27"]],
				[0.633544921875, -0.101531982421875, 0.9449996948242188, ["25","26","28","29"]],
				[0.6337890625, 0.0579833984375, 0.9449996948242188, ["26","27","29","30"]],
				[0.7156982421875, -0.106292724609375, 0.9449996948242188, ["28","29","31","32"]],
				[0.7158203125, 0.0604248046875, 0.9449996948242188, ["29","30","32","33"]],
				[0.7947998046875, -0.108642578125, 0.9449996948242188, ["31","32","34","35"]],
				[0.7952880859375, 0.059051513671875, 0.9449996948242188, ["32","33","35","36"]],
				[-0.099609375, -0.2711181640625, 0.9449996948242188, ["0","00","1","2","3"]],
				[-0.0147705078125, -0.27154541015625, 0.9449996948242188, ["1","2","3","4","5","6"]],
				[0.064697265625, -0.270263671875, 0.9449996948242188, ["4","5","6","7","8","9"]],
				[0.144775390625, -0.271209716796875, 0.9449996948242188, ["7","8","9","10","11","12"]],
				[0.226806640625, -0.27142333984375, 0.9449996948242188, ["10","11","12","13","14","15"]],
				[0.306396484375, -0.27142333984375, 0.9449996948242188, ["13","14","15","16","17","18"]],
				[0.3895263671875, -0.27099609375, 0.9449996948242188, ["16","17","18","19","20","21"]],
				[0.468017578125, -0.275238037109375, 0.9449996948242188, ["19","20","21","22","23","24"]],
				[0.5509033203125, -0.2738037109375, 0.9449996948242188, ["22","23","24","25","26","27"]],
				[0.6336669921875, -0.27386474609375, 0.9449996948242188, ["25","26","27","28","29","30"]],
				[0.7144775390625, -0.272186279296875, 0.9449996948242188, ["28","29","30","31","32","33"]],
				[0.7935791015625, -0.272918701171875, 0.9449996948242188, ["31","32","33","34","35","36"]],*/
				[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], //1st12
				[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],//2nd12
				[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],//3rd12
				[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],//2to1
				[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],//2to1
				[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],//2to1
				[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],//1-18
				[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]], //even
				[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],//red
				[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],//black
				[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],//odd
				[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]]//19-36
			];
			
			
			mp.events.add('casino::create_tables', (info) => {
				this.Init(info)
			});
			
			mp.events.add('casino::add_tables', (info) => {
				this.AddTables(info)
			});
			

			mp.events.add("initRoulette", async (jsonString) => {
				this.animInfo = JSON.parse(jsonString);
				
				await requestAnimDict(this.animInfo.tableLib);
				await requestAnimDict(this.animInfo.dealerLib);
				await requestAnimDict(this.animInfo.dealerLib+"_female");
				instructionButtonsDrawler.init();
				
				
				this.renderEvent = mp.events.add("render", this.rouletteRender);
				//this.renderStreamInEvent = mp.events.add('entityStreamIn', this.entityStreamIn);
			});
			
			mp.events.add("disposeRoulette",() => {
				if (this.renderEvent) mp.events.remove("render", this.rouletteRender), delete this.renderEvent;
				if (this.renderStreamInEvent) mp.events.remove("entityStreamIn", this.entityStreamIn), delete this.renderStreamInEvent;
				if (instructionButtonsDrawler.isInited()) instructionButtonsDrawler.dispose();
			});
			
			mp.events.add("casino::delete_table",(index) => {
				this.rouletteData[index].table.destroy()
				this.rouletteData[index].ball.destroy()
				this.rouletteData[index].ped.destroy()
				this.rouletteData[index].colshape.destroy()
				delete this.rouletteData[index]
			});
			
			mp.events.add("cancelInteractingWithTable", () => {
				mp.casino = false
				if (this.timebarInterval) {
					clearInterval(this.timebarInterval);
					this.timebarInterval = undefined;
				}
				menu.execute(`lastbets.show(false)`);
				//menu.execute(`casinohud.hide(false)`);
				instructionButtonsDrawler.setActive(false);
				timerBarPool.clear();
				this.lpCasinoTable = null;
				this.localPlayer.isFreeze = false;
				if(this.rouletteCamera != null || this.drumCamera != null) this.destroyRouletteCamera();
				if(this.canDoBets) this.canDoBets = false;
				this.interactingWithTable = null;
				if (this.chipColor) this.chipColor = undefined;
				this.currentBet = 0;
				this.allBet = 0;
			});
			
			mp.events.add("updateFullBet", (fullBet) => {
				this.allBet = fullBet;
				this.mpmoney = mp.clientStorage.money;
				this.allBetText.text = `${this.allBet}`
				this.allMoney.text = `${abc2(this.mpmoney)}`
			});

			function abc2(n) {
				n += "";
				n = new Array(4 - n.length % 3).join("U") + n;
				return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
			}
		
			mp.events.add("playerSitAtCasinoTable", (tableID, allowBets, time, color, lastBets) => {
				mp.casino = true
				this.chipColor = color;
				this.lpCasinoTable = this.casinoTableToJoin;
				this.localPlayer.isFreeze = true;
				this.canDoBets = allowBets;
				this.currentBet = 0;
				this.allBet = 0;
				this.mpmoney = mp.clientStorage.money;
				mp.events.call("prompt.hide");
				menu.execute(`lastbets.show(true, '${lastBets}')`);
				//menu.execute(`casinohud.show(true)`);
				this.timebar = new TextTimerBar("До начала", `${time}`);
				//this.timebar = new TextTimerBar("Осталось ставок", `${canDoBets}`);
				this.currentBetText = new TextTimerBar("Ставка", `${this.currentBet}`);
				this.allBetText = new TextTimerBar("Вы поставили", `${this.allBet}`);
				this.allMoney = new TextTimerBar("Баланс", `${abc2(this.mpmoney)}`);
				timerBarPool.add(this.allBetText, this.currentBetText, this.timebar, this.allMoney);
				this.startTimebar(true, time);
				this.rightAxisX = 0;
				this.rightAxisY = 0;
				this.startRouletteCamera()
				
				
				const mainInstructionButtons = [
					{ control: 38, customlabel: "Выход" },
					/*{ control: 49, customlabel: "Камера" },*/
					{ control: 175, customlabel: "Увеличить ставку" },
					{ control: 174, customlabel: "Уменьшить ставку" },
					/*{ control: 25, customlabel: "Убрать ставку" },*/
					{ control: 24, customlabel: "Сделать ставку" }
				];
				
				instructionButtonsDrawler.setButtons(...mainInstructionButtons);
				instructionButtonsDrawler.setActive(true);
			});

			mp.events.add("spinRouletteWheel", (table, needSpins, endTable) => {
				if (parseInt(this.lpCasinoTable) === parseInt(table)) {
					this.canDoBets = false;
					if (this.timebarInterval) this.startTimebar(false, 0);
				}
				
				//setTimeout(() => {
				//this.rouletteData[table].table.playAnim(this.animInfo.tableMain, this.animInfo.tableLib, 1000.0, false, true, true, 0, 131072); // loop, freezeLastFrame, ?
				//}, 2800)
				this.rouletteData[table].ball.position = new mp.Vector3(this.getBallXY(true, table), this.getBallXY(false, table), mp.tablesPos[table].z+1.0715);
				this.rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, mp.tablesPos[table].h + this.animInfo.ballRot);
				this.rouletteData[table].ball.playAnim(this.animInfo.ballStart, this.animInfo.tableLib, 1000.0, false, true, false, 0, this.animInfo.speed); // loop, freezeLastFrame, ?
				
				setTimeout(() => {
				this.rouletteData[table].table.playAnim(`exit_${casino.rouletteData[table].endTable}_wheel`, this.animInfo.tableLib, 1000.0, false, true, true, 0, 131072);
				this.rouletteData[table].ball.position = new mp.Vector3(this.getBallXY(true, table), this.getBallXY(false, table), mp.tablesPos[table].z+1.0715);
				this.rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, mp.tablesPos[table].h + this.animInfo.ballRot);
				this.rouletteData[table].ball.playAnim(`exit_${casino.rouletteData[table].endTable}_ball`, this.animInfo.tableLib, 1000.0, false, true, true, 0, this.animInfo.speed);
				}, 2800)
				
				this.rouletteData[table].spins = 0;
				this.rouletteData[table].lastSpinTime = 0;
				this.rouletteData[table].needSpins = needSpins;
				this.rouletteData[table].endTable = endTable;
				
				
				/*setTimeout(() => {
					this.sound = mp.game.invoke('0x430386FE9BF80B45') // getSoundId
					mp.game.audio.playSoundFromEntity(this.sound, "DLC_VW_ROULETTE_BALL_LOOP", this.rouletteData[table].ball.handle, "dlc_vw_table_games_sounds", false, 0);
				}, 3500);*/ // Звук шарика
				
				if(this.rouletteData[table].ped.model == mp.game.joaat('S_F_Y_Casino_01')) this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib, "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
				else this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib+"_female", "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
				
				setTimeout(() => {
						if(this.rouletteData[table].ped.model == mp.game.joaat('S_F_Y_Casino_01')) this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
						else this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
				}, 8000);
			});
			
			mp.events.add("clearRouletteTable", (table, time, lastBets) => {
				if (parseInt(this.lpCasinoTable) === parseInt(table)) {
					menu.execute(`lastbets.update('${lastBets}')`);
					this.allBet = 0;
					this.allBetText.text = `${this.allBet}`
					setTimeout(() => {
					this.mpmoney = mp.clientStorage.money;
					this.allMoney.text = `${abc2(this.mpmoney)}`
					}, 2000);
					this.canDoBets = true;
					this.startTimebar(true, time)
				}
				
				if(this.rouletteData[table].ped.model == mp.game.joaat('S_F_Y_Casino_01')) this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib, "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
				else this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib+"_female", "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
				
				setTimeout(() => {
						if(this.rouletteData[table].ped.model == mp.game.joaat('S_F_Y_Casino_01')) this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
						else this.rouletteData[table].ped.taskPlayAnim(this.animInfo.dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
				}, 2000);
			});
			
			mp.keys.bind(0x45, true, () =>  { //E
				if (mp.bindlocker({casino: true})) return;
				
				if(this.interactingWithTable != null) return false;
				
				if(this.lpCasinoTable != null)
				{
					mp.events.callRemote("leaveCasinoSeat");
					mp.game.ui.displayRadar(true);
					mp.events.call("hudControl.enable", true);
				}
				else
				{
					if(this.casinoTableToJoin == null) return false;
					mp.events.callRemote("occupyCasinoSeat", this.casinoTableToJoin);
					mp.game.ui.displayRadar(false);
					mp.events.call("hudControl.enable", false);
					
				}	
			});

			mp.events.add('render', () => 
			{				
				if(this.canDoBets && this.rouletteCamera && this.betObject == null)
				{
					this.betObject = mp.objects.new(mp.game.joaat(this.chipColor), new mp.Vector3(mp.tablesPos[this.lpCasinoTable].x, mp.tablesPos[this.lpCasinoTable].y, mp.tablesPos[this.lpCasinoTable].z+0.95));
				}
				
				if(this.betObject != null)
				{
					if(!this.canDoBets || this.rouletteCamera == null)
					{
						this.betObject.destroy();
						this.betObject = null;
						this.clearTableMarkers();
					}
				}
				
				if(this.rouletteCamera != null && this.lpCasinoTable != null)
				{
					if(this.betObject != null && this.rouletteCamera !== 'temp') {
						if (this.input) {
							if (!mp.gui.cursor.visible) this.input = false;
							
							var num = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105]
							var numpad = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
							
							if (mp.keys.isDown(8)) {
								if (!this.keyTimeout) {
									var newNum = parseInt(`${this.currentBet.toString().slice(0, -1)}`);
									if (isNaN(newNum)) newNum = 0;
									this.currentBet = newNum;
									this.currentBetText.text = `${this.currentBet}`;
									this.keyTimeout = setTimeout(() => {
										this.keyTimeout = false
									}, 100);
								}
							}
							
							
							for(var i=0; i < num.length; i++) {
								if (mp.keys.isDown(num[i])) {
									if (!this.keyTimeout) {
										if (this.currentBet == 0) {
											this.currentBet = parseInt(`${i}`)
										}
										else {
											this.currentBet = parseInt(`${this.currentBet}${i}`)
										}
										this.currentBetText.text = `${this.currentBet}`
										this.keyTimeout = setTimeout(() => {
											this.keyTimeout = false
										}, 200);
									}
								}
							}
							for(var i=0; i < numpad.length; i++) {
								if (mp.keys.isDown(numpad[i])) {
									if (!this.keyTimeout) {
										if (this.currentBet == 0) {
											this.currentBet = parseInt(`${i}`)
										}
										else {
											this.currentBet = parseInt(`${this.currentBet}${i}`)
										}
										this.currentBetText.text = `${this.currentBet}`
										this.keyTimeout = setTimeout(() => {
											this.keyTimeout = false
										}, 200);
									}
								}
							}
						
						}
						/*if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // ПКМ
						{
							if(this.closestChipSpot != null) mp.events.callRemote("removeRouletteBet", this.closestChipSpot);
						}*/
						
						if(mp.game.controls.isDisabledControlJustReleased(0, 24)) // ЛКМ
						{
							if (mp.gui.cursor.visible && (mp.gui.cursor.position[0] < 1895 && mp.gui.cursor.position[0] > 1619) && (mp.gui.cursor.position[1] < 959 && mp.gui.cursor.position[1] > 923)) {
								this.input = true
							}
							else if (mp.gui.cursor.visible) {
								this.input = false
							}
							if (this.currentBet && !this.input && !mp.gui.cursor.visible) {
								var coords = this.betObject.getCoords(false);
								if(this.closestChipSpot != null) mp.events.callRemote("makeRouletteBet", this.currentBet, this.closestChipSpot, coords.x, coords.y, coords.z); // Где будут фишки на столе
							}
						}
						
						if(mp.game.controls.isDisabledControlPressed(0, 189)) // LEFT
						{
							if (!this.pressTimeout) {
								this.pressTimeout = setTimeout(() => {
									this.updateBet(false)
									this.pressTimeout = false
								}, 100);
							}
						}
						
						if(mp.game.controls.isDisabledControlPressed(0, 190)) // RIGHT
						{					
							if (!this.pressTimeout) {
								this.pressTimeout = setTimeout(() => {
									this.updateBet(true)
									this.pressTimeout = false
								}, 100);
							}
						}
						
						
						let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
						let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
						var coords = this.betObject.getCoords(false);
						this.rightAxisX += rightAxisX / 10;
						this.rightAxisY += rightAxisY * -1 / 10;
						
						
						var offsetPos = this.rouletteData[this.lpCasinoTable].table.getOffsetFromInWorldCoords(this.rightAxisX, this.rightAxisY, 0.0);
						this.betObject.setCoordsNoOffset(offsetPos.x, offsetPos.y, mp.tablesPos[this.lpCasinoTable].z+0.95, false, false, false);
						this.getClosestChipSpot(new mp.Vector3(offsetPos.x, offsetPos.y, mp.tablesPos[this.lpCasinoTable].z+0.95));
						
					}
					
					/*if(mp.game.controls.isDisabledControlJustReleased(0, 23)) // F
					{
						if (this.rouletteCamera == 'temp' && !this.drumCamera) {
							this.startRouletteCamera()
						}
						else if (this.rouletteCamera && this.rouletteCamera !== 'temp' && !this.drumCamera) {
							this.destroyRouletteCamera(true);
							var offsetPos = this.rouletteData[this.lpCasinoTable].table.getOffsetFromInWorldCoords(-0.5, -0.9, 1.8);
							this.drumCamera = mp.cameras.new('default', new mp.Vector3(offsetPos.x, offsetPos.y, offsetPos.z), new mp.Vector3(0,0,0), 45);
							this.drumCamera.setRot(-45.0, 0.0, mp.tablesPos[this.lpCasinoTable].h + 20.0, 2);
							this.drumCamera.setActive(true);
							mp.game.cam.renderScriptCams(true, false, 0, true, false);
						}
						else if (this.rouletteCamera === 'temp' && this.drumCamera) {
							this.destroyRouletteCamera(true);
						}
					}*/
					
				}
			});
			
			mp.events.add("renderColours", () => {
				setTimeout(() => {
					this.RenderColours()
				}, 1000);
			});


		}
		
		getBallXY(x, i) {
			var offsetPos = this.rouletteData[i].table.getOffsetFromInWorldCoords(-0.734742, -0.16617, 0.0);
			if (x) return offsetPos.x;
			else return offsetPos.y;
		}
		
		startRouletteCamera() { 
			this.rouletteCamera = mp.cameras.new('default', new mp.Vector3(mp.tablesPos[this.lpCasinoTable].x, mp.tablesPos[this.lpCasinoTable].y, mp.tablesPos[this.lpCasinoTable].z+3), new mp.Vector3(0,0,0), 45);
			this.rouletteCamera.setRot(-90.0, 0.0, mp.tablesPos[this.lpCasinoTable].h, 2);
			this.rouletteCamera.setActive(true);
			mp.game.cam.renderScriptCams(true, false, 0, true, false);
		}
		
		updateBet(add) { 
			var modifer = 500
			
			if (add) {
				if (this.currentBet + modifer <= (mp.tablesPos[this.lpCasinoTable].lrp ? mp.clientStorage.donate : mp.clientStorage.money)) {
					this.currentBet += modifer;
				}
				else {
					this.currentBet = (mp.tablesPos[this.lpCasinoTable].lrp ? mp.clientStorage.donate : mp.clientStorage.money);
				}
				
				//mp.game.audio.playSoundFrontend(-1, "DLC_VW_BET_UP", "dlc_vw_table_games_frontend_sounds", true); // Звук увеличить ставку
				this.currentBetText.text = `${this.currentBet}`
			}
			else {
				if (this.currentBet - modifer > 0) {
					this.currentBet -= modifer;
				}
				else {
					this.currentBet = 0;
				}
				
				//mp.game.audio.playSoundFrontend(-1, "DLC_VW_BET_DOWN", "dlc_vw_table_games_frontend_sounds", true); // Звук уменьшить ставку
				this.currentBetText.text = `${this.currentBet}`
			}
		}
		
		
		startTimebar(start, time) { 
			if (start) {
				if (this.timebarInterval !== undefined) clearInterval(this.timebarInterval);
				this.timebarInterval = setInterval(() => { 
					time -= 1;
					if (time < 0) time = 0;
					this.timebar.text = `${time}`
					if (time == 0) clearInterval(this.timebarInterval), this.timebarInterval = undefined;
				}, 1000)
			}
			else {
				clearInterval(this.timebarInterval);
				this.timebarInterval = undefined;
				if (time !== undefined) this.timebar.text = `0`;
			}
		}
		
		entityStreamIn(entity) { 
			if(entity.type == "ped" && entity.croupier != null) {
				if(entity.model == mp.game.joaat('S_F_Y_Casino_01')) entity.taskPlayAnim(this.animInfo.dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
				else entity.taskPlayAnim(this.animInfo.dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
				
				var id = entity.croupier;
				
				this.rouletteData[id].ball.position = new mp.Vector3(this.getBallXY(true, id), this.getBallXY(false, id), mp.tablesPos[id].z);
				
				for(var c=0; c < this.pedModelVariations[mp.tablesPos[id].ped].length; c++)
				{
					entity.setComponentVariation(this.pedModelVariations[mp.tablesPos[id].ped][c][0], this.pedModelVariations[mp.tablesPos[id].ped][c][1], this.pedModelVariations[mp.tablesPos[id].ped][c][2], this.pedModelVariations[mp.tablesPos[id].ped][c][3]);
				}
			}
		}
		
		AddTables (info) {  
			mp.tablesPos = JSON.parse(info);
			
			for (let id in mp.tablesPos) {
				var i = mp.tablesPos[id].id
				if (this.rouletteData[i]) continue;
				this.rouletteData[i] = {};
				this.rouletteData[i].table = mp.objects.new(mp.game.joaat(mp.tablesPos[i].hash), new mp.Vector3(mp.tablesPos[i].x, mp.tablesPos[i].y, mp.tablesPos[i].z),
				{
					rotation: new mp.Vector3(0, 0, mp.tablesPos[i].h),
				}
				);
				this.rouletteData[i].tableTexteure = mp.tablesPos[i].lrp ? 3 : 0
				this.rouletteData[i].ball = mp.objects.new(87196104, new mp.Vector3(this.getBallXY(true, i), this.getBallXY(false, i), mp.tablesPos[i].z));
				var endRot = new mp.Vector3(0, 0, mp.tablesPos[i].h + 180);
				var direction = new mp.Vector3(3.3 * Math.sin(135 - endRot.z * Math.PI / 180), 3.3 * Math.cos(135 - endRot.z * Math.PI / 180), 0);
				var endPos = new mp.Vector3(mp.tablesPos[i].x, mp.tablesPos[i].y, mp.tablesPos[i].z);
				endPos.x += direction.x * 0.2;
				endPos.y += direction.y * 0.2;
				endPos.z += 1;
				this.rouletteData[i].ped = mp.peds.new(mp.game.joaat(mp.tablesPos[i].ped), new mp.Vector3(endPos.x, endPos.y, endPos.z), mp.tablesPos[i].h - 180, 0);
				this.rouletteData[i].ped.croupier = i;
				this.rouletteData[i].colshape = mp.colshapes.newSphere(mp.tablesPos[i].x, mp.tablesPos[i].y, mp.tablesPos[i].z, 2.2);
				this.rouletteData[i].colshape.casinoTable = i;
				
				for(var c=0; c < this.pedModelVariations[mp.tablesPos[i].ped].length; c++)
				{
					this.rouletteData[i].ped.setComponentVariation(this.pedModelVariations[mp.tablesPos[i].ped][c][0], this.pedModelVariations[mp.tablesPos[i].ped][c][1], this.pedModelVariations[mp.tablesPos[i].ped][c][2], this.pedModelVariations[mp.tablesPos[i].ped][c][3]);
				}
				
				setTimeout(() => {
					this.RenderColours()
				}, 1000);
			}
			
		}
		
		RenderColours (info) {
			for (let i in casino.rouletteData) {
				if(casino.rouletteData[i]) {
					mp.game.invoke("0x971DA0055324D033", casino.rouletteData[i].table.handle, casino.rouletteData[i].tableTexteure)
				}		
			}
		}
		
		Init (info) {  
			mp.tablesPos = JSON.parse(info);
			
			for (let id in mp.tablesPos) {
				var i = mp.tablesPos[id].id
				this.rouletteData[i] = {};
				this.rouletteData[i].table = mp.objects.new(mp.game.joaat(mp.tablesPos[i].hash), new mp.Vector3(mp.tablesPos[i].x, mp.tablesPos[i].y, mp.tablesPos[i].z),
				{
					rotation: new mp.Vector3(0, 0, mp.tablesPos[i].h),
				});
				this.rouletteData[i].tableTexteure = mp.tablesPos[i].lrp ? 3 : 0
				this.rouletteData[i].ball = mp.objects.new(87196104, new mp.Vector3(this.getBallXY(true, i), this.getBallXY(false, i), mp.tablesPos[i].z));
				var endRot = new mp.Vector3(0, 0, mp.tablesPos[i].h + 180);
				var direction = new mp.Vector3(3.3 * Math.sin(135 - endRot.z * Math.PI / 180), 3.3 * Math.cos(135 - endRot.z * Math.PI / 180), 0);
				var endPos = new mp.Vector3(mp.tablesPos[i].x, mp.tablesPos[i].y, mp.tablesPos[i].z);
				endPos.x += direction.x * 0.2;
				endPos.y += direction.y * 0.2;
				endPos.z += 1;
				this.rouletteData[i].ped = mp.peds.new(mp.game.joaat(mp.tablesPos[i].ped), new mp.Vector3(endPos.x, endPos.y, endPos.z), mp.tablesPos[i].h - 180, 0);
				this.rouletteData[i].ped.croupier = i;
				this.rouletteData[i].colshape = mp.colshapes.newSphere(mp.tablesPos[i].x, mp.tablesPos[i].y, mp.tablesPos[i].z, 2.2);
				this.rouletteData[i].colshape.casinoTable = i;
				
				for(var c=0; c < this.pedModelVariations[mp.tablesPos[i].ped].length; c++)
				{
					this.rouletteData[i].ped.setComponentVariation(this.pedModelVariations[mp.tablesPos[i].ped][c][0], this.pedModelVariations[mp.tablesPos[i].ped][c][1], this.pedModelVariations[mp.tablesPos[i].ped][c][2], this.pedModelVariations[mp.tablesPos[i].ped][c][3]);
				}
				
				setTimeout(() => {
					this.RenderColours()
				}, 1000);
			}
			
			
			mp.events.add('playerEnterColshape', (shape) => {
				if(shape.casinoTable !== undefined && this.lpCasinoTable == null && this.interactingWithTable == null) {
					this.casinoTableToJoin = shape.casinoTable;
					mp.events.call("prompt.show", "<span>Е</span> Встать за стол");
				}
			});

			mp.events.add('playerExitColshape', (shape) => {
				if(shape.casinoTable !== undefined)
				{
					//mp.events.call("prompt.hide");
					this.casinoTableToJoin = null;
				}
			});
			
		}
		
		clearTableMarkers() {
			for(var i=0; i < this.tableMarkers.length; i++)
			{
				this.tableMarkers[i].destroy();
			}
			this.tableMarkers = [];
		}

		getClosestChipSpot(vector) {
			var spot = null;
			var prevDistance = 0.05;
			var dist = null;
			var tablepos = this.rouletteData[this.lpCasinoTable].table.position
			
			
			for(var i=0; i < this.tableChipsOffsets.length; i++)
			{
				var offsetPos = this.rouletteData[this.lpCasinoTable].table.getOffsetFromInWorldCoords(this.tableChipsOffsets[i][0], this.tableChipsOffsets[i][1], this.tableChipsOffsets[i][2]);
				dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(offsetPos.x, offsetPos.y, offsetPos.z));
				if(dist <= prevDistance)
				{
					spot = i;
					prevDistance = dist;
				}
			}
			
			if(spot != this.closestChipSpot)
			{
				//mp.game.audio.playSoundFrontend(-1, "DLC_VW_BET_HIGHLIGHT", "dlc_vw_table_games_frontend_sounds", true); // Звук пролистывания стола
				this.closestChipSpot = spot;
				this.clearTableMarkers();
				
				if(spot != null)
				{
					var key = null;
					var obj = null;
					for(var i=0; i < this.tableChipsOffsets[spot][3].length; i++)
					{
						key = this.tableChipsOffsets[spot][3][i];
						if(key == "00" || key == "0")
						{
							var offsetPos = this.rouletteData[this.lpCasinoTable].table.getOffsetFromInWorldCoords(this.tableMarkersOffsets[key][0], this.tableMarkersOffsets[key][1], this.tableMarkersOffsets[key][2]);
							obj = mp.objects.new(269022546, new mp.Vector3(offsetPos.x, offsetPos.y, offsetPos.z),
							{
								rotation: new mp.Vector3(0, 0, mp.tablesPos[this.lpCasinoTable].h),
							});
							this.tableMarkers.push(obj);
						}
						else
						{
							var offsetPos = this.rouletteData[this.lpCasinoTable].table.getOffsetFromInWorldCoords(this.tableMarkersOffsets[key][0], this.tableMarkersOffsets[key][1], this.tableMarkersOffsets[key][2]);
							this.tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(offsetPos.x, offsetPos.y, offsetPos.z),
							{
								rotation: new mp.Vector3(0, 0, mp.tablesPos[this.lpCasinoTable].h),
							}));
						}
					}
				}
			}
			
		}
		
		rouletteRender() {
			for (let i in casino.rouletteData) {
				if(casino.rouletteData[i].table.isPlayingAnim(casino.animInfo.tableLib, casino.animInfo.tableStart, 3))
				{
					if(casino.rouletteData[i].table.getAnimCurrentTime(casino.animInfo.tableLib, casino.animInfo.tableStart) > 0.9425)
					{
						casino.rouletteData[i].table.playAnim(casino.animInfo.tableMain, casino.animInfo.tableLib, 1000.0, true, true, true, 0, casino.animInfo.speed);
					}
				}
				
				if(casino.rouletteData[i].ball.isPlayingAnim(casino.animInfo.tableLib, casino.animInfo.ballStart, 3))
				{
					if(casino.rouletteData[i].ball.getAnimCurrentTime(casino.animInfo.tableLib, casino.animInfo.ballStart) > 0.99)
					{
						casino.rouletteData[i].ball.position = new mp.Vector3(casino.getBallXY(true, i), casino.getBallXY(false, i), mp.tablesPos[i].z+1.0715);
						casino.rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, mp.tablesPos[i].h + casino.animInfo.ballRot);
						
						casino.rouletteData[i].ball.playAnim(casino.animInfo.ballMain, casino.animInfo.tableLib, 1000.0, true, true, false, 0, casino.animInfo.speed);
					}
				}
				
				if(casino.rouletteData[i].table.isPlayingAnim(casino.animInfo.tableLib, casino.animInfo.tableMain, 3))
				{
					if(casino.rouletteData[i].table.getAnimCurrentTime(casino.animInfo.tableLib, casino.animInfo.tableMain) >= 0.9 && Date.now()-casino.rouletteData[i].lastSpinTime > 1000)
					{
						casino.rouletteData[i].spins++;
						casino.rouletteData[i].lastSpinTime = Date.now();
					}
					if(casino.rouletteData[i].spins == casino.rouletteData[i].needSpins-1)
					{
						casino.rouletteData[i].ball.setAnimSpeed(casino.animInfo.tableLib, casino.animInfo.ballMain, 0.71);
					}
					if(casino.rouletteData[i].spins == casino.rouletteData[i].needSpins && casino.rouletteData[i].table.getAnimCurrentTime(casino.animInfo.tableLib, casino.animInfo.tableMain) > 0.99)
					{
						casino.rouletteData[i].table.playAnim(`exit_${casino.rouletteData[i].endTable}_wheel`, casino.animInfo.tableLib, 1000.0, false, true, true, 0, 131072);
						casino.rouletteData[i].ball.position = new mp.Vector3(casino.getBallXY(true, i), casino.getBallXY(false, i), mp.tablesPos[i].z+1.0715);
						casino.rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, mp.tablesPos[i].h + casino.animInfo.ballRot);
						casino.rouletteData[i].ball.playAnim(`exit_${casino.rouletteData[i].endTable}_ball`, casino.animInfo.tableLib, 1000.0, false, true, true, 0, casino.animInfo.speed);
						//mp.game.audio.stopSound(casino.sound);
						//mp.game.audio.releaseSoundId(casino.sound);
						//mp.game.audio.playSoundFromEntity(-1, `dlc_vw_roulette_exit_${casino.rouletteData[i].endTable}`, casino.rouletteData[i].ball.handle, "dlc_vw_table_games_roulette_exit_sounds", false, 0); // Звук шарика
					}
				}
			}
		}
		
		
		destroyRouletteCamera(temp) {
			if (this.rouletteCamera && this.rouletteCamera !== 'temp') this.rouletteCamera.destroy(true);
			if (this.drumCamera) this.drumCamera.destroy(true), this.drumCamera = null;
			if (temp) this.rouletteCamera = 'temp';
			else  this.rouletteCamera = null;
			mp.game.cam.renderScriptCams(false, false, 0, true, false);
		}
		
	} 

	const casino = new Casino
	
};