let select = document.querySelector(".selectpaperno");
let inputs = document.querySelectorAll(".inputBox");
let arr = [];

select.addEventListener("change", () => {
  let ul = document.querySelector(".sizes ul");
  ul.innerHTML = "";
  for (let i = 0; i < Number(select.value); i++) {
    let li = document.createElement("input");
    li.classList.add(`inputBox`);
    li.classList.add(`inputBox${i + 1}`);
    ul.append(li);
  }
  inputs = document.querySelectorAll(".inputBox");
});

let btn = document.querySelector(".cal");
btn.addEventListener("click", () => {
  arr = [];
  let x = document.querySelector(".pprsize");
  let ppsize = Number(x.value);
  inputs.forEach((inp) => {
    arr.push(Number(inp.value));
  });
  let finaloutput = logicfn(arr, ppsize);

  let ul = document.querySelector(".output ul");
  ul.innerHTML = "";
  finaloutput.forEach((arr) => {
    let li = document.createElement("li");
    li.textContent = `Pairs( ${arr[0]} )   ....   Sum( ${arr[1]} )   ....   Wastase( ${arr[2]} )`;
    ul.append(li);
  });
});

// logic

const logicfn = function (arr, ppsize) {
  // let num = [48, 50, 52, 54];

  function permu(arr, arrlen) {
    let result = [];

    function rep(current, strat, dept) {
      if (current.length > 0) {
        result.push([...current]);
      }

      if (dept == arrlen) {
        return;
      }

      for (let i = strat; i < arr.length; i++) {
        current.push(arr[i]);
        rep(current, i, dept + 1);
        current.pop();
      }
    }

    rep([], 0, 0);

    return result;
    //   for (let i = 0; i < num.length; i++) {}
  }

  let output = permu(arr, 10);
  // console.log(output);
  let pairSumArr = [];

  for (let i = 0; i < output.length; i++) {
    let pair = output[i];
    let sum = output[i].reduce((el, cur) => el + cur, 0);

    pairSumArr.push([pair, sum]);
  }

  let pprsize = ppsize;

  let x = pairSumArr.filter((arr) => arr[1] >= pprsize);

  x.forEach((arr) => {
    arr[2] = arr[1] - pprsize;
  });

  let min = x.reduce((acc, curr) => {
    return acc < curr[2] ? acc : curr[2];
  }, x[0][2]);

  let y = x.filter((arr) => arr[2] <= min + 5);
  // console.log("Pair  Sum  Wastage");

  // console.log(y);
  return y;
};

