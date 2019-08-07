$(function() {
  var memberArea = $("#user-search-field");
  var searchResult = $("#user-search-result");
  var chatGroups = $("#chat-group-users");
  // 引数userをもとにHTMLを作成しserchResult領域にappendする関数
  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`
    searchResult.append(html);
  };
  function appendAddUser(addUser){
    var html = `
    <div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value='${addUser.userId}'>
      <p class='chat-group-user__name'>${addUser.userName}</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
    chatGroups.append(html);
  };

  memberArea.on("keyup",function(){
    var member = memberArea.val();
    var url = "/users";
    var method = "GET";
    $.ajax({
      type: method,
      url: url,
      data: {keyword: member},
      dataType: "json",
    })
    .done(function(users){
      searchResult.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function(users){
      window.alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on("click",".chat-group-user__btn--add", function(){
    $(this).parent().remove();
    var user = $(this).siblings().context.dataset;
    appendAddUser(user);
  });
  $(document).on("click",".js-remove-btn", function(){
    $(this).parent().remove();
  });
});