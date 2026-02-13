const competencies = [
  "Self-awareness & EQ",
  "Strategic Communication & Alignment",
  "Decision Quality & Pace",
  "Accountability & Standards",
  "Coaching & Development",
  "Psychological Safety, Candour & Conflict",
  "Collaboration Across Boundaries",
  "Meaning & Purpose",
  "Execution Discipline",
  "Change Leadership",
];

const weighting = {
  manager: 0.3,
  peers: 0.25,
  directs: 0.25,
  stakeholders: 0.2,
};

const sampleGroupMeans = {
  manager: [6.0, 5.6, 5.2, 5.4, 5.1, 5.7, 5.2, 5.8, 5.6, 5.4],
  peers: [5.5, 5.3, 4.9, 5.0, 5.2, 5.4, 5.6, 5.1, 5.0, 5.1],
  directs: [5.2, 5.0, 4.8, 4.7, 5.4, 5.6, 5.0, 5.5, 4.9, 4.8],
  stakeholders: [5.7, 5.5, 5.4, 5.1, 4.9, 5.2, 5.8, 5.3, 5.4, 5.5],
};

const sampleSelf = [6.2, 6.0, 5.8, 5.8, 5.6, 5.9, 5.7, 6.1, 5.8, 5.9];

function weightedMultiRater(groupMeans, weightMap) {
  return competencies.map((_, idx) => {
    const value = Object.entries(weightMap).reduce((sum, [group, w]) => sum + groupMeans[group][idx] * w, 0);
    return Number(value.toFixed(2));
  });
}

function renderScoreRows(multi, self) {
  const tbody = document.getElementById("scoreRows");
  tbody.innerHTML = "";
  competencies.forEach((name, i) => {
    const tr = document.createElement("tr");
    const delta = Number((self[i] - multi[i]).toFixed(2));
    tr.innerHTML = `<td>${name}</td><td>${multi[i].toFixed(2)}</td><td>${self[i].toFixed(2)}</td><td>${delta > 0 ? "+" : ""}${delta.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
}

function drawRadar(canvas, labels, multi, self) {
  const ctx = canvas.getContext("2d");
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const maxR = 240;
  const levels = 7;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "12px Inter, sans-serif";
  ctx.fillStyle = "#21284b";

  for (let level = 1; level <= levels; level += 1) {
    const radius = (maxR * level) / levels;
    ctx.beginPath();
    labels.forEach((_, i) => {
      const angle = ((Math.PI * 2) / labels.length) * i - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#d9defa";
    ctx.stroke();
  }

  labels.forEach((label, i) => {
    const angle = ((Math.PI * 2) / labels.length) * i - Math.PI / 2;
    const x = cx + Math.cos(angle) * (maxR + 22);
    const y = cy + Math.sin(angle) * (maxR + 22);
    ctx.fillText(String(i + 1), x - 4, y + 4);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
    ctx.strokeStyle = "#edf0ff";
    ctx.stroke();
  });

  const drawSeries = (values, fill, stroke) => {
    ctx.beginPath();
    values.forEach((value, i) => {
      const angle = ((Math.PI * 2) / labels.length) * i - Math.PI / 2;
      const radius = (value / 7) * maxR;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  };

  drawSeries(multi, "rgba(78, 62, 230, 0.34)", "#4e3ee6");
  drawSeries(self, "rgba(65, 221, 214, 0.28)", "#17a39b");

  ctx.fillStyle = "#4e3ee6";
  ctx.fillRect(22, 24, 16, 10);
  ctx.fillStyle = "#111";
  ctx.fillText("Multi-rater weighted", 44, 33);
  ctx.fillStyle = "#17a39b";
  ctx.fillRect(22, 44, 16, 10);
  ctx.fillStyle = "#111";
  ctx.fillText("Self overlay", 44, 53);
}

function renderBoundaries() {
  document.getElementById("boundaries").textContent = `Mission: Build an MVP 360 feedback + AI coaching web app.
Use only private participant feedback context for coaching.
Never expose PII or raw identifiable comments.
Store secrets in environment variables only.
Avoid unnecessary complexity; single-repo architecture.
Produce structured output lenses: results, people, execution.
Ask the user to choose coaching tone at chat start: supportive, challenger, or mixed.`;
}

const multi = weightedMultiRater(sampleGroupMeans, weighting);
renderScoreRows(multi, sampleSelf);
drawRadar(document.getElementById("radar"), competencies, multi, sampleSelf);
renderBoundaries();
