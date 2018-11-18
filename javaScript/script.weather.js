var app = new Vue({
    el: "#amp",
    data: {
        list: [],
        cityName: "",
        country: "",
        description: "",
        humidity: "",
        weather: "",
        tempNow: "",
        tempMax: "",
        tempMin: "",
        wind: "",
        speed: "",
        deg: "",
        rain: "",
        seaLevel: "",
        clouds: "",
        icon: "",
        coord: "",
        isLoaded: false,
        daylist: [],
        day: "",
        today: "",
        imageUrl: "",
    },
    methods: {
        //api.openweathermap.org/data/2.5/forecast?id=524901
        getData: function () {
            app.isLoaded = true;
            var name = document.getElementById("search-inputs").value;
            fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + name + "&APPID=67232071e9db3e1dc7319a426ff4f760")
                .then(response => response.json())
                .then(function (data) {
                    app.daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
                    app.list = data.list;
                    app.cityName = data.city.name;
                    app.country = data.city.country;
                    app.description = data.list[0].weather[0].description;
                    app.humidity = data.list[0].main.humidity + "%";
                    app.weather = data.list[0].weather[0].main;
                    app.tempNow = (data.list[0].main.temp - 273.15).toFixed(2) + ' C';
                    app.tempMax = (data.list[0].main.temp_max - 273.15).toFixed(2) + ' C';
                    app.tempMin = (data.list[0].main.temp_min - 273.15).toFixed(2) + ' C';
                    app.wind = data.list[0].wind;
                    app.speed = data.list[0].wind.speed;
                    app.deg = data.list[0].wind.deg;
                    app.rain = data.list[0].rain;
                    app.seaLevel = data.list[0].main.sea_level + "msnm";
                    app.coord = 'Lat: ' + data.city.coord.lat + "\n" + 'Lon: ' + data.city.coord.lon;
                    app.createIcon(data.list[0].weather[0].main);
                    app.backgroundSetter(data);
                    console.log(data);
                    app.getTheDay();
                    app.today = new Date();
                    app.day = app.today.getDay();
                })
                .catch(error => console.error('Error:', error));
        },

        backgroundSetter: function (data) {
            //            this.list = data.list;
            this.imageUrl = document.createElement("img");
            this.imageUrl.setAttribute("src", "");
            var divImage = document.getElementById("imagesall");
            if (this.weather === "Rain" && this.isLoaded) {
                this.imageUrl.setAttribute("src", "style/images/night_animated.gif");
                this.imageUrl.classList.add("imageGif");
            } else if (this.weather === "Clouds" && this.isLoaded) {
                this.imageUrl.setAttribute("src", "style/images/clouds.gif");
            } else if (this.weather === "broken clouds" && this.isLoaded) {
                this.imageUrl.setAttribute("src", "style/images/brokenClouds.gif");
                this.imageUrl.classList.add("imageGif");
            } else if (this.weather === "Snow" && this.isLoaded) {
                this.imageUrl.setAttribute("src", "style/images/snow.gif");
                this.imageUrl.classList.add("imageGif");
            } else if (this.weather === "Clear" && this.isLoaded) {
                this.imageUrl.setAttribute("src", "style/images/sunny.gif");
                this.imageUrl.classList.add("imageGif");
            } else {
                console.log("does not exist")
            }
            divImage.appendChild(this.imageUrl);
        },

        createIcon: function (weather) {
            var icon = document.createElement("i");
            var trIcon = document.getElementById("ShowIcon");
            if (this.weather == "Rain" && this.isLoaded) {
                console.log(this.weather);
                icon.setAttribute("src", "wi wi-rain");
                //   icon.classList.add("wi wi-rain");
            } else if (this.weather == "Clouds" && this.isLoaded) {
                console.log(this.weather);
                icon.setAttribute("src", "wi wi-cloud");
                // icon.classList.add("wi wi-cloud");
            } else if (this.weather == "Snow" && this.isLoaded) {
                console.log(this.weather);
                icon.setAttribute("src", "wi wi-snow");
                //   icon.classList.add("wi wi-snow");
            } else if (this.weather == "Clear" && this.isLoaded) {
                console.log(this.weather);
                icon.setAttribute("src", "wi wi-day-sunny");
                //     icon.classList.add("wi wi-day-sunny");
            } else {
                document.getElementById("ShowIcon").style.display = "none";
            }
            trIcon.appendChild(icon);
        },

        getTheDay: function (day) {
            this.today = new Date();
            var days = this.today.getDay();
            days = "";
            var items = document.createElement("div");
            var id = document.getElementById("today");
            for (var i = 0; i < this.daylist.length; i++) {
                if (days === 0) {
                    days = "Sunday"
                    console.log("today is Sunday")
                } else if (days === 1) {
                    days = "Monday"
                } else if (days === 2) {
                    days = "Tuesday"
                } else if (days === 3) {
                    days = "Wednesday"
                } else if (days === 4) {
                    days = "Thursday"
                } else if (this.day === 5) {
                    days = "Friday"
                } else if (this.day === 6) {
                    days = "Saturday";
                } else {
                    break;
                }
            }
            items.appendChild(days);
            id.appendChild(items);
        },
    },
    computed: {}
})
