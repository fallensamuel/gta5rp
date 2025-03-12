module.exports = {
    build: "v. 0.0.1",
    closedMode: true, // закрытый доступ к серверу
    pin: 12345,
    adminCode: "test", // код в чат для выдачи админки

    maxCharacters: 3, // макс. кол-во персонажей на учётную запись
    maxWantedLevel: 5, // макс. уровень розыска
    maxPickUpItemDist: 2, // макс. дистанция взятия предмета с земли
    maxInteractionDist: 5, // макс. дистанция взаимодействия с игроком/авто
	maxInteractionDistVehicle: 100, // макс. дистанция взаимодействия с авто
    minSpawnCarDist: 10, // мин. дистанция для срабатывания спавна кара
    maxInventoryWeight: 30, // макс. вес предметов игрока в КГ
    maxVehInventoryWeight: 50, // макс. вес предметов авто в КГ
    maxLevelAdmin: 10, // макс. лвл админки

    gasRange: 10, // радиус заправки у АЗС

    spawnCarsWaitTime: 10000, // ожидание перед спавном всех каров сервера (мс)
    restartWaitTime: 10000, // ожидание перед рестартом сервера (мс)
	
	sellCarPrecent: 70, //Процент от стоимости машины на свалке
	sellCarPrecentMenu: 50 //Процент от стоимости машины в меню
}
