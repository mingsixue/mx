/******************************
** 文件描述 :  Common  Function to JavaScript
** 时   间 ： 2017-06-27
** 作   者 ： Vic.Wang
** E-mail： mingsixue@163.com
*******************************/

//==================== String ==================== //
  /**
   * [trim 去除首尾空格]
   * @param  {string} str [待处理字符串]
   * @return {string}     [去掉首尾空格后字符串]
   */
  function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
  }

  /**
   * [substring 截取字符串]
   * @param  {string} str  [待截取字符串]
   * @param  {number} len  [截取长度，汉字长度要除以2]
   * @param  {string} flow [截取超出后显示，默认...]
   * @return {string}      [截取后字符串]
   */
  function substring(str, len, flow) {
      str = trim(str);
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

      if (strLength > len) newStr = trim(newStr) + flow;
      return newStr;
  }

  /**
   * [formatMoney 金额千分位格式化]
   * @param  {Number|string} num [数值]
   * @return {string}     [格式化后金额，千分位]
   */
  function formatMoney(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }

  /**
   * [formatBankcard 银行卡格式化]
   * @param  {number|string} card [银行卡号]
   * @return {string}      [格式化后的银行卡号]
   */
  function formatBankcard(card) {
    card = card + '';

    if (typeof card == 'string') {
      if (card.length === 16) {
        return card.replace(/([\d\*]{4})(?=[\*\d])/g, '$1 ');
      } else if (card.length === 19) {
        var i = card.lastIndexOf('*');
        var last = card.substr(i + 1, card.lenght);
        card = card.substr(0, i + 1);
        return card.replace(/([\d\*]{4})(?=[\*\d])/g, '$1 ') + ' ' + last;
      } else {
        return card;
      }
    } else {
      return card;
    }
  }

//==================== Number ==================== //
  /**
   * [补零]
   * @param  {number} num [数值]
   * @return {number|string}     [补零后值]
   */
  function zero(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return num
    }
  }

  /**
   * [scientificToNumber 科学计数法转换数值]
   * @param  {type} num [6e-7]
   * @return {Number}     [转换后数值]
   */
  function scientificToNumber(num) {
    var str = num.toString();
    var reg = /^(\d+)(e)([\-]?\d+)$/;
    var arr,
        len,
        zero = '';

    // 6e7 6e+7 都会自动转换数值
    if (!reg.test(str)) {
      return num;
    } else {
      // 6e-7 需要手动转换
      arr = reg.exec(str);
      len = Math.abs(arr[3]) - 1;
      for (var i = 0; i < len; i++) {
        zero += '0';
      }

      return '0.' + zero + arr[1];
    }
  }

  /**
   * [accAdd 精度求和]
   * @param  {Number} num1 [数值A]
   * @param  {Number} num2 [数值B]
   * @return {Number}      [数值A+数值B]
   */
  function accAdd(num1, num2) {
    var r1, r2, m;

    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = num2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }

    m = Math.pow(10, Math.max(r1, r2));

    return Math.round(num1 * m + num2 * m) / m;
  }

  /**
   * [accSub 精度相减]
   * @param  {Number} num1 [数值A]
   * @param  {Number} num2 [数值B]
   * @return {Number}      [数值A-数值B]
   */
  function accSub(num1, num2) {
    var r1, r2, m;

    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = num2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }

    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;

    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
  }

  /**
   * [accDiv 精度相除]
   * @param  {Number} num1 [数值A]
   * @param  {Number} num2 [数值B]
   * @return {Number}      [数值A/数值B]
   */
  function accDiv(num1, num2) {
    var t1, t2, r1, r2;

    try {
      t1 = num1.toString().split('.')[1].length;
    } catch (e) {
      t1 = 0;
    }

    try {
      t2 = num2.toString().split('.')[1].length;
    } catch (e) {
      t2 = 0;
    }

    r1 = Number(num1.toString().replace('.', ''));
    r2 = Number(num2.toString().replace('.', ''));

    return (r1 / r2) * Math.pow(10, t2 - t1);
  }

  /**
   * [accMul 精度相乘]
   * @param  {Number} num1 [数值A]
   * @param  {Number} num2 [数值B]
   * @return {Number}      [数值A*数值B]
   */
  function accMul(num1, num2) {
    var m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();

    try {
      m += s1.split('.')[1].length;
    } catch (e) {};

    try {
      m += s2.split('.')[1].length;
    } catch (e) {};

    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }

//==================== Object ==================== //


//==================== Array ==================== //

//==================== Date ==================== //
  /**
   * [dateFormat 时间/时间戳转换日期]
   * @param  {string} timer  [合法的时间格式]
   * @param  {[string]} flag   ['ymd' 'ymdhis'] default 'ymd'
   * @param  {[string]} symbol [日期连接字符] default '-'
   * @return {string}        [指定时间格式]
   */
  function dateFormat(timer, flag, symbol) {
    symbol = symbol || '-';

    var date = new Date(timer),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();

      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      h = h < 10 ? '0' + h : h;
      i = i < 10 ? '0' + i : i;
      s = s < 10 ? '0' + s : s;

      if (flag === 'ymdhis') {
        return y + symbol + m + symbol + d + ' ' + h + ':' + i + ':' + s;
      } else if (flag === 'ymdhi') {
        return y + symbol + m + symbol + d + ' ' + h + ':' + i;
      } else if (flag === 'ymd') {
        return y + symbol + m + symbol + d;
      } else if (flag === 'hi') {
        return h + ':' + i;
      }

      return y + symbol + m + symbol + d;
  }

  /**
   * [日期比较，日期A是否大于日期B]
   * @param  {date} time1 [日期A]
   * @param  {date} time2 [日期B]
   * @return {boolean}
   */
  function temporalComparison(time1, time2) {
    var date1 = new Date(time1).getTime();
    var date2 = new Date(time2).getTime();

    return date1 > date2;
  }

//==================== Validation ==================== //
  /**
   * [身份证严格验证]
   * @param  {string} val [18位身份证号码]
   * @return {boolean}     [true|false]
   */
  function strictIdNumber(val) {
    var str,
        result = 0;

    val = val.toUpperCase();

    if (val.length === 18) {
      var map1 = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var map2 = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

      str = val + '';
      for (var i = 0, len = str.length; i < (len - 1); i++) {
        result += str[i] * map1[i];
      }

      if (map2[(result % 11)] !== str[len - 1]) {
        return false;
      } else {
        return true;
      }
    }
  }

//==================== Data ==================== //
  /**
   * [设置本地数据] 使用sessionStorage，如不支持用Cookie
   * @param  {[string]} key   [键名]
   * @param  {[object]} value [键值]
   */
  function setStorage(key, value) {
    if (window.sessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      document.cookie = key + '=' + JSON.stringify(value);
    }
  }

  /**
   * [获取本地数据] 使用sessionStorage，如不支持用Cookie
   * @param  {[string]} key [键名]
   * @return {[object]}     [json对象]
   */
  function getStorage(key) {
    var value;
    if (window.sessionStorage) {
      value = sessionStorage.getItem(key);
    } else {
      var name = key + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) !== -1) {
          value = c.substring(name.length, c.length);
        }
      }
    }

    return JSON.parse(value);
  }

  /**
   * [删除本地数据] 使用sessionStorage，如不支持用Cookie
   * @param  {string} key [键名]
   */
  function removeStorage(key) {
    if (window.sessionStorage) {
      sessionStorage.removeItem(key);
    } else {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() - 1);
      document.cookie = key + ' = ' + '1' + ' ;expires = ' + oDate;
    }
  }

  //==================== DOM ==================== //
  /**
   * [getStyle 获取属性样式]
   * @param  {Object} obj  [目标对象]
   * @param  {String} attr [属性名]
   * @return {String | Number}      [属性值]
   */
  function getStyle(obj, attr) {
    //IE7/IE8浏览器 obj.currentStyle[attr]
    //标准浏览器 getComputedStyle(obj)[attr]
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
  }
