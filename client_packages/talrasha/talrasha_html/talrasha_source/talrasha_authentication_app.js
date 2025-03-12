var authenticationApp = new Vue({
    el: '#authenticationApp',
    data: {
        showedwelcome: 0,
        curselector: -1,
        cursex: -1,
        result_icon: "talrasha_image/talrasha_authentication/talrasha_result_err.png",
        result_text: "",
        result_button: ""
    },
    methods: {

        setSelector: function(selector) {
			console.log(selector)
            if (!selector) {
					console.log(authenticationApp.$data.curselector)
                if (authenticationApp.$data.curselector !== 0) {
                    var list = document.getElementsByClassName("select-block");
                    list[0].classList.add("select-block-active");
                    list[1].classList.remove("select-block-active");
					
					$(".talrashabg1, .select-block b, .talrashaauthda, .fast-enter, .cant-enter, .buttonauth, .talrashabglogin").fadeIn(1)

                    document.getElementsByClassName("registration")[0].style.display = "none";
                    document.getElementsByClassName("login")[0].style.display = "block";

                    authenticationApp.$data.curselector = 0;
                    $(".authentication .login .loginOrEmail").focus();
                }
            } else {

                if (authenticationApp.$data.curselector !== 1) {
                    var list = document.getElementsByClassName("select-block");
                    list[0].classList.remove("select-block-active");
                    list[1].classList.add("select-block-active");
					
					$(".talrashabg1, .select-block b, .talrashaauthda, .fast-enter, .cant-enter, .buttonauth, .talrashabglogin").fadeOut(1)

                    document.getElementsByClassName("login")[0].style.display = "none";
                    document.getElementsByClassName("registration")[0].style.display = "block";

                    $(".authentication .registration .name").focus();
                    authenticationApp.$data.curselector = 1;
                }
            }
        },
        /*setSex: function(selector) {
              if(!selector) {

                  if(authenticationApp.$data.cursex !== 0) {
                      var list = $(".sex-block");
                      list[1].classList.add("sex-block-active");
                      list[0].classList.remove("sex-block-active");

                      authenticationApp.$data.cursex = 0;
                  }
              }
              else {
                  if(authenticationApp.$data.cursex !== 1) {
                      var list = $(".sex-block");
                      list[1].classList.remove("sex-block-active");
                      list[0].classList.add("sex-block-active");

                      authenticationApp.$data.cursex = 1;
                  }
              }
        },*/
        showRecoveryScreen: function() {
            $(".select,.login,.registration,.confirmEmail").fadeOut(1).promise().done(function() {
				$(".talrashabg1, .select-block b, .talrashaauthda, .fast-enter, .cant-enter, .buttonauth").fadeOut(1)
                $(".recovery").fadeIn(1);
                $(".recovery .email").focus();
            });
        },
        hideRecoveryScreen: function() {

            $(".recovery").fadeOut(1).promise().done(function() {
                $(".select,.login, .talrashabg1, .select-block b, .talrashaauthda, .fast-enter, .cant-enter, .buttonauth").fadeIn(1);
            });
        },
        hideRecoveryResultScreen: function() {

            $(".recovery-result").fadeOut(1).promise().done(function() {
                $(".select,.login").fadeIn(1);
            });
        },
        hideGoogleAuthScreen: function() {

            $(".google").fadeOut(1).promise().done(function() {
                $(".select,.login").fadeIn(1);
            });
        },
        hidePinCodeScreen: function() {
            $(".pincode").fadeOut(1).promise().done(function() {
                $(".select,.login").fadeIn(1);
            });
        },
        showPass: function() {
            if ($(".authentication .login .eye-icon input").attr('type') == 'password'){
                $(".authentication .login .eye-icon input").attr('type', 'text');
            } else {
                $(".authentication .login .eye-icon input").attr('type', 'password');
            }
        },
        showConfirmEmail: function() {
            sendEmailCode();
            initConfirmEmailHandler();
            $(".select,.login,.registration").fadeOut(1).promise().done(function() {
                $(".confirmEmail").fadeIn(1);
                $(".confirmEmail .code").focus();
            });
        },
        showAuthAccount: function() {
            $(".select,.login,.registration, .confirmEmail").fadeOut(1).promise().done(function() {
                $(".select").fadeIn(1);
                authenticationApp.setSelector(0);
                $(".authentication .login .loginOrEmail").focus();
            });
        },
    }
});


window.welcomeMusicPlayer = {
	volume: 0.1,
	on: () => {
		if (window.welcomeMusicPlayer.player) {
			window.welcomeMusicPlayer.player.pause();
		}
		
		window.welcomeMusicPlayer.player = new Audio("https://");
		window.welcomeMusicPlayer.player.volume = window.welcomeMusicPlayer.volume;
		window.welcomeMusicPlayer.player.play();
		window.welcomeMusicPlayer.player.loop = true;
		
	},
	off: () => {
		if (window.welcomeMusicPlayer.player) {
			window.welcomeMusicPlayer.player.pause();
			delete window.welcomeMusicPlayer.player;
		}

	}
}

// Global function
function showWelcomeScreen() {
	window.welcomeMusicPlayer.off() // on
	authenticationApp.setSelector(0);
    $(".welcome").fadeIn(1500, function() {
        authenticationApp.$data.showedwelcome = 0;
        $("body").click(function() {
            hideWelcomeScreen();
        });

        $("body").keyup(function() {
            hideWelcomeScreen();
        });
    });;
}

function hideWelcomeScreen() {

    if (authenticationApp.$data.showedwelcome) return;
    authenticationApp.$data.showedwelcome = 1;

    $(".welcome").addClass("hide-welcome");

    $(".logo").fadeOut(1000);
    setTimeout(function() {
        $(".welcome").hide();
        showWelcomeTest();

    }, 1500);
}

function showWelcomeTest() {
    $("#alphaTest").fadeIn(100, function() {
        authenticationApp.$data.showwelcometest = 0;
        $("body").click(function() {
            $("#alphaTest").addClass("hide-welcome");
            $("#alphaTest").hide();
            showAuthenticationScreen();
        });

        $("body").keyup(function() {
            $("#alphaTest").addClass("hide-welcome");
            $("#alphaTest").hide();
            showAuthenticationScreen();
        });
    });;
}

function showAuthenticationScreen() {
	authenticationApp.setSelector(0);
    if (authenticationApp.$data.showwelcometest) return;
    authenticationApp.$data.showwelcometest = 1;

    $(".authentication").fadeIn(1);
    $(".authentication .login .loginOrEmail").focus();
}

function hideAuthenticationScreen() {
    $(".authentication").fadeOut(1);
}

function showRecoveryResultScreen(error, message, button) {

    if (error) authenticationApp.$data.result_icon = "talrasha_image/talrasha_authentication/talrasha_result_err.png";
    else authenticationApp.$data.result_icon = "talrasha_image/talrasha_authentication/talrasha_result_ok.png";

    authenticationApp.$data.result_text = message;
    authenticationApp.$data.result_button = button;

    $(".select,.login").fadeOut(1).promise().done(function() {
        $(".recovery-result").fadeIn(1);
    });
}
