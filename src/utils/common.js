// 전화번호에 하이픈 추가하는 함수
export function formatPhoneNumber(phoneNumber) {
    if(!phoneNumber) return;

    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    return phoneNumber.replace(
        /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
        "$1-$2-$3"
    );
}

export function removeHyphens(phoneNumber) {
    if(!phoneNumber) return;
    
    return phoneNumber.replace(/-/g, "");
}