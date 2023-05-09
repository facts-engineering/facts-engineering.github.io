function Category(name, moduleList) {
    this.name = name;
    this.modules = new Array();
    for (let i = 0; i < moduleList.length; i++) {
        this.modules.push(moduleList[i]);
    }
}

function SidebarLink(name, url) {
    this.name = name;
    this.url = url;
}

// To add configuration data to a module's page, you simply define its config property with an array
// of Property objects. 

// Config declarations begin below the modules array.

// The links array contains a "Link" object with a title and URL for every
// link that will be generated on the top segment of the sidebar.
// Unlike other auto-generated links, local paths are not adjusted
// based on the page. Ensure you use absolute paths to avoid causing
// issues.

let sidebarLinks = [
    new SidebarLink("Home", "/"),
	new SidebarLink("FAQs", "/faqs.html"),
	new SidebarLink("API Reference", "/api_reference.html"),
    new SidebarLink("Module Configuration Tool", "/config.html")
	
];

// The modules array is filled with a category object for each category on the sidebar
// Each category object requires a name, and an array of module objects.
// Each module object consists of a module name and a imageWidth property
// for its page. Ensure all names of each module, its page, its containing folder, 
// and its image all match. Images should be named "MODULENAME_STRAIGHTON.png"
// Example: P1-08NA_STRAIGHTON.png

let modules = [
    new Category("CPUs and Shields", [{
        name: "P1AM-100",
        imageWidth: "150px"
	}, {
        name: "P1AM-ETH",
        imageWidth: "180px"
	}, {
        name: "P1AM-GPIO",
        imageWidth: "180px"
	}, {
        name: "P1AM-PROTO",
        imageWidth: "160px"
    }, {
        name: "P1AM-SERIAL",
        imageWidth: "160px"
    }]),
    new Category("Discrete Input Modules", [{
        name: "P1-08NA",
        imageWidth: "300px"
    }, {
        name: "P1-08ND3",
        imageWidth: "180px"
    }, {
		name: "P1-16ND3",
        imageWidth: "300px"
    }, {
        name: "P1-08NE3",
        imageWidth: "300px"
	}, {
        name: "P1-16NE3",
        imageWidth: "300px"
    }, {
        name: "P1-08SIM",
        imageWidth: "180px"
    }]),
    new Category("Discrete Output Modules", [{
        name: "P1-08TA",
        imageWidth: "300px"
    }, {
        name: "P1-08TD1",
        imageWidth: "180px"
    }, {
		name: "P1-15TD1",
        imageWidth: "300px"
    }, {
        name: "P1-08TD2",
        imageWidth: "180px"
    }, {
        name: "P1-15TD2",
        imageWidth: "300px"
    }, {
		name: "P1-08TRS",
        imageWidth: "200px"
    }, {
        name: "P1-16TR",
        imageWidth: "200px"
    }]),
    new Category("Discrete Combo Modules", [{
        name: "P1-15CDD1",
        imageWidth: "150px"
    }, {
        name: "P1-15CDD2",
        imageWidth: "150px"
    }, {
        name: "P1-16CDR",
        imageWidth: "150px"
    }]),
    new Category("Analog Input Modules", [{
		name: "P1-04AD",
        imageWidth: "130px"
    }, {
        name: "P1-04AD-1",
        imageWidth: "180px"
    }, {
        name: "P1-04ADL-1",
        imageWidth: "180px"
    }, {
        name: "P1-08ADL-1",
        imageWidth: "150px"
    }, {
        name: "P1-04AD-2",
        imageWidth: "180px"
    }, {
        name: "P1-04ADL-2",
        imageWidth: "180px"
	}, {
        name: "P1-08ADL-2",
        imageWidth: "150px"
    }, {
        name: "P1-04NTC",
        imageWidth: "180px"
    }, {
        name: "P1-04RTD",
        imageWidth: "180px"
    }, {
        name: "P1-04THM",
        imageWidth: "180px"

    }]),
    new Category("Analog Output Modules", [{
        name: "P1-04DAL-1",
        imageWidth: "180px"
    }, {
		name: "P1-08DAL-1",
        imageWidth: "140px"
    }, {
        name: "P1-04DAL-2",
        imageWidth: "180px"
    }, {
        name: "P1-08DAL-2",
        imageWidth: "130px"
    }]),
    new Category("Analog Combo Modules", [{
        name: "P1-4ADL2DAL-1",
        imageWidth: "180px"
    }, {
        name: "P1-4ADL2DAL-2",
        imageWidth: "180px"
    }]),
    new Category("Specialty Modules", [{
        name: "P1-04PWM",
        imageWidth: "300px"
	}, {
        name: "P1-02HSC",
        imageWidth: "150px"	
    }])
];

function getPageByName(name) {
    for (let i = 0; i < modules.length; i++) {
        for (let j = 0; j < modules[i].modules.length; j++) {
            if (modules[i].modules[j].name === name) {
                return modules[i].modules[j];
            }
        }
    }
}

const globalProperty = 0; // property affects entire module
const channelProperty = 1; // property specific to each individual channel
const channelEnable = 2; // property controls which channels are enabled
const reservedField = 3; // property consists of reserved bytes

// Each property on a module needs a type (above), a name (for its label)
// an options array/object (varies depending on type), and the amount
// of bytes the property takes up (almost always 1 or 2).

function Property(type, name, options, bytes) {
    this.type = type;
    this.name = name;
    this.options = options;
    this.bytes = bytes;
}

// A config is just an array of Property objects, so first you should create
// array to populate. In this case, P104NTC.

// the push array method adds the argument to the end of the array it is used on.
// we continue pushing Property objects into the array until we are done.
// The order you do this in only matters on a per-property basis.
// ie. globalProperties in order, channelProperties in order.

/******************************* THE OPTIONS PARAMETER *******************************/
// The options array/option is the most important part of the tool.
// It is different for each Property type.

    /***** channelEnable *****/
// For channelEnable Properties the "options" parameter is an object with two properties.
// "start" and "delimeter". "start" is the beginning value of the 
// property. "delimeter" is the increment for every extra channel
// enabled past the start.

    /***** globalProperty *****/
// For globalProperty Properties, the "options" parameter is an array filled with
// objects similar to the modules array. 
// Each object in this array has a "name" property, which is the name
// of the option in the dropdown, and a "value" property, which is the
// value associated with that property.

// To specify a property as the default state, add "!!!" to the beginning of
// its name.

    /***** channelProperty *****/
// For channelProperty Properties, the "options" parameter is an object
// with two properties. The "values" property is an array filled with
// objects. This is the same as the globalProperty array where each
// object in the array has a "name" property and a "value" property.
// HOWEVER, the "value" property should only include what changes consistently
// across every channel. 
// Example: if an option has a value of 0x2105 on channel 1 and 2205 on channel
// 2, you would put 5 as the value.

// The channels property is just an array of Strings. Each array value should be
// the channel value before its option has been added. 
// In the above example, this means you would put 2100 on channel 1 and 2200
// on channel 2.

    /***** reservedField *****/
// For reservedField Properties, the "options" parameter is just the byte in
// the config array where the field starts. 

/******************************* THE OPTIONS PARAMETER *******************************/

// After the Property array has been fully populated, you just need to add
// it to its respective module object and ensure its defined with the correct
// number of channels. 
// To access the module, use getPageByName() with its name as the parameter.
// Let's use the P1-04NTC as an example:
// Let's say the array we pushed all of our Properties into is called P104NTC.

// getPageByName("P1-04NTC").config = P104NTC;
// getPageByName("P1-04NTC").channels = 4;

// And we're done. The tool will do the rest. 
// Use the modules below as examples (or just copy and paste from) if you are confused.

//ENSURE EVERY MODULE'S CONFIG ARRAY HAS A DIFFERENT NAME.

let P104NTC = new Array();
P104NTC.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

P104NTC.push(new Property(globalProperty, "Burnout and Units", [{
    name: "Low Side Burnout (min scale)/Temp in °C",
    value: "6001"
}, {
    name: "High Side Burnout (max scale)/Temp in °C",
    value: "6003"
}, {
    name: "!!!Low Side Burnout (min scale)/Temp in °F",
    value: "6005"
}, {
    name: "High Side Burnout (max scale)/Temp in °F",
    value: "6007"
}], 2));

P104NTC.push(new Property(globalProperty, "Range", [{
    name: "!!!2252",
    value: "2000"
}, {
    name: "10K-AN",
    value: "2001"
}, {
    name: "10K-CP",
    value: "2002"
}, {
    name: "5K",
    value: "2003"
}, {
    name: "3K",
    value: "2004"
}, {
    name: "1.8K",
    value: "2005"
}], 2));

P104NTC.push(new Property(globalProperty, "Digital Filter", [{
    name: "!!!33Hz/16bit/61ms",
    value: "8000"
}, {
    name: "470Hz/14bit/4ms",
    value: "8001"
}], 2));

getPageByName("P1-04NTC").config = P104NTC;
getPageByName("P1-04NTC").channels = 4;

let P104RTD = new Array();
P104RTD.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

P104RTD.push(new Property(globalProperty, "Burnout and Units", [{
    name: "Low Side Burnout (min scale)/Temp in °C",
    value: "6001"
}, {
    name: "High Side Burnout (max scale)/Temp in °C",
    value: "6003"
}, {
    name: "!!!Low Side Burnout (min scale)/Temp in °F",
    value: "6005"
}, {
    name: "High Side Burnout (max scale)/Temp in °F",
    value: "6007"
}], 2));

P104RTD.push(new Property(globalProperty, "Range", [{
    name: "jPt100",
    value: "2000"
}, {
    name: "!!!Pt100",
    value: "2001"
}, {
    name: "Pt1000",
    value: "2002"
}, {
    name: "10Ω Cu",
    value: "2003"
}, {
    name: "25Ω Cu",
    value: "2004"
}, {
    name: "120Ω Ni",
    value: "2005"
}, {
    name: "0-193.3125Ω",
    value: "2006"
}, {
    name: "0-10KΩ",
    value: "2007"
}, {
    name: "0-6.25KΩ",
    value: "2008"
}, {
    name: "0-3.125KΩ",
    value: "2009"
}, {
    name: "0-1.563KΩ",
    value: "200A"
}, {
    name: "0-781.25Ω",
    value: "200B"
}, {
    name: "0-390.625Ω",
    value: "200C"
}], 2));

P104RTD.push(new Property(globalProperty, "Digital Filter", [{
    name: "!!!33Hz/16bit/61ms",
    value: "8000"
}, {
    name: "470Hz/14bit/4ms",
    value: "8001"
}], 2));

getPageByName("P1-04RTD").config = P104RTD;
getPageByName("P1-04RTD").channels = 4;

let P104THM = new Array();
P104THM.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

P104THM.push(new Property(globalProperty, "Burnout and Units", [{
    name: "Low Side Burnout (min scale)/Temp in °C",
    value: "6001"
}, {
    name: "High Side Burnout (max scale)/Temp in °C",
    value: "6003"
}, {
    name: "!!!Low Side Burnout (min scale)/Temp in °F",
    value: "6005"
}, {
    name: "High Side Burnout (max scale)/Temp in °F",
    value: "6007"
}], 2));

P104THM.push(new Property(channelProperty, "Range", {
    values: [{
        name: "!!!J",
        value: "0",
    }, {
        name: "K",
        value: "1"
    }, {
        name: "E",
        value: "2"
    }, {
        name: "R",
        value: "3"
    }, {
        name: "S",
        value: "4"
    }, {
        name: "T",
        value: "5"
    }, {
        name: "B",
        value: "6"
    }, {
        name: "N",
        value: "7"
    }, {
        name: "C",
        value: "8"
    }, {
        name: "0-39mV",
        value: "9"
    }, {
        name: "+/-39mV",
        value: "A"
    }, {
        name: "+/-78mV",
        value: "B"
    }, {
        name: "0-156mV",
        value: "C"
    }, {
        name: "+/-156mV",
        value: "D"
    }, {
        name: "0-1.25V",
        value: "E"
    }],
    channels: [
        "2100",
        "2200",
        "2300",
        "2400"
    ]
}, 2));

P104THM.push(new Property(reservedField, "Reserved", 12, 2));
P104THM.push(new Property(reservedField, "Reserved", 14, 2));
P104THM.push(new Property(reservedField, "Reserved", 16, 2));
P104THM.push(new Property(reservedField, "Reserved", 18, 2));

getPageByName("P1-04THM").config = P104THM;
getPageByName("P1-04THM").channels = 4;

let P104AD = new Array();
P104AD.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

P104AD.push(new Property(channelProperty, "Range", {
    values: [{
        name: "± 10V",
        value: "0",
    }, {
        name: "0-10V",
        value: "1"
    }, {
        name: "0-5V",
        value: "2"
    }, {
        name: "!!!0-20mA",
        value: "3"
    }, {
        name: "± 5V",
        value: "4"
    }],
    channels: [
        "2000",
        "2100",
        "2200",
        "2300"
    ]
}, 2));

P104AD.push(new Property(reservedField, "Reserved", 2, 2));
P104AD.push(new Property(reservedField, "Reserved", 6, 2));
P104AD.push(new Property(reservedField, "Reserved", 10, 2));
P104AD.push(new Property(reservedField, "Reserved", 14, 2));

getPageByName("P1-04AD").config = P104AD;
getPageByName("P1-04AD").channels = 4;

let P104PWM = new Array();

P104PWM.push(new Property(channelProperty, "Range", {
    values: [{
        name: "!!!PWM",
        value: "0",
    }, {
        name: "DIR",
        value: "4"
    }],
    channels: [
        "02",
        "02",
        "02",
        "02"
    ]
}, 1));

getPageByName("P1-04PWM").config = P104PWM;
getPageByName("P1-04PWM").channels = 4;

let P104AD1 = new Array();

P104AD1.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

getPageByName("P1-04AD-1").config = P104AD1;
getPageByName("P1-04AD-1").channels = 4;

let P104ADL1 = new Array();

P104ADL1.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

getPageByName("P1-04ADL-1").config = P104ADL1;
getPageByName("P1-04ADL-1").channels = 4;

let P104AD2 = new Array();

P104AD2.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

getPageByName("P1-04AD-2").config = P104AD2;
getPageByName("P1-04AD-2").channels = 4;


let P104ADL2 = new Array();

P104ADL2.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

getPageByName("P1-04ADL-2").config = P104ADL2;
getPageByName("P1-04ADL-2").channels = 4;

let P108ADL1 = new Array();

P108ADL1.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

getPageByName("P1-08ADL-1").config = P108ADL1;
getPageByName("P1-08ADL-1").channels = 8;

let P108ADL2 = new Array();

P108ADL2.push(new Property(channelEnable, "Enabled", {
    start: "4000",
    delimeter: 1
}, 2));

getPageByName("P1-08ADL-2").config = P108ADL2;
getPageByName("P1-08ADL-2").channels = 8;