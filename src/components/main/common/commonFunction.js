

export const getDate = (date) => {
    var d = new Date(date);

    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

export const getTime = (date) => {
    var d = new Date(date);

    let minutes =
        d.getMinutes().toString().length === 1
            ? "0" + d.getMinutes()
            : d.getMinutes();
    let hours =
        d.getHours().toString().length === 1 ? "0" + d.getHours() : d.getHours();
    let ampm = d.getHours() >= 12 ? " PM" : " AM";

    return (hours >= 12 ? hours - 12 : hours) + ":" + minutes + ampm;
}


