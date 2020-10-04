let addButton = document.getElementById("add-button");
let addInput = document.getElementById("add-input");
let listContainer = document.getElementById("items");
let searchInput = document.getElementById("search-input");

addButton.addEventListener("click", () => {
  var inputText = addInput.value;
  if (inputText.length === 0) return;
  var todoList = JSON.parse(localStorage.getItem("data"));
  if (!todoList) todoList = [];
  todoList.push({ message: inputText, isChecked: false });
  localStorage.setItem("data", JSON.stringify(todoList));
  addInput.value = "";
  //render new values
  render(todoList);
});

//SEARCH
searchInput.addEventListener("input", (event)=>{
    var todoList = JSON.parse(localStorage.getItem("data"));
    if (!todoList) todoList = [];
    var searchText = event.target.value;
    var filteredList
    if (searchText.length>0){
        filteredList=todoList.filter((listItem)=>{
            return listItem.message.toLowerCase().includes(searchText.toLowerCase())
        })
        render(filteredList);
    }
    else
    render(todoList);
})

function render(list) {
  listContainer.innerHTML = ""; //to remove old list
  list.forEach((listItem, index) => {
    var checkedAttr = listItem.isChecked ? "checked" : "";
    listContainer.innerHTML += `<li class="item-type" id=l${index} ><input class="checkbox-input" id=c${index} type="checkbox" ${checkedAttr}>${listItem.message}
        <button id=d${index} type="button" name="button" class="delete-button"><i class="fa fa-trash"></i></button>
         </li>`;
  });

  list.forEach((listItem, index) => {
    let deleteButton = document.getElementById("d" + index);
    let checkbox = document.getElementById("c" + index);
    let li = document.getElementById("l" + index);

    li.addEventListener("mouseover",()=>{
        li.lastElementChild.style.display = "block"
    })
    li.addEventListener("mouseout",()=>{
        li.lastElementChild.style.display = "none"
    })
    //CHECKBOX
    checkbox.addEventListener("click", (event) => {
      var temp = [];
      list.forEach((listItem, newIndex) => {
        if (newIndex === index)
          temp.push({
            message: listItem.message,
            isChecked: event.target.checked,
          });
        else 
            temp.push(listItem);
        localStorage.setItem("data", JSON.stringify(temp));
        render(temp);
      });
    });
    //DELETE FUNCTION
    deleteButton.addEventListener("click", () => {
      var temp = [];
      list.forEach((listItem, newIndex) => {
        if (newIndex != index) temp.push(listItem);
        localStorage.setItem("data", JSON.stringify(temp));
        render(temp);
      });
    });
  });

}

window.onload = function () {
  var todoList = JSON.parse(localStorage.getItem("data"));
  if (!todoList) todoList = [];

  render(todoList);
};
