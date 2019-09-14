$(function(){
  var button = $(".post-area__button");
  var inputForm = $(".new_message");
  var input = $(".post-area__bar__input");
  var logArea = $('.log-area');

  function buildHTML(message){
    var content = message.content ?`<p class='log-area__log__text'>${message.content}</p>` : "";
    var image = message.image ?`<img class="log-area__log__image" src= ${message.image}>` : "";
    var html = `
      <div class = log-area__log data-id = "${message.id}">
        <div class = log-area__log__top>
          <p class='log-area__log__name'>${message.name}</p>
          <p class='log-area__log__date'>${message.time}</p>
        </div>
        ${content}
        ${image}
      </div>`
      return html;
  };

  // 最新のチャットログを取得しlogareaに追加する
  var reloadMessages = function() {
    var last_message_id = $(".log-area .log-area__log:last")[0].dataset.id;
    var groupid = logArea[0].dataset.groupid;
    var url = `/groups/${groupid}/api/messages`;
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
        var newMessage = buildHTML(message);
        logArea.append(newMessage);
        var height = logArea.height();
        $('html,body').animate({scrollTop: height}, 500, 'swing');
      });
    })
    .fail(function() {
      window.alert("自動更新に失敗しました");
    });
  };

  // メッセージ一覧にいる場合のみチャットログをリロードする
  logArea[0] ? setInterval(reloadMessages, 5000): null;
  // inputフォームがsubmitされた際に非同期通信を行いチャットログに追加する
  inputForm.on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.pathname;
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      document.forms["new_message"].reset();
      logArea.append(html);
      var height = logArea.height();
      $('html,body').animate({scrollTop: height}, 500, 'swing');
      button.attr('disabled',false);
    }).fail(function(data){
      window.alert("通信に失敗しました");
      button.attr('disabled',false);
    });
  });
});
