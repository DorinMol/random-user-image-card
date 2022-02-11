const USERS_URL = `https://jsonplaceholder.typicode.com/users/`;
const IMAGE_URL = `https://picsum.photos/200/200`;
const UPDATE_TYPE = {
  prev: `prev`,
  next: `next`,
  random: `random`
}

const fetchUsers = async () => {
  try {
    return await (await fetch(USERS_URL)).json();
  } catch(error) {
    console.error(error);
  }
}

const fetchImage = async () => {
  try {
    const imageBlob = await (await fetch(IMAGE_URL)).blob();
    return URL.createObjectURL(imageBlob)
  } catch(error) {
    console.error(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  let currentUserIndex = 0;
  const image = document.querySelector('.img');
  const personName = document.querySelector('.person-name')
  const catchPhrase = document.querySelector('.catch-phrase')

  // buttons
  const prev = document.querySelector('.prev')
  const next = document.querySelector('.next')
  const random = document.querySelector('.random')

  const users = await fetchUsers();

  const _randomData = async (updateType) => {
    const imageSrc = await fetchImage();
    image.src = imageSrc;

    switch(updateType) {
      case UPDATE_TYPE.next: 
        currentUserIndex++;
        if (currentUserIndex > users.length - 1) currentUserIndex = 0;
        break;
      case UPDATE_TYPE.prev:
        currentUserIndex--;
        if (currentUserIndex < 0) currentUserIndex = users.length - 1;
        break;
      case UPDATE_TYPE.random:
        currentUserIndex = Math.floor(Math.random() * users.length)
        break;
      default: console.error("Bad type ", updateType);
    }

    personName.textContent = users[currentUserIndex].name;
    catchPhrase.textContent = users[currentUserIndex].company.catchPhrase;
  }

  [prev, next, random].forEach(btn => {
    btn.addEventListener(`click`, async () => {
      await _randomData(btn.dataset.updateType);
    })
  })
})