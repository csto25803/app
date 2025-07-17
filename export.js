document.getElementById("export-btn").onclick = () => {
  const diary = JSON.parse(localStorage.getItem("diary") || "[]");
  if (diary.length === 0) {
    alert("日記が空です");
    return;
  }

  let csv = "メッセージ,結果,時刻\n";
  diary.forEach(entry => {
    const match = entry.message.match(/（(.+?)）$/);
    const result = match ? match[1] : "";
    const message = entry.message.replace(/（.+?）$/, "");
    csv += `"${message}","${result}","${entry.time}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "diary.csv";
  link.click();
};
