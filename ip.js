function getLocalIP() {
 return new Promise(function(resolve, reject) {
   // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
   var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

   if (!RTCPeerConnection) {
     reject('Your browser does not support this API');
   }
   
   var rtc = new RTCPeerConnection({iceServers:[]});
   var addrs = {};
   addrs["0.0.0.0"] = false;
   
   function grepSDP(sdp) {
       var hosts = [];
       var finalIP = '';
       sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
           if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
               var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                   addr = parts[4],
                   type = parts[7];
               if (type === 'host') {
                   finalIP = addr;
               }
           } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
               var parts = line.split(' '),
                   addr = parts[2];
               finalIP = addr;
           }
       });
       return finalIP;
   }
   
   if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
       rtc.createDataChannel('', {reliable:false});
   };
   
   rtc.onicecandidate = function (evt) {
       // convert the candidate to SDP so we can run it through our general parser
       // see https://twitter.com/lancestout/status/525796175425720320 for details
       if (evt.candidate) {
         var addr = grepSDP("a="+evt.candidate.candidate);
         resolve(addr);
       }
   };
   rtc.createOffer(function (offerDesc) {
       rtc.setLocalDescription(offerDesc);
   }, function (e) { console.warn("offer failed", e); });
 });
}

getLocalIP().then((ipaddr) => {
    var main = document.getElementById("main-div").innerHTML = ipaddr
})
// function getIPAddress() {
//     return fetch("https://api.ipify.org/?format=json&ipv4=true")
//       .then(response => response.json())
//       .then(data => data.ip);
//   }
  
//   // Usage
//   getIPAddress()
//     .then((ipAddress) => {
//       console.log("Client IPv4 address:", ipAddress);
//     })
//     .catch((error) => {
//       console.error("Error retrieving IP address:", error);
//     });


// function getIPAddress() {
//     return fetch("https://api.ipify.org/?format=json")
//       .then(response => response.json())
//       .then(data => data.ip);
//   }
  
//   // Usage
//   getIPAddress()
//     .then((ipAddress) => {
//       console.log("Client IPv4 address:", ipAddress);
//     })
//     .catch((error) => {
//       console.error("Error retrieving IP address:", error);
//     });