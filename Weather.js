let file =
    "https://api.openweathermap.org/data/2.5/forecast?lat=-6.200000&lon=106.816666&appid=9deb5cec2a3399104870585bb12f53ea";
fetch(file)
    .then((x) => x.json())
    .then((y) => {
        let listDatetime = y.list;

        const kota = y.city.name;

        let date_past = "";

        let listTempt = [];
        let listFinal = [];

        listDatetime.map((data) => {
            let date = data.dt_txt.split(" ");
            let date_now = date[0];

            if (date_now == date_past) {
                listTempt.push(data.main.temp);
            } else {
                if (date_past == "") {
                    date_past = date_now;
                    listTempt.push(data.main.temp);
                } else {
                    let tempTotal = 0;
                    let tempAvg = 0;

                    listTempt.forEach((numData) => {
                        tempTotal += numData;
                    });
                    tempAvg = tempTotal / listTempt.length;

                    let nowDate = date_past.split("-");
                    let numDate = nowDate[2];
                    let monthDate = dateToMonth(nowDate[1]);

                    let day = new Date(`${numDate} ${monthDate}, ${nowDate[0]}`);
                    let dayNow = day.getDay();
                    dayNow = getTheDay(dayNow);

                    let tempFinal = tempAvg - 273.15;

                    data = {
                        date: `${dayNow}, ${numDate} ${monthDate} ${nowDate[0]}`,
                        temp: tempFinal.toFixed(2),
                    };

                    listFinal.push(data);

                    date_past = date_now;
                    listTempt = [];
                }
            }
        });

        console.log(`Forecast Weather ${kota} : `);

        listFinal.forEach((data) => {
            console.log(`${data.date}: ${data.temp}℃`);
        });
    });

function dateToMonth(date) {
    let lMonth = [
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
    let month = lMonth[parseInt(date) - 1];

    return month;
}

function getTheDay(day) {
    let lDay = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    return lDay[parseInt(day)];
}
