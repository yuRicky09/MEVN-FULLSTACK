流程:

1. 重未登入-> 導向 login page -> 登入後將 access token 存於 memory，refresh token 存於 httpOnly cookie，並設置 silent refresh 後導向 home page -> 可訪問任何授權資源。

用戶重整頁面等操作 -> app 發起 refresh token request，若存於 cookie 的 refresh token 合法尚未過期，則得到新的 access token 存於 memory -> 設置 silent refresh。 若 refresh token 不合法，則跳轉到 login page。

2. 註冊流程與登入流程雷同

3. 用戶按下登出後發起 logout request -> server 清除 refresh token 的 cookie -> client 端清除 memory 中的 access token 與用戶資料，並清除 silent refresh 的 timer
