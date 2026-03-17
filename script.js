const gotItem = localStorage.getItem("myRecords");
const listArea = document.getElementById ("record-list");
listArea.innerHTML = gotItem;
const button = document.getElementById ("save-button");

button.addEventListener ("click", () => {
    const commentInput = document.getElementById ("record-comment");
    const commentText = commentInput.value;
    const dateInput = document.getElementById ("record-date");
    const dateText = dateInput.value;
    const fileInput = document.getElementById ("record-file");
    const fileData = fileInput.files[0];
    let imageTag = "";
    if (fileData) {
        const imageURL = URL.createObjectURL(fileData);
        // createObjectURLはfileDataがないとエラーになるのでif文でやることでエラーを防ぐ
        imageTag = `<img src="${imageURL}">`
    }

    const logHTML =`
        <div class="record-card">
            <p class="record-date-display">${dateText}</p>
            ${imageTag}
            <p class="record-comment-display">${commentText}</p>
            <button class="delete-button">削除</button>
        </div> 
    `

    listArea.insertAdjacentHTML ("afterbegin", logHTML)
    // HTMLのrecord-listにはJavascript上で入れられないから新しく定数listAreaを宣言した
    dateInput.value = "";
    commentInput.value = "";
    fileInput.value = "";

    localStorage.setItem("myRecords", listArea.innerHTML);
});

listArea.addEventListener ("click", (event) => {
    if (event.target.classList.contains("delete-button"))
    event.target.closest(".record-card").remove();
    localStorage.setItem("myRecords", listArea.innerHTML);
// eventという報告書の中の、実際に今ユーザが触れたボタンtargetという意味
// もしその、数あるボタンの中で、そのclassListの中にdelete-buttonが含まれていたら実行する
// もし.record-cardではなくlistAreaにすると、記録した部分が全部消えてしまうため。
})