
document.addEventListener('DOMContentLoaded', () => {
  tbody = document.getElementById('table-body');
  th = document.getElementsByTagName('th');

  inputName = document.getElementsByName('name')[0];
  inputBreed = document.getElementsByName('breed')[0];
  inputSex = document.getElementsByName('sex')[0];
  submit = document.querySelector('[type="submit"]');

  submit.addEventListener('click', updateDog)

  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => dogJson(data))
})


function dogJson(json){
  for(let dog of json){
    let row = tbody.insertRow()
    row.setAttribute('rowId', dog.id);
    row.insertCell().innerText = dog.name;
    row.insertCell().innerText = dog.breed;
    row.insertCell().innerText = dog.sex;
    let editDogButton = row.insertCell();
    editDogButton.innerHTML ='<button>Edit Dog</button>';
    editDogButton.addEventListener('click', editDog);
  }
}

function editDog (e) {
  let currentDog = e.target.parentNode.parentNode;
  inputName.value = currentDog.childNodes[0].innerText;
  inputBreed.value = currentDog.childNodes[1].innerText;
  inputSex.value = currentDog.childNodes[2].innerText
  submit.setAttribute('id', currentDog.getAttribute('rowId'));
}

//Update Dog by fetch PATCH METHOD
function updateDog (e) {
  e.preventDefault();
  let id = e.target.getAttribute('id')
  let editData = {name:inputName.value,
    breed:inputBreed.value,
    sex:inputSex.value}

  fetch(`http://localhost:3000/dogs/${id}`,{
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(editData)}).then(()=>{
      location = location;
    })
}
