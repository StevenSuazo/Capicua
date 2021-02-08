const capitalize = (str) => {
        let parts = str.split(" ");

        for(let i = 0; i < parts.length; i++){
          // debugger
          if(parts[i] !== ""){
            parts[i] = parts[i][0].toUpperCase()+parts[i].slice(1).toLowerCase();
          }

        }
        return parts.join(" ")

}

const truncate = (str, limit) => {
  // debugger
    return str.slice(0,limit)
}


module.exports = {capitalize: capitalize, truncate: truncate};