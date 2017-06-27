/******************************
** 文件描述 :  Common  Function to jQuery
** 时   间 ： 2017-06-27
** 作   者 ： Vic.Wang
** E-mail： mingsixue@163.com
*******************************/

//==================== String ==================== //
/**
 * [substring 截取字符串]
 * @param  {string} str  [待截取字符串]
 * @param  {number} len  [截取长度，汉字长度要除以2]
 * @param  {string} flow [截取超出后显示，默认...]
 * @return {string}      [截取后字符串]
 */
function substring(str, len, flow) {
    str = $.trim(str);
    if (!str) return '';
    str = str.toString();
    var newStr = '',
        strLength = str.replace(/[^\x00-\xff]/g, '**').length,
        flow = typeof(flow) == 'undefined' ? '…' : flow;
    if (strLength <= len + (strLength % 2 == 0 ? 2 : 1)) return str;
    for (var i = 0, newLength = 0, singleChar; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(/[^\x00-\xff]/g) != null) newLength += 2;
        else newLength++;

        if (newLength > len) break;
        newStr += singleChar;
    }

    if (strLength > len) newStr = $.trim(newStr) + flow;
    return newStr;
}

//==================== Number ==================== //

//==================== Object ==================== //
function serializeObject($form) {
  var arr = $form.serializeArray(),
      obj = {};

  $.each(arr, function(index, param) {
      obj[param.name] = param.value || '';
  });
  return obj;
}

//==================== Array ==================== //

//==================== Date ==================== //
