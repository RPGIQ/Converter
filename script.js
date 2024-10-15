// تعريف الوحدات
const units = {
    length: ["meters", "kilometers", "centimeters", "millimeters", "inches", "feet", "miles"],
    weight: ["kilograms", "grams", "milligrams", "pounds", "ounces"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    volume: ["liters", "milliliters", "gallons", "quarts", "pints", "cups"],
    time: ["seconds", "minutes", "hours", "days"],
    speed: ["meters per second", "kilometers per hour", "miles per hour"],
};

// تعريف التحويلات
const conversions = {
    length: {
        meters: {
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            inches: 39.3701,
            feet: 3.28084,
            miles: 0.000621371,
        },
        kilometers: {
            meters: 1000,
            centimeters: 100000,
            millimeters: 1000000,
            inches: 39370.1,
            feet: 3280.84,
            miles: 0.621371,
        },
        centimeters: {
            meters: 0.01,
            kilometers: 0.00001,
            millimeters: 10,
            inches: 0.393701,
            feet: 0.0328084,
            miles: 0.0000062137,
        },
        millimeters: {
            meters: 0.001,
            kilometers: 0.000001,
            centimeters: 0.1,
            inches: 0.0393701,
            feet: 0.00328084,
            miles: 0.00000062137,
        },
        inches: {
            meters: 0.0254,
            kilometers: 0.0000254,
            centimeters: 2.54,
            millimeters: 25.4,
            feet: 0.0833333,
            miles: 0.0000157828,
        },
        feet: {
            meters: 0.3048,
            kilometers: 0.0003048,
            centimeters: 30.48,
            millimeters: 304.8,
            inches: 12,
            miles: 0.000189394,
        },
        miles: {
            meters: 1609.34,
            kilometers: 1.60934,
            centimeters: 160934,
            millimeters: 1609340,
            inches: 63360,
            feet: 5280,
        }
    },
    weight: {
        kilograms: {
            grams: 1000,
            milligrams: 1000000,
            pounds: 2.20462,
            ounces: 35.274,
        },
        grams: {
            kilograms: 0.001,
            milligrams: 1000,
            pounds: 0.00220462,
            ounces: 0.035274,
        },
        milligrams: {
            kilograms: 0.000001,
            grams: 0.001,
            pounds: 0.00000220462,
            ounces: 0.000035274,
        },
        pounds: {
            kilograms: 0.453592,
            grams: 453.592,
            milligrams: 453592,
            ounces: 16,
        },
        ounces: {
            kilograms: 0.0283495,
            grams: 28.3495,
            milligrams: 28349.5,
            pounds: 0.0625,
        }
    },
    temperature: {
        Celsius: {
            Fahrenheit: (c) => (c * 9) / 5 + 32,
            Kelvin: (c) => c + 273.15,
        },
        Fahrenheit: {
            Celsius: (f) => ((f - 32) * 5) / 9,
            Kelvin: (f) => ((f - 32) * 5) / 9 + 273.15,
        },
        Kelvin: {
            Celsius: (k) => k - 273.15,
            Fahrenheit: (k) => ((k - 273.15) * 9) / 5 + 32,
        }
    },
    volume: {
        liters: {
            milliliters: 1000,
            gallons: 0.264172,
            quarts: 1.05669,
            pints: 2.11338,
            cups: 4.22675,
        },
        milliliters: {
            liters: 0.001,
            gallons: 0.000264172,
            quarts: 0.00105669,
            pints: 0.00211338,
            cups: 0.00422675,
        },
        gallons: {
            liters: 3.78541,
            milliliters: 3785.41,
            quarts: 4,
            pints: 8,
            cups: 16,
        },
        quarts: {
            liters: 0.946353,
            milliliters: 946.353,
            gallons: 0.25,
            pints: 2,
            cups: 4,
        },
        pints: {
            liters: 0.473176,
            milliliters: 473.176,
            gallons: 0.125,
            quarts: 0.5,
            cups: 2,
        },
        cups: {
            liters: 0.236588,
            milliliters: 236.588,
            gallons: 0.0625,
            quarts: 0.25,
            pints: 0.5,
        }
    },
    time: {
        seconds: {
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400,
        },
        minutes: {
            seconds: 60,
            hours: 1 / 60,
            days: 1 / 1440,
        },
        hours: {
            seconds: 3600,
            minutes: 60,
            days: 1 / 24,
        },
        days: {
            seconds: 86400,
            minutes: 1440,
            hours: 24,
        }
    },
    speed: {
        "meters per second": {
            "kilometers per hour": 3.6,
            "miles per hour": 2.23694,
        },
        "kilometers per hour": {
            "meters per second": 0.277778,
            "miles per hour": 0.621371,
        },
        "miles per hour": {
            "meters per second": 0.44704,
            "kilometers per hour": 1.60934,
        }
    }
};

// عرض وحدات التحويل بناءً على نوع الوحدة
document.getElementById("unitType").addEventListener("change", function() {
    const unitType = this.value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    units[unitType].forEach(unit => {
        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        fromUnit.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        toUnit.appendChild(option2);
    });
});

// دالة تحويل الوحدات
function convertUnit() {
    const unitType = document.getElementById("unitType").value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    let result;
    if (unitType === "temperature") {
        result = conversions[unitType][fromUnit][toUnit](inputValue);
    } else {
        result = inputValue * conversions[unitType][fromUnit][toUnit];
    }

    document.getElementById("conversionResult").textContent = `Result: ${result}`;
}

// دالة لحل المعادلات الرياضية باستخدام مكتبة math.js
function solveEquation() {
    const equation = document.getElementById("equation").value;
    try {
        const result = math.simplify(equation).toString();
        document.getElementById("equationResult").textContent = `Solution: ${result}`;
    } catch (error) {
        document.getElementById("equationResult").textContent = "Error: Invalid equation";
    }
}

// دالة لإضافة الرموز إلى الحقل النصي للمعادلة
function addToEquation(value) {
    document.getElementById("equation").value += value;
}

// دالة لمسح المعادلة
function clearEquation() {
    document.getElementById("equation").value = "";
}
