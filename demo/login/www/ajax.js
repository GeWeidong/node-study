function _jsonToString(json){
    if(json == null || json == undefined) {
        return null;
    }
    var result = '';
    var query = [];
    for(var key in json) {
        query.push(key + '=' + json[key]);
    }
    if(query.length > 0) {
        return result + '?' + query.join('&');
    }
    return null;
};

// 封装的ajax方法
function ajaxGet(URL, queryJSON, callback) {
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
    }
    // 必须携带cookie
    xhr.withCredentials = true;
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                callback(null,JSON.parse(xhr.responseText));
            }else{
                callback(new Error("没有找到请求的文件"), undefined);
            }
        }
    };
    var querystring = _jsonToString(queryJSON);
    URL = querystring ? (URL + querystring) : URL;
    xhr.open('get',URL,true);
    xhr.send(null);
}