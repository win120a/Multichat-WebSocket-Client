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

// << CONNECT >>(UUID)>>>>(Name)<< CONNECT >>

/**
 * 用户注册协议消息的左半部分。
 */
const CONNECTING_GREET_LEFT_HALF = "<< CONNECT >>";

/**
 * 用户注册协议消息的中间部分。
 */
const CONNECTING_GREET_MIDDLE_HALF = ">>>>>";

/**
 * 用户注册协议消息的右半部分。
 */
const CONNECTING_GREET_RIGHT_HALF = "<< CONNECT >>";

/**
 * 客户端通知注销的请求头。
 */
const NOTIFY_LOGOFF_HEADER = "<< LOGOFF >>";

// << MESSAGE >>> <<<< (UUID) >>>> << MESSAGE >> (messageContent)
/**
 * 信息包的左半部分。
 */
const MESSAGE_HEADER_LEFT_HALF = "<< MESSAGE >>> <<<<";

/**
 * 信息包的中间部分。
 */
const MESSAGE_HEADER_MIDDLE_HALF = ">>>>>";

/**
 * 信息包的右半部分。 格式： &lt;&lt; MESSAGE &gt;&gt;&gt; &lt;&lt;&lt;&lt; (UUID)
 * &gt;&gt;&gt;&gt; &lt;&lt; MESSAGE &gt;&gt; (内容)
 */
const MESSAGE_HEADER_RIGHT_HALF = " << MESSAGE >>";

// <<< DUP ? >>> (Name)
/**
 * 用户名查询服务请求头。
 */
const CHECK_DUPLICATE_REQUEST_HEADER = "<<< DUP ? >>> ";

/**
 * 用户名查询服务响应 - 用户名已经占用
 */
const USER_NAME_DUPLICATED = ">>> DUPLICATED <<< ";

/**
 * 用户名查询服务响应 - 用户名没有占用
 */
const USER_NAME_NOT_EXIST = "<<< Clear >>>";

const WEBSOCKET_UUID_HEADER = "<WS><<";

const WEBSOCKET_UUID_TAIL = ">>";