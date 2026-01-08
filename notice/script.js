// Notice Generator Logic

const noticeTypes = {
  'cheque-bounce': {
    title: 'Cheque Bounce Notice',
    icon: 'banknote',
    description: 'Under Section 138 of Negotiable Instruments Act, 1881',
    fields: [
      { id: 'receiverName', label: 'Recipient Name', type: 'text', placeholder: 'e.g. Rahul Sharma' },
      { id: 'chequeNumber', label: 'Cheque Number', type: 'text', placeholder: 'e.g. 123456' },
      { id: 'chequeDate', label: 'Cheque Date', type: 'date' },
      { id: 'chequeAmount', label: 'Cheque Amount', type: 'number', placeholder: 'e.g. 50000' },
      { id: 'bankName', label: 'Drawn Bank Name', type: 'text', placeholder: 'e.g. ICICI Bank' },
      { id: 'depositDate', label: 'Date of Deposit', type: 'date' },
      { id: 'returnDate', label: 'Date of Return (Memo)', type: 'date' },
      { id: 'reason', label: 'Reason for Dishonour', type: 'select', options: ['Insufficient Funds', 'Signature Mismatch', 'Account Closed', 'Stop Payment', 'Refer to Drawer'] }
    ]
  },
  'money-recovery': {
    title: 'Money Recovery Notice',
    icon: 'coins',
    description: 'Recovery of outstanding dues/debts with interest',
    fields: [
      { id: 'receiverName', label: 'Recipient Name', type: 'text', placeholder: 'e.g. Priya Gupta' },
      { id: 'amount', label: 'Total Amount Due', type: 'number', placeholder: 'e.g. 100000' },
      { id: 'dueDate', label: 'Original Due Date', type: 'date' },
      { id: 'interestRate', label: 'Agreed Interest Rate (%)', type: 'number', placeholder: 'e.g. 12' },
      { id: 'description', label: 'Description of Debt/Service', type: 'textarea', placeholder: 'e.g. Unpaid invoices for project XYZ...' }
    ]
  },
  'consumer-case': {
    title: 'Consumer Dispute Notice',
    icon: 'shopping-cart',
    description: 'Notice under Consumer Protection Act, 2019',
    fields: [
      { id: 'receiverName', label: 'Company/Seller Name', type: 'text', placeholder: 'e.g. Amazon / Samsung Store' },
      { id: 'productName', label: 'Product/Service Name', type: 'text', placeholder: 'e.g. LED TV / Smart Phone' },
      { id: 'invoiceNumber', label: 'Invoice/Order Number', type: 'text', placeholder: 'e.g. ORD-98765' },
      { id: 'purchaseDate', label: 'Date of Purchase', type: 'date' },
      { id: 'amount', label: 'Purchase Amount', type: 'number', placeholder: 'e.g. 35000' },
      { id: 'issue', label: 'Description of Defect/Issue', type: 'textarea', placeholder: 'e.g. Product stopped working within 2 days...' }
    ]
  }
};

let currentStep = 1;
let formData = {
  refNo: `LN/2026/${Math.floor(1000 + Math.random() * 9000)}`,
  date: new Date().toLocaleDateString('en-IN')
};

function init() {
  loadSavedUserData();
  renderNoticeTypes();
  updateStepUI();
}

function loadSavedUserData() {
  const savedName = localStorage.getItem('adv_notice_senderName');
  const savedPhone = localStorage.getItem('adv_notice_senderPhone');
  if (savedName) document.getElementById('senderName').value = savedName;
  if (savedPhone) document.getElementById('senderPhone').value = savedPhone;
}

function renderNoticeTypes() {
  const container = document.getElementById('type-selection');
  container.innerHTML = Object.entries(noticeTypes).map(([id, data]) => `
    <button onclick="document.selectType('${id}')" class="p-8 border-2 border-gray-100 rounded-3xl hover:border-theme-blue hover:bg-blue-50 transition-all text-left shadow-sm hover:shadow-xl group">
      <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-theme-blue transition-colors">
        <i data-lucide="${data.icon}" class="w-8 h-8 text-navy group-hover:text-white transition-colors"></i>
      </div>
      <h3 class="text-2xl font-bold mb-2 text-navy">${data.title}</h3>
      <p class="text-sm text-gray-500 leading-relaxed">${data.description}</p>
    </button>
  `).join('');
  lucide.createIcons();
}

function selectType(id) {
  formData.type = id;
  renderFields(id);
  nextStep();
}

function renderFields(id) {
  const container = document.getElementById('details-form');
  const typeData = noticeTypes[id];
  document.getElementById('notice-type-title').innerText = typeData.title + ' Details';

  container.innerHTML = typeData.fields.map(field => `
    <div class="animate-fade-in">
      <label class="block text-sm font-bold text-navy mb-2 uppercase tracking-wide">${field.label}</label>
      ${field.type === 'select' ? `
        <select id="${field.id}" class="form-input">
          ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>
      ` : field.type === 'textarea' ? `
        <textarea id="${field.id}" class="form-input h-32" placeholder="${field.placeholder || ''}"></textarea>
      ` : `
        <input type="${field.type}" id="${field.id}" class="form-input" placeholder="${field.placeholder || ''}">
      `}
    </div>
  `).join('');
}

function nextStep() {
  if (currentStep < 4) {
    if (currentStep === 2) {
      if (!saveStepData()) return;
    }
    currentStep++;
    updateStepUI();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
}

function saveStepData() {
  const senderName = document.getElementById('senderName').value.trim();
  const senderPhone = document.getElementById('senderPhone').value.trim();

  if (!senderName || !senderPhone) {
    alert("Please enter your name and phone number.");
    return false;
  }

  // Save to local storage (Mini DB)
  localStorage.setItem('adv_notice_senderName', senderName);
  localStorage.setItem('adv_notice_senderPhone', senderPhone);

  formData.senderName = senderName;
  formData.senderPhone = senderPhone;

  const fields = noticeTypes[formData.type].fields;
  for (const f of fields) {
    const val = document.getElementById(f.id).value.trim();
    if (!val) {
      alert(`Please enter ${f.label}`);
      return false;
    }
    formData[f.id] = val;
  }
  return true;
}

function updateStepUI() {
  document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`step-${currentStep}`).classList.remove('hidden');

  // Update indicators
  document.querySelectorAll('.step-indicator').forEach((el, idx) => {
    el.classList.remove('active', 'completed');
    const txt = document.getElementById(`txt-${idx + 1}`);
    txt.classList.remove('text-theme-blue', 'text-green-500');

    if (idx + 1 === currentStep) {
      el.classList.add('active');
      txt.classList.add('text-theme-blue');
    } else if (idx + 1 < currentStep) {
      el.classList.add('completed');
      txt.classList.add('text-green-500');
    }
  });

  // Update Progress Bar
  const progress = ((currentStep - 1) / 3) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;

  if (currentStep === 3) {
    renderPreview();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPreview() {
  const container = document.getElementById('preview-content');
  const d = formData;

  let dynamicContent = "";
  if (d.type === 'cheque-bounce') {
    dynamicContent = `
      <div class="mb-6"><span class="font-bold">CHEQUE DETAILS:</span><br>
      You issued a cheque bearing number ${d.chequeNumber} dated ${d.chequeDate} for ₹${d.chequeAmount} drawn on ${d.bankName}.</div>
      <div class="mb-6"><span class="font-bold">DISHONOUR:</span><br>
      The said cheque was deposited on ${d.depositDate} and was dishonoured on ${d.returnDate} with reason: ${d.reason}.</div>
      <p class="mb-6">This notice is being served upon you under Section 138 of the Negotiable Instruments Act, 1881, calling upon you to make the payment within 15 days.</p>
    `;
  } else if (d.type === 'money-recovery') {
    dynamicContent = `
      <div class="mb-6"><span class="font-bold">TRANSACTION DETAILS:</span><br>
      An amount of ₹${d.amount} was due for payment on ${d.dueDate} regarding ${d.description}.</div>
      <div class="mb-6 font-bold">OUTSTANDING:</div>
      <p class="mb-6">Despite multiple reminders, you have failed to clear the dues. You are also liable to pay interest at ${d.interestRate}% p.a.</p>
    `;
  } else {
    dynamicContent = `
      <div class="mb-6"><span class="font-bold">PRODUCT DETAILS:</span><br>
      A ${d.productName} was purchased on ${d.purchaseDate} via Invoice No. ${d.invoiceNumber} for ₹${d.amount}.</div>
      <div class="mb-6 font-bold">COMPLAINT:</div>
      <p class="mb-6">${d.issue}</p>
      <p class="mb-6">This serves as a formal notice under the Consumer Protection Act, failing which we shall approach the Consumer Forum.</p>
    `;
  }

  container.innerHTML = `
    <div class="preview-watermark">PREVIEW ONLY</div>
    <div class="document-header flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img src="../assets/images/logo.png" class="letterhead-logo" alt="Seal">
        <div>
          <h1 class="text-2xl font-bold uppercase tracking-tighter">Jasvinder Singh Ply</h1>
          <p class="text-xs uppercase tracking-widest font-bold text-gray-500">Advocate | High Court</p>
        </div>
      </div>
      <div class="text-right text-[10px] text-gray-400">
        Office: Civil Lines, Nagpur<br>
        Contact: +91 88579 72717
      </div>
    </div>
    
    <div class="flex justify-between text-sm mb-10 font-bold">
      <div>REF: ${d.refNo}</div>
      <div>DATE: ${d.date}</div>
    </div>

    <div class="mb-10 text-sm">
      To,<br>
      <span class="font-bold">${d.receiverName}</span><br>
      [Address Line 1]<br>
      [City, State, Zip]
    </div>

    <div class="mb-8 font-bold text-sm uppercase underline">
      Subject: LEGAL NOTICE REGARDING ${noticeTypes[d.type].title.toUpperCase()}
    </div>

    <div class="text-sm space-y-4">
      <p>Dear Sir/Madam,</p>
      <p>On behalf of my client <span class="font-bold">${d.senderName}</span>, I hereby serve you with this legal notice:</p>
      
      ${dynamicContent}

      <p>Please treat this as a final demand for settlement. Failing which, my client has clear instructions to initiate appropriate legal proceedings in the competent court of law at your cost and risk.</p>
      
      <div class="pt-20">
        Sincerely,<br><br>
        <span class="font-bold italic text-gray-400">[Signature]</span><br>
        <span class="font-bold">Jasvinder Singh Ply</span><br>
        Advocate
      </div>
    </div>
  `;
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const d = formData;

  // Basic PDF Generation (Simplified version of rendering)
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("JASVINDER SINGH PLY", 105, 25, { align: "center" });
  doc.setFontSize(10);
  doc.text("ADVOCATE | HIGH COURT", 105, 30, { align: "center" });
  doc.line(20, 35, 190, 35);

  doc.setFontSize(10);
  doc.text(`REF: ${d.refNo}`, 20, 45);
  doc.text(`DATE: ${d.date}`, 190, 45, { align: "right" });

  doc.text("To,", 20, 60);
  doc.text(d.receiverName, 20, 65);
  doc.text("[Recipient Address]", 20, 70);

  doc.setFont("times", "bold");
  doc.text(`SUB: LEGAL NOTICE REGARDING ${noticeTypes[d.type].title.toUpperCase()}`, 20, 85);

  doc.setFont("times", "normal");
  doc.text("Dear Sir/Madam,", 20, 100);

  const bodyText = `On behalf of my client ${d.senderName}, I hereby serve you with this legal notice regarding the transaction details provided. You are hereby called upon to settle the matter amicably within 15 days of receipt of this notice. This is without prejudice to any other rights or remedies available to my client under the law.`;

  const splitText = doc.splitTextToSize(bodyText, 170);
  doc.text(splitText, 20, 110);

  doc.setFont("times", "italic");
  doc.setTextColor(150);
  doc.text("DRAFT PREVIEW ONLY - NOT FOR LEGAL FILING", 105, 280, { align: "center" });

  doc.save(`${d.type}-draft.pdf`);
}

window.onload = init;
document.nextStep = nextStep;
document.prevStep = prevStep;
document.selectType = selectType;
document.generatePDF = generatePDF;
