/*
    Copyright (C) 2011-2020 Andy Cheung

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

let ws;
let nickname;
let uuid;
let reinputDialogHandle;
let reinputNN = false;

let initWS = (host, port, nicknameToSend) => {
    ws = new WebSocket("ws://" + host + ":" + port + "/acmcs/wshandler");

    ws.onopen = function () {
        // Hide window if the user is re-inputting username.
        if (reinputNN) {
            $(reinputDialogHandle).modal("hide");
            reinputNN = false;
        }
        
        ws.send(CHECK_DUPLICATE_REQUEST_HEADER + nicknameToSend);
    };

    ws.onmessage = function (message){
        if (message.data.indexOf(WEBSOCKET_UUID_HEADER) != -1) {
            uuid = message.data.replace(WEBSOCKET_UUID_HEADER, "").replace(WEBSOCKET_UUID_TAIL, "");
            document.getElementById("chatlog").textContent += "Handshake to Server Successfully. UUID: " + uuid + "  Nickname: " + nicknameToSend + "\n";
            return;
        } else if (message.data.indexOf(USER_NAME_DUPLICATED) != -1) {
            ws.close();
            reinputDialogHandle = inputBox("提示", "用户名重复了，请重新输入昵称：", (name) => {
                reinputNN = true;
                initWS(host, port, name);
                
                return true;
            });
        } else if (message.data.indexOf(USER_NAME_NOT_EXIST) != -1) {  
            // Formally register.
            ws.send(CONNECTING_GREET_LEFT_HALF + uuid + CONNECTING_GREET_MIDDLE_HALF + nicknameToSend + CONNECTING_GREET_RIGHT_HALF);
            nickname = nicknameToSend;
        } else if (message.data.indexOf(MESSAGE_HEADER_LEFT_HALF) != -1) {
            document.getElementById("chatlog").textContent += message.data.replace(MESSAGE_HEADER_MIDDLE_HALF, ": ")
                                                            .replace(MESSAGE_HEADER_RIGHT_HALF, "")
                                                                .replace(MESSAGE_HEADER_LEFT_HALF, "") + "\n";
        } else {
            document.getElementById("chatlog").textContent += message.data + "\n";
        }
    };
}

let send = () => {
    let msg = document.getElementById("msg").value;
    ws.send(MESSAGE_HEADER_LEFT_HALF + uuid + MESSAGE_HEADER_MIDDLE_HALF + MESSAGE_HEADER_RIGHT_HALF + msg);
    $("#chatlog")[0].textContent += nickname + ": " + msg + "\n";
    $("#msg")[0].value = "";
};

let closeConnection = () => {
    ws.close();
    $("#sendButton")[0].disabled = true;
    $("#disconnectButton")[0].disabled = true;
};