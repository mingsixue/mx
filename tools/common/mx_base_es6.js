/******************************
** 文件描述 :  Common  Function to ES6
** 时   间 ： 2017-06-27
** 作   者 ： Vic.Wang
** E-mail： mingsixue@163.com
*******************************/

//==================== String ==================== //


//==================== Number ==================== //

//==================== Object ==================== //
/**
 * [constantize 对象彻底冻结]
 * @param  {Object} obj [description]
 */
constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
}

//==================== Array ==================== //

//==================== Date ==================== //
