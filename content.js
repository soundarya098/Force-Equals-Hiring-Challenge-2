const data = {
  companyName: "TechCorp",
  matchScore: 86,
  accountStatus: "Target"
};

const createWidget = () => {
  const container = document.createElement("div");
  container.id = "company-widget";

  const company = document.createElement("h3");
  company.innerText = data.companyName;

  const scoreLabel = document.createElement("p");
  scoreLabel.innerText = `Match Score: ${data.matchScore}`;

  const progress = document.createElement("progress");
  progress.value = data.matchScore;
  progress.max = 100;

  const status = document.createElement("span");
  status.innerText = data.accountStatus;
  status.className = data.accountStatus === "Target" ? "target" : "nontarget";

  const toggleButton = document.createElement("button");
  toggleButton.innerText = "Hide Widget";
  toggleButton.onclick = () => {
    const visible = container.style.display !== "none";
    container.style.display = visible ? "none" : "block";
    toggleButton.innerText = visible ? "Show Widget" : "Hide Widget";
    chrome.storage.sync.set({ visible: !visible });
  };

  container.append(company, scoreLabel, progress, status, toggleButton);
  document.body.appendChild(container);

  chrome.storage.sync.get("visible", (result) => {
    if (result.visible === false) {
      container.style.display = "none";
      toggleButton.innerText = "Show Widget";
    }
  });
};

window.onload = () => {
  createWidget();
};
