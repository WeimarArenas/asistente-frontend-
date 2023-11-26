const FormatFecha = (fecha) => {
    if (!fecha) return "";
  
    const dateObject = new Date(fecha);
    const year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();
  
    // Agrega un cero delante del mes y el día si son menores que 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

export { FormatFecha };
