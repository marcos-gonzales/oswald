// Fetching our data from blog table


fetch('http://localhost:3000/blog') 
  .then((res) => {
   return res.json()
  })
  .then((data) => {
    //We reverse the data to get the posts to show most recent first

    const newData = [...data].reverse()
    newData.forEach(post => {
      const blogPost =  document.createElement('div');
      blogPost.classList.add('individual-post')
      let timeStamp = post.time_stamp.split("")
      let newTimeStamp = timeStamp.slice(0,10)
      let dates = (newTimeStamp[8] + newTimeStamp[9]) - 1;
      let year = newTimeStamp[0] + newTimeStamp[1] + newTimeStamp[2] + newTimeStamp[3]
     

      //Getting the dates to display in a nice way
      if(newTimeStamp[6] === "1") {
        newTimeStamp = `Janurary ${dates} ${year}`
      } else if(newTimeStamp[6] === "2") {
        newTimeStamp = `February ${dates} ${year}`
      } else if(newTimeStamp[6] === "3") {
        newTimeStamp = `March ${dates} ${year}`
      } else if(newTimeStamp[6] === "4") {
      newTimeStamp = `April ${dates} ${year}`
      } else if(newTimeStamp[6] === "5") {
        newTimeStamp = `May ${dates} ${year}`
      } else if(newTimeStamp[6] === "6") {
        newTimeStamp = `June ${dates} ${year}`
      } else if(newTimeStamp[6] === "7") {
        newTimeStamp = `July ${dates} ${year}`
      } else if(newTimeStamp[6] === "8") {
        newTimeStamp = `August ${dates} ${year}`
      } else if(newTimeStamp[6] === "9") {
        newTimeStamp = `September ${dates} ${year}`
      } else if(newTimeStamp[5] === "1" && newTimeStamp[6] === "0") {
        newTimeStamp = `October ${dates} ${year}`
      } else if(newTimeStamp[5] === "1" && newTimeStamp[6] === "1") {
        newTimeStamp = `November ${dates} ${year}`
      } else if(newTimeStamp[5] === "1" && newTimeStamp[6] === "2") {
        newTimeStamp = `December ${dates} ${year}`
      }
        // Displaying our database to the client
      blogPost.innerHTML = `
        <div class="author-image" id="${post.id}">
          <img src="../images/oswald${generateNumber(result)}.jpeg" class="avatar" id="modalBtn">
        </div>

        <div id="modal" class="modal">
          <div class="modal-content">
            <img src="../images/oswald${result}.jpeg" class="modal-image">
          </div>  
        </div>
        
        <div class="content">
          <p class="blog-author">${post.author}</p>
          <p>Subject: ${post.subject}</p>
          <p>Post: ${post.post}</p>
            <form method="POST" action="/delete/${post.id}">
              <p>${sliceTime(newTimeStamp)}</p>
              <button class="message btn">Delete</button>
            </form>
        </div>    
          `

          posts.appendChild(blogPost)
      })
      const avatar = document.querySelectorAll('#modalBtn');
      const hiddenModal = document.querySelectorAll('#modal');

      avatar.forEach(avatar => {
        avatar.addEventListener('click', showModal);
      })

      function closeModal(e) {
        hiddenModal.forEach(modal => {
          if(e.target === modal || e.target.classList.value === "modal-content") {
            modal.style.display = 'none'
          }
        })
      }
      
      window.addEventListener('click', closeModal)

      const button = document.querySelectorAll('.message');
      button.forEach(button => {

      //Confirmation to see if user wants to delete post
      button.addEventListener('click', function(e) {
        const question = confirm('Are you sure you want to delete this post?')
        if(question === false)  {
          e.preventDefault()
          return
        }
    })
  })
});

const posts = document.querySelector('#post');
const individualPost = document.querySelector('.individual-post');
const closeFlash = document.querySelector('#flash-message');
let result;
let slideIndex;
let slides;
let dots;

function initGallery() {
  slideIndex = 0;
  slides = document.querySelectorAll('.image-container');
  slides[slideIndex].style.opacity = 1;

  dots = [];
  const dotsContainer = document.querySelector('#dotsContainer');

  for(let i = 0; i < slides.length; i++) {
    let dot = document.createElement('span');
    dot.classList.add('dots');
    dot.setAttribute("onClick", "moveSlide("+i+")");
    dotsContainer.appendChild(dot);
    dots.push(dot)
  }

  dots[slideIndex].classList.add("active")
}

initGallery()

function plusSlides(n) {
  moveSlide(slideIndex + n);
}

function moveSlide(n) {
  let i, current, next;
  let moveSlide = {
    forCurrent: "",
    forNext: ""
  }
  if( n > slideIndex ) {
    
    if(n >= slides.length) {n = 0;};
    moveSlide.forCurrent="moveLeftCurrentSlide";
    moveSlide.forNext="moveLeftNextSlide";
  } else if( n < slideIndex) {
    
    if(n < 0) {n = slides.length - 1}
    moveSlide.forCurrent="moveRightCurrentSlide";
    moveSlide.forNext="moveRightNextSlide";
  }
  if(n!=slideIndex) {
    next = slides[n];
    current = slides[slideIndex];
    for(i = 0; i < slides.length; i++) {
      slides[i].className = "image-container";
      slides[i].style.opacity = 0;
      dots[i].classList.remove("active");
    }

    current.classList.add(moveSlide.forCurrent);
    next.classList.add(moveSlide.forNext);
    dots[n].classList.add("active");
    slideIndex = n;
  }
}

// Close the flash message
if(closeFlash === null)  {
  console.log('hi')
} else {
  closeFlash.addEventListener('click', closeFlashMessage)
}
 
function closeFlashMessage(e) {
  const parent = e.target.parentNode
  const parentParent = parent.parentNode
  parentParent.removeChild(parent);
}

function sliceTime(time) {
  time.slice(0, 1)
  return time
}

// Generate a random number to display random pics of users
function generateNumber() {
  result = Math.floor(Math.random() * 4) + 1
  return result
}


function showModal(e) {
  const divs = document.querySelectorAll('.modal-image');
  divs.forEach(div => {
    if(div.src === e.target.src) {
      div.parentNode.parentNode.style.display = 'block'
    }
  })
}

