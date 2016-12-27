var imageAddr = "http://127.0.0.1:3000/images/holi.png";
var downloadSize = 230832; //bytes

function XMLResquest(speed) {
    var data = { "speed" : speed};
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/json',
        data: data,
        success: function (res) {
            console.log('Success!  ' + res);
            console.log(JSON.stringify(data));
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message + ' Status: ' + status)
        }
    });

    $.post('http://localhost:3000/timestamp', function (response) {
        console.log('RESPONSE -> ');
        console.log(response);
        var res = { "value1" : response.timestamp, "value2" : (new Date()).getTime() };
        console.log(res);
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/measure_latency/',
            data: res,

            success: function (r) {
                console.log('Success!  ' + res);
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message + ' Status: ' + status)
            }
        });

    }, "json");
}

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
    window.setInterval(MeasureConnectionSpeed, 10000);
}

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    };

    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
        XMLResquest('Invalid image, or error downloading...');
    };

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage([
            "Your connection speed is:",
            speedBps + " bps",
            speedKbps + " kbps",
            speedMbps + " Mbps"
        ]);
        XMLResquest(speedKbps);
    }
}