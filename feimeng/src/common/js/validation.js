/**
 * Mr.wang
 */

//验证字段不得为空
function checkCode(val,text){
    if(val=='' || val.length==0){
        alertMsg(text+'不得为空！');
        return false;
    }
    return true;
}
//验证字段长度
function checklength(val,min,max,text){
    if(!checkCode(val,text)) return false;
    if(val.length<min && min!=0 && min){
        alertMsg(text+'长度不得小于'+min+'位');
        return false;
    }
    if(val.length>max && max!=0 && max){
        alertMsg(text+'长度不得大于'+max+'位');
        return false;
    }
    return true;
}
//判断两个字段是否相同
function checkPassword(val1,val2,text){
    if(val1!=val2){
        alertMsg(text+'不相同');
        return false;
    }
    return true;
}

function checkMsgText(val,text){
    if(val=='' || val==0){
        alertMsg(text);
        return false;
    }
    return true;
}

//验证用户名
function checkUserName(val,text){
    if(!checkCode(val,text)) return false;
    if(!(/^(\d|[a-zA-Z])+$/.test(val))){
        alertMsg(text+"格式不正确，只能使用字母或数字");
        return false;
    }
    return true;
}

// 验证网址
function checkUrl(val,text){
    if(val.length!=0){
        regExp = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/
        if(!(regExp.test(val))){
            alertMsg(text+"格式不正确，请输入正确的网址!");
            return false;
        }
    }
    return true;
}

function checkPass(val,text){
    if(!checkCode(val,text)) return false;
    if((/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/.test(val)) || (/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W])([a-zA-Z0-9\W]{6,20})$/.test(val)) || (/^(?=.*[0-9])(?=.*[\W])([0-9\W]{6,20})$/.test(val)) || (/^(?=.*[a-zA-Z])(?=.*[\W])([a-zA-Z\W]{6,20})$/.test(val))){
        return true;
    }else{
        alertMsg(text+"格式不正确");
        return false;
    }
}


//验证手机号
function checkMobile(val,text){
    if(!checkCode(val,text)) return false;
    if(!(/^1[34578]\d{9}$/.test(val))){
        alertMsg(text+"格式不正确，请确认");
        return false;
    }
    return true;
}


//验证邮箱
function checkEmails(val,text){
    if(!checkCode(val,text)) return false;
    if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val))){
        alertMsg(text+"格式不正确，请确认");
        return false;
    }
    return true;
}

//验证等于固定长度
function checkEqualLength(val,length,text){
    if(!checkCode(val,text)) return false;
    if(val.length!=length){
        alertMsg(text+"长度必须是"+length+"位，请重新填写");
        return false;
    }
    return true;
}

/**
 * 验证身份证
 * @param code
 * @returns {boolean}
 */
function checkIDnumber(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!reg.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "开始两位的地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "身份证有误";
                pass =false;
            }
        }
    }
    if(!pass) alertMsg(tip);
    return pass;
}

function checkOnRequiredLength(val,max,text){
    if(val.length!=0){
        if(val.length>max){
            alertMsg(text+'长度不得大于'+max+'位');
            return false;
        }
    }
    return true;
}

