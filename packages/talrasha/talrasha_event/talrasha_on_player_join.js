module.exports = {
    "playerJoin": (player) => {
        //console.log(`playerJoin: ${player.name}`);
        //player.state = 0;
        //player.spawn(new mp.Vector3(-789.35, -121.19, 19.95)); //metro
        //player.spawn(new mp.Vector3(34.58, 856.84, 197.76)); //пирс
        //player.spawn(new mp.Vector3(2185.73, 259.42, 261.52)); //холм
       // player.spawn(new mp.Vector3(-548.2092895507812, 1056.0384521484375, 341.56488037109375)); // крыша
        //player.spawn(new mp.Vector3(-78.68, -810.60, 243.39)); // стандартное место создания перса
		
        //player.spawn(new mp.Vector3(123.2, -229.06, 54.55)); // место создания перса (магаз шмоток)
        //player.model = mp.joaat("MP_M_Freemode_01");
		//player.setVariable("clothes_top_variation", 364);
		//player.setVariable("clothes_top_texture", 0);
		//player.setClothes(8, -1, 0, 0);
		//player.setClothes(2, 4, 0, 0);
		//player.setClothes(3, 11, 0, 0);
		//player.setClothes(4, 7, 0, 0);
		//player.setClothes(6, 1, 0, 0);
        //player.heading = 146.08;
        player.dimension = 10000 + player.id; //чтобы игроки не стримились друг другу

		
        player.call('playerJoin.client', []);
    }

}
