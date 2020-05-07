// "3u9u4d" => 8
// function ele(str) {
//   let counter = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i + 1] === "u") {
//       counter = counter + +str[i];
//       i++;
//     }
//     if (str[i + 1] === "d") {
//       counter = counter - +str[i];
//       i++;
//     }
//   }
//   return counter;
// }

function spiralCopy(arr) {
  let hor = arr[0].length;
  let vert = arr.length;
  let newArr = [];
  //     let top= 0;
  //     let right=arr[0].length;
  // let bottom = arr.length -1;
  // let left= 0;
  while (hor != 0 && vert != 0) {
    for (let index = 0; index < hor; index++) {
      newArr.push(arr[0][index]);
    }
    hor--;
    for (let index = 1; index < vert; index++) {
      newArr.push(arr[index][hor]);
    }
    vert--;
    for (let i = hor - 1; i >= 0; i--) {
      newArr.push(arr[hor - 1][i]);
    }
    hor--;
    for (let i = vert - 1; i > 0; i--) {
      newArr.push(arr[i][0]);
    }
    vert--;
    // top++
    //   for (let i = 1; i <= hor; i++) {
    //     newArr.push(arr[vert - 1][i])
    //   }
    //   hor--
    //   for (let i = vert; i == vert; i++) {
    //     newArr.push(arr[vert][hor + 1])
    //   }
    //   for (let i = vert; i >= vert - 1; i--) {
    //     newArr.push(arr[vert][i])
    //   }
  }
  return newArr;
}
