
export const fieldLabel = {
    combination: "後勤組合",
    manpower: "人力/次",
    ammo: "彈藥/次",
    ration: "口糧/次",
    part: "零件/次",
    quickRestoration: "快修",
    quickProduction: "快造",
    tDollContract: "人形契約",
    equipmentContract: "裝備契約",
    token: "採購幣",
    value: "值",
    totalResource: "資源總量"
}

const getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 200
    const magicSpacing = 20
      const cellLength = Math.max(
        ...rows.map(row => (`${row[accessor]}` || '').length),
          headerText.length,
        )
      return Math.min(maxWidth, cellLength * magicSpacing)+1
  }

export const getStyleSheet = (raw_data, field_name) =>  {
    if (field_name === 'combination'){
        return {
            minWidth: getColumnWidth(raw_data, field_name, fieldLabel[field_name]),
            width: "100%"
        }
    } else {
        return {
            minWidth: getColumnWidth(raw_data, field_name, fieldLabel[field_name]+ "▲"),
            width: "100%",
            textAlign: "center"
        }
    }
}

// Default Order: Desc Order
export function dynamicSort(property) {
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