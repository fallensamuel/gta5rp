$(document).ready(() => {
    const SHOW_TIME = 10000;

    var prompts = {
        "select_menu": {
            text: "Используй <span>&uarr;</span> <span>&darr;</span> <span>&crarr;</span> для выбора пункта в меню.",
            showTime: 60000
        },
        "vehicle_engine": {
            text: "<span>2</span> Нажми чтобы завести двигатель автомобиля"
        },
        "vehicle_repair": {
            text: "Автомобиль поломался. Необходимо вызвать механика"
        },
        "choiceMenu_help": {
            text: "<span>Y</span><spann>N</spann> <spantext>Используй клавиши для взаимодействия</spantext>"
        },
        "documents_help": {
            text: "<span>E</span> Нажми для закрытия"
        },
        "health_help": {
            text: "Приобрести медикаменты можно в больнице"
        },
        "police_service_recovery_carkeys": {
            text: "Вызови службу, чтобы пригнать авто к участку"
        },        
		"talrasha_business": {
            text: "<span>Е</span> Нажми для взаимодействия"
        },		
		"talrasha_jobs": {
            text: "<span>Е</span> Нажми для взаимодействия"
        },
		"talrasha_atm": {
            text: "<span>Е</span> Нажми для взаимодействия с банкоматом"
        },
		"talrasha_bank": {
            text: "<span>Е</span> Нажми для взаимодействия"
        },
		"talrasha_helper": {
            text: "<span>Е</span> Нажми для взаимодействия"
        },
    }

    window.promptAPI = {
        showByName: (name) => {
            var info = prompts[name];
            if (!info) return;
            var showTime = SHOW_TIME;
            if (info.showTime) showTime = info.showTime;

            promptAPI.show(info.text, info.header, showTime);
        },
        show: (text, header = "Подсказка", showTime = SHOW_TIME) => {
            $(".prompt .header").text(header);
            $(".prompt .text").html(text);

            /*if (chatAPI.isLeft()) {
                $('.prompt').css('left', '');
                $('.prompt').css('top', '1vh');
                $('.prompt').css('right', '1vh');
                $('.prompt').css('bottom', '');
            } else {
                $('.prompt').css('left', '1vh');
                $('.prompt').css('top', '1vh');
                $('.prompt').css('right', '');
                $('.prompt').css('bottom', '');
            }*/
			
			$('.prompt').css('left', '26.6vh');
			$('.prompt').css('top', '');
			$('.prompt').css('right', '');
			$('.prompt').css('bottom', '9.2vh');

            var height = Math.abs(parseFloat($(".prompt .header").height()) + parseFloat($(".prompt .text").height()));
            $(".prompt .body").height(height);

            $(".prompt").fadeIn(100);
            setTimeout(() => {
                promptAPI.hide();
            }, showTime);
        },
        hide: () => {
            $(".prompt").fadeOut(100);
        }
    };
});
