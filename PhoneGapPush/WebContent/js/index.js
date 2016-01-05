/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var push = PushNotification.init({
            "android": {
                "senderID": "1234567890"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"}, 
            "windows": {} 
        });
        
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").innerHTML = "ID: "+data.registrationId+"<BR>"+
            
            
           'Device Model: '    + device.model    + '<br />' +
            'Device Cordova: '  + device.cordova  + '<br />' +
            'Device Platform: ' + device.platform + '<br />' +
            'Device UUID: '     + device.uuid     + '<br />' +
            'Device Version: '  + device.version  + '<br />';


            
            
            $.ajax({url: "http://pjomyjobs.azurewebsites.net/regPushID.php?User=Paul"+ new Date().today() + " @ " + new Date().timeNow()+"&PushID="+data.registrationId+"&DeviceModel="+device.model+"&CodovaVersion="+device.cordova+"&DevicePlatform="+device.platform+"&DeviceUUID="+device.uuid+"&DeviceVersion="+device.version});
      
            console.log(JSON.stringify(data));
        });

        
        push.on('notification', function(data) {
        	console.log("notification event");
        	//navigator.notification.beep(4);
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var card = '<div class="row">' +
		  		  '<div class="col s12 m6">' +
				  '  <div class="card darken-1">' +
				  '    <div class="card-content black-text">' +
				  '      <span class="card-title black-text">' + data.additionalData.alertType + '</span>' +
				  
				  '      <p>' + data.message + '</p>' +
				  '      <p>P1' + data.additionalData.alertType + '</p>' +
				  '      <p>P2' + data.additionalData.alertContent + '</p>' +
				 
				  '    </div>' +
				  '  </div>' +
				  ' </div>' +
				  '</div>';
            cards.innerHTML += card;
            
            push.finish(function () {
                console.log('finish successfully called');
                push.setApplicationIconBadgeNumber(function(){}, function(){}, 0);
            });
        });

        push.on('error', function(e) {
            console.log("push error");
        });
    }
};

app.initialize();