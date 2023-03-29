
let person = {
    name1 : "홍길동",
    age : 20,
    birth : [88,5],
    country : undefined,
    say : function(){
        console.log("안녕하슈");
    }
}
console.log(person);
console.log(person.birth);
console.log(`country : ${"name1" in person }`); //person객체 안에 프로퍼티 키 찾기 true/false
console.log(person.say());

//객체
//let person1 = new Object; //생성자 방식
//let person2 = {}; //객체 리터럴 방식

//배열
let arr = new Array(1, '가', true, null, undefined, {}, []);  //배열 생성자
let arr1 = [1,2,3,4,5];  //배열 리터럴

console.log(arr1);
console.log(arr);
console.log(arr1[3]);
arr1.push("value1");//마지막에 객체 추가 in 배열
console.log(arr1);
console.log(arr1.length);


//반복문 for, while

// for (i=0; i<=5; i++){
// console.log("권현진");
// }

// i=1;
// while(i <= 3){
//     console.log("권현진");
//     i += 1
// }

//배열 반복문 순회
const arr11 = ["a", "b", "c"];
for (i=0; i < arr11.length; i++){
    console.log(arr11[i]);
}

//객체를 순회하려면?

let personKwon = {
    name: "권현진",
    height: 177,
    age: 36
};

const kwonKeys = Object.keys(personKwon);
console.log(kwonKeys);  // 프로퍼티들의 키를 배열로 반환받을 수 있다

for(i=0; i<kwonKeys.length; i++){
    const curKey1 = kwonKeys[i]; // 키들을 담고
    const curValue1 = personKwon[curKey1]; // 객체 프로퍼티들을 호출
    console.log(`${curKey1} : ${curValue1}`); //출력
}

//객체의 value들만 반환받아보자
const kwonVal = Object.values(personKwon);
console.log(kwonVal);
//순회해서 받아보자
for(i=0; i<kwonVal.length; i++){
    console.log(kwonVal[i]);
}