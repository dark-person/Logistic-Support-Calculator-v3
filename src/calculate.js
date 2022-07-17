import k_combinations from "./combination.js"
let data = require("./supportData.json");

const emptyObject = {
    "combination": "",
    "manpower": 0,
    "ammo": 0,
    "ration": 0,
    "part": 0,
    "quickRestoration":0, 
    "quickProduction":0, 
    "tDollContract":0, 
    "equipmentContract":0, 
    "token":0,
    "totalResource":0,
    "value": 0
}

function parseChapterState(tempState){
    // This Function is used to parse chapter state(boolean array) to readable integer list
    // Input: tempState - boolean list of chapterState
    // output: A integer list that show which chapter is selected.
    let temp = [];

    //console.log("parseChapterState - tempState = ",tempState);

    for (var i = 0; i < tempState.length ; i++){
      //console.log("parseChapterState - i=",i," bool=",tempState[i]);
      if (tempState[i]){
        temp.push(i);
      }
    }
    //console.log("temp : ",temp)
    return temp;
}

function convertToMinutes(hr,min){
    return hr*60+min;
}

export function filterSupport(state, hour, minute){
    // console.log("getFilteredSupportList - state = ",state);

    let selectedChapter = parseChapterState(state);
    // console.log("getFilteredSupportList - selectedChapter = ",selectedChapter);

    let afkTime = convertToMinutes(hour, minute);
    // console.log("afkTime = ",afkTime);

    if (afkTime === 0)
    {
      afkTime = 999999;
    }

    return data.detail.filter(item => {   
      if (selectedChapter.includes(item.chapter)){
        if (item.time <= afkTime){
            //console.log(JSON.stringify(item, null,4))
            return true;
        }
      }
      return false;
    })
}

function AddSupportData(accumulator, current) {
    if (accumulator.combination === ""){
        accumulator.combination = current.code
    } else {
        accumulator.combination +=  "," + current.code
    }

    accumulator.manpower += current.manpower
    accumulator.ammo += current.ammo
    accumulator.ration += current.ration
    accumulator.part += current.part

    accumulator.quickRestoration += current.quickRestoration
    accumulator.quickProduction += current.quickProduction
    accumulator.tDollContract += current.tDollContract
    accumulator.equipmentContract += current.equipmentContract
    accumulator.token += current.token

    accumulator.totalResource += current.manpower + current.ammo + current.ration + current.part

    return accumulator
}

function SupportDataCompare(a,b){
    if (a.value > b.value){
      return -1;
    } else if (a.value < b.value){
      return 1;
    } else if (a.value === b.value){
      if (a.totalResource > b.totalResource){
        return -1;
      } else if (a.totalResource < b.totalResource){
        return 1;
      } else {
        return 0;
      }
    }
  }

function SetWeightedValue(object, manpower_weight, ammo_weight, ration_weight, part_weight) {
    object.value = object.manpower * manpower_weight + object.ammo * ammo_weight + object.ration * ration_weight + object.part * part_weight
    return object
}

function parseSelection(selection){
    return selection.reduce(
        (accumulator, currentValue) => {
            return AddSupportData(accumulator, currentValue)
        }, structuredClone(emptyObject))    
}


export function calculateResult(filteredSupport, team, manpower, ammo, ration, part, allowZero, quickRestoration, quickProduction, dollContract, equipmentContract, token){    
    let combination = k_combinations(filteredSupport, team)  

    let parsed_list = combination.map(selection => parseSelection(selection))
    parsed_list = parsed_list.map(selection => SetWeightedValue(selection, manpower, ammo, ration, part))


    // Filter the combination if nonZero param is true
    if (!allowZero) {
        parsed_list = parsed_list.filter(item => item.manpower > 0 && item.ammo > 0 && item.ration > 0 && item.part > 0)
    }

    // Filter the combination if any minimum in-game item criteria not fullfill
    parsed_list = parsed_list.filter(item => {
        return item.quickRestoration >= quickRestoration 
            && item.quickProduction >= quickProduction
            && item.tDollContract >= dollContract
            && item.equipmentContract >= equipmentContract
            && item.token >= token 
    })

    parsed_list.sort(SupportDataCompare)
    parsed_list = parsed_list.slice(0,30)

    return parsed_list
}


// Reconstruc API, below is bugged

/*
export function calculateResult(chapterState, team, hour, minute, 
    manpower, ammo, ration, part, nonZero,
    quickRestoration, quickProduction, dollContract, equipmentContract, token){

    // Reuse the varible name
    let FormationCount = team
    let filteredSupportList = getFilteredSupportList(chapterState, hour, minute)

    console.log("filteredSupportList :",filteredSupportList)
   
    let weighting = {
        manpower: manpower,
        ammo: ammo,
        ration: ration,
        part: part,
    }

    var preResult = k_combinations(filteredSupportList,FormationCount);
    let result = [];

    preResult.forEach(selection => {
      let object = {
        "combination": "",
        "manpower": 0,
        "ammo": 0,
        "ration": 0,
        "part": 0,
        "quickRestoration":0, 
        "quickProduction":0, 
        "tDollContract":0, 
        "equipmentContract":0, 
        "token":0,
        "totalResource":0,
        "value": 0
      };
      selection.forEach(item => {
        //console.log("item : "+JSON.stringify(item,null,4));
        object.combination = (object.combination === "" ? item.code : object.combination+", "+item.code);

        object.manpower = object.manpower + item.manpower;
        object.ammo = object.ammo + item.ammo;
        object.ration = object.ration + item.ration;
        object.part = object.part + item.part;
        
        object.quickRestoration = object.quickRestoration + item.quickRestoration;
        object.quickProduction = object.quickProduction + item.quickProduction;
        object.tDollContract = object.tDollContract + item.tDollContract;
        object.equipmentContract = object.equipmentContract + item.equipmentContract;
        object.token = object.token + item.token;
      });

      object.quickRestoration = (object.quickRestoration ? object.quickRestoration : "");
      object.quickProduction = (object.quickProduction ? object.quickProduction : "");
      object.tDollContract = (object.tDollContract ? object.tDollContract : "");
      object.equipmentContract = (object.equipmentContract ? object.equipmentContract : "");
      object.token = (object.token ? object.token : "");

      object.totalResource = object.manpower+object.ammo+object.ration+object.part;
      object.value = object.manpower * weighting.manpower+
        object.ammo * weighting.ammo + object.ration * weighting.ration +
        object.part * weighting.part;

      if (object.quickRestoration >= quickRestoration &&
        object.quickProduction >= quickProduction && 
        object.tDollContract >= dollContract &&
        object.equipmentContract >= equipmentContract &&
        object.token >= token){
          result.push(object); 
      }
    });

    if (nonZero) {
      result = result.filter(object => object.manpower > 0 && object.ammo > 0 && object.ration > 0 && object.part > 0);
    }

    result.sort(compare);
    
    //result = result.slice(0,30);
    return result;
  }





  // Default Order: Desc Order
  function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] > b[property]) ? -1 :
            (a[property] < b[property]) ? 1 : 
              (a["value"] > b["value"]) ? -1 :
                (a["value"] < b["value"]) ? 1 : 0 ;
          
          // console.log("dynamicSort[",property,"(",sortOrder,")] - ",
          //   a.combination,"(",a[property],",",a.value,")","&",
          //   b.combination,"(",b[property],",",b.value,")",
          //   " Result : ",result);
          return result * sortOrder;
      }
  }

//   // Debug Usage
//   function sortCombinationList(property){
//     console.log("Received! ",property);
//     let temp = combinationList.sort(dynamicSort(property));

//     console.log("Pre-Result: ",JSON.stringify(temp,null,4));
//     return temp
//   }*/