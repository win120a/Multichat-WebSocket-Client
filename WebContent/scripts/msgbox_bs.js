/*
   Copyright (C) 2011-2020 Andy Cheung

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/*
 * AC Message Box library.
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