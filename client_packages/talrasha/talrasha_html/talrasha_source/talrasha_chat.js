//var tags = ["[сказать]","[крикнуть]","[шепнуть]","[рация]","[OOC]"];
$(document).ready(() => {
  var chatApp = new Vue({
    el: '#chat',
    data: {
      leftChat: true,
      chatStatus: true,
      leftChatClass: 'chatLeft',
      rightChatClass: 'chatLeft',
    },
  })

  const messageTime = 8000 // время показа сообщения в чате
  const countMessages = 30 // макс. кол-во сообщений в чате
  var chatTimeout = null // Timeout для чата, для его потухания при неактиве
  var chatFaded = true

  var tags = [
    'RP',
    '/me',
    '/do',
	'Рация',
	'/d',
    'NONRP',
	'Семья',
	'/try',
	'Крикнуть',
  ]
  var textColors = [
    '#ffffff',
    '#F0D2F4',
    '#F0D2F4',
    '#1E90FF',
    '#FA8072',
    '#ffffff',
    '#00FFFF',
	'#ffffff',
	'#ffffff',
	'#ffffff',
  ]

  $('#chat input').keydown((e) => {
    if (e.keyCode == 13) {
      // enter

      var message = $('#chat input').val().trim()
      $('#chat input').val('')
      if (message.length == 0) return window.chatAPI.show(false)
      if (message.length > 100) message = message.substr(0, 100)
      var tag = $('#chat .line .btn-active').text()
      window.chatAPI.send(message, tag)
      cmdLoggerAPI.save(message, tag)
    }
  })
  $('#chat .tag').click((e) => {
    var message = $('#chat input').val().trim()
    $('#chat input').val('')
    if (message.length == 0) return window.chatAPI.show(false)
    if (message.length > 100) message = message.substr(0, 100)
    var tag = $('#chat .line .btn-active').text()
    window.chatAPI.send(message, tag)
    cmdLoggerAPI.save(message, tag)
  })
  $('#chat .line .btnX').click((e) => { /////////////////////////////////
    $(`#chat .line .btn-active`).removeClass('btn-active')
    e.target.classList.add('btn-active')
	
	/*var index = tags.indexOf($("#chat .tagleft").text());
	index = parseFloat(index) + 1
	if (index >= tags.length) index = 0
	$("#chat .tagleft").text(tags[index]);*/
	
	$('#chat input').focus()
	
	    /*var index = $(`#chat .btns .line .btn-active`).attr('idx')
        index = parseFloat(index) + 1
        if (index >= tags.length) index = 0
        $(`#chat .line .btn-active`).removeClass('btn-active')
        $(`#chat .line .btnX[idx*=${index}]`).addClass('btn-active')*/
  })
  window.chatAPI = {
    push: (playerName, playerId, text, tag, talrasha_faction, talrasha_rank) => {
      if (chatTimeout) {
        clearTimeout(chatTimeout)
        chatTimeout = null
      }
      chatFaded = false
      $('#chat .chat-content').css('opacity', '1.0')
	
      var index = tags.indexOf(tag)
      if (index == -1) return alert(`Неизвестный тип сообщения в чат!`)
      var message = ''
      var handlers = {
        RP: (playerName, text) => {
          message = `${playerName}<a class="userId">[${playerId}]:</a> ${text}`
        },
        Крикнуть: (playerName, text) => {
          message = `${playerName}[${playerId}] кричит: ${text}`
        },
        Рация: (playerName, text) => {
		  playerName = playerName.replace(" ","_");
          message = `[R] [${talrasha_faction}] ${talrasha_rank} ${playerName}: ${text}`
        },
        NONRP: (playerName, text) => {
          message = `(( ${playerName}[${playerId}]: ${text} ))`
        },
        "/do": (playerName, text) => {
          message = `${text} (( ${playerName}[${playerId}] ))`
        },
        "/me": (playerName, text) => {
          message = `${playerName}[${playerId}] ${text}`
        },
        "/try": (playerName, text) => {
          message = `${playerName}[${playerId}] ${text}`
        },
        "/d": (playerName, text) => {
		  playerName = playerName.replace(" ","_");
          message = `[D] [${talrasha_faction}] ${talrasha_rank} ${playerName}: ${text}`
        },
		Семья: (playerName, text) => {
		  playerName = playerName.replace(" ","_");
          message = `[F] [${talrasha_faction}] ${talrasha_rank} ${playerName}: ${text}`
        },
		"/gov": (playerName, text) => {
		  playerName = playerName.replace(" ","_");
          message = `[GOV] ${playerName}: ${text}`
        },
      }
      handlers[tag](playerName, text)

      var el = $(`<div>${message}</div>`)
      el.css('color', textColors[index])
      $('#chat .chat-content').append(el)
      //$("#chat .chat-content").append("<hr />");
      $('#chat .chat-content').scrollTop(9999)

      if ($('#chat .chat-content div').length > countMessages) {
        $('#chat .chat-content div:first').remove()
        $('#chat .chat-content hr:first').remove()
      }

      chatTimeout = setTimeout(() => {
        
        try{
          if (!chatAPI.active()) $('#chat .chat-content').css('opacity', '0.7')
          chatFaded = true
        }
        catch(e){
          //mp.trigger('events.callRemote', "testlogs", `\sCLIERR : ${JSON.stringify(e)}\n`)
        }
      }, messageTime)
    },
    custom_push: (text) => {
      if (chatTimeout) {
        clearTimeout(chatTimeout)
        chatTimeout = null
      }
      chatFaded = false
      $('#chat .chat-content').css('opacity', '1.0')
      var message = ''
      // chatAPI.custom_push("[A] Tomat Petruchkin: всем доброго времени суток!");
      var el = $(`<div>${text}</div>`)
      $('#chat .chat-content').append(el)
      $('#chat .chat-content').scrollTop(9999)
      if ($('#chat .chat-content div').length > countMessages) {
        $('#chat .chat-content div:first').remove()
        $('#chat .chat-content hr:first').remove()
      }
      chatTimeout = setTimeout(() => {
        try{
          if (!chatAPI.active()) $('#chat .chat-content').css('opacity', '0.7')
          chatFaded = true
        }
        catch(e){
          //mp.trigger('events.callRemote', "testlogs", `\sCLIERR : ${JSON.stringify(e)}\n`)
        }
        
      }, messageTime)
    },
    clear: (playerName) => {
      $('#chat .chat-content').empty()
      var el = $(`<div>Администратор ${playerName} очистил чат!</div>`)
      $('#chat .chat-content').append(el)
    },
    changeOptions: (options) => {
      if (chatApp.chatStatus) {
        chatApp.chatStatus = false
        mp.trigger('playerMenu.Chat', 1)
      } else {
        chatApp.chatStatus = true
      }

      // if (options === 2) {
      //   chatApp.leftChat = true
      //   mp.trigger('playerMenu.Chat', 2)
      // } else if (options === 3) {
      //   mp.trigger('playerMenu.Chat', 3)
      //   chatApp.leftChat = true
      // }
    },
    send: (message, tag) => {
      if (!isFlood())
        mp.invoke(
          'chatMessage',
          JSON.stringify({
            text: message.escape(),
            tag: tag,
          })
        )
      chatAPI.show(false)
    },
    show: (enable) => {
      if (!chatApp.chatStatus) return
      //if (window.bindlocker()) return;
      if (enable) {
		if (window.bindlocker()) return;
        $('#chat .chat-content').css('opacity', '1.0')

        $('#chat .chat-bottom').slideDown(1)
        setTimeout(() => {
          try{
            $('#chat input').focus()
          }
          catch(e){

          }
        }, 5)
        $('#chat .chat-content').css('overflow-y', 'auto')
        //$("#chat .chat-content div").css("opacity", "1");
      } else {
        if (chatFaded) $('#chat .chat-content').css('opacity', '0.7')

        $('#chat .chat-bottom').slideUp(1)
        $('#chat .chat-content').css('overflow-y', 'hidden')
        //$("#chat .chat-content div").css("opacity", "0.9");
      }
      $('#chat input').blur()
      setCursor(enable)
      mp.trigger('setBlockControl', enable)
      mp.trigger('setChatActive', enable)
    },
    active: () => {
      return $('#chat .chat-bottom').css('display') != 'none'
    },
    enable: (enable) => {
      $(document).unbind('keydown', chatAPI.showHandler)
      $(document).unbind('keydown', chatAPI.tabHanlder)
      if (enable) {
        $(document).keydown(chatAPI.showHandler)
        $(document).keydown(chatAPI.tabHanlder)
      } else {
        chatAPI.show(false)
        $(document).unbind('keydown', chatAPI.showHandler)
        $(document).unbind('keydown', chatAPI.tabHanlder)
      }
    },
    showHandler: (e) => {
      if (!chatApp.chatStatus) return
      if (e.keyCode == 84) {
        if (!chatAPI.active()) chatAPI.show(true)
      }
    },
    tabHanlder: (e) => {
      if (e.keyCode == 9) {
        if (!chatAPI.active()) return
        var index = $(`#chat .btns .line .btn-active`).attr('idx')
        index = parseFloat(index) + 1
        if (index >= tags.length) index = 0
        $(`#chat .line .btn-active`).removeClass('btn-active')
        $(`#chat .line .btnX[idx*=${index}]`).addClass('btn-active')
		//$("#chat .tagleft").text(tags[index]);
		
        setTimeout(() => {
          
          try{
            $('#chat input').focus()
          }
          catch(e){
            //mp.trigger('events.callRemote', "testlogs", `\sCLIERR : ${JSON.stringify(e)}\n`)
          }
        }, 5)
      }
    },
    isLeft: () => {
      return chatApp.leftChat
    },
  }

  var cmdLoggerAPI = {
    save: (message, tag) => {
      if (
        cmdLoggerAPI.messages.length > 0 &&
        cmdLoggerAPI.messages[cmdLoggerAPI.index - 1].text == message
      )
        return

      cmdLoggerAPI.messages.push({
        text: message,
        tag: tag,
      })
      if (cmdLoggerAPI.messages.length > 20) cmdLoggerAPI.messages.splice(0, 1)
      cmdLoggerAPI.index = cmdLoggerAPI.messages.length
    },
    init: () => {
      $(document).unbind('keydown', cmdLoggerAPI.handler)
      $(document).keydown(cmdLoggerAPI.handler)
    },
    handler: (e) => {
      if (!chatAPI.active()) return
      if (e.keyCode == 38) {
        //up
        cmdLoggerAPI.index--
        if (cmdLoggerAPI.index < 0) cmdLoggerAPI.index = 0
        var message = cmdLoggerAPI.messages[cmdLoggerAPI.index].text
        var tag = cmdLoggerAPI.messages[cmdLoggerAPI.index].tag

        setTimeout(() => {
          
          try{
            $('#chat input').val(message)
          }
          catch(e){
            //mp.trigger('events.callRemote', "testlogs", `\sCLIERR : ${JSON.stringify(e)}\n`)
          }
        }, 5)
        $('#chat .tag a').text(tag)
        $('#chat .tag').css('color', textColors[index])
      } else if (e.keyCode == 40) {
        //bottom
        cmdLoggerAPI.index++
        if (cmdLoggerAPI.index >= cmdLoggerAPI.messages.length)
          cmdLoggerAPI.index = cmdLoggerAPI.messages.length - 1
        var message = cmdLoggerAPI.messages[cmdLoggerAPI.index].text
        var tag = cmdLoggerAPI.messages[cmdLoggerAPI.index].tag
        setTimeout(() => {
          
          try{
            $('#chat input').val(message)
          }
          catch(e){
            //mp.trigger('events.callRemote', "testlogs", `\sCLIERR : ${JSON.stringify(e)}\n`)
          }
        }, 5)
        $('#chat .tag a').text(tag)
      }
    },
    messages: [],
    index: 0,
  }
  cmdLoggerAPI.init()

  //chatAPI.enable(true); //for test
})
