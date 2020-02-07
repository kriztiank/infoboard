var functionCollection = {

    // Declare arrays for storing data
    content: [],
    activity: [],
    news: [],
    media: [],
    classRooms: [],
    classes: [],

    // Create arrays
    act_arr_1: [], // 8.15 - 9.20
    act_arr_2: [], // 9.20 - 10.30
    act_arr_3: [], // 10.30 - 11.30
    act_arr_4: [], // 12.00 - 13.00
    act_arr_5: [], // 13.00 - 14.00
    act_arr_6: [], // 14.00 - 15.15
    act_arr_7: [], // 15.15 - 16.00
    act_next: [],
    
    //Set variables
    fillArr:[],
    fillArr2:[],
    default_arr:[],
    current:"",

    // Function to save data to different arrays and then begin update
    saveData: function (data) {
        this.subject = data.subject;
        this.activity = data.activity;
        this.news = data.news;
        this.media = data.media;
        this.getAllClassRooms(this.activity);
        this.getAllClasses(this.activity);
    },

    // Function to get all classes from the api and push them to the 'classes' array
    getAllClasses: function(el){
        this.classes.length =0;
        for (var x = 0; x < el.length; x++){
            if (!this.classes.includes(el[x].class)){
                str = el[x].class;
                substr = str.substring(0, 4);
                this.classes.push(str);
            }
        }
    },


    // Function to get all classrooms and push them to the 'classroom' array
    getAllClassRooms: function(el){
        for (var x = 0; x < el.length; x++){
            if (!this.classRooms.includes(el[x].classroom)){
            this.classRooms.push(el[x].classroom);
            }
        }
    },

    // Function to fill out the rest of the grid, until there is 12 items
    fillRest: function(el, fill, fill2){
    a = el.length;
    t = 12;
    let target = t-a;
    this.fillArr = fill;
    this.fillArr2 = fill2;
    for (var x = 0; x < target; x++){
        if (x < this.fillArr.length){
            el.push(this.fillArr[x]);
            }
            else{
                if (!this.fillArr2[x] == undefined){
                el.push(this.fillArr2[x])
                }
            }
        }
    },

    // Function to sort data by time and date
    sort: function (el) {
        for (var x = 0; x < el.length; x++) {
            if (this.getItemDate(el[x].stamp) == this.getTodaysDate(1)) {
                if (this.getHours(el[x].stamp) == 8){
                    if (!this.act_next.includes(el[x])){
                    this.act_next.push(el[x]);
                }
            }
        }

            if (this.getItemDate(el[x].stamp) == this.getTodaysDate(0)) {

                // kl 8
                if (this.getHours(el[x].stamp) == 8) {
                    if (!this.act_arr_1.includes(el[x])){
                    this.act_arr_1.push(el[x]);
                    }
                }
                // kl 9
                if (this.getHours(el[x].stamp) == 9) {
                    if (!this.act_arr_2.includes(el[x])){
                    this.act_arr_2.push(el[x]);
                    }
                }
                // kl 10
                if (this.getHours(el[x].stamp) == 10) {
                    if (!this.act_arr_3.includes(el[x])){
                    this.act_arr_3.push(el[x]);
                    }
                }
                // kl 11
                if (this.getHours(el[x].stamp) == 11) {
                    if (!this.act_arr_3.includes(el[x])){
                    this.act_arr_3.push(el[x]);
                    }
                }
                // kl 12
                if (this.getHours(el[x].stamp) == 12) {
                    if (!this.act_arr_4.includes(el[x])){
                    this.act_arr_4.push(el[x]);
                    }
                }
                // kl 13
                if (this.getHours(el[x].stamp) == 13) {
                    if (!this.act_arr_5.includes(el[x])){
                    this.act_arr_5.push(el[x]);
                    }
                }
                // kl 14
                if (this.getHours(el[x].stamp) == 14) {
                    if (!this.act_arr_6.includes(el[x])){
                    this.act_arr_6.push(el[x]);
                    }
                }
                // kl 15
                if (this.getHours(el[x].stamp) == 15){
                    if (!this.act_arr_7.includes(el[x])){
                    this.act_arr_7.push(el[x]);
                    }
                }      
        }
    }
},

    // Function to determine what content to show based on currentime
    determineContent: function () {
        let hour = this.getCurrentHour();
        let min = this.getMinutes();

        if (hour <= 8 || hour == 9 && min < 20){
                this.content = this.act_arr_1, this.fillRest(this.act_arr_1, this.act_arr_2, this.act_arr_3);
        }
        if (hour == 9 && min >=20 || hour == 10 && min < 20){
                this.content = this.act_arr_2, this.fillRest(this.act_arr_2, this.act_arr_3, this.act_arr_4);
        }
        if (hour == 10 && min >=20 || hour == 11 && min < 30){
                this.content = this.act_arr_3, this.fillRest(this.act_arr_3, this.act_arr_4, this.act_arr_5);
        }
        if (hour == 11 && min >=30 || hour == 12){
                this.content = this.act_arr_4, this.fillRest(this.act_arr_4, this.act_arr_5, this.act_arr_6);
        }
        if (hour == 13){
                this.content = this.act_arr_5, this.fillRest(this.act_arr_5, this.act_arr_6, this.act_next);
        }
        if (hour == 14 || hour == 15 && min <= 15){
                this.content = this.act_arr_6, this.fillRest(this.act_arr_6, this.act_next, this.default_arr);
        }
        if (hour == 15 && min > 15 || hour > 15){
                this.content = this.act_next;
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
    getTodaysDate: function (add) {
        let date = new Date;
        let day = date.getDate() + add;
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
            this.resetArrays();
            this.sort(this.activity);
            this.determineContent();
    },

}

exports.func = functionCollection;