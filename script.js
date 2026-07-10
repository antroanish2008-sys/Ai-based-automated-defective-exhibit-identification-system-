let defects = 0, alerts = 0;

function syncDashboard() {
  const d = document.getElementById('defectCount');
  const a = document.getElementById('alertCount');
  const s = document.getElementById('status');
  if (d) d.textContent = defects;
  if (a) a.textContent = alerts;
  if (s) s.textContent = defects > 0 ? 'Attention Needed' : 'Ready';
}

function analyzeImage() {
  const input = document.getElementById('imgInput');
  const preview = document.getElementById('preview');
  const result = document.getElementById('resultText');
  const list = document.getElementById('findingList');

  if (!input || !input.files || !input.files[0]) {
    alert('Please choose an image first.');
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    if (preview) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);

  const name = (file.name || '').toLowerCase();
  let findings = ['No major defect detected.'];

  if (name.includes('crack') || name.includes('scratch') || name.includes('broken')) {
    findings = ['Crack/scratch-like pattern detected.'];
  }
  if (name.includes('dust') || name.includes('stain') || name.includes('dirty')) {
    findings = ['Dust or stain-like pattern detected.'];
  }
  if (name.includes('fade') || name.includes('color')) {
    findings = ['Color fading warning detected.'];
  }

  defects += 1;
  alerts += 1;

  if (result) result.textContent = 'Analysis complete. ' + findings[0];
  if (list) list.innerHTML = findings.map(x => '>' + x + '</li>').join('');
  syncDashboard();
}

window.addEventListener('load', syncDashboard);