// Find my ip code
var RTCPeerConnection = window.RTCPeerConnection || webkitRTCPeerConnection || mozRTCPeerConnection;
var peerConn = new RTCPeerConnection({
    'iceServers': [{
        'urls': ['stun:stun.l.google.com:19302']
    }]

});
var dataChannel = peerConn.createDataChannel('test'); // Needs something added for some reason
peerConn.createOffer({}).then((desc) => peerConn.setLocalDescription(desc));
peerConn.onicecandidate = (e) => {
    if (e.candidate == null) {
        document.getElementById("ip").innerText = /c=IN IP4 ([^\n]*)\n/.exec(peerConn.localDescription.sdp)[1];
    }
};
// ـــــــــــــــــــــــــــــــــــ

// Location
function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
// ـــــــــــــــــــــــــــــــــــ

// What My Browser Language 

function checkLang() {
    var userLang = navigator.language || navigator.userLanguage;
    document.getElementById("language").innerHTML = userLang;
}
// ـــــــــــــــــــــــــــــــــــ

// Screen
function checkScreen() {
    var screenSize = '';

    if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }
    window.jscd = {
        screen: screenSize
    };
    (this);
    document.getElementById("screen").innerHTML = jscd.screen;

}
// ـــــــــــــــــــــــــــــــــــ

// Mobile
function checkMobile() {
    var nVer = navigator.appVersion;
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    window.jscd = {
        mobile: mobile
    };
    (this);
    document.getElementById("mobile").innerHTML = jscd.mobile;
}
// ـــــــــــــــــــــــــــــــــــ

// Cookies
function checkCookies() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
    }

    window.jscd = {
        cookies: cookieEnabled
    };
    (this);
    document.getElementById("cookies").innerHTML = jscd.cookies;
}
// ـــــــــــــــــــــــــــــــــــ

// Browser
function checkBrowser() {
    // browser
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }


    window.jscd = {
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
    };
    (this);
    document.getElementById("browser").innerHTML = jscd.browser + ' ' + jscd.browserMajorVersion + ' (' + jscd.browserVersion + ')';
}
// ـــــــــــــــــــــــــــــــــــ

// OS
function checkOS() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var unknown = '';
    var os = unknown;
    var clientStrings = [{
            s: 'Windows 10',
            r: /(Windows 10.0|Windows NT 10.0)/
        },
        {
            s: 'Windows 8.1',
            r: /(Windows 8.1|Windows NT 6.3)/
        },
        {
            s: 'Windows 8',
            r: /(Windows 8|Windows NT 6.2)/
        },
        {
            s: 'Windows 7',
            r: /(Windows 7|Windows NT 6.1)/
        },
        {
            s: 'Windows Vista',
            r: /Windows NT 6.0/
        },
        {
            s: 'Windows Server 2003',
            r: /Windows NT 5.2/
        },
        {
            s: 'Windows XP',
            r: /(Windows NT 5.1|Windows XP)/
        },
        {
            s: 'Windows 2000',
            r: /(Windows NT 5.0|Windows 2000)/
        },
        {
            s: 'Windows ME',
            r: /(Win 9x 4.90|Windows ME)/
        },
        {
            s: 'Windows 98',
            r: /(Windows 98|Win98)/
        },
        {
            s: 'Windows 95',
            r: /(Windows 95|Win95|Windows_95)/
        },
        {
            s: 'Windows NT 4.0',
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
        },
        {
            s: 'Windows CE',
            r: /Windows CE/
        },
        {
            s: 'Windows 3.11',
            r: /Win16/
        },
        {
            s: 'Android',
            r: /Android/
        },
        {
            s: 'Open BSD',
            r: /OpenBSD/
        },
        {
            s: 'Sun OS',
            r: /SunOS/
        },
        {
            s: 'Linux',
            r: /(Linux|X11)/
        },
        {
            s: 'iOS',
            r: /(iPhone|iPad|iPod)/
        },
        {
            s: 'Mac OS X',
            r: /Mac OS X/
        },
        {
            s: 'Mac OS',
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        },
        {
            s: 'QNX',
            r: /QNX/
        },
        {
            s: 'UNIX',
            r: /UNIX/
        },
        {
            s: 'BeOS',
            r: /BeOS/
        },
        {
            s: 'OS/2',
            r: /OS\/2/
        },
        {
            s: 'Search Bot',
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        }
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }



    window.jscd = {
        os: os,
        osVersion: osVersion
    };
    (this);
    document.getElementById("os").innerHTML = jscd.os + ' ' + jscd.osVersion;
}
// ـــــــــــــــــــــــــــــــــــ

// User Agent
function checkUserAgent() {
    document.getElementById("useragent").innerHTML = navigator.userAgent;
}
// ـــــــــــــــــــــــــــــــــــ

// Speed Test
// navigator.connection.downlink

function checkSpeed() {
    var imageAddr = "https://user-images.githubusercontent.com/28893833/61922983-db6bd600-af51-11e9-8486-949606a1497c.jpg";
    var downloadSize = 4995374; //bytes

    function ShowProgressMessage(msg) {
        var oProgress = document.getElementById("speedtest");
        if (oProgress) {
            var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
            oProgress.innerHTML = actualHTML;
        }
    }

    function InitiateSpeedDetection() {
        ShowProgressMessage("Loading the image, please wait...");
        window.setTimeout(MeasureConnectionSpeed, 1);
    };

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
        }

        download.onerror = function (err, msg) {
            ShowProgressMessage("Invalid image, or error downloading");
        }

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
                speedBps + " bps",
                speedKbps + " kbps",
                speedMbps + " Mbps"
            ]);
        }
    }
}
// ـــــــــــــــــــــــــــــــــــ

// <*>RUN ALL OF THEM, BABY!<*> \\
checkLang();
checkScreen();
checkMobile();
checkCookies();
checkBrowser();
checkOS();
checkUserAgent();
checkSpeed();