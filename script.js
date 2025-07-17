// script.js (完成版)

const personalities = {
  vegetable: "おっとり",
  meat: "熱血漢",
  fish: "クール",
  egg: "繊細",
  dairy: "ネガティブ",
  snack: "元気っ子",
  other: ["謎めいた", "皮肉屋", "無口"]
};

document.getElementById("add-btn").onclick = () => {
  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value;
  const expiry = document.getElementById("expiry").value;

  if (!name || !type || !expiry) {
    alert("すべての項目を入力してください");
    return;
  }

  const ingredients = JSON.parse(localStorage.getItem("ingredients") || "[]");
  const addDate = new Date().toLocaleDateString('ja-JP'); // 登録日を取得
  // 食材情報に登録日も追加して保存
  ingredients.push({ name, type, expiry, addDate });
  localStorage.setItem("ingredients", JSON.stringify(ingredients));

  displayIngredients();
  document.getElementById("name").value = "";
};

function getDaysLeft(expiry) {
  const today = new Date();
  // 時刻を0にリセットして日付のみで正確に比較
  today.setHours(0, 0, 0, 0);
  const date = new Date(expiry);
  date.setHours(0, 0, 0, 0);
  const diff = date - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function generateDialog(name, type, daysLeft) {
  const style = Array.isArray(personalities[type])
    ? personalities[type][Math.floor(Math.random() * personalities[type].length)]
    : personalities[type] || "普通";

  if (daysLeft < 0) {
    return `${name}：${getDialogByStyle(style, "expired")}`;
  } else if (daysLeft === 0) {
    return `${name}：${getDialogByStyle(style, "today")}`;
  } else {
    return `${name}：${getDialogByStyle(style, "remaining", daysLeft)}`;
  }
}

function getDialogByStyle(style, status, daysLeft = 0) {
  switch (status) {
    case "expired":
      return {
        熱血漢: "くっ…もう間に合わないだと！？",
        クール: "…もう遅いか。",
        繊細: "ひっ…もうだめなの？",
        ネガティブ: "ほらね、やっぱりダメだった。",
        元気っ子: "うわーん！賞味期限切れちゃったー！",
        おっとり: "あら〜残念ねぇ…",
        謎めいた: "時は満ちた…か。",
        皮肉屋: "どうせ誰も食べやしないと思ってたよ。",
        無口: "…………。"
      }[style] || "もう…間に合わないのか…";

    case "today":
      return {
        熱血漢: "今日が勝負の日だ！やってやるぜ！",
        クール: "決着をつけよう。",
        繊細: "今日しかない…頑張らなきゃ…！",
        ネガティブ: "今日で終わりか…私。",
        元気っ子: "いよいよ今日！楽しみ〜♪",
        おっとり: "今日はなんだかドキドキするわ〜",
        謎めいた: "運命の日だな…。",
        皮肉屋: "せいぜい今日の内に使い切るんだな。",
        無口: "…今日だ。"
      }[style] || "今日が勝負の日だ！";

    case "remaining":
      return {
        熱血漢: `あと${daysLeft}日か！気合い入れていこうぜ！`,
        クール: `残り${daysLeft}日。悪くない。`,
        繊細: `あと${daysLeft}日…ドキドキする…`,
        ネガティブ: `どうせあと${daysLeft}日で捨てられるんでしょ…`,
        元気っ子: `あと${daysLeft}日！まだまだ元気だよ〜！`,
        おっとり: `あと${daysLeft}日、ゆっくりしていこうね〜`,
        謎めいた: `…${daysLeft}日後、何かが起こる。`,
        皮肉屋: `あと${daysLeft}日か。早く使ってくれないかな。`,
        無口: `…あと${daysLeft}日。`
      }[style] || `あと${daysLeft}日あるよ〜！よろしくね♪`;

    default:
      return "";
  }
}

function getGratitudeMessage(name, type) {
  const style = Array.isArray(personalities[type])
    ? personalities[type][Math.floor(Math.random() * personalities[type].length)]
    : personalities[type] || "普通";

  const message = {
    熱血漢: "うおおっ！最高の料理にしてくれよな！",
    クール: "キミに調理されるなら本望だ。",
    繊細: "わ、私でいいの…？美味しくしてね…！",
    ネガティブ: "どうせ美味しくないんだろうけど…まあ、いいよ。",
    元気っ子: "やったー！どんな料理になるかワクワク！",
    おっとり: "うふふ、美味しくしてちょうだいねぇ。",
    謎めいた: "フフ…新たな形となる時が来たか。",
    皮肉屋: "やっとかい。待ちくたびれたよ。",
    無口: "…頼む。"
  }[style] || "ありがとう！美味しく食べてね！";

  return `${name}：「${message}」`;
}

function getFarewellMessage(name, type) {
  const style = Array.isArray(personalities[type])
    ? personalities[type][Math.floor(Math.random() * personalities[type].length)]
    : personalities[type] || "普通";

  const message = {
    熱血漢: "最後まで戦えなくて…すまん…！",
    クール: "これが運命か…仕方ない。",
    繊細: "ご、ごめんなさい…役に立てなくて…",
    ネガティブ: "やっぱりこうなる運命だったんだ…。",
    元気っ子: "バイバーイ！またどこかで会おうね！",
    おっとり: "あらあら、仕方ないわねぇ…さようなら。",
    謎めいた: "消えるのではない。還るだけだ。",
    皮肉屋: "やっぱりね。期待して損したよ。",
    無口: "……さらばだ。"
  }[style] || "さようなら…";

  return `${name}：「${message}」`;
}

/**
 * 日記に記録を保存する関数
 * @param {object} item - 処理された食材のオブジェクト
 * @param {string} status - '調理' または '廃棄'
 */
function saveToDiary(item, status) {
  const diary = JSON.parse(localStorage.getItem("diary") || "[]");
  const log = {
    name: item.name,
    addDate: item.addDate, // 登録日
    expiry: item.expiry,   // 期限日
    status: status,        // '調理' or '廃棄'
    processedDate: new Date().toLocaleString('ja-JP') // 処理日
  };
  // 新しいログが先頭に来るように配列に追加
  diary.unshift(log);
  localStorage.setItem("diary", JSON.stringify(diary));
}


function displayIngredients() {
  const list = document.getElementById("ingredient-list");
  list.innerHTML = "";
  const ingredients = JSON.parse(localStorage.getItem("ingredients") || "[]");

  ingredients.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const daysLeft = getDaysLeft(item.expiry);
    if (daysLeft < 0) {
      card.classList.add("expired"); // 期限切れ用のCSSクラスを追加
    } else if (daysLeft <= 3) {
      card.classList.add("near-expiry"); // 期限間近用のCSSクラスを追加
    }

    const img = document.createElement("img");
    img.src = `avatars/${item.type}.png`;
    img.alt = item.type;
    img.onerror = () => {
      img.src = "avatars/other.png"; // 画像がない場合の代替画像
    };

    const text = document.createElement("p");
    text.innerHTML = `<strong>${item.name}</strong><br>期限: ${item.expiry}`;

    const dialog = document.createElement("p");
    dialog.className = "dialog";
    dialog.textContent = generateDialog(item.name, item.type, daysLeft);

    const cookBtn = document.createElement("button");
    cookBtn.textContent = "🍳 料理する";
    cookBtn.onclick = () => {
      const msg = getGratitudeMessage(item.name, item.type);
      alert(msg);
      saveToDiary(item, "調理"); // 日記に記録

      // 配列から該当アイテムを削除
      ingredients.splice(index, 1);
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
      displayIngredients(); // 表示を更新
    };

    const expireBtn = document.createElement("button");
    expireBtn.textContent = "🗑️ 期限切れ処理";
    expireBtn.onclick = () => {
      const msg = getFarewellMessage(item.name, item.type);
      alert(msg);
      saveToDiary(item, "廃棄"); // 日記に記録

      // 配列から該当アイテムを削除
      ingredients.splice(index, 1);
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
      displayIngredients(); // 表示を更新
    };

    card.appendChild(img);
    card.appendChild(text);
    card.appendChild(dialog);
    card.appendChild(cookBtn);
    card.appendChild(expireBtn);
    list.appendChild(card);
  });
}

// ページ読み込み時に実行
window.onload = () => {
  displayIngredients();
};