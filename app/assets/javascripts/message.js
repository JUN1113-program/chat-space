$(function(){
  var button = $(".post-area__button");
  var inputForm = $(".new_message");
  var input = $(".post-area__bar__input");
  var logArea = $('.log-area');

  function buildHTML(message){
    if (message.image == null){
      var html = `
      <div class = log-area__log>
        <p class='log-area__log__name'>${message.name}</p>
        <p class='log-area__log__date'>${message.time}</p>
        <p class='log-area__log__text'>${message.content}</p>
      </div>
        `
      return html;
    }else if(message.content == ""){
      var html = `
      <div class = log-area__log>
        <p class='log-area__log__name'>${message.name}</p>
        <p class='log-area__log__date'>${message.time}</p>
        <img class="log-area__log__image" src= ${message.image}/>
      </div>
        `
      return html;
    }else{
      var html = `
      <div class = log-area__log>
        <p class='log-area__log__name'>${message.name}</p>
        <p class='log-area__log__date'>${message.time}</p>
        <p class='log-area__log__text'>${message.content}</p>
        <img class="log-area__log__image" src=${message.image}/>
      </div>
        `
      return html;
    }
  };
 
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
      logArea.append(html);
      input.val('');
      var height = logArea.height();
      $('html,body').animate({scrollTop: height}, 500, 'swing');
      button.attr('disabled',false);
    }).fail(function(data){
      window.alert("通信に失敗しました");
      button.attr('disabled',false);
    });
  });
});
