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

    // Function to sort data by time and date
    sort: function (el) {
        for (var x = 0; x < el.length; x++) {

            if (this.getItemDate(el[x].stamp) == this.getTodaysDate()) {

                if (this.getHours(el[x].stamp) == 8) {
                    this.act_arr_1.push(el[x]);
                }
                if (this.getHours(el[x].stamp) == 9) {
                    this.act_arr_2.push(el[x]);
                }
                if (this.getHours(el[x].stamp) == 10) {
                    this.act_arr_3.push(el[x]);
                }
                if (this.getHours(el[x].stamp) == 11) {
                    this.act_arr_3.push(el[x]);
                }
                if (this.getHours(el[x].stamp) == 12) {
                    this.act_arr_4.push(el[x]);
                }
                if (this.getHours(el[x].stamp) == 13) {
                    this.act_arr_5.push(el[x]);
                }
                if (this.getHours(el[x].stamp) == 14) {
                    this.act_arr_6.push(el[x]);
                }
            }
        };
    },

    // Function to determine what content to show based on currentime
    determineContent: function () {
        var hour = this.getCurrentHour();
        //console.log("Server updated at: " + new Date)
        switch (hour) {
            case 8:
                this.content = this.act_arr_1;
                break;

            case 9:
                this.content = this.act_arr_2;
                break;

            case 10:
                this.content = this.act_arr_3;
                break;

            case 11:
                this.content = this.act_arr_4;
                break;

            case 12:
                this.content = this.act_arr_4;
                break;

            case 13:
                this.content = this.act_arr_5;
                break;

            case 14:
                this.content = this.act_arr_6;
                break;

            default:
                this.content = this.act_arr_1;
                
                break;
        }
    },

    // Function to get the current hour of the item
    getHours: function (time, add = 0) {
        var date = new Date(time * 1000);
        var hours = date.getHours() + add;
        var formatted = hours;
        return formatted;
    },

    // Function to get the current date on the item in d/m/y
    getItemDate: function (time) {
        var date = new Date(time * 1000);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formatted = day + "/" + month + "/" + year;
        return formatted;
    },

    // Function to get the current time of the day
    getCurrentHour: function () {
        var date = new Date;
        var hours = date.getHours();
        var formatted = hours;
        return formatted;
    },

    // Function that returns the current date in format d/m/y
    getTodaysDate: function () {
        var date = new Date;
        let shift = 0;
        if (this.getCurrentHour() > 16){
            shift = 1;
            console.log("Day shifted");
        }
        var day = date.getDate() + shift;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formatted = day + "/" + month + "/" + year;
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