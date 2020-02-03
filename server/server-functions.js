var functionCollection = {

    // Declare arrays for storing data
    content: [],
    activity: [],
    news: [],
    medie: [],

    // Function to save data to different arrays and then begin update
    saveData: function (data) {
        this.subject = data.subject;
        this.activity = data.activity;
        this.news = data.news;
        this.medie = data.medie;
        this.update();
    },

    // Create arrays
    act_arr_1: [], // 8.15 - 9.20
    act_arr_2: [], // 9.20 - 10.30
    act_arr_3: [], // 10.30 - 11.30
    act_arr_4: [], // 12.00 - 13.00
    act_arr_5: [], // 13.00 - 14.00
    act_arr_6: [], // 14.00 - 15.15
    act_arr_7: [], // 15.15 - 16.00

    // Function to sort data by time and date
    sort: function (el) {
        for (var x = 0; x < el.length; x++) {
            //console.log(getItemDate(act.daTime) + " " + getTodaysDate())

            if (this.getItemDate(el[x].stamp) == this.getTodaysDate()) {

                // kl 8
                if (this.getHours(el[x].stamp) == 8) {
                    this.act_arr_1.push(el[x]);
                }
                
                // kl 9
                if (this.getHours(el[x].stamp) == 9) {
                    this.act_arr_2.push(el[x]);
                }

                // kl 10
                if (this.getHours(el[x].stamp) == 10) {
                    this.act_arr_3.push(el[x]);
                }

                // kl 11
                if (this.getHours(el[x].stamp) == 11) {
                    this.act_arr_3.push(el[x]);
                }
                // kl 12
                if (this.getHours(el[x].stamp) == 12) {
                    this.act_arr_4.push(el[x]);
                }
                // kl 13
                if (this.getHours(el[x].stamp) == 13) {
                    this.act_arr_5.push(el[x]);
                }
                // kl 14
                if (this.getHours(el[x].stamp) == 14) {
                    this.act_arr_6.push(el[x]);
                }
                // kl 15
                if (this.getHours(el[x].stamp) == 15){
                    this.act_arr_7.push(el[x]);
                }
            }
        };
    },

    // Function to determine what content to show based on currentime
    determineContent: function () {
        var hour = this.getCurrentHour();
        var min = this.getMinutes();
        console.log("Server updated at hour: " + hour + "Min: " + min );
        if (hour == 8 || hour == 9 && min < 20){
            this.content = this.act_arr_1;
        }
        if (hour == 9 && min >=20 || hour == 10 && min < 30){
                this.content = this.act_arr_2;
        }
        if (hour == 10 && min >=30 || hour == 11 && min < 30){
                this.content = this.act_arr_3;
        }
        if (hour == 11 && min >=30 || hour == 12){
                this.content = this.act_arr_4;
        }
        if (hour == 13){
                this.content = this.act_arr_5;
        }
        if (hour == 14){
                this.content = this.act_arr_6;
        }
        if (hour == 15 && min > 15){
                this.content = this.act_arr_7;
        }
    },

    // Function to get the current hour of the item
    getHours: function (time, add = 0) {
        let date = new Date(time * 1000);
        let hours = date.getHours() + add;
        let formatted = hours;
        return formatted;
    },

    // Function to get the current hour of the item
    getMinutes: function () {
        let date = new Date();
        let min = date.getMinutes();
        let formatted = min;
        return formatted;
    },

    // Function to get the current date on the item in d/m/y
    getItemDate: function (time) {
        let date = new Date(time * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formatted = day + "/" + month + "/" + year;
        return formatted;
    },

    // Function to get the current time of the day
    getCurrentHour: function () {
        let date = new Date;
        let hours = date.getHours();
        let formatted = hours;
        return formatted;
    },

    // Function that returns the current date in format d/m/y
    getTodaysDate: function () {
        let date = new Date;
        let shift = 0;
        if (this.getCurrentHour() > 16){
            shift = 1;
            console.log("Day shifted");
        }
        let day = date.getDate() + shift;
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formatted = day + "/" + month + "/" + year;
        return formatted;
    },

    // Function to clear all arrays upon update
    resetArrays: function () {
        this.act_arr_1.length = 0;
        this.act_arr_2.length = 0;
        this.act_arr_3.length = 0;
        this.act_arr_4.length = 0;
        this.act_arr_5.length = 0;
        this.act_arr_6.length = 0;
    },

    // Update loop that resets arrays, sorts the data and determines what to show.
    update: function () {
        setInterval(() => {
            this.resetArrays();
            this.sort(this.activity);
            this.determineContent();
        }, 500);
    }

}

exports.func = functionCollection;