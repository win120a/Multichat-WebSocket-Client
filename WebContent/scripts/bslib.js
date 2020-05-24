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

/*
 * MessageBox library.
 * 
 * Use it with Bootstrap.
 * 
 */

const alertBox_html = "    <div class='modal fade' id='informationWindow_${btOk}' tabindex='-1' role='dialog' aria-hidden='true' data-backdrop='static'>\r\n"
        + "        <div class='modal-dialog' role='document'>\r\n"
        + "            <div class='modal-content'>\r\n"
        + "                <div class='modal-header'>\r\n"
        + "                    <h5 class='modal-title'>${1}</h5>\r\n"
        + "                </div>\r\n"
        + "                <div class='modal-body'>\r\n                    ${2}\r\n"
        + "                </div>\r\n"
        + "                <div class='modal-footer'>\r\n"
        + "                    <button type='button' class='btn btn-primary' data-dismiss='modal' id='abOk_${btOk}'>\r\n"
        + "                        确定\r\n"
        + "                    </button>\r\n"
        + "                </div>\r\n"
        + "            </div>\r\n" + "        </div>\r\n" + "    </div>";

let alertBox_id = 0;

let debugHTML;

let replaceAllStrings = (orig, target, replacement) => {
    let temp = orig;
    
    while (temp.indexOf(target) != -1) {
        temp = temp.replace(target, replacement);
    }
    
    return temp;
}

let alertBox = (title, msg, callback) => {
    let fHTML = alertBox_html.replace("${1}", title)
                            .replace("${2}", msg);
    
    fHTML = replaceAllStrings(fHTML, "${btOk}", alertBox_id);
    
    debugHTML = fHTML;
    
    let abElement = document.createElement("div");
    abElement.innerHTML = fHTML;
    
    document.body.appendChild(abElement);
    
    let okButton = document.getElementById(`abOk_${alertBox_id}`);
    okButton.abid = alertBox_id;
    callback.abid = alertBox_id;
    okButton.onclick = (e) => {
        if (callback()) {
            $("#informationWindow_" + e.target.abid).modal("hide");
        } else {
            e.stopPropagation();
        }
    };
    
    $(`#informationWindow_${alertBox_id}`).modal();
    
    alertBox_id++;
};

let inputBox = (title, msg, callback) => {
    alertBox(title, msg + "<br /><br /><input type='text' class='form-control' id='text_" + alertBox_id + "' required>", 
            () => { return callback($("#text_" + (alertBox_id - 1))[0].value); });
    
    return "#informationWindow_" + (alertBox_id - 1);
};