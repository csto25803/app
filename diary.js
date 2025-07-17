window.onload = () => {
  const diaryContainer = document.getElementById("diary-container");
  const diary = JSON.parse(localStorage.getItem("diary") || "[]");

  if (diary.length === 0) {
    diaryContainer.innerHTML = "<p>日記はまだありません。</p>";
    return;
  }

  // 食材名でデータをグループ化
  const groupedByFood = diary.reduce((acc, log) => {
    const key = log.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(log);
    return acc;
  }, {});

  // グループ化されたデータを元にHTMLを生成
  for (const foodName in groupedByFood) {
    const foodSection = document.createElement("div");
    foodSection.className = "diary-section";

    const heading = document.createElement("h2");
    heading.textContent = foodName;
    foodSection.appendChild(heading);

    const table = document.createElement("table");
    table.className = "diary-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>処理日</th>
          <th>登録日</th>
          <th>期限日</th>
          <th>結果</th>
        </tr>
      </thead>
    `;
    const tbody = document.createElement("tbody");

    groupedByFood[foodName].forEach(log => {
      const row = document.createElement("tr");
      
      const statusText = log.status === '調理' ? '調理' : '廃棄';
      const statusClass = log.status === '調理' ? 'cooked' : 'disposed';

      row.innerHTML = `
        <td>${log.processedDate}</td>
        <td>${log.addDate}</td>
        <td>${log.expiry}</td>
        <td><span class="status-dot ${statusClass}">●</span> ${statusText}</td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    foodSection.appendChild(table);
    diaryContainer.appendChild(foodSection);
  }
};