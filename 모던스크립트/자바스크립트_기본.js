
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


//배열 내장 함수 (배열 심화편)
const arr111 = [1,2,3,4];
for(let i =0; i <arr.length; i++){
    console.log(arr111[i])
}
//내장함수로 한줄로 바꿔보자
arr111.forEach((elm)=>{console.log(elm)});

//내장함수 map을 활용해서 배열 프로퍼티에 *2를 적용해보자

const newArr = arr111.map((elm) =>{
    return elm * 2;
});
console.log(newArr);
//원본배열에 모든 요소를 순회하며 어떤 '연산'을 적용한 리턴 값들로 새로운 배열로 출력

//배열에 값이 있는지 없는지 알아보기
let number = 3;
arr111.forEach((elm1) => {
    if(elm1 === number){
        console.log(true);
    }
});
//includes 내장함수로 한줄 표현. 배열 안에 특정 프로퍼티가 있는가? true/false
console.log(arr111.includes(number));

//존재한다면 몇번째에 있는지? index 추출하기
console.log(arr111.indexOf(number));

//
const arr1111 = [
    {color: "red"},
    {color: "black"},
    {color: "blue"},
    {color: "green"}
];

console.log(arr1111.findIndex((elm)=>elm.color ==="green"));
console.log(arr1111.findIndex((elm)=>{
    return elm.color ==="black"
    })
);
//index만 반환받지만, 값까지 얻고 싶다면. 배열로 감싸면 됨.
console.log(
    arr1111[arr1111.findIndex((elm)=>{
        return elm.color ==="black"
        })
    ]
);
//아니면 함수에 담거나
const idx1 = arr1111.findIndex((elm)=> {
    return elm.color ==="blue";
});
console.log(arr1111[idx1]);

//애초에 인덱스가 아닌 요소(value)를 찾을수도 있음. find
const elm1 = arr1111.find((elm)=>{
    return elm.color === "blue";
});
console.log(elm1);

//filter :: 배열을 필터링 해봅시다 
//배열에서 '특정조건'을 만족하는 요소들을 배열로 반환받고 싶다
const arr2 = [
    {name:1, color: "red"},
    {name:2, color: "black"},
    {name:3, color: "blue"},
    {name:4, color: "green"},
    {name:5, color: "blue"}
];
console.log(arr2.filter((elm)=> elm.color ==="blue"));

//배열을 싹둘 잘라보자. index를 기준으로 자르겠지?
//slice
console.log(arr2.slice(0, 2)); //index 0번부터 2개 반환해주세요

//배열을 붙이려면?
//concat
const arr3 = [
    {name:1, color: "red"},
    {name:2, color: "black"}
];
const arr4 = [
    {name:3, color: "blue"},
    {name:4, color: "green"},
    {name:5, color: "blue"}
];
console.log(arr3.concat(arr4));

//문자열 배열을 정렬하고 싶을 때, sort
let chars = ['나', '다', '가'];
console.log(chars);
chars.sort();  // 실행하면 원본배열의 순서를 정렬해줌
console.log(chars); //순서대로 나옴

//숫자형 배열을 정렬하고 싶을 때
let numbers = [0,1,2,6,10,20,30,9,]; //숫자는 sort로 사전순 정렬이라 작은 수 대로 정렬이 제대로 안 됨.
console.log(numbers);
//이런 경우 sort메서드의 인자로 비교함수를 직접 만들어서 넣어주면 된다.
const compare = (a,b) => {
    if(a > b){
        return 1;  //클 경우에는 1 :: 뒤로보내기
    }
    if(a < b){
        return -1; //작을 경우에는 -1 :: 앞으로보내기
    }
    return 0;      //같을 경우에는 0 :: 냅두기
};  // -1, 0, 1 순으로 배열되도록 하는 조건문  (오름차순), 내림차순으로 하려면 1과 -1 숫자만 바꿔주면 됨
numbers.sort(compare);
console.log(numbers);

//배열의 모든 요소들을 문자열 요소로 합치는 함수. join
const arr5 = ["권현진", "님", "안녕하세요", "또오셨군요"];
console.log(arr5.join("==")); // ==은 이음새에 들어갈 문자





